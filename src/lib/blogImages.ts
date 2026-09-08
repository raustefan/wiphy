/**
 * Regeln und URLs rund um Blog-Bilder — bewusst frei von Server-Imports, damit
 * Formular (Client) und Upload-Route (Server) dieselbe Grenze prüfen und nicht
 * zwei Zahlen auseinanderlaufen.
 */

/** Ein Titelbild plus fünf weitere Bilder. */
export const MAX_ADDITIONAL_BLOG_IMAGES = 5;
export const MAX_BLOG_IMAGES = MAX_ADDITIONAL_BLOG_IMAGES + 1;

/**
 * Obergrenze für die *hochgeladene* Datei. Was am Ende in der Datenbank landet,
 * ist nach dem Neukodieren deutlich kleiner (siehe `TARGET_IMAGE_BYTES`) — die
 * 2 MB begrenzen nur, was der Server überhaupt entgegennimmt und entpackt.
 */
export const MAX_BLOG_IMAGE_UPLOAD_BYTES = 2 * 1024 * 1024;

/** Formate, die der Browser anbieten und `sharp` sicher dekodieren kann. */
export const ACCEPTED_BLOG_IMAGE_TYPES = [
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
export const BLOG_IMAGE_ACCEPT_ATTRIBUTE = ACCEPTED_BLOG_IMAGE_TYPES.join(",");

export type BlogImageVariant = "full" | "thumb";

/** Metadaten eines Bildes, wie sie an Seiten und Komponenten gereicht werden. */
export type BlogImageMeta = {
  id: string;
  alt: string;
  width: number;
  height: number;
  byteSize: number;
  fileName: string;
  position: number;
  isCover: boolean;
};

/** Öffentliche Adresse eines Bildes. `thumb` ist die kleine Variante. */
export function blogImageUrl(id: string, variant: BlogImageVariant = "full") {
  return variant === "thumb"
    ? `/api/blog/images/${id}?variant=thumb`
    : `/api/blog/images/${id}`;
}

/**
 * `srcSet` aus beiden Varianten. Die Breitenangaben entsprechen den Kanten aus
 * `blogImageProcessing.ts`; der Browser sucht sich damit anhand von `sizes` die
 * passende aus, statt auf kleinen Displays das Vollbild zu laden.
 */
export function blogImageSrcSet(id: string) {
  return `${blogImageUrl(id, "thumb")} 640w, ${blogImageUrl(id)} 1600w`;
}

/** `1,2 MB` / `214 KB` — für die Größenanzeige im Dashboard. */
export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

/**
 * Neue Reihenfolge, nachdem ein Bild um eine Position verschoben wurde.
 *
 * Als reine Funktion und nicht als SQL-Gefrickel in der Aktion: die Regel „das
 * Titelbild bleibt vorn“ ist der einzige heikle Teil daran und lässt sich so
 * ohne Datenbank prüfen. Liegt das Ziel außerhalb der Liste oder wäre es
 * Position 0 (dem Titelbild vorbehalten), bleibt die Reihenfolge unverändert.
 */
export function moveInOrder(
  ids: readonly string[],
  id: string,
  direction: "up" | "down",
  { lockFirst = false }: { lockFirst?: boolean } = {},
): string[] {
  const from = ids.indexOf(id);
  if (from === -1) return [...ids];

  const to = direction === "up" ? from - 1 : from + 1;
  const lowerBound = lockFirst ? 1 : 0;
  if (from < lowerBound || to < lowerBound || to >= ids.length) return [...ids];

  const next = [...ids];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}
