/**
 * Die Zahlen des Mitgliedschaftszertifikats.
 *
 * Ein Zertifikat behauptet zwei Dinge über ein Mitglied, und beide müssen
 * stimmen, weil das Blatt einem Dritten vorgelegt wird: *seit wann* jemand
 * dabei ist und *bis wann* die Mitgliedschaft beitragsseitig gedeckt ist.
 *
 * Rein und ohne Server-Abhängigkeiten — wie `feeCalculation.ts`, aus demselben
 * Grund: die Rechnung gehört unter Test, nicht in eine PDF-Komponente, wo man
 * sie nur noch durch Hinsehen prüfen kann.
 *
 * Alle Jahres- und Monatsgrenzen laufen über `berlinTime`. Ein Aufnahmedatum
 * vom 1. Januar liegt als UTC-Zeitpunkt in der Datenbank; wer daraus mit
 * `getFullYear()` das Jahr zieht, bekommt auf einem Server in UTC zufällig das
 * richtige und bei jeder anderen Systemzeitzone das Jahr davor.
 */

import { berlinParts, berlinWallTimeToDate } from "./berlinTime";

/** Eine Beitragszeile, soweit das Zertifikat sie braucht. */
export type CertificateFee = {
  jahr: number;
  bezahlt: boolean;
};

/** Deutsches Kalenderjahr eines Zeitpunkts. */
export function berlinYear(date: Date): number {
  return berlinParts(date).year;
}

// ─────────────────────────── Dauer ───────────────────────────

export type MembershipDuration = {
  years: number;
  /** Restmonate über die vollen Jahre hinaus (0–11). */
  months: number;
  /** Vollendete Monate insgesamt — für Vergleiche statt der Anzeige. */
  totalMonths: number;
};

/**
 * Vollendete Mitgliedschaftsdauer zwischen Aufnahme und Stichtag.
 *
 * Gezählt werden *vollendete* Monate: wer am 20. März aufgenommen wurde, ist am
 * 19. April noch keinen Monat dabei. Ein Aufnahmedatum in der Zukunft (im
 * Bestand kommt das vor, wenn der Vorstand eine Aufnahme vordatiert) ergibt
 * `null` statt einer negativen Dauer — das Zertifikat lässt die Zeile dann weg,
 * statt „-1 Jahre“ zu drucken.
 */
export function membershipDuration(since: Date, reference: Date): MembershipDuration | null {
  const from = berlinParts(since);
  const to = berlinParts(reference);

  let totalMonths = (to.year - from.year) * 12 + (to.month - from.month);
  if (to.day < from.day) totalMonths -= 1;
  if (totalMonths < 0) return null;

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    totalMonths,
  };
}

