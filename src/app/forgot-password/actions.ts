"use server";

import { after } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createPasswordResetUrl } from "@/lib/server/services/userService";
import { sendEmail } from "@/lib/server/email/mailer";
import { passwordResetMessage } from "@/lib/email/messages";
import { AppError, executeAction } from "@/lib/server/errors";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { normalizeEmail } from "@/lib/server/normalizeEmail";
import { logSecurityEvent } from "@/lib/server/securityLog";
import { pruneUnverifiedRegistrations } from "@/lib/server/registrationCleanup";
import { FEATURE_FLAG_LABELS } from "@/lib/featureFlags";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { forgotPasswordSchema } from "@/lib/server/validation/schemas";

/**
 * Schickt einen Link zum Zurücksetzen des Passworts. Meldet immer Erfolg
 * (außer bei Sperre durch Feature-Flag oder Rate Limit), damit sich nicht
 * erfragen lässt, welche Adressen ein Konto haben.
 */
export async function requestPasswordReset(formData: FormData) {
  return executeAction(async () => {
    const requestHeaders = await headers();
    const clientIp = extractClientIp(requestHeaders);
    const userAgent = requestHeaders.get("user-agent");

    if (!(await isFeatureEnabled("PASSWORD_RESET"))) {
      await logSecurityEvent({
        type: "PASSWORD_RESET_REQUEST",
        outcome: "BLOCKED",
        reason: "feature_disabled",
        ip: clientIp,
        userAgent,
      });
      throw new AppError("FORBIDDEN", `${FEATURE_FLAG_LABELS.PASSWORD_RESET} wurde von einem Administrator deaktiviert.`);
    }

    const { email, website } = parseFormData(forgotPasswordSchema, formData);
    const trimmedEmail = normalizeEmail(email);

    // Honeypot vor den Rate Limits, wie bei Kontakt und Registrierung: kostet
    // nichts, und der Bot bekommt denselben Erfolg wie alle anderen.
    if (website && website.trim() !== "") {
      await logSecurityEvent({
        type: "PASSWORD_RESET_REQUEST",
        outcome: "BLOCKED",
        reason: "honeypot",
        email: trimmedEmail,
        ip: clientIp,
        userAgent,
      });
      return;
    }

    try {
      // Per-IP cap first: stops one IP from requesting resets for many different
      // emails (mass email-bombing), which the per-(IP, email) bucket can't catch.
      await consumeRateLimit("forgot-password-ip", [clientIp]);
      await consumeRateLimit("forgot-password", [clientIp, trimmedEmail]);
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
      }
      throw error;
    }

    const user = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });

    // Gesperrter Login: nach außen wie eine unbekannte Adresse, sonst ließe
    // sich die Sperre über „Passwort vergessen“ erfragen. Der Link hülfe ohnehin
    // nicht — der Login bleibt gesperrt.
    if (user?.loginDisabled) {
      await logSecurityEvent({
        type: "PASSWORD_RESET_REQUEST",
        outcome: "BLOCKED",
        reason: "account_disabled",
        userId: user.id,
        ip: clientIp,
        userAgent,
      });
      return;
    }

    // Kein Konto: nach außen trotzdem Erfolg (keine Enumeration). Im Protokoll
    // steht der echte Ausgang: eine Serie von Anfragen für Adressen ohne Konto
    // ist genau das Muster, das man sehen will.
    if (!user) {
      await logSecurityEvent({
        type: "PASSWORD_RESET_REQUEST",
        outcome: "FAILURE",
        reason: "unknown_email",
        email: trimmedEmail,
        ip: clientIp,
        userAgent,
      });
      return;
    }

    const resetUrl = await createPasswordResetUrl(trimmedEmail);

    // Versand erst nach der Antwort: sonst wartet nur die Anfrage für ein
    // existierendes Konto auf den SMTP-Server, und die Antwortzeit verrät,
    // welche Adressen registriert sind.
    after(async () => {
      // Räumt nebenbei abgelaufene Reset-Tokens weg (gedrosselt).
      await pruneUnverifiedRegistrations();
      try {
        await sendEmail({
          to: trimmedEmail,
          message: passwordResetMessage(resetUrl),
        });
      } catch (error) {
        // Der Vorgang gilt erst als erfolgreich, wenn die Mail draußen ist —
        // sonst zählt das Protokoll versendete Links, die es nie gab.
        console.error("Failed to send password reset email:", error);
        await logSecurityEvent({
          type: "PASSWORD_RESET_REQUEST",
          outcome: "FAILURE",
          reason: "mail_failed",
          userId: user.id,
          ip: clientIp,
          userAgent,
        });
        return;
      }

      await logSecurityEvent({
        type: "PASSWORD_RESET_REQUEST",
        outcome: "SUCCESS",
        userId: user.id,
        ip: clientIp,
        userAgent,
      });
    });
  });
}
