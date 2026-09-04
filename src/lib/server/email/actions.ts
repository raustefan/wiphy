"use server";

import { AppError, executeAction } from "@/lib/server/errors";
import { directMailSchema } from "@/lib/server/validation/schemas";
import { resolveUsersByIds, sendMailToUsers } from "./mailService";
import { enforceAdminMailRateLimit } from "./rateLimitMail";
import { requireFeatureEnabled } from "@/lib/server/featureGate";

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

  const parsed = directMailSchema.safeParse(raw);
  if (!parsed.success) {
    throw new AppError(
      "VALIDATION_ERROR",
      parsed.error.issues[0]?.message ?? "Ungültige Eingaben.",
    );
  }
  return parsed.data;
}

export async function sendDirectMailAction(formData: FormData) {
  return executeAction(async () => {
    const admin = await enforceAdminMailRateLimit();
    await requireFeatureEnabled("MAIL_SERVICES");
    const { selectedUserIds, subject, message, bccToSelf } = parseDirectMailForm(formData);

    await sendMailToUsers({
      subject,
      html: message,
      bccToSelf,
      adminEmail: admin.email,
      users: await resolveUsersByIds(selectedUserIds),
    });
  });
}
