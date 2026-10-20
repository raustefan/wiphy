/**
 * Plausibilitätsregeln für Eingaben, die mehrere Wege teilen: Aufnahmeantrag
 * (auch im Browser), Admin-Anlage, Profil und JSON-Import. Ohne
 * Server-Abhängigkeiten, damit Wizard und Server dasselbe prüfen.
 */

/** Steuerzeichen haben in Namen nichts verloren — ein Zeilenumbruch im Namen landet sonst im Mail-Betreff. */
export function hasControlChars(value: string): boolean {
  return /[\u0000-\u001f\u007f]/.test(value);
}

/** Ziffern, Leerzeichen, + ( ) / . - und mindestens fünf Ziffern. */
export function isValidPhone(value: string): boolean {
  return /^\+?[\d\s()/.-]{5,30}$/.test(value) && (value.match(/\d/g)?.length ?? 0) >= 5;
}

/**
 * Postleitzahlformate der Länder, aus denen Mitglieder realistisch kommen.
 * Für alle anderen Länder wird nicht geprüft — lieber durchlassen als ein
 * gültiges Format abweisen.
 */
const POSTAL_CODE_PATTERNS: Record<string, RegExp> = {
  DE: /^\d{5}$/,
  AT: /^\d{4}$/,
  CH: /^\d{4}$/,
  LI: /^\d{4}$/,
  LU: /^(L-)?\d{4}$/,
  BE: /^\d{4}$/,
  NL: /^\d{4} ?[A-Z]{2}$/i,
  DK: /^\d{4}$/,
  NO: /^\d{4}$/,
  SE: /^\d{3} ?\d{2}$/,
  FI: /^\d{5}$/,
  FR: /^\d{5}$/,
  IT: /^\d{5}$/,
  ES: /^\d{5}$/,
  PT: /^\d{4}-\d{3}$/,
  PL: /^\d{2}-\d{3}$/,
  CZ: /^\d{3} ?\d{2}$/,
  GB: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
  US: /^\d{5}(-\d{4})?$/,
  CA: /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i,
};

export function isValidPostalCode(countryCode: string | null | undefined, postalCode: string): boolean {
  const pattern = countryCode ? POSTAL_CODE_PATTERNS[countryCode] : undefined;
  return !pattern || pattern.test(postalCode.trim());
}

/** `JJJJ-MM-TT`, und den Tag muss es geben — `new Date` macht aus dem 31.02. still den 3. März. */
export function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

/** Geburtsdatum: nicht vor 1900 und nicht in der Zukunft. */
export function isPlausibleBirthDate(date: Date, now: Date = new Date()): boolean {
  return date.getUTCFullYear() >= 1900 && date <= now;
}

/** Obergrenze für einen einzelnen Jahresbeitrag — darüber ist es ein Tippfehler. */
export const MAX_ANNUAL_FEE = 1000;
