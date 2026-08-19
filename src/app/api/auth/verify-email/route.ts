import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";

export async function POST(request: Request) {
  try {
    if (!(await isFeatureEnabled("EMAIL_VERIFICATION"))) {
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
        return NextResponse.json(
          { error: "Benutzer wurde nicht gefunden" },
          { status: 404 }
        );
      }

      // Check if the new email is already taken by another user (only relevant if email is actually changing)
      if (user.email !== verificationToken.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: verificationToken.email },
        });
        if (existingUser) {
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
    } else {
      // If no userId, but email is present, search by email (fallback)
      const user = await prisma.user.findUnique({
        where: { email: verificationToken.email },
      });

      if (!user) {
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
