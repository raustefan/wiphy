import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/mail";
import { AppError } from "@/lib/server/errors";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "E-Mail ist erforderlich" }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const clientIp = extractClientIp(request.headers);

    try {
      // Per-IP cap first: stops one IP from requesting resets for many different
      // emails (mass email-bombing), which the per-(IP, email) bucket can't catch.
      await consumeRateLimit({
        bucket: "forgot-password-ip",
        keyParts: [clientIp],
        limit: 20,
        windowMs: 15 * 60 * 1000,
        blockMs: 15 * 60 * 1000,
        message: "Zu viele Anfragen. Bitte versuche es später erneut.",
      });
      await consumeRateLimit({
        bucket: "forgot-password",
        keyParts: [clientIp, trimmedEmail],
        limit: 5,
        windowMs: 15 * 60 * 1000,
        blockMs: 15 * 60 * 1000,
        message: "Zu viele Anfragen für diese E-Mail-Adresse. Bitte versuche es später erneut.",
      });
    } catch (error) {
      if (error instanceof AppError && error.code === "TOO_MANY_REQUESTS") {
        return NextResponse.json({ error: error.message }, { status: 429 });
      }
      throw error;
    }

    // Look up user by email
    const user = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });

    // If no user found, still return { success: true } (no enumeration)
    if (!user) {
      return NextResponse.json({ success: true });
    }

    // Generate secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Delete existing PasswordResetToken rows for that email
    await prisma.passwordResetToken.deleteMany({
      where: { email: trimmedEmail },
    });

    // Create a new one with expires = now + 30 minutes
    const expires = new Date(Date.now() + 30 * 60 * 1000);
    await prisma.passwordResetToken.create({
      data: {
        email: trimmedEmail,
        token,
        expires,
      },
    });

    // Build resetUrl
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    // Call sendPasswordResetEmail
    await sendPasswordResetEmail(trimmedEmail, resetUrl);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to request password reset:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
