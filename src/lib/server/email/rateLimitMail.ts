import { headers } from "next/headers";
import { requireAdmin } from "@/lib/server/authz";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";

export async function enforceAdminMailRateLimit() {
  const admin = await requireAdmin();
  const requestHeaders = await headers();

  await consumeRateLimit({
    bucket: "admin-mail",
    keyParts: [admin.id, extractClientIp(requestHeaders)],
    limit: 50,
    windowMs: 10 * 60 * 1000,
    blockMs: 10 * 60 * 1000,
    message: "Zu viele E-Mails in kurzer Zeit. Bitte warte 10 Minuten und versuche es erneut.",
  });

  return admin;
}
