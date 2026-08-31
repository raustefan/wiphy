import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { AppError } from "@/lib/server/errors";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";

export async function POST(request: Request) {
  try {
    if (!(await isFeatureEnabled("PASSWORD_RESET"))) {
      return NextResponse.json(
        { error: "Passwort zurücksetzen wurde von einem Administrator deaktiviert.", code: "FEATURE_DISABLED" },
        { status: 403 },
      );
    }

    const { token, password } = await request.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Token ist erforderlich" }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Das Passwort muss mindestens 8 Zeichen lang sein" },
        { status: 400 }
      );
    }

    // The token itself is unguessable (32 random bytes); this cap is just a
    // brake against scripted abuse/DoS of this endpoint from one IP.
    try {
      await consumeRateLimit({
        bucket: "reset-password-ip",
        keyParts: [extractClientIp(request.headers)],
        limit: 20,
        windowMs: 15 * 60 * 1000,
        blockMs: 15 * 60 * 1000,
        message: "Zu viele Anfragen. Bitte versuche es später erneut.",
      });
    } catch (error) {
      if (error instanceof AppError && error.code === "TOO_MANY_REQUESTS") {
        return NextResponse.json({ error: error.message }, { status: 429 });
      }
      throw error;
    }

    // Look up PasswordResetToken by token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    // Check if token exists and is not expired
    if (!resetToken || resetToken.expires < new Date()) {
      return NextResponse.json(
        { error: "Der Link ist ungültig oder abgelaufen" },
        { status: 400 }
      );
    }

    // Hash the new password with bcryptjs (12 rounds)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update the User record matched by resetToken.email.
    // Bumping passwordChangedAt invalidates any session/JWT issued before this reset.
    // Clicking a link that was mailed to this address proves the user controls
    // it, so mark it verified too — otherwise someone who never confirmed their
    // address resets their password and is still locked out at login with no
    // way to tell why.
    await prisma.user.update({
      where: { email: resetToken.email },
      data: {
        password: hashedPassword,
        passwordChangedAt: new Date(),
        emailVerified: true,
      },
    });

    // Any outstanding confirmation link is redundant now.
    await prisma.emailVerificationToken.deleteMany({
      where: { email: resetToken.email },
    });

    // Delete the used PasswordResetToken
    await prisma.passwordResetToken.delete({
      where: { token },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to reset password:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
