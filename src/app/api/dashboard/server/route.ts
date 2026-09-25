import { NextResponse } from "next/server";
import { getOptionalUser } from "@/lib/server/authz";
import { getDeployStatus, getSystemStats } from "@/lib/server/serverStatus";

/**
 * Messwerte und Deploy-Stand für `/dashboard/server`.
 *
 * Bewusst eine Route statt einer Serveraktion: die Seite fragt hier alle paar
 * Sekunden nach, auch über einen Deploy hinweg. Serveraktionen bekommen mit
 * jedem Build neue IDs — nach dem Neustart liefe die Abfrage ins Leere.
 */
export async function GET() {
  const user = await getOptionalUser();
  if (user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });
  }

  const [stats, deploy] = await Promise.all([getSystemStats(), getDeployStatus()]);
  return NextResponse.json({ stats, deploy }, { headers: { "Cache-Control": "no-store" } });
}
