/**
 * Fristberechnung für den Austritt (§ 6 Satzung): schriftlich, mit einer Frist
 * von mindestens vier Wochen zum Ende des Geschäftsjahres (= Kalenderjahr).
 * Maßgeblich ist der Zugang beim Vorstand.
 *
 * Frei von Server-Imports, damit der Kündigungsdialog dasselbe Datum anzeigt,
 * das der Server speichert.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/** Kalenderdatum in deutscher Zeit — ein Eingang um 00:30 am 4.12. ist der 4.12. */
function berlinDateParts(date: Date): { year: number; month: number; day: number } {
  const [year, month, day] = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" })
    .format(date)
    .split("-")
    .map(Number);
  return { year, month, day };
}

/**
 * Letzter Tag der Mitgliedschaft bei Zugang der Erklärung am `eingang`.
 *
 * Vier Wochen vor dem 31.12. ist der 3.12.: bis einschließlich dann endet die
 * Mitgliedschaft zum Jahresende, danach erst zum Ende des Folgejahres.
 * Rückgabe als Datum um 00:00 UTC, wie alle reinen Datumsfelder im Schema.
 */
export function terminationDate(eingang: Date): Date {
  const { year, month, day } = berlinDateParts(eingang);
  const inTime = month < 12 || day <= 3;
  return new Date(Date.UTC(inTime ? year : year + 1, 11, 31));
}

/** Die Mitgliedschaft ist beendet, sobald der Austrittstag vorbei ist. */
export function isTerminationDue(effectiveAt: Date, now: Date = new Date()): boolean {
  return now.getTime() >= effectiveAt.getTime() + DAY_MS;
}

/** Wie lange der Nachweis einer Kündigung nach dem Austritt aufbewahrt wird (Regelverjährung). */
export const TERMINATION_RECORD_RETENTION_YEARS = 3;

/**
 * Aufbewahrung archivierter Beitragszeilen gelöschter Konten: zehn Jahre nach
 * Ende des Beitragsjahres (§ 147 Abs. 1 Nr. 1, Abs. 3 AO — Aufzeichnungen).
 * Zeilen mit `jahr` unterhalb dieses Werts dürfen weg.
 *
 * ponytail: gerechnet ab dem Beitragsjahr, nicht ab der Zahlung — eine
 * Nachzahlung Jahre später läuft damit kürzer. Der Buchungsbeleg dazu liegt im
 * Kassenbuch; braucht es die Zeile länger, ein Zahlungsdatum an `MemberFee`.
 */
export const FEE_RECORD_RETENTION_YEARS = 10;

export function feeRetentionCutoffYear(now: Date = new Date()): number {
  return now.getFullYear() - FEE_RECORD_RETENTION_YEARS;
}
