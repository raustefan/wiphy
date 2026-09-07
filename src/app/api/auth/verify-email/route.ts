import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { extractClientIp } from "@/lib/server/rateLimit";
import { logSecurityEvent } from "@/lib/server/securityLog";
import { pruneUnverifiedRegistrations } from "@/lib/server/registrationCleanup";
import { sendEmail } from "@/lib/server/email/mailer";
import { adminRegistrationNoticeMessage } from "@/lib/email/messages";

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
  vorname: string;
  name: string;
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

      // Update the user. `registrationPendingSince` fällt dabei immer weg: das
      // Konto ist ab jetzt bestätigt und damit von der automatischen Löschung
      // unbestätigter Registrierungen ausgenommen.
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: verificationToken.email,
          emailVerified: true,
          registrationPendingSince: null,
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

      if (!isEmailChange && user.registrationPendingSince) {
        await notifyAdminsAboutRegistration({
          vorname: user.vorname,
          name: user.name,
          email: verificationToken.email,
        });
      }
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
          vorname: user.vorname,
          name: user.name,
          email: user.email,
        });
      }
    }

    // Delete the used token
    await prisma.emailVerificationToken.delete({
      where: { token },
    });

    // Zweiter Aufhänger für den Aufräumlauf neben der Registrierung — erst
    // hier, damit er nie das Konto löschen kann, dessen Link gerade eingelöst
    // wird.
    await pruneUnverifiedRegistrations();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to verify email:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
