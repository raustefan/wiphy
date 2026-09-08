import { NextResponse } from "next/server";
import { buildEventIcs, icsFileName } from "@/lib/server/ics";
import { getPublicEvent } from "@/lib/server/services/eventService";

/**
 * Kalenderdatei eines einzelnen Termins.
 *
 * Der Pfad endet auf `.ics`, weil ein Teil der Kalender-Apps — allen voran
 * Outlook — die Datei am Namen erkennt und nicht am `Content-Type`. Nur
 * veröffentlichte Termine: ein Entwurf wäre sonst über die geratene Adresse
 * lesbar, obwohl die Terminseite 404 liefert.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const event = await getPublicEvent(id);

  if (!event) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(buildEventIcs(event), {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${icsFileName(event.title)}"`,
      // Termine werden bis zuletzt verschoben — eine zwischengespeicherte
      // Datei würde die Verlegung im Kalender des Mitglieds nicht mehr
      // erreichen.
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
