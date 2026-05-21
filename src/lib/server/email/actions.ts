"use server";

import { AppError, executeAction } from "@/lib/server/errors";
import { directMailSchema } from "@/lib/server/validation/schemas";
import { resolveUsersByIds, sendMailToUsers } from "./mailService";
import { enforceAdminMailRateLimit } from "./rateLimitMail";

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
    const { selectedUserIds, subject, message, bccToSelf } = parseDirectMailForm(formData);

    const users = await resolveUsersByIds(selectedUserIds);
    await sendMailToUsers({
      recipientEmails: users.map((u) => u.email),
      subject,
      message,
      bccToSelf,
      adminEmail: admin.email,
    });
  });
}
