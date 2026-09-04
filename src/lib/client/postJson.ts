import type { ActionResult } from "@/lib/server/errors";

/**
 * Ruft eine JSON-Route auf und liefert dasselbe `ActionResult` wie eine
 * Serveraktion.
 *
 * Damit läuft der Login-/Passwort-Bereich, der aus historischen Gründen über
 * `/api/auth/*` statt über Serveraktionen geht, durch dieselbe
 * `useActionForm`-Zustandsmaschine wie der Rest — inklusive der Behandlung
 * abgeschalteter Features, die hier vorher dreimal einzeln nachgebaut war.
 */
export async function postJson<T = unknown>(
  url: string,
  body: unknown,
  fallbackMessage = "Es ist ein unerwarteter Fehler aufgetreten.",
): Promise<ActionResult<T>> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, code: "INTERNAL_ERROR", message: "Keine Verbindung zum Server." };
  }

  const data: { error?: string; code?: string } & Record<string, unknown> = await response
    .json()
    .catch(() => ({}));

  if (response.ok) {
    return { ok: true, data: data as T };
  }

  // Die Routen melden ein abgeschaltetes Feature als FEATURE_DISABLED; im
  // Aktions-Vokabular heißt derselbe Fall FORBIDDEN.
  if (data.code === "FEATURE_DISABLED") {
    return { ok: false, code: "FORBIDDEN", message: data.error ?? fallbackMessage };
  }

  return {
    ok: false,
    code: response.status === 429 ? "TOO_MANY_REQUESTS" : "INTERNAL_ERROR",
    message: data.error ?? fallbackMessage,
  };
}
