/**
 * Anzeigeformate für Geld und Datum.
 *
 * Alles auf Deutsch und an einem Ort: die drei Euro- und zwei Datumsvarianten,
 * die vorher über Seiten und Tabellen verteilt kopiert waren, liefen sonst
 * früher oder später auseinander.
 *
 * Frei von Server-Imports — Client-Komponenten formatieren damit genauso.
 */

const EURO = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

/** `1.234,50 €` */
export function formatEuro(value: number): string {
  return EURO.format(value);
}

const LONG_DATE = new Intl.DateTimeFormat("de-DE", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const SHORT_DATE = new Intl.DateTimeFormat("de-DE");

function toDate(value: string | number | Date | null | undefined): Date | null {
  if (value === null || value === undefined || value === "") return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** `4. September 2026` — für Fließtext und Detailansichten. Leerwert: „—“. */
export function formatDate(value: string | number | Date | null | undefined): string {
  const date = toDate(value);
  return date ? LONG_DATE.format(date) : "—";
}

/** `04.09.2026` — für Tabellen und Listen, wo Platz knapp ist. */
export function formatDateShort(value: string | number | Date | null | undefined): string {
  const date = toDate(value);
  return date ? SHORT_DATE.format(date) : "—";
}
