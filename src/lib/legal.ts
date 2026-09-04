/**
 * Rechtstexte als Daten.
 *
 * Satzung, Impressum und Datenschutzerklärung ändern sich durch Beschluss oder
 * Gesetzeslage, nicht durch Design. Als Datei aus Strings bleibt jede Änderung
 * ein reiner Textdiff ohne Layoutrisiko — und alle drei Seiten teilen sich
 * denselben Renderer statt jeweils eigenes Markup zu pflegen.
 *
 * In Absätzen sind zwei Auszeichnungen erlaubt, mehr braucht kein Rechtstext:
 *   `[Beschriftung](https://ziel)` für Links, `**fett**` für Hervorhebungen.
 */

export type LegalBlock =
  /** Ein Absatz. */
  | string
  /** Zeilen ohne Absatzabstand — Anschriften, Kontaktdaten, Aufzählungen mit „–“. */
  | { lines: string[] }
  /** Aufzählung mit Punkten. */
  | { items: string[] };

export type LegalSection = {
  /** Fehlt bei einem einleitenden Abschnitt ohne eigene Überschrift. */
  title?: string;
  /** Ankerziel für Verlinkungen, z. B. `paragraph-5` in der Satzung. */
  id?: string;
  blocks: LegalBlock[];
};

export type LegalDocument = LegalSection[];