function plural(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

/** `4 Jahre und 2 Monate`, `1 Jahr`, `3 Monate`, `weniger als ein Monat`. */
export function formatMembershipDuration(duration: MembershipDuration): string {
  const { years, months } = duration;
  if (years === 0 && months === 0) return "weniger als ein Monat";
  if (years === 0) return plural(months, "Monat", "Monate");
  if (months === 0) return plural(years, "Jahr", "Jahre");
  return `${plural(years, "Jahr", "Jahre")} und ${plural(months, "Monat", "Monate")}`;
}

function dative(count: number, one: string, many: string): string {
  return count === 1 ? `einem ${one}` : `${count} ${many}`;
}

/**
 * Dieselbe Dauer im Dativ — für den Satz „ist **seit** …  Mitglied“.
 *
 * „seit“ regiert den Dativ: „seit 4 Jahren und 2 Monaten“, nicht „seit 4 Jahre
 * und 2 Monate“. Eine eigene Funktion statt einer Beugung am Aufrufort, weil
 * der Zähler mitspielt — aus „1 Jahr“ wird „einem Jahr“ und nicht „1 Jahren“.
 */
export function formatMembershipDurationDative(duration: MembershipDuration): string {
  const { years, months } = duration;
  if (years === 0 && months === 0) return "weniger als einem Monat";
  if (years === 0) return dative(months, "Monat", "Monaten");
  if (months === 0) return dative(years, "Jahr", "Jahren");
  return `${dative(years, "Jahr", "Jahren")} und ${dative(months, "Monat", "Monaten")}`;
}

// ─────────────────────────── Beitragsdeckung ───────────────────────────

export type PaidCoverage = {
  /** Alle bezahlten Beitragsjahre, aufsteigend. */
  paidYears: number[];
  /**
   * Letztes Jahr einer **lückenlos ab dem laufenden Jahr** bezahlten Reihe.
   *
   * `null`, sobald der Beitrag des laufenden Jahres offen ist: dann gibt es
   * keine Zeit, für die die Mitgliedschaft im Voraus bezahlt wäre, und das
   * Zertifikat darf keine nennen.
   */
  coveredThroughYear: number | null;
  /** Ende des gedeckten Zeitraums (31. Dezember, deutscher Zeit). */
  coveredThrough: Date | null;
  /** Vollendete Monate vom Stichtag bis zum Ende der bezahlten Zeit. */
  remainingMonths: number;
};

/**
 * Bis wann die Mitgliedschaft bezahlt ist.
 *
 * Maßgeblich ist nicht das höchste bezahlte Jahr, sondern das Ende der
 * **lückenlosen** Reihe, die im laufenden Jahr beginnt. Wer 2023 bezahlt hat,
 * 2024 und 2025 nicht und 2026 wieder, hat für 2026 gezahlt — 2023 sagt über
 * die verbleibende Mitgliedschaft nichts mehr. Und wer 2026 offen hat, aber
 * 2027 schon überwiesen hat, ist eben noch nicht durchgehend gedeckt: die
 * Lücke im laufenden Jahr ist genau der Fall, in dem der Verein nach § 6 Abs. 3
 * ausschließen könnte.
 *
 * Der Beitrag ist nach § 5 Abs. 3 am 1. Januar im Voraus für das ganze
 * Geschäftsjahr fällig, und das Geschäftsjahr ist nach § 1 das Kalenderjahr —
 * ein bezahltes Jahr deckt deshalb bis zum 31. Dezember.
 */
export function paidCoverage(
  fees: readonly CertificateFee[],
  reference: Date,
): PaidCoverage {
  const paidYears = fees
    .filter((fee) => fee.bezahlt)
    .map((fee) => fee.jahr)
    .sort((a, b) => a - b);

  const paid = new Set(paidYears);
  const currentYear = berlinYear(reference);

  let coveredThroughYear: number | null = null;
  if (paid.has(currentYear)) {
    coveredThroughYear = currentYear;
    while (paid.has(coveredThroughYear + 1)) coveredThroughYear += 1;
  }

  const coveredThrough =
    coveredThroughYear == null
      ? null
      : berlinWallTimeToDate(coveredThroughYear, 12, 31, 23, 59, 59);

  return {
    paidYears,
    coveredThroughYear,
    coveredThrough,
    remainingMonths:
      coveredThrough == null ? 0 : (membershipDuration(reference, coveredThrough)?.totalMonths ?? 0),
  };
}

/**
 * Die bezahlten Jahre als Text: `2021–2024, 2026`.
 *
 * Zusammenhängende Jahre werden zur Spanne zusammengezogen — bei einem
 * langjährigen Mitglied stünden sonst zwanzig Zahlen nebeneinander und niemand
 * sähe die Lücke, auf die es ankommt.
 */
export function formatPaidYears(paidYears: readonly number[]): string {
  if (paidYears.length === 0) return "—";

  const ranges: string[] = [];
  let start = paidYears[0];
  let previous = start;

  for (const year of paidYears.slice(1)) {
    if (year === previous + 1) {
      previous = year;
      continue;
    }
    ranges.push(start === previous ? `${start}` : `${start}–${previous}`);
    start = year;
    previous = year;
  }
  ranges.push(start === previous ? `${start}` : `${start}–${previous}`);

  return ranges.join(", ");
}

// ─────────────────────────── Kennung ───────────────────────────

/**
 * Kennung des Blattes, z. B. `WPA-2026-0042`.
 *
 * Sie macht zwei Ausdrucke desselben Mitglieds unterscheidbar und gibt dem
 * Vorstand etwas in die Hand, wenn jemand mit dem Zertifikat zurückkommt.
 * Konten ohne Mitgliedsnummer (Ehrenmitglieder aus dem Altbestand) bekommen
 * ersatzweise das Ende ihrer Konto-ID — beides steht ohnehin nur auf dem Blatt
 * des Mitglieds selbst, es entsteht kein neues Datum.
 */
export function certificateNumber(input: {
  mitgliedId: number | null;
  userId: string;
  issuedAt: Date;
}): string {
  const suffix =
    input.mitgliedId != null
      ? String(input.mitgliedId).padStart(4, "0")
      : input.userId.slice(-6).toUpperCase();

  return `WPA-${berlinYear(input.issuedAt)}-${suffix}`;
}

// ─────────────────────────── Zusammenzug ───────────────────────────

export type CertificateStatus = "ORDENTLICHES_MITGLIED" | "EHRENMITGLIED";

/**
 * Wer ein Zertifikat bekommt.
 *
 * Nur ordentliche Mitglieder und Ehrenmitglieder — ein Konto ohne
 * Mitgliedschaft hat nichts zu bescheinigen, und ein Zertifikat, das „Kein
 * Mitglied“ bescheinigt, wäre ein Widerspruch in sich.
 */
export function isCertifiableStatus(status: string | null | undefined): status is CertificateStatus {
  return status === "ORDENTLICHES_MITGLIED" || status === "EHRENMITGLIED";
}

export type CertificateFacts = {
  status: CertificateStatus;
  /** Aufnahmedatum, falls im Bestand hinterlegt. */
  memberSince: Date | null;
  duration: MembershipDuration | null;
  coverage: PaidCoverage;
  /**
   * Ehrenmitglieder sind nach § 5 Abs. 7 von der Beitragspflicht befreit. Für
   * sie ist eine bezahlte Reihe keine Aussage über die Mitgliedschaft — das
   * Zertifikat nennt stattdessen die Befreiung.
   */
  feeExempt: boolean;
};

export function certificateFacts(input: {
  status: CertificateStatus;
  aufnahmedatum: Date | null;
  fees: readonly CertificateFee[];
  issuedAt: Date;
}): CertificateFacts {
  return {
    status: input.status,
    memberSince: input.aufnahmedatum,
    duration: input.aufnahmedatum
      ? membershipDuration(input.aufnahmedatum, input.issuedAt)
      : null,
    coverage: paidCoverage(input.fees, input.issuedAt),
    feeExempt: input.status === "EHRENMITGLIED",
  };
}
