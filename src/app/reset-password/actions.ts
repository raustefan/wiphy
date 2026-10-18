"use server";

import { after } from "next/server";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { AppError, executeAction } from "@/lib/server/errors";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { logSecurityEvent } from "@/lib/server/securityLog";
import { hashToken } from "@/lib/server/tokens";
import { sendEmail } from "@/lib/server/email/mailer";
import { passwordChangedNoticeMessage } from "@/lib/email/messages";
import { FEATURE_FLAG_LABELS } from "@/lib/featureFlags";
import { PASSWORD_MIN_LENGTH } from "@/lib/passwordStrength";

const resetSchema = z.object({
  token: z.string().min(1, "Token ist erforderlich"),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Das Passwort muss mindestens ${PASSWORD_MIN_LENGTH} Zeichen lang sein`)
    .max(128, "Passwort ist zu lang."),
});

/** Löst einen Link aus „Passwort vergessen“ ein und setzt das neue Passwort. */
export async function resetPassword(token: string, password: string) {
  return executeAction(async () => {
    const requestHeaders = await headers();
    const clientIp = extractClientIp(requestHeaders);
    const userAgent = requestHeaders.get("user-agent");

    if (!(await isFeatureEnabled("PASSWORD_RESET"))) {
      await logSecurityEvent({
        type: "PASSWORD_RESET_COMPLETE",
        outcome: "BLOCKED",
        reason: "feature_disabled",
        ip: clientIp,
        userAgent,
      });
      throw new AppError("FORBIDDEN", `${FEATURE_FLAG_LABELS.PASSWORD_RESET} wurde von einem Administrator deaktiviert.`);
    }

    const input = resetSchema.parse({ token, password });

    // The token itself is unguessable (32 random bytes); this cap is just a
    // brake against scripted abuse/DoS of this endpoint from one IP.
    try {
      await consumeRateLimit("reset-password-ip", [clientIp]);
    } catch (error) {
      if (error instanceof AppError && error.code === "TOO_MANY_REQUESTS") {
        await logSecurityEvent({
          type: "PASSWORD_RESET_COMPLETE",
          outcome: "BLOCKED",
          reason: "rate_limited",
          ip: clientIp,
          userAgent,
        });
      }
      throw error;
    }

    const tokenHash = hashToken(input.token);
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: tokenHash },
    });

    // Der Token selbst wird nie protokolliert — er wäre bis zum Ablauf ein
    // gültiger Kontozugang. Einlösen *vor* dem Passwortwechsel und nur weiter,
    // wenn genau diese Anfrage die Zeile gelöscht hat — sonst setzen zwei
    // parallele Anfragen mit demselben Link beide ein Passwort.
    const consumed =
      resetToken && resetToken.expires >= new Date()
        ? (await prisma.passwordResetToken.deleteMany({ where: { token: tokenHash } })).count === 1
        : false;

    if (!resetToken || !consumed) {
      await logSecurityEvent({
        type: "PASSWORD_RESET_COMPLETE",
        outcome: "FAILURE",
        reason: "invalid_token",
        email: resetToken?.email,
        ip: clientIp,
        userAgent,
      });
      throw new AppError("VALIDATION_ERROR", "Der Link ist ungültig oder abgelaufen");
    }

    const hashedPassword = await bcrypt.hash(input.password, 12);

    // Bumping passwordChangedAt invalidates any session/JWT issued before this reset.
    // Clicking a link that was mailed to this address proves the user controls
    // it, so mark it verified too — otherwise someone who never confirmed their
    // address resets their password and is still locked out at login with no
    // way to tell why.
    const updatedUser = await prisma.user.update({
      where: { email: resetToken.email },
      data: {
        password: hashedPassword,
        passwordChangedAt: new Date(),
        emailVerified: true,
      },
      select: { id: true },
    });

    await logSecurityEvent({
      type: "PASSWORD_RESET_COMPLETE",
      outcome: "SUCCESS",
      userId: updatedUser.id,
      ip: clientIp,
      userAgent,
    });

    // Any outstanding confirmation link is redundant now — including a pending
    // email change, which may have been started by whoever the reset locks out.
    await prisma.emailVerificationToken.deleteMany({
      where: { OR: [{ email: resetToken.email }, { userId: updatedUser.id }] },
    });

    after(async () => {
      try {
        await sendEmail({ to: resetToken.email, message: passwordChangedNoticeMessage() });
      } catch (error) {
        console.error("Failed to send password changed notice:", error);
      }
    });
  });
}
