/**
 * Der „Fehler“, den `redirect()` aus `next/navigation` wirft — und wie man ihn
 * im Browser wieder in eine Navigation übersetzt.
 *
 * Next transportiert eine Weiterleitung als Exception mit einem `digest` der
 * Form `NEXT_REDIRECT;push;/ziel;307;`. Zwei Stellen müssen das erkennen: der
 * `catch`-Block einer Serveraktion darf sie nicht als Fehler behandeln
 * (`executeAction`), und das Formular im Browser muss sie in einen
 * Router-Aufruf umsetzen (`useActionForm`).
 *
 * Bewusst ohne Imports und ohne „server-only“, damit beide Seiten dieselbe
 * Fassung benutzen und sie nicht auseinanderlaufen können.
 */

export type RedirectTarget = {
  url: string;
  /** `push` legt einen Verlaufseintrag an, `replace` ersetzt den aktuellen. */
  kind: "push" | "replace";
};

export function isRedirectError(error: unknown): error is Error & { digest: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

/**
 * Liest Ziel und Art der Weiterleitung aus dem `digest`; `null`, wenn der
 * Fehler gar keine Weiterleitung ist.
 *
 * Das Ziel wird aus den mittleren Feldern zusammengesetzt statt über einen
 * festen Index gelesen: eine URL darf selbst ein Semikolon enthalten, und die
 * beiden letzten Felder (Statuscode und ein leerer Rest) sind die einzigen
 * verlässlichen Ankerpunkte von hinten.
 */
export function getRedirectTarget(error: unknown): RedirectTarget | null {
  if (!isRedirectError(error)) return null;

  const parts = error.digest.split(";");
  const kind = parts[1] === "replace" ? "replace" : "push";
  const url = parts.slice(2, -2).join(";") || parts[2];

  return url ? { url, kind } : null;
}
