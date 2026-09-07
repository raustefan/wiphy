import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { extractClientIp } from "@/lib/server/rateLimit";
import { logSecurityEvent } from "@/lib/server/securityLog";

export async function POST(request: Request) {
  try {
    const clientIp = extractClientIp(request.headers);
    const userAgent = request.headers.get("user-agent");

    if (!(await isFeatureEnabled("EMAIL_VERIFICATION"))) {
      await logSecurityEvent({
        type: "EMAIL_VERIFICATION",
        outcome: "BLOCKED",
        reason: "feature_disabled",
        ip: clientIp,
        userAgent,
      });
      return NextResponse.json(
        { error: "E-Mail-Verifizierung wurde von einem Administrator deaktiviert.", code: "FEATURE_DISABLED" },
        { status: 403 },
      );
    }

    const { token } = await request.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Token ist erforderlich" }, { status: 400 });
    }

    // Look up EmailVerificationToken by token
    const verificationToken = await prisma.emailVerificationToken.findUnique({
      where: { token },
    });

    // Check if token exists and is not expired
    if (!verificationToken || verificationToken.expires < new Date()) {
      await logSecurityEvent({
        type: "EMAIL_VERIFICATION",
        outcome: "FAILURE",
        reason: "invalid_token",
        email: verificationToken?.email,
        ip: clientIp,
        userAgent,
      });
      return NextResponse.json(
        { error: "Der Link ist ungültig oder abgelaufen" },
        { status: 400 }
      );
    }

    if (verificationToken.userId) {
      // Find the user by ID
      const user = await prisma.user.findUnique({
        where: { id: verificationToken.userId },
      });

      if (!user) {
        await logSecurityEvent({
          type: "EMAIL_VERIFICATION",
          outcome: "FAILURE",
          reason: "invalid_token",
          email: verificationToken.email,
          ip: clientIp,
          userAgent,
        });
        return NextResponse.json(
          { error: "Benutzer wurde nicht gefunden" },
          { status: 404 }
        );
      }

      // Ein abweichender Adresswert im Token heißt: der Link stammt aus einer
      // Adressänderung, nicht aus der Registrierung. Das steht als `reason` im
      // Protokoll, damit beide Fälle unterscheidbar bleiben.
      const isEmailChange = user.email !== verificationToken.email;

      // Check if the new email is already taken by another user (only relevant if email is actually changing)
      if (isEmailChange) {
        const existingUser = await prisma.user.findUnique({
          where: { email: verificationToken.email },
        });
        if (existingUser) {
          await logSecurityEvent({
            type: "EMAIL_VERIFICATION",
            outcome: "FAILURE",
            reason: "email_taken",
            userId: user.id,
            ip: clientIp,
            userAgent,
          });
          return NextResponse.json(
            { error: "Diese E-Mail-Adresse wird bereits verwendet." },
            { status: 400 }
          );
        }
      }

      // Update the user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: verificationToken.email,
          emailVerified: true,
        },
      });

      await logSecurityEvent({
        type: "EMAIL_VERIFICATION",
        outcome: "SUCCESS",
        reason: isEmailChange ? "email_change" : undefined,
        userId: user.id,
        ip: clientIp,
        userAgent,
      });
    } else {
      // If no userId, but email is present, search by email (fallback)
      const user = await prisma.user.findUnique({
        where: { email: verificationToken.email },
      });

      if (!user) {
        await logSecurityEvent({
          type: "EMAIL_VERIFICATION",
          outcome: "FAILURE",
          reason: "invalid_token",
          email: verificationToken.email,
          ip: clientIp,
          userAgent,
        });
        return NextResponse.json(
          { error: "Benutzer wurde nicht gefunden" },
          { status: 404 }
        );
      }

      await prisma.user.update({
        where: { email: verificationToken.email },
        data: {
          emailVerified: true,
        },
      });

      await logSecurityEvent({
        type: "EMAIL_VERIFICATION",
        outcome: "SUCCESS",
        userId: user.id,
        ip: clientIp,
        userAgent,
      });
    }

    // Delete the used token
    await prisma.emailVerificationToken.delete({
      where: { token },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to verify email:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
