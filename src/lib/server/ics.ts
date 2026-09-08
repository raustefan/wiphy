/**
 * Kalenderdateien (`.ics`, RFC 5545) für die Vereinstermine.
 *
 * Selbst gebaut statt als Abhängigkeit: das Format ist für den Umfang hier —
 * ein VEVENT ohne Wiederholungen, ohne Teilnehmer, ohne Alarme — kurz genug,
 * und die drei Fallstricke (Zeilen falten, Sonderzeichen maskieren, Zeitzone)
 * muss man auch beim Konfigurieren einer Bibliothek verstehen.
 *
 * Zeitangaben gehen als UTC (`…Z`) raus. Die Alternative wäre `TZID=Europe/Berlin`
 * — dann müsste die Datei aber einen vollständigen VTIMEZONE-Block mit beiden
 * Umstellungsregeln mitliefern, damit ältere Clients sie richtig lesen. UTC
 * kennt jeder Client, und die Umrechnung in die Ortszeit des Betrachters ist
 * genau das, was ein Kalender ohnehin tut.
 */
import { icsEnd, type EventTiming } from "@/lib/events";
import { berlinParts } from "@/lib/berlinTime";
import { VEREIN } from "@/lib/email/branding";
import { siteUrl } from "@/lib/server/siteUrl";

export type IcsEvent = EventTiming & {
  id: string;
  title: string;
  summary: string;
  description: string;
  location: string;
  address: string;
  onlineUrl: string;
  updatedAt: Date;
};

const PRODID = `-//${VEREIN.name}//Termine//DE`;

/** Text-Werte: Backslash, Semikolon, Komma und Zeilenumbrüche maskieren. */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|\r|\n/g, "\\n");
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/** `20260314T180000Z` */
function utcStamp(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

/** `20260314` — der deutsche Kalendertag, auf den der Zeitpunkt fällt. */
function berlinDateStamp(date: Date): string {
  const { year, month, day } = berlinParts(date);
  return `${year}${pad(month)}${pad(day)}`;
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86_400_000);
}

/**
 * Faltet eine Zeile auf 75 Oktett.
 *
 * Gezählt werden Bytes, nicht Zeichen: ein Umlaut belegt in UTF-8 zwei, und ein
 * Schnitt mitten in seiner Bytefolge macht die Datei kaputt. Fortsetzungszeilen
 * beginnen mit einem Leerzeichen.
 */
function foldLine(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const parts: string[] = [];
  let current = "";
  let currentBytes = 0;
  // Fortsetzungszeilen haben ein Byte weniger Platz (führendes Leerzeichen).
  let limit = 75;

  for (const char of line) {
    const size = encoder.encode(char).length;
    if (currentBytes + size > limit) {
      parts.push(current);
      current = "";
      currentBytes = 0;
      limit = 74;
    }
    current += char;
    currentBytes += size;
  }
  if (current.length > 0) parts.push(current);

  return parts.join("\r\n ");
}

function line(name: string, value: string): string {
  return foldLine(`${name}:${value}`);
}

/**
 * Beschreibungstext des Kalendereintrags: Kurzfassung, Online-Link und die
 * Adresse der Terminseite. Die vollständige Markdown-Beschreibung bleibt auf
 * der Website — im Kalender wäre sie eine Wand aus Rohtext.
 */
function describe(event: IcsEvent): string {
  const parts = [event.summary.trim()];
  if (event.onlineUrl.trim()) parts.push(`Online: ${event.onlineUrl.trim()}`);
  parts.push(`Alle Infos: ${siteUrl(`/termine/${event.id}`)}`);
  return parts.filter(Boolean).join("\n\n");
}

function locationLine(event: IcsEvent): string {
  return [event.location.trim(), event.address.trim()].filter(Boolean).join(", ");
}

function vevent(event: IcsEvent, stamp: Date): string[] {
  const end = icsEnd(event);

  const timing = event.allDay
    ? [
        // DTEND ist bei Ganztagesterminen exklusiv: ein eintägiger Termin endet
        // am Folgetag, sonst zeigen Kalender ihn gar nicht an.
        `DTSTART;VALUE=DATE:${berlinDateStamp(event.start)}`,
        `DTEND;VALUE=DATE:${berlinDateStamp(addDays(end, 1))}`,
      ]
    : [`DTSTART:${utcStamp(event.start)}`, `DTEND:${utcStamp(end)}`];

  const location = locationLine(event);

  return [
    "BEGIN:VEVENT",
    line("UID", `termin-${event.id}@wirtschaftsphysik.de`),
    line("DTSTAMP", utcStamp(stamp)),
    ...timing,
    line("SUMMARY", escapeText(event.title)),
    line("DESCRIPTION", escapeText(describe(event))),
    ...(location ? [line("LOCATION", escapeText(location))] : []),
    line("URL", siteUrl(`/termine/${event.id}`)),
    line("LAST-MODIFIED", utcStamp(event.updatedAt)),
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "END:VEVENT",
  ];
}

function calendar(events: IcsEvent[], calendarName: string, stamp: Date): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    line("PRODID", PRODID),
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    line("X-WR-CALNAME", escapeText(calendarName)),
    "X-WR-TIMEZONE:Europe/Berlin",
    ...events.flatMap((event) => vevent(event, stamp)),
    "END:VCALENDAR",
  ];
  // Abschließendes CRLF: manche Parser verschlucken sonst die letzte Zeile.
  return `${lines.join("\r\n")}\r\n`;
}

export function buildEventIcs(event: IcsEvent, now: Date = new Date()): string {
  return calendar([event], event.title, now);
}

export function buildCalendarIcs(events: IcsEvent[], now: Date = new Date()): string {
  return calendar(events, `${VEREIN.name} — Termine`, now);
}

/** Dateiname für den Download: `termin-sommerfest-2026.ics`. */
export function icsFileName(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `termin-${slug || "wirtschaftsphysik"}.ics`;
}
