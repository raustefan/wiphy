/**
 * Beitragsberechnung nach § 5 der Satzung.
 *
 * Rein und ohne Server-Abhängigkeiten: Beitragsdashboard, Aufnahmeantrag und
 * die Antragsannahme müssen zwingend dieselben Zahlen produzieren.
 *
 * Die Standardsätze (`FeeDefault`) sind **Monatsbeträge** — so beschließt sie
 * die Mitgliederversammlung (2,- €/Monat regulär, 1,- €/Monat mit Sonderstatus).
 */

/** Aufschlag für Beiträge, die nicht per Lastschrift eingezogen werden (§ 5 Abs. 5). */
export const NON_DIRECT_DEBIT_SURCHARGE = 0.1;

export type FeeInput = {
  /** Monatsbeitrag für reguläre ordentliche Mitglieder. */
  monthlyRegular: number;
  /** Monatsbeitrag für Mitglieder mit Sonderstatus (z. B. Studierende). */
  monthlyStudent: number;
  isStudent: boolean;
  /** Nimmt das Mitglied am Lastschriftverfahren teil? */
  bankeinzug: boolean;
  /** Beitragsjahr. */
  jahr: number;
  /** Aufnahmedatum — nur im Eintrittsjahr wird anteilig berechnet. */
  aufnahmedatum?: Date | null;
};

export type FeeBreakdown = {
  /** Zugrunde liegender Monatsbeitrag. */
  monthly: number;
  /** Zu zahlende Monate im Beitragsjahr (12, außer im Eintrittsjahr). */
  months: number;
  /** Beitrag vor dem Aufschlag. */
  base: number;
  /** Aufschlag, weil keine Lastschrift erteilt wurde. 0 bei Lastschrift. */
  surcharge: number;
  /** Tatsächlich fälliger Betrag. */
  total: number;
};

/** Rundung auf Cent — vermeidet Fließkomma-Artefakte wie 24.000000000000004. */
function toCents(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Beitragspflichtige Monate eines Jahres.
 *
 * § 5 Abs. 3: Bei Eintritt wird der Beitrag für das laufende Jahr abzüglich der
 * bereits vergangenen Monate fällig. Ein Eintritt im Juli kostet also noch
 * sechs Zwölftel. Jahre vor dem Eintritt ergeben 0, spätere volle 12.
 */
export function billableMonths(jahr: number, aufnahmedatum?: Date | null): number {
  if (!aufnahmedatum) return 12;
  const joinYear = aufnahmedatum.getFullYear();
  if (jahr < joinYear) return 0;
  if (jahr > joinYear) return 12;
  return 12 - aufnahmedatum.getMonth();
}

/**
 * Der volle Jahresbeitrag für eine Beitragsstufe — die Zahl, die auf der
 * Beitragsseite und im Aufnahmeantrag als Regelbetrag genannt wird.
 */
export function annualFee(monthly: number): number {
  return toCents(monthly * 12);
}

/**
 * § 5 Abs. 5: Beiträge ohne Lastschrift erhöhen sich um 10 % und werden auf
 * volle Euro **aufgerundet**. Die Aufrundung gilt für den erhöhten Betrag, nicht
 * für den Aufschlag allein.
 */
export function withSurcharge(base: number): number {
  return Math.ceil(toCents(base * (1 + NON_DIRECT_DEBIT_SURCHARGE)));
}

/** Vollständige Berechnung inklusive Zwischenschritten für die Anzeige. */
export function calculateFee(input: FeeInput): FeeBreakdown {
  const monthly = input.isStudent ? input.monthlyStudent : input.monthlyRegular;
  const months = billableMonths(input.jahr, input.aufnahmedatum);
  const base = toCents(monthly * months);
  const total = input.bankeinzug ? base : withSurcharge(base);

  return { monthly, months, base, surcharge: toCents(total - base), total };
}

/** Kurzform, wenn nur der fällige Betrag gebraucht wird. */
export function calculateFeeAmount(input: FeeInput): number {
  return calculateFee(input).total;
}
