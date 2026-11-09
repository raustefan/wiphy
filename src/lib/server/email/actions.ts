"use server";

import { executeAction } from "@/lib/server/errors";
import { directMailSchema } from "@/lib/server/validation/schemas";
import { renderMailPreview, resolveUsersByIds, sendMailToUsers } from "./mailService";
import { enforceAdminMailRateLimit } from "./rateLimitMail";
import { requireFeatureEnabled } from "@/lib/server/featureGate";
import { requireAdmin } from "@/lib/server/authz";
import { getAnnouncedEvent } from "@/lib/server/services/eventService";

function parseDirectMailForm(formData: FormData) {
  const selectedUserIds = [
    ...new Set(
      formData
        .getAll("selectedUserIds")
        .filter((v): v is string => typeof v === "string" && v.length > 0),
    ),
  ];

  const raw = {
    selectedUserIds,
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
    bccToSelf: formData.get("bccToSelf") === "on",
  };

  // Ein ZodError wird in `executeAction` zur ersten Zod-Meldung.
  return directMailSchema.parse(raw);
}

export async function sendDirectMailAction(formData: FormData) {
  return executeAction(async () => {
    const admin = await enforceAdminMailRateLimit();
    await requireFeatureEnabled("MAIL_SERVICES");
    const { selectedUserIds, subject, message, bccToSelf } = parseDirectMailForm(formData);

    return sendMailToUsers({
      subject,
      html: message,
      bccToSelf,
      adminEmail: admin.email,
      users: await resolveUsersByIds(selectedUserIds),
    });
  });
}

/**
 * Vorschau für Rundmail und Direktmail. Verschickt nichts und prüft deshalb
 * nur die Länge — ein halb ausgefülltes Formular soll sich ansehen lassen.
 */
export async function previewMailAction(formData: FormData) {
  return executeAction(async () => {
    await requireAdmin();
    const eventId = String(formData.get("eventId") ?? "");

    return renderMailPreview({
      subject: String(formData.get("subject") ?? "").slice(0, 200),
      html: String(formData.get("message") ?? "").slice(0, 100_000),
      event: eventId ? await getAnnouncedEvent(eventId) : undefined,
      newsletter: formData.get("newsletter") === "yes",
    });
  });
}
