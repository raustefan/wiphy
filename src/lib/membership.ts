/**
 * Konstanten und reine Berechnungen rund um den Aufnahmeantrag.
 *
 * Bewusst frei von Prisma und Server-Imports: Wizard, Validierung und
 * Admin-Ansicht teilen sich diese Definitionen, ohne den Prisma-Client ins
 * Browser-Bundle zu ziehen (gleiche Trennung wie `lib/contact.ts`).
 */

/** Mindestalter für einen eigenständigen Beitritt — siehe `MINOR_HINT`. */
export const MIN_APPLICANT_AGE = 18;

/**
 * Minderjährige können weder wirksam beitreten noch ein SEPA-Mandat erteilen;
 * dafür braucht es die gesetzlichen Vertreter. Statt das im Formular halb
 * abzubilden, wird der Antrag blockiert und auf den persönlichen Weg verwiesen.
 */
export const MINOR_HINT =
  "Ein Beitritt über dieses Formular ist erst ab 18 Jahren möglich. Bitte wende dich für eine Mitgliedschaft direkt an den Vorstand.";

/** Wie weit in die Zukunft Studienjahre angegeben werden dürfen. */
export const STUDENT_YEAR_LOOKAHEAD = 5;

/**
 * Version der Texte, denen zugestimmt wurde. Bei inhaltlichen Änderungen an
 * Satzungs-/Datenschutzhinweis oder Mandatstext hochzählen — nur so lässt sich
 * später belegen, worauf sich eine alte Zustimmung bezog.
 */
export const CONSENT_VERSION = "2026-09-v1";

/**
 * Gläubiger-Identifikationsnummer des Vereins (bei der Bundesbank zu
 * beantragen). Solange sie fehlt, wird im Mandatstext ein Platzhalter
 * angezeigt und keine Mandatsreferenz vergeben.
 */
export const SEPA_CREDITOR_ID = "";

/** Öffentliche Satzungsseite. Noch nicht angelegt — siehe README/Backlog. */
export const SATZUNG_URL = "/satzung";
export const DATENSCHUTZ_URL = "/datenschutz";

export const MEMBERSHIP_APPLICATION_PATH = "/dashboard/mitgliedschaft";
export const MEMBERSHIP_ADMIN_PATH = "/dashboard/mitgliedsantraege";

/** Fallback, solange für kein Jahr ein Beitragssatz gepflegt ist. */
export const FALLBACK_FEE_DEFAULT = { regular: 0, student: 0 };

export const STEPS = [
  { id: "info", label: "Mitgliedschaft" },
  { id: "person", label: "Person & Adresse" },
  { id: "studium", label: "Studium & Beruf" },
  { id: "bank", label: "Bankverbindung" },
  { id: "summary", label: "Beitrag & Abschluss" },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

export function formatEuro(value: number): string {
  return value.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

/** Alter in vollen Jahren am Stichtag. */
export function ageAt(birthDate: Date, reference: Date = new Date()): number {
  let age = reference.getFullYear() - birthDate.getFullYear();
  const monthDiff = reference.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && reference.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

export function isOldEnough(birthDate: Date, reference: Date = new Date()): boolean {
  return ageAt(birthDate, reference) >= MIN_APPLICANT_AGE;
}

/** Auswählbare Studienjahre: laufendes Jahr bis +STUDENT_YEAR_LOOKAHEAD. */
export function selectableStudentYears(currentYear: number = new Date().getFullYear()): number[] {
  return Array.from({ length: STUDENT_YEAR_LOOKAHEAD + 1 }, (_, i) => currentYear + i);
}

/**
 * Vorbelegung der Studienjahre aus dem angegebenen Studienzeitraum. Ein bereits
 * abgeschlossenes Studium liefert nichts — die Ermäßigung gilt nur für Jahre,
 * in denen tatsächlich noch studiert wird.
 */
export function deriveStudentYears(
  studienende: Date | null | undefined,
  currentYear: number = new Date().getFullYear(),
): number[] {
  if (!studienende) return [];
  const endYear = studienende.getFullYear();
  if (endYear < currentYear) return [];
  return selectableStudentYears(currentYear).filter((year) => year <= endYear);
}
