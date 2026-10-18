import { headers } from "next/headers";
import { requireAdmin } from "@/lib/server/authz";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";

export async function enforceAdminMailRateLimit() {
  const admin = await requireAdmin();
  const requestHeaders = await headers();

  await consumeRateLimit("admin-mail", [admin.id, extractClientIp(requestHeaders)]);

  return admin;
}
