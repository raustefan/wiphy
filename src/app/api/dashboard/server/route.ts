import { NextResponse } from "next/server";
import { getOptionalUser, isDebugMode } from "@/lib/server/authz";
import { getAppLogs, getDeployStatus, getSystemStats } from "@/lib/server/serverStatus";

/**
 * Messwerte, Deploy-Stand und PM2-Logs für `/dashboard/server`.
 *
 * Bewusst eine Route statt einer Serveraktion: die Seite fragt hier alle paar
 * Sekunden nach, auch über einen Deploy hinweg. Serveraktionen bekommen mit
 * jedem Build neue IDs — nach dem Neustart liefe die Abfrage ins Leere.
 */
export async function GET() {
  const user = await getOptionalUser();
  if (user?.role !== "ADMIN" || !(await isDebugMode())) {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });
  }

  const [stats, deploy, logs] = await Promise.all([getSystemStats(), getDeployStatus(), getAppLogs()]);
  return NextResponse.json({ stats, deploy, logs }, { headers: { "Cache-Control": "no-store" } });
}
