/**
 * Umrechnung zwischen deutscher Ortszeit und den UTC-Zeitpunkten in der
 * Datenbank.
 *
 * `<input type="datetime-local">` liefert Wandzeit ohne Zeitzone
 * („2026-03-14T19:00“). Wer die mit `new Date(value)` einliest, bekommt die
 * Zeitzone der *Laufzeitumgebung* — im Browser die des Admins, auf dem Server
 * UTC. Derselbe Termin stünde dann je nach Ort ein bis zwei Stunden versetzt in
 * der Datenbank, und im Sommer anders als im Winter.
 *
 * Für den Verein gilt immer deutsche Zeit, Sommerzeit eingeschlossen — genau
 * wie bei den Anzeigeformaten in `format.ts`. Die Umrechnung läuft deshalb über
 * `Intl` statt über eine feste Stundenzahl: die Zeitzonendatenbank kennt die
 * Umstellungstermine, wir müssen sie nicht nachbauen.
 */

export const TIME_ZONE = "Europe/Berlin";

const PARTS = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour12: false,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

type Wall = { year: number; month: number; day: number; hour: number; minute: number; second: number };

/** Wandzeit in Berlin zu einem Zeitpunkt. */
export function berlinParts(date: Date): Wall {
  const parts = Object.fromEntries(
    PARTS.formatToParts(date).map((part) => [part.type, part.value]),
  ) as Record<string, string>;

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    // Mitternacht meldet `hour12: false` je nach Umgebung als "24".
    hour: Number(parts.hour) % 24,
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

/** Verschiebung Berlins gegenüber UTC zu einem Zeitpunkt, in Millisekunden. */
function berlinOffsetMs(instantMs: number): number {
  const wall = berlinParts(new Date(instantMs));
  const asIfUtc = Date.UTC(wall.year, wall.month - 1, wall.day, wall.hour, wall.minute, wall.second);
  return asIfUtc - Math.floor(instantMs / 1000) * 1000;
}

/**
 * Deutsche Wandzeit → Zeitpunkt.
 *
 * Zweimal gerechnet, weil die Verschiebung selbst vom Ergebnis abhängt: der
 * erste Durchgang schätzt sie an der falschen Stelle, sobald die Eingabe dicht
 * an einer Zeitumstellung liegt. In der Lücke der Frühjahrsumstellung
 * (02:00–03:00 existiert nicht) bleibt es bei der Schätzung — das Ergebnis
 * liegt dann eine Stunde später, und das ist die einzige sinnvolle Lesart einer
 * Uhrzeit, die es nicht gibt.
 */
export function berlinWallTimeToDate(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
): Date {
  const asIfUtc = Date.UTC(year, month - 1, day, hour, minute, second);
  const firstGuess = asIfUtc - berlinOffsetMs(asIfUtc);
  const corrected = asIfUtc - berlinOffsetMs(firstGuess);
  return new Date(corrected);
}

/** Wert eines `datetime-local`-Feldes („2026-03-14T19:00“) → Zeitpunkt. */
export function parseBerlinLocalInput(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/.exec(value.trim());
  if (!match) return null;

  const [, year, month, day, hour, minute] = match;
  const date = berlinWallTimeToDate(
    Number(year),
    Number(month),
    Number(day),
    hour ? Number(hour) : 0,
    minute ? Number(minute) : 0,
  );
  return Number.isNaN(date.getTime()) ? null : date;
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/** Zeitpunkt → Vorbelegung für `<input type="datetime-local">`. */
export function toBerlinLocalInput(date: Date): string {
  const { year, month, day, hour, minute } = berlinParts(date);
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}`;
}

/** Zeitpunkt → Vorbelegung für `<input type="date">`. */
export function toBerlinDateInput(date: Date): string {
  const { year, month, day } = berlinParts(date);
  return `${year}-${pad(month)}-${pad(day)}`;
}

/** Erster Moment des deutschen Kalendertags, in den dieser Zeitpunkt fällt. */
export function startOfBerlinDay(date: Date): Date {
  const { year, month, day } = berlinParts(date);
  return berlinWallTimeToDate(year, month, day, 0, 0, 0);
}

/** Letzter Moment des deutschen Kalendertags, in den dieser Zeitpunkt fällt. */
export function endOfBerlinDay(date: Date): Date {
  const { year, month, day } = berlinParts(date);
  return new Date(berlinWallTimeToDate(year, month, day, 23, 59, 59).getTime() + 999);
}

/** Fallen beide Zeitpunkte auf denselben deutschen Kalendertag? */
export function isSameBerlinDay(a: Date, b: Date): boolean {
  const first = berlinParts(a);
  const second = berlinParts(b);
  return first.year === second.year && first.month === second.month && first.day === second.day;
}
