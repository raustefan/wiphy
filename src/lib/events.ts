/**
 * Terminlogik, die Server *und* Browser brauchen: wann ein Termin vorbei ist
 * und wie sein Zeitraum auf Deutsch heißt.
 *
 * Frei von Server-Imports — dieselbe Funktion beschriftet die Karte auf der
 * Startseite, die Zeile im Dashboard und die Ankündigungsmail.
 */
import { berlinParts, endOfBerlinDay, isSameBerlinDay, TIME_ZONE } from "@/lib/berlinTime";

/** Ab wann im Dashboard auf einen Termin hingewiesen wird. */
export const UPCOMING_ALERT_MONTHS = 3;

/**
 * Dauer, die eine Kalenderdatei für einen Termin ohne Ende ansetzt.
 *
 * Nicht dasselbe wie `eventEnd()`: für die Frage „ist der Termin vorbei?“ zählt
 * der ganze Tag (siehe dort), aber ein Stammtisch, der im Kalender bis
 * Mitternacht blockt, wäre falsch.
 */
export const DEFAULT_DURATION_MINUTES = 120;

export type EventTiming = {
  start: Date;
  end: Date | null;
  allDay: boolean;
};

/**
 * Zeitpunkt, ab dem ein Termin als vergangen gilt.
 *
 * Ohne ausdrückliches Ende ist das das Ende des Starttags: ein Stammtisch um
 * 19 Uhr soll nicht um 19:01 aus den kommenden Terminen verschwinden. Bei
 * ganztägigen Terminen bezeichnet `end` den *letzten* Tag, zählt also
 * vollständig mit.
 */
export function eventEnd(event: EventTiming): Date {
  if (event.allDay) {
    return endOfBerlinDay(event.end ?? event.start);
  }
  return event.end ?? endOfBerlinDay(event.start);
}

export function isPastEvent(event: EventTiming, now: Date = new Date()): boolean {
  return eventEnd(event).getTime() < now.getTime();
}

/** Ende der Kalendereintragung — hier zählt die tatsächliche Dauer. */
export function icsEnd(event: EventTiming): Date {
  if (event.end) return event.end;
  if (event.allDay) return event.start;
  return new Date(event.start.getTime() + DEFAULT_DURATION_MINUTES * 60_000);
}

// ─────────────────────────── Beschriftung ───────────────────────────

const WEEKDAY_LONG = new Intl.DateTimeFormat("de-DE", { weekday: "long", timeZone: TIME_ZONE });
const WEEKDAY_SHORT = new Intl.DateTimeFormat("de-DE", { weekday: "short", timeZone: TIME_ZONE });
const MONTH_SHORT = new Intl.DateTimeFormat("de-DE", { month: "short", timeZone: TIME_ZONE });
const DAY_MONTH_YEAR = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: TIME_ZONE,
});
const DAY_MONTH = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  timeZone: TIME_ZONE,
});
const TIME = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIME_ZONE,
});

/** `Samstag, 14. März 2026` */
export function formatEventDay(date: Date): string {
  return `${WEEKDAY_LONG.format(date)}, ${DAY_MONTH_YEAR.format(date)}`;
}

/** `19:00` */
export function formatEventTime(date: Date): string {
  return TIME.format(date);
}

/**
 * Der ganze Zeitraum in einer Zeile — die Fassung für Detailseite, Karte und
 * Mail.
 *
 * Beispiele:
 * - `Samstag, 14. März 2026, 19:00–22:00 Uhr`
 * - `Samstag, 14. März 2026, ab 19:00 Uhr`
 * - `Samstag, 14. März 2026 · ganztägig`
 * - `Sa, 14. März – So, 15. März 2026 · ganztägig`
 */
export function formatEventRange(event: EventTiming): string {
  const end = event.end;
  const sameDay = end ? isSameBerlinDay(event.start, end) : true;

  if (event.allDay) {
    if (!end || sameDay) return `${formatEventDay(event.start)} · ganztägig`;
    return `${WEEKDAY_SHORT.format(event.start)}, ${DAY_MONTH.format(event.start)} – ${WEEKDAY_SHORT.format(end)}, ${DAY_MONTH_YEAR.format(end)} · ganztägig`;
  }

  if (!end) return `${formatEventDay(event.start)}, ab ${formatEventTime(event.start)} Uhr`;

  if (sameDay) {
    return `${formatEventDay(event.start)}, ${formatEventTime(event.start)}–${formatEventTime(end)} Uhr`;
  }

  return `${WEEKDAY_SHORT.format(event.start)}, ${DAY_MONTH.format(event.start)}, ${formatEventTime(event.start)} Uhr – ${WEEKDAY_SHORT.format(end)}, ${DAY_MONTH_YEAR.format(end)}, ${formatEventTime(end)} Uhr`;
}

/** Kurzfassung für Listen und Badges: `Sa, 14. März 2026, 19:00 Uhr`. */
export function formatEventShort(event: EventTiming): string {
  const day = `${WEEKDAY_SHORT.format(event.start)}, ${DAY_MONTH_YEAR.format(event.start)}`;
  return event.allDay ? `${day} · ganztägig` : `${day}, ${formatEventTime(event.start)} Uhr`;
}

/** Die drei Zeilen des Datumswürfels auf den Terminkarten. */
export function eventDateBadge(date: Date): { weekday: string; day: string; month: string; year: string } {
  const { day, year } = berlinParts(date);
  return {
    weekday: WEEKDAY_SHORT.format(date).replace(".", ""),
    day: String(day),
    month: MONTH_SHORT.format(date).replace(".", ""),
    year: String(year),
  };
}

/**
 * „in 3 Tagen“, „heute“, „morgen“ — die Dringlichkeitszeile über einem
 * kommenden Termin. Gerechnet in ganzen deutschen Kalendertagen, damit ein
 * Termin heute Abend nicht „in 0 Tagen“ heißt.
 */
export function daysUntilEvent(event: EventTiming, now: Date = new Date()): number {
  const startOfDay = (date: Date) => {
    const { year, month, day } = berlinParts(date);
    return Date.UTC(year, month - 1, day);
  };
  return Math.round((startOfDay(event.start) - startOfDay(now)) / 86_400_000);
}

export function formatCountdown(event: EventTiming, now: Date = new Date()): string {
  const days = daysUntilEvent(event, now);
  if (days < 0) return "";
  if (days === 0) return "heute";
  if (days === 1) return "morgen";
  if (days === 2) return "übermorgen";
  if (days < 14) return `in ${days} Tagen`;
  if (days < 60) return `in ${Math.round(days / 7)} Wochen`;
  return `in ${Math.round(days / 30)} Monaten`;
}

// ─────────────────────────── Adressen ───────────────────────────

export function eventPath(id: string): string {
  return `/termine/${id}`;
}

/** Kalenderdatei eines einzelnen Termins. */
export function eventIcsPath(id: string): string {
  return `/termine/${id}/kalender.ics`;
}

/** Kalenderdatei aller kommenden Termine. */
export const CALENDAR_ICS_PATH = "/termine/kalender.ics";

/** Vorbelegter Betreff für eine Rückfrage über das Kontaktformular. */
export function eventContactPath(title: string): string {
  return `/kontakt?betreff=${encodeURIComponent(`Frage zum Termin: ${title}`)}`;
}

/** Kartenlink für die Anschrift — ohne Einbindung eines fremden Kartendienstes. */
export function eventMapUrl(address: string): string {
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(address)}`;
}
