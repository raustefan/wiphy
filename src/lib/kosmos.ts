/**
 * Alumni-Kosmos: Studienzeiten als Streifen auf einem Zeitstrahl.
 *
 * Frei von Server- und React-Imports, damit Packen und Überlappen ohne
 * Datenbank testbar bleiben.
 */

/**
 * Bühne des Kosmos: Bildschirm minus Kopfzeile (und auf dem Telefon die
 * Daumenleiste). Steht hier und nicht in der Client-Komponente: aus einer
 * `"use client"`-Datei käme in der Server-Seite statt des Strings nur eine
 * Client-Referenz an.
 */
export const STAGE_CLASS =
  "kosmos relative isolate overflow-hidden h-[calc(100dvh-8rem-env(safe-area-inset-bottom))] min-h-[30rem] lg:h-[calc(100dvh-4rem)]";

export type KosmosMember = {
  id: string;
  name: string;
  degreeProgram: string | null;
  /** Bruchjahre, z. B. 2008.75 für Oktober 2008. */
  start: number;
  /** `null` heißt: studiert noch. */
  end: number | null;
};

/** Datum → Bruchjahr (Monatsgenauigkeit reicht für den Zeitstrahl). */
export function toYear(date: Date): number {
  return date.getUTCFullYear() + date.getUTCMonth() / 12;
}

export function endOf(member: KosmosMember, now: number): number {
  return member.end ?? now;
}

/** Waren beide mindestens einen Moment gleichzeitig eingeschrieben? */
export function overlaps(a: KosmosMember, b: KosmosMember, now: number): boolean {
  return a.start < endOf(b, now) && b.start < endOf(a, now);
}

/**
 * Verteilt Zeiträume gierig auf Bahnen, sortiert nach Beginn: jeder kommt in
 * die erste Bahn, deren letzter Zeitraum samt `gap` schon vorbei ist. Liefert
 * die Bahn je Zeitraum in Eingabereihenfolge.
 */
export function packLanes(spans: Array<[start: number, end: number]>, gap: number): { lane: number[]; count: number } {
  const order = spans.map((_, i) => i).sort((a, b) => spans[a][0] - spans[b][0]);
  const freeFrom: number[] = [];
  const lane: number[] = new Array(spans.length);
  for (const i of order) {
    let k = freeFrom.findIndex((t) => t <= spans[i][0]);
    if (k < 0) k = freeFrom.length;
    freeFrom[k] = spans[i][1] + gap;
    lane[i] = k;
  }
  return { lane, count: freeFrom.length };
}
