import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isDebugMode } from "@/lib/server/authz";
import { getAppLogs } from "@/lib/server/serverStatus";

/**
 * PM2-Logs für die Konsole der Debug-Leiste. `auth()` statt
 * `getOptionalUser()`: auch in der Mitgliederansicht soll sie weiterlaufen.
 */
export async function GET() {
  const user = (await auth())?.user as { role?: string } | undefined;
  if (user?.role !== "ADMIN" || !(await isDebugMode())) {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });
  }
  return NextResponse.json(await getAppLogs(), { headers: { "Cache-Control": "no-store" } });
}
