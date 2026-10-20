/**
 * IBAN-Helfer ohne Server-Abhängigkeiten, damit Wizard (Client) und Validierung
 * (Server) exakt dieselbe Prüfung verwenden.
 */

/** Stellenzahl je Land nach dem SWIFT-IBAN-Register. */
const IBAN_LENGTHS: Record<string, number> = {
  AD: 24, AE: 23, AL: 28, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BI: 27,
  BR: 29, BY: 28, CH: 21, CR: 22, CY: 28, CZ: 24, DE: 22, DJ: 27, DK: 18, DO: 28,
  EE: 20, EG: 29, ES: 24, FI: 18, FK: 18, FO: 18, FR: 27, GB: 22, GE: 22, GI: 23,
  GL: 18, GR: 27, GT: 28, HN: 28, HR: 21, HU: 28, IE: 22, IL: 23, IQ: 23, IS: 26,
  IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28, LC: 32, LI: 21, LT: 20, LU: 20, LV: 21,
  LY: 25, MC: 27, MD: 24, ME: 22, MK: 19, MN: 20, MR: 27, MT: 31, MU: 30, NI: 28,
  NL: 18, NO: 15, OM: 23, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29, RO: 24, RS: 22,
  RU: 33, SA: 24, SC: 31, SD: 18, SE: 24, SI: 19, SK: 24, SM: 27, SO: 23, ST: 25,
  SV: 28, TL: 23, TN: 24, TR: 26, UA: 29, VA: 22, VG: 24, XK: 20, YE: 30,
};

/** EU und EWR: Lastschrift ohne BIC und ohne Anschrift des Zahlers. */
const EEA = new Set(
  "AT BE BG CY CZ DE DK EE ES FI FR GR HR HU IE IT LT LU LV MT NL PL PT RO SE SI SK IS LI NO".split(" "),
);

/**
 * SEPA-Länder außerhalb des EWR. Für sie verlangt die Lastschriftdatei BIC
 * und Anschrift des Zahlers.
 * ponytail: Stand 2025 — AL, MD, ME, MK treten gerade bei; aufnehmen, sobald
 * die Hausbank sie einzieht.
 */
const SEPA_NON_EEA = new Set(["AD", "CH", "GB", "GI", "MC", "SM", "VA"]);

/** Nur von Konten im SEPA-Raum kann der Verein per Lastschrift einziehen. */
export function isSepaIban(value: string): boolean {
  const country = normalizeIban(value).slice(0, 2);
  return EEA.has(country) || SEPA_NON_EEA.has(country);
}

/** Konto außerhalb des EWR: BIC und Anschrift müssen in die Lastschrift. */
export function requiresBic(value: string): boolean {
  return SEPA_NON_EEA.has(normalizeIban(value).slice(0, 2));
}

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
