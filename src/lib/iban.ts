/**
 * IBAN-Helfer ohne Server-Abhängigkeiten, damit Wizard (Client) und Validierung
 * (Server) exakt dieselbe Prüfung verwenden.
 */

/** Stellenzahl je Land — nur die im Verein realistisch vorkommenden SEPA-Länder. */
const IBAN_LENGTHS: Record<string, number> = {
  AT: 20, BE: 16, BG: 22, CH: 21, CY: 28, CZ: 24, DE: 22, DK: 18, EE: 20,
  ES: 24, FI: 18, FR: 27, GB: 22, GR: 27, HR: 21, HU: 28, IE: 22, IS: 26,
  IT: 27, LI: 21, LT: 20, LU: 20, LV: 21, MT: 31, NL: 18, NO: 15, PL: 28,
  PT: 25, RO: 24, SE: 24, SI: 19, SK: 24,
};

export function normalizeIban(value: string): string {
  return value.replace(/[\s-]/g, "").toUpperCase();
}

/** Vierergruppen — die Schreibweise, in der IBANs auf Kontoauszügen stehen. */
export function formatIban(value: string): string {
  return normalizeIban(value).replace(/(.{4})/g, "$1 ").trim();
}

/**
 * Zeigt nur Land, Prüfziffer und die letzten vier Stellen. Reicht, um ein Konto
 * im Dashboard wiederzuerkennen, ohne die vollständige Bankverbindung bei jedem
 * Blick auf die Liste offenzulegen.
 */
export function maskIban(value: string): string {
  const iban = normalizeIban(value);
  if (iban.length < 8) return "••••";
  return `${iban.slice(0, 4)} ${"•".repeat(4)} ${iban.slice(-4)}`;
}

/**
 * Prüfsummenvalidierung nach ISO 13616 (Mod-97-10). Fängt Zahlendreher ab,
 * bevor die erste Lastschrift zurückläuft.
 */
export function isValidIban(value: string): boolean {
  const iban = normalizeIban(value);
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(iban)) return false;

  const expectedLength = IBAN_LENGTHS[iban.slice(0, 2)];
  if (expectedLength === undefined || iban.length !== expectedLength) return false;

  // Die ersten vier Zeichen wandern ans Ende, Buchstaben werden zu Zahlen
  // (A=10 … Z=35); der Rest der Division durch 97 muss 1 ergeben.
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const digits = rearranged.replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));

  // Stückweise rechnen, weil die Zahl für Number.MAX_SAFE_INTEGER zu lang ist.
  let remainder = 0;
  for (const digit of digits) {
    remainder = (remainder * 10 + Number(digit)) % 97;
  }
  return remainder === 1;
}

/** SWIFT/BIC: 8 oder 11 Stellen. Für SEPA-Inlandslastschriften optional. */
export function isValidBic(value: string): boolean {
  return /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(value.replace(/\s/g, "").toUpperCase());
}
