import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "E-Mail ist erforderlich" }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

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
