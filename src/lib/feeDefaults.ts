/**
 * Auflösung der Standard-Beitragssätze. Rein und ohne Prisma, damit sowohl der
 * Wizard als auch die Antragsannahme dieselbe Logik nutzen — und damit sie
 * testbar bleibt.
 */

import { FALLBACK_FEE_DEFAULT } from "@/lib/membership";
import { calculateFee } from "@/lib/feeCalculation";

/** Monatsbeträge je Beitragsstufe, gültig ab `jahr`. */
export type FeeDefaultEntry = { jahr: number; regular: number; student: number };
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

  const sorted = [...defaults].sort((a, b) => a.jahr - b.jahr);
  let match: FeeDefaultEntry | undefined;
  for (const entry of sorted) {
    if (entry.jahr <= year) match = entry;
    else break;
  }
  const resolved = match ?? sorted[0];
  return { regular: resolved.regular, student: resolved.student };
}

/**
 * Beiträge, die bei Aufnahme angelegt werden: vom Eintrittsjahr bis zum
 * spätesten angegebenen Studienjahr (mindestens aber das Eintrittsjahr).
 *
 * Jahre *vor* dem Eintritt bleiben bewusst außen vor — für sie bestand keine
 * Beitragspflicht, und ein Eintrag dort wäre eine erfundene Forderung. Im
 * Eintrittsjahr selbst wird nach § 5 Abs. 3 anteilig gerechnet.
 */
export function planApplicationFees(params: {
  aufnahmedatum: Date;
  studentYears: number[];
  defaults: FeeDefaultEntry[];
  /** Teilnahme am Lastschriftverfahren; ohne sie greift der 10-%-Aufschlag. */
  bankeinzug: boolean;
}): Array<{ jahr: number; isStudent: boolean; beitrag: number }> {
  const joinYear = params.aufnahmedatum.getFullYear();
  const futureStudentYears = params.studentYears.filter((y) => y >= joinYear);
  const lastYear = Math.max(joinYear, ...futureStudentYears);

  const plan: Array<{ jahr: number; isStudent: boolean; beitrag: number }> = [];
  for (let jahr = joinYear; jahr <= lastYear; jahr++) {
    const isStudent = futureStudentYears.includes(jahr);
    const rates = resolveFeeDefault(params.defaults, jahr);
    plan.push({
      jahr,
      isStudent,
      beitrag: calculateFee({
        monthlyRegular: rates.regular,
        monthlyStudent: rates.student,
        isStudent,
        bankeinzug: params.bankeinzug,
        jahr,
        aufnahmedatum: params.aufnahmedatum,
      }).total,
    });
  }
  return plan;
}
