import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/server/email/mailer";
import { passwordResetMessage } from "@/lib/email/messages";
import { siteUrl } from "@/lib/server/siteUrl";
import { AppError } from "@/lib/server/errors";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { normalizeEmail } from "@/lib/server/normalizeEmail";
import { logSecurityEvent } from "@/lib/server/securityLog";

export async function POST(request: Request) {
  try {
    const clientIp = extractClientIp(request.headers);
    const userAgent = request.headers.get("user-agent");

    if (!(await isFeatureEnabled("PASSWORD_RESET"))) {
      await logSecurityEvent({
        type: "PASSWORD_RESET_REQUEST",
        outcome: "BLOCKED",
        reason: "feature_disabled",
        ip: clientIp,
        userAgent,
      });
      return NextResponse.json(
        { error: "Passwort zurücksetzen wurde von einem Administrator deaktiviert.", code: "FEATURE_DISABLED" },
        { status: 403 },
      );
    }

    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "E-Mail ist erforderlich" }, { status: 400 });
    }

    const trimmedEmail = normalizeEmail(email);

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
        await logSecurityEvent({
          type: "PASSWORD_RESET_REQUEST",
          outcome: "BLOCKED",
          reason: "rate_limited",
          email: trimmedEmail,
          ip: clientIp,
          userAgent,
        });
        return NextResponse.json({ error: error.message }, { status: 429 });
      }
      throw error;
    }

    // Look up user by email
    const user = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });

    // If no user found, still return { success: true } (no enumeration).
    // Im Protokoll steht der echte Ausgang: eine Serie von Anfragen für
    // Adressen ohne Konto ist genau das Muster, das man sehen will.
    if (!user) {
      await logSecurityEvent({
        type: "PASSWORD_RESET_REQUEST",
        outcome: "FAILURE",
        reason: "unknown_email",
        email: trimmedEmail,
        ip: clientIp,
        userAgent,
      });
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

    try {
      await sendEmail({
        to: trimmedEmail,
        message: passwordResetMessage(siteUrl(`/reset-password?token=${token}`)),
      });
    } catch (error) {
      // Der Vorgang gilt erst als erfolgreich, wenn die Mail draußen ist —
      // sonst zählt das Protokoll versendete Links, die es nie gab.
      await logSecurityEvent({
        type: "PASSWORD_RESET_REQUEST",
        outcome: "FAILURE",
        reason: "mail_failed",
        userId: user.id,
        ip: clientIp,
        userAgent,
      });
      throw error;
    }

    await logSecurityEvent({
      type: "PASSWORD_RESET_REQUEST",
      outcome: "SUCCESS",
      userId: user.id,
      ip: clientIp,
      userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to request password reset:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
