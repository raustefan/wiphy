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
import { sendMembershipApplicationEmail, sendMembershipStatusEmail } from "@/lib/mail";
import { membershipReceivedTemplate } from "@/lib/email/templates";
import { MEMBERSHIP_ADMIN_PATH, MEMBERSHIP_APPLICATION_PATH } from "@/lib/membership";

function absoluteUrl(path: string, host: string | null, proto: string) {
  return host ? `${proto}://${host}${path}` : path;
}

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

    const proto = requestHeaders.get("x-forwarded-proto") ?? "https";
    const host = requestHeaders.get("host");

    if (await isFeatureEnabled("MEMBERSHIP_APPLICATION_MAIL")) {
      try {
        const adminEmails = await getAdminNotificationEmails();
        await sendMembershipApplicationEmail(adminEmails, {
          vorname: parsed.data.vorname,
          name: parsed.data.name,
          email: currentUser.email ?? "",
          dashboardUrl: absoluteUrl(MEMBERSHIP_ADMIN_PATH, host, proto),
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
        await sendMembershipStatusEmail(
          currentUser.email,
          membershipReceivedTemplate({ vorname: parsed.data.vorname, name: parsed.data.name }),
        );
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
