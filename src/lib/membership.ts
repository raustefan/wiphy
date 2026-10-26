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

/**
 * Wie viele Jahre über das laufende hinaus das (voraussichtliche) Studienende
 * im Aufnahmeantrag liegen darf.
 */
export const STUDY_END_LOOKAHEAD = 10;

/**
 * Studienjahre im Voraus, wenn ein Admin ein Konto von Hand anlegt — derselbe
 * pauschale Rahmen wie beim Übernehmen aus dem Altsystem
 * (`scripts/convert_alumni.py`), das nur „Student ja/nein“ kannte.
 */
export const STUDENT_YEAR_LOOKAHEAD = 5;

/**
 * Version der Texte, denen zugestimmt wurde. Bei inhaltlichen Änderungen an
 * Satzungs-/Datenschutzhinweis oder Mandatstext hochzählen — nur so lässt sich
 * später belegen, worauf sich eine alte Zustimmung bezog.
 */
export const CONSENT_VERSION = "2026-10-v6";

/**
 * Gläubiger-Identifikationsnummer des Vereins (bei der Bundesbank zu
 * beantragen). Solange sie fehlt, wird im Mandatstext ein Platzhalter
 * angezeigt und keine Mandatsreferenz vergeben.
 */
export const SEPA_CREDITOR_ID = "";

/** Öffentliche Satzungsseite. Noch nicht angelegt — siehe README/Backlog. */
export const SATZUNG_URL = "/satzung";
export const DATENSCHUTZ_URL = "/datenschutz";

/**
 * Die öffentliche Seite „Mitglied werden“ — zugleich Registrierung, Wegweiser
 * und Antragsformular. Sie löst `/register` und `/dashboard/mitgliedschaft` ab:
 * beide Wege liefen vorher nebeneinander und niemand sagte dem Besucher, dass
 * sie zusammengehören.
 */
export const MEMBERSHIP_APPLICATION_PATH = "/mitglied-werden";
export const MEMBERSHIP_ADMIN_PATH = "/dashboard/mitgliedsantraege";

/**
 * Ziel nach einer abgeschickten Registrierung. Der Parameter ist das einzige
 * Signal, dass gerade ein Konto entstanden ist — eine Sitzung gibt es vor der
 * E-Mail-Bestätigung noch nicht.
 */
export const REGISTERED_PATH = `${MEMBERSHIP_APPLICATION_PATH}?konto=erstellt`;

/** Kennzeichnet Bestätigungslinks, die aus dem Weg in den Verein stammen. */
export const MEMBERSHIP_JOURNEY_MARKER = "mitglied-werden";

/**
 * Anmeldung, die anschließend zurück auf die Antragsseite führt. Ohne das Ziel
 * landete jemand mitten im Ablauf nach dem Login im Dashboard und müsste den
 * Weg dorthin selbst wiederfinden.
 */
export const MEMBERSHIP_LOGIN_PATH = `/login?next=${encodeURIComponent(
  MEMBERSHIP_APPLICATION_PATH,
)}`;

/** Fallback, solange für kein Jahr ein Beitragssatz gepflegt ist. */
export const FALLBACK_FEE_DEFAULT = { regular: 0, student: 0 };

/**
 * Die Zahlungsweise ist ein eigener Schritt und steht vor der Bankverbindung:
 * Stünde die Wahl über den Kontofeldern, wäre sie ein Klick nebenbei — und
 * gerade hier kostet ein Versehen bares Geld (§ 5 Abs. 5).
 */
export const STEPS = [
  { id: "info", label: "Mitgliedschaft" },
  { id: "person", label: "Person & Adresse" },
  { id: "studium", label: "Studium & Beruf" },
  { id: "zahlungsweise", label: "Zahlungsweise" },
  { id: "bank", label: "Bankverbindung" },
  { id: "summary", label: "Beitrag & Abschluss" },
] as const;

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

