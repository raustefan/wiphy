/**
 * Auflösung der Standard-Beitragssätze. Rein und ohne Prisma, damit sowohl der
 * Wizard als auch die Antragsannahme dieselbe Logik nutzen — und damit sie
 * testbar bleibt.
 */

import { FALLBACK_FEE_DEFAULT } from "@/lib/membership";
import { calculateFee } from "@/lib/feeCalculation";

/** Monatsbeträge je Beitragsstufe, gültig ab `year`. */
export type FeeDefaultEntry = { year: number; regular: number; student: number };
export type FeeRates = { regular: number; student: number };

/**
 * Satz für ein Jahr. Ist das Jahr selbst nicht gepflegt, gilt der jüngste
 * hinterlegte Satz davor — ein einmal beschlossener Beitrag läuft also weiter,
 * bis die Mitgliederversammlung einen neuen festlegt. Existiert überhaupt kein
 * früherer Satz, wird der älteste bekannte genommen, damit ein frisch gepflegtes
 * Folgejahr nicht plötzlich 0 € für die Vergangenheit bedeutet.
 */
export function resolveFeeDefault(defaults: FeeDefaultEntry[], year: number): FeeRates {
  if (defaults.length === 0) return FALLBACK_FEE_DEFAULT;

  const sorted = [...defaults].sort((a, b) => a.year - b.year);
  let match: FeeDefaultEntry | undefined;
  for (const entry of sorted) {
    if (entry.year <= year) match = entry;
    else break;
  }
  const resolved = match ?? sorted[0];
  return { regular: resolved.regular, student: resolved.student };
}

/**
 * Beiträge, die bei Aufnahme angelegt werden: das Eintrittsjahr, beim
 * Übernehmen von Bestandsmitgliedern bis `untilYear`. Spätere Jahre entstehen
 * erst mit „Jahr hinzufügen“ — der Sonderstatus steht ohnehin in `studentYears`.
 *
 * Jahre *vor* dem Eintritt bleiben bewusst außen vor — für sie bestand keine
 * Beitragspflicht, und ein Eintrag dort wäre eine erfundene Forderung. Im
 * Eintrittsjahr selbst wird nach § 5 Abs. 3 anteilig gerechnet.
 */
export function planApplicationFees(params: {
  joinedAt: Date;
  studentYears: number[];
  defaults: FeeDefaultEntry[];
  /** Teilnahme am Lastschriftverfahren; ohne sie greift der 10-%-Aufschlag. */
  directDebit: boolean;
  /** Spätestes Jahr, das mindestens angelegt wird — beim Übernehmen von
   *  Bestandsmitgliedern das laufende Jahr, damit die Jahre dazwischen nicht fehlen. */
  untilYear?: number;
}): Array<{ year: number; isStudent: boolean; amount: number }> {
  const joinYear = params.joinedAt.getFullYear();
  const lastYear = Math.max(joinYear, params.untilYear ?? joinYear);

  const plan: Array<{ year: number; isStudent: boolean; amount: number }> = [];
  for (let year = joinYear; year <= lastYear; year++) {
    const isStudent = params.studentYears.includes(year);
    const rates = resolveFeeDefault(params.defaults, year);
    plan.push({
      year,
      isStudent,
      amount: calculateFee({
        monthlyRegular: rates.regular,
        monthlyStudent: rates.student,
        isStudent,
        directDebit: params.directDebit,
        year,
        joinedAt: params.joinedAt,
      }).total,
    });
  }
  return plan;
}
