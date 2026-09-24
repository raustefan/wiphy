"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { requireUser } from "@/lib/server/authz";
import { AppError, executeAction } from "@/lib/server/errors";
import { requireFeatureEnabled } from "@/lib/server/featureGate";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";
import { hashIp } from "@/lib/server/contactSpam";
import { getAdminNotificationEmails } from "@/lib/server/services/contactService";
import {
  markApplicationMailed,
  submitApplication,
  withdrawApplication,
} from "@/lib/server/services/membershipService";
import {
  applicationIdSchema,
  membershipApplicationSchema,
} from "@/lib/server/validation/membershipSchemas";
import { sendEmail } from "@/lib/server/email/mailer";
import {
  membershipApplicationNoticeMessage,
  membershipReceivedMessage,
} from "@/lib/email/messages";
import { MEMBERSHIP_ADMIN_PATH, MEMBERSHIP_APPLICATION_PATH } from "@/lib/membership";
import { siteUrl } from "@/lib/server/siteUrl";

/**
 * Nimmt den Aufnahmeantrag entgegen.
 *
 * Der Antrag wird zuerst gespeichert und erst danach gemailt: fällt SMTP aus,
 * geht der Antrag trotzdem nicht verloren (gleiches Vorgehen wie beim
 * Kontaktformular).
 */
export async function submitMembershipApplication(formData: FormData) {
  return executeAction(async () => {
    const currentUser = await requireUser();
    await requireFeatureEnabled("MEMBERSHIP_APPLICATION");

    await consumeRateLimit({
      bucket: "membership-application",
      keyParts: [currentUser.id],
      limit: 5,
      windowMs: 24 * 60 * 60 * 1000,
      blockMs: 24 * 60 * 60 * 1000,
      message: "Zu viele Versuche. Bitte versuche es morgen erneut oder wende dich an den Vorstand.",
    });

    // `studentYears` kommt als Mehrfachwert und passt deshalb nicht durch
    // `parseFormData`, das pro Schlüssel nur einen String übernimmt.
    const raw: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && key !== "studentYears") raw[key] = value;
    }
    raw.studentYears = formData.getAll("studentYears").filter((v) => typeof v === "string");

    const parsed = membershipApplicationSchema.safeParse(raw);
    if (!parsed.success) {
      throw new AppError(
        "VALIDATION_ERROR",
        parsed.error.issues[0]?.message ?? "Validierung fehlgeschlagen.",
      );
    }

    const requestHeaders = await headers();
    const clientIp = extractClientIp(requestHeaders);

    const application = await submitApplication(parsed.data, {
      userId: currentUser.id,
      ipHash: clientIp === "unknown" ? null : hashIp(clientIp),
      userAgent: requestHeaders.get("user-agent")?.slice(0, 500) ?? null,
    });

    if (await isFeatureEnabled("MEMBERSHIP_APPLICATION_MAIL")) {
      try {
        const adminEmails = await getAdminNotificationEmails();
        await sendEmail({
          // BCC hält die Admin-Verteilerliste aus den sichtbaren Headern heraus.
          bcc: adminEmails,
          message: membershipApplicationNoticeMessage({
            vorname: parsed.data.vorname,
            name: parsed.data.name,
            email: currentUser.email ?? "",
            // Nie aus dem Host-Header: der ist vom Client steuerbar (Phishing-Link an Admins).
            dashboardUrl: siteUrl(MEMBERSHIP_ADMIN_PATH),
          }),
        });
        await markApplicationMailed(application.id);
      } catch (error) {
        // Der Antrag liegt bereits in der Datenbank — ein Mailfehler darf dem
        // Antragsteller nicht als gescheiterte Einreichung angezeigt werden.
        console.error("Failed to send membership application notification:", error);
      }
    }

    if (currentUser.email && (await isFeatureEnabled("MEMBERSHIP_APPLICATION_CONFIRMATION_MAIL"))) {
      try {
        await sendEmail({
          to: currentUser.email,
          message: membershipReceivedMessage({
            vorname: parsed.data.vorname,
            name: parsed.data.name,
          }),
        });
      } catch (error) {
        console.error("Failed to send membership confirmation mail:", error);
      }
    }

    revalidatePath(MEMBERSHIP_APPLICATION_PATH);
    revalidatePath("/dashboard");
    return { applicationId: application.id };
  });
}

export async function withdrawMembershipApplication(formData: FormData) {
  return executeAction(async () => {
    const currentUser = await requireUser();

    const parsed = applicationIdSchema.safeParse({ id: formData.get("id") });
    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Ungültiger Antrag.");
    }

    await withdrawApplication(parsed.data.id, currentUser.id);
    revalidatePath(MEMBERSHIP_APPLICATION_PATH);
    revalidatePath("/dashboard");
  });
}