/**
 * Studienjahre für die Ermäßigung, abgeleitet aus dem Studienzeitraum.
 * Großzügig: Jedes angebrochene Jahr zählt ganz, 31.12.2026–01.01.2028 ergibt
 * also 2026, 2027 und 2028. Vergangene Jahre fallen weg — Beiträge gibt es erst
 * ab dem Eintritt. Ohne Ende keine Ermäßigung, ohne Beginn ab dem laufenden Jahr.
 *
 * Datumsfelder kommen als `YYYY-MM-DD` und werden als UTC-Mitternacht gelesen,
 * deshalb `getUTCFullYear` — sonst kippte der 1. Januar je nach Zeitzone.
 */
export function studentYearsFromStudy(
  studyStart: Date | null | undefined,
  studyEnd: Date | null | undefined,
  currentYear: number = new Date().getFullYear(),
): number[] {
  if (!studyEnd) return [];
  const from = Math.max(studyStart?.getUTCFullYear() ?? currentYear, currentYear);
  const to = studyEnd.getUTCFullYear();
  return Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);
}

/** Wie weit Mitglieder ihren Sonderstatus selbst in die Zukunft verlängern dürfen. */
export const MEMBER_STUDENT_LOOKAHEAD = 3;

type StudentYears = { studentYears: number[] };

/** `year` ist das letzte ermäßigte Jahr: jetzt noch Sonderstatus, im Folgejahr nicht mehr. */
export function studentStatusEndsAfter(member: StudentYears, year: number): boolean {
  return member.studentYears.includes(year) && !member.studentYears.includes(year + 1);
}

/**
 * Wählbare Enden für „ermäßigt bis einschließlich …“: das laufende Jahr (keine
 * künftigen Jahre) bis +MEMBER_STUDENT_LOOKAHEAD. Reicht der Status schon
 * weiter (Antrag mit bis zu zehn Jahren, Altbestand mit fünf), bleibt auch das
 * bisherige Ende wählbar — sonst ließe sich nichts ändern, ohne zu kürzen.
 */
export function studentEndYearOptions(studentYears: number[], currentYear: number): number[] {
  const last = Math.max(currentYear + MEMBER_STUDENT_LOOKAHEAD, ...studentYears);
  return Array.from({ length: last - currentYear + 1 }, (_, i) => currentYear + i);
}

/** Das gewählte Ende: letztes ermäßigtes Jahr nach dem laufenden, sonst das laufende. */
export function currentStudentEndYear(studentYears: number[], currentYear: number): number {
  return Math.max(currentYear, ...studentYears.filter((year) => year > currentYear));
}

/**
 * Neue Studienjahre bei Ende `endYear`: Vergangenes und das laufende Jahr
 * bleiben, wie sie sind (der Beitrag ist am 1. Januar fällig, § 5 Abs. 3);
 * danach lückenlos bis `endYear`.
 */
export function withStudentEndYear(studentYears: number[], endYear: number, currentYear: number): number[] {
  const kept = studentYears.filter((year) => year <= currentYear);
  const future = Array.from({ length: Math.max(0, endYear - currentYear) }, (_, i) => currentYear + 1 + i);
  return [...new Set([...kept, ...future])].sort((a, b) => a - b);
}

/** Jahre, deren Status sich zwischen zwei Ständen unterscheidet. */
export function changedStudentYears(before: number[], after: number[]): number[] {
  return [...before.filter((y) => !after.includes(y)), ...after.filter((y) => !before.includes(y))];
}

/** „2019–2021, 2026“ statt einer langen Liste einzelner Jahre. */
export function formatYearRanges(years: number[]): string {
  const sorted = [...new Set(years)].sort((a, b) => a - b);
  const ranges: string[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const start = sorted[i];
    while (sorted[i + 1] === sorted[i] + 1) i++;
    ranges.push(sorted[i] === start ? String(start) : `${start}–${sorted[i]}`);
  }
  return ranges.join(", ");
}
