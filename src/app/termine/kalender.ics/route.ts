import { NextResponse } from "next/server";
import { buildCalendarIcs } from "@/lib/server/ics";
import { getUpcomingEvents } from "@/lib/server/services/eventService";

/**
 * Alle kommenden Termine in einer Datei — für alle, die nicht jeden Termin
 * einzeln übernehmen wollen.
 *
 * Bewusst nur die kommenden: vergangene Termine würden den Kalender rückwirkend
 * mit Einträgen füllen, die niemand mehr braucht.
 */
export async function GET() {
  const events = await getUpcomingEvents();

  return new NextResponse(buildCalendarIcs(events), {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="wirtschaftsphysik-termine.ics"',
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
