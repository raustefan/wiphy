/**
 * Anzeigeformate für Geld und Datum.
 *
 * Alles auf Deutsch und an einem Ort: die drei Euro- und zwei Datumsvarianten,
 * die vorher über Seiten und Tabellen verteilt kopiert waren, liefen sonst
 * früher oder später auseinander.
 *
 * Frei von Server-Imports — Client-Komponenten formatieren damit genauso.
 *
 * Alle Datumsformate tragen ausdrücklich `timeZone: "Europe/Berlin"`. Ohne die
 * Angabe nimmt `Intl` die Zeitzone der jeweiligen Umgebung — und das ist beim
 * Rendern auf dem Server UTC, beim Rendern im Browser die des Besuchers.
 * Dieselbe Zeile stünde dann je nach Ort zwei Stunden früher im Protokoll, als
 * sie passiert ist. Es gilt immer deutsche Zeit, Sommerzeit eingeschlossen.
 */

const TIME_ZONE = "Europe/Berlin";

const EURO = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

/** `1.234,50 €` */
export function formatEuro(value: number): string {
  return EURO.format(value);
}

const NUMBER = new Intl.NumberFormat("de-DE");

/** `1.284` — Tausenderpunkte für Zähler und Achsenbeschriftungen. */
export function formatNumber(value: number): string {
  return NUMBER.format(value);
}

const LONG_DATE = new Intl.DateTimeFormat("de-DE", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: TIME_ZONE,
});

const SHORT_DATE = new Intl.DateTimeFormat("de-DE", { timeZone: TIME_ZONE });

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

const DATE_TIME = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIME_ZONE,
});

/** `04.09.2026, 14:32` — für Protokolle, wo die Uhrzeit die halbe Aussage ist. */
export function formatDateTime(value: string | number | Date | null | undefined): string {
  const date = toDate(value);
  return date ? DATE_TIME.format(date) : "—";
}

/** `04.09.2026` — für Tabellen und Listen, wo Platz knapp ist. */
export function formatDateShort(value: string | number | Date | null | undefined): string {
  const date = toDate(value);
  return date ? SHORT_DATE.format(date) : "—";
}
