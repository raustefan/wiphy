"use server";

import { after } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { AppError, executeAction } from "@/lib/server/errors";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { extractClientIp } from "@/lib/server/rateLimit";
import { logSecurityEvent } from "@/lib/server/securityLog";
import { pruneUnverifiedRegistrations } from "@/lib/server/registrationCleanup";
import { sendEmail } from "@/lib/server/email/mailer";
import { adminRegistrationNoticeMessage, emailChangedNoticeMessage } from "@/lib/email/messages";
import { hashToken } from "@/lib/server/tokens";
import { FEATURE_FLAG_LABELS } from "@/lib/featureFlags";

/**
 * Benachrichtigt die Admins über eine neue Registrierung — bewusst erst hier
 * und nicht schon beim Absenden des Formulars.
 *
 * Ohne bestätigte Adresse ist eine Registrierung nur eine Behauptung: ein Bot,
 * der frei erfundene Adressen einträgt, würde sonst mit jedem Versuch eine Mail
 * an den gesamten Vorstand auslösen. Nach der Bestätigung steht dagegen fest,
 * dass jemand Zugriff auf das angegebene Postfach hat.
 *
 * Nur für Selbstregistrierungen: `registrationPendingSince` ist ausschließlich
 * dort gesetzt. Bestätigt jemand ein von einem Admin angelegtes Konto oder eine
 * geänderte Adresse, geht keine Mail raus.
 */
async function notifyAdminsAboutRegistration(user: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  try {
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: { email: true },
    });

    await sendEmail({
      bcc: admins.map((admin) => admin.email),
      message: adminRegistrationNoticeMessage(user),
    });
  } catch (error) {
    // Der Nutzer hat seine Adresse bestätigt — daran darf ein SMTP-Ausfall
    // nichts ändern. Das Konto steht ohnehin in der Nutzerliste im Dashboard.
    console.error("Failed to notify admins about a completed registration:", error);
  }
}

/** Löst einen Bestätigungslink ein — aus der Registrierung oder einer Adressänderung. */
export async function verifyEmail(token: string) {
  return executeAction(async () => {
    const requestHeaders = await headers();
    const clientIp = extractClientIp(requestHeaders);
    const userAgent = requestHeaders.get("user-agent");

    if (!(await isFeatureEnabled("EMAIL_VERIFICATION"))) {
      await logSecurityEvent({
        type: "EMAIL_VERIFICATION",
        outcome: "BLOCKED",
        reason: "feature_disabled",
        ip: clientIp,
        userAgent,
      });
      throw new AppError("FORBIDDEN", `${FEATURE_FLAG_LABELS.EMAIL_VERIFICATION} wurde von einem Administrator deaktiviert.`);
    }

    const tokenHash = hashToken(z.string().min(1, "Token ist erforderlich").parse(token));
    const verificationToken = await prisma.emailVerificationToken.findUnique({
      where: { token: tokenHash },
    });

    // Einlösen vor allem anderen: nur die Anfrage, die die Zeile tatsächlich
    // löscht, darf weitermachen.
    const consumed =
      verificationToken && verificationToken.expires >= new Date()
        ? (await prisma.emailVerificationToken.deleteMany({ where: { token: tokenHash } })).count === 1
        : false;

    if (!verificationToken || !consumed) {
      await logSecurityEvent({
        type: "EMAIL_VERIFICATION",
        outcome: "FAILURE",
        reason: "invalid_token",
        email: verificationToken?.email,
        ip: clientIp,
        userAgent,
      });
      throw new AppError("VALIDATION_ERROR", "Der Link ist ungültig oder abgelaufen");
    }

    if (verificationToken.userId) {
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
        throw new AppError("NOT_FOUND", "Benutzer wurde nicht gefunden");
      }

      // Ein abweichender Adresswert im Token heißt: der Link stammt aus einer
      // Adressänderung, nicht aus der Registrierung. Das steht als `reason` im
      // Protokoll, damit beide Fälle unterscheidbar bleiben.
      const isEmailChange = user.email !== verificationToken.email;

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
          throw new AppError("CONFLICT", "Diese E-Mail-Adresse wird bereits verwendet.");
        }
      }

      // `registrationPendingSince` fällt immer weg: das Konto ist ab jetzt
      // bestätigt und damit von der automatischen Löschung unbestätigter
      // Registrierungen ausgenommen.
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: verificationToken.email,
          emailVerified: true,
          registrationPendingSince: null,
          // Neue Adresse = neuer Login-Name: alle Sitzungen enden, auch die,
          // aus der die Änderung angefordert wurde.
          ...(isEmailChange && { sessionVersion: { increment: 1 } }),
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

      if (isEmailChange) {
        const oldEmail = user.email;
        after(async () => {
          try {
            await sendEmail({ to: oldEmail, message: emailChangedNoticeMessage(verificationToken.email) });
          } catch (error) {
            console.error("Failed to notify the previous address about an email change:", error);
          }
        });
      }

      if (!isEmailChange && user.registrationPendingSince) {
        await notifyAdminsAboutRegistration({
          firstName: user.firstName,
          lastName: user.lastName,
          email: verificationToken.email,
        });
      }
    } else {
      // Token ohne userId: über die Adresse zuordnen (Rückfall).
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
        throw new AppError("NOT_FOUND", "Benutzer wurde nicht gefunden");
      }

      await prisma.user.update({
        where: { email: verificationToken.email },
        data: {
          emailVerified: true,
          registrationPendingSince: null,
        },
      });

      await logSecurityEvent({
        type: "EMAIL_VERIFICATION",
        outcome: "SUCCESS",
        userId: user.id,
        ip: clientIp,
        userAgent,
      });

      if (user.registrationPendingSince) {
        await notifyAdminsAboutRegistration({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      }
    }

    // Zweiter Aufhänger für den Aufräumlauf neben der Registrierung — erst
    // hier, damit er nie das Konto löschen kann, dessen Link gerade eingelöst
    // wird.
    await pruneUnverifiedRegistrations();
  });
}
