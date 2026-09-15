/**
 * Regeln und URLs rund um Vorstandsfotos — bewusst frei von Server-Imports,
 * damit Formular (Client) und Upload-Route (Server) dieselbe Grenze prüfen und
 * nicht zwei Zahlen auseinanderlaufen. Analog zu `blogImages.ts`, aber für ein
 * einzelnes quadratisches Profilfoto statt einer Galerie.
 */

/**
 * Obergrenze für die *hochgeladene* Datei. Was am Ende in der Datenbank
 * landet, ist nach dem Neukodieren deutlich kleiner — die 2 MB begrenzen nur,
 * was der Server überhaupt entgegennimmt und entpackt.
 */
export const MAX_BOARD_PHOTO_UPLOAD_BYTES = 2 * 1024 * 1024;

/** Formate, die der Browser anbieten und `sharp` sicher dekodieren kann. */
export const ACCEPTED_BOARD_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/tiff",
  "image/heic",
  "image/heif",
] as const;

/** Wert für `accept` am Datei-Dialog. */
export const BOARD_PHOTO_ACCEPT_ATTRIBUTE = ACCEPTED_BOARD_PHOTO_TYPES.join(",");

/** Öffentliche Adresse des Fotos eines Vorstandsmitglieds. */
export function boardPhotoUrl(id: string) {
  return `/api/vorstand/photo/${id}`;
}

/** `1,2 MB` / `214 KB` — für die Größenanzeige im Dashboard. */
export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

/**
 * Neue Reihenfolge, nachdem ein Mitglied um eine Position verschoben wurde.
 * Identische Logik wie `moveInOrder` in `blogImages.ts`, hier ohne die
 * „Titelbild bleibt vorn“-Sperre, da es bei Vorstandsmitgliedern keine
 * bevorzugte erste Position gibt.
 */
export function moveMemberOrder(
  ids: readonly string[],
  id: string,
  direction: "up" | "down",
): string[] {
  const from = ids.indexOf(id);
  if (from === -1) return [...ids];

  const to = direction === "up" ? from - 1 : from + 1;
  if (to < 0 || to >= ids.length) return [...ids];

  const next = [...ids];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}
