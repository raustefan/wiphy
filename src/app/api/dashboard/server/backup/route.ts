import { NextResponse, type NextRequest } from "next/server";
import { getOptionalUser } from "@/lib/server/authz";
import { getDatabaseUrl } from "@/lib/server/env";
import { AppError } from "@/lib/server/errors";
import { dumpDatabase } from "@/lib/server/serverStatus";
import { consumeBackupToken } from "@/lib/server/services/backupService";

function message(text: string, status: number) {
  return new NextResponse(text, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

/**
 * Ziel des Einmal-Links aus der Backup-Mail (angefordert in `/dashboard/server`).
 *
 * Der Link allein reicht nicht: angemeldet sein muss genau der Admin, der ihn
 * angefordert hat. Das hält auch Link-Scanner der Mailprogramme ab, die jeden
 * Link vorab öffnen — sie haben keine Sitzung und verbrauchen den Link nicht.
 * Kein Debug-Modus nötig, das Debug-Cookie überlebt den Browser nicht.
 * Bewusst ohne Eintrag im Sicherheitsprotokoll.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const user = await getOptionalUser();
  // Kein Umweg über `/login?next=…`: das Login navigiert per `router.push`,
  // der Router ruft die Adresse erst im Hintergrund ab und dann noch einmal
  // richtig — der erste Abruf verbrauchte den Link.
  if (!user) {
    return message("Bitte melde dich zuerst an und öffne den Link aus der E-Mail danach erneut.", 401);
  }
  if (user.role !== "ADMIN") return message("Keine Berechtigung.", 403);

  if (!token || !(await consumeBackupToken(user.id, token))) {
    return message(
      "Dieser Backup-Link ist ungültig, abgelaufen, schon benutzt oder gehört zu einem anderen Konto.\n\nFordere unter /dashboard/server einen neuen an.",
      410,
    );
  }

  try {
    const dump = await dumpDatabase(getDatabaseUrl());
    const stamp = new Date().toISOString().slice(0, 16).replace(/[T:]/g, "-");
    return new NextResponse(new Uint8Array(dump), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="wiphy-backup-${stamp}.dump"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    if (!(error instanceof AppError)) throw error;
    return message(`${error.message}\n\nDer Link ist verbraucht — bitte einen neuen anfordern.`, 500);
  }
}
