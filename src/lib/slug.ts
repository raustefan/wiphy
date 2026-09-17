/**
 * Lesbare Adressen für Beiträge und Termine: `/blog/vereinsfeier-2024-<id>`.
 *
 * Die ID bleibt Teil des Pfads — gesucht wird weiterhin nur über sie, der
 * Titelteil ist Beiwerk. Dadurch braucht es keine eigene Slug-Spalte, ein
 * umbenannter Beitrag behält seine Adresse (die Seite leitet vom alten auf
 * den neuen Titelteil um), und alte Links der Form `/blog/<id>` funktionieren
 * unverändert. Das geht, weil cuid-IDs nie einen Bindestrich enthalten: alles
 * nach dem letzten `-` ist die ID.
 */

const MAX_SLUG_LENGTH = 60;

const GERMAN_LETTERS: Record<string, string> = {
  ä: "ae",
  ö: "oe",
  ü: "ue",
  ß: "ss",
};

/** `Jubiläumsfeier: 20 Jahre!` → `jubilaeumsfeier-20-jahre` */
export function slugify(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[äöüß]/g, (letter) => GERMAN_LETTERS[letter])
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (slug.length <= MAX_SLUG_LENGTH) return slug;
  // An einer Wortgrenze kürzen, damit kein halbes Wort in der Adresse steht.
  const cut = slug.slice(0, MAX_SLUG_LENGTH + 1);
  const boundary = cut.lastIndexOf("-");
  return (boundary > 0 ? cut.slice(0, boundary) : cut.slice(0, MAX_SLUG_LENGTH)).replace(/-+$/, "");
}

/** Pfadsegment aus Titel und ID; ohne verwertbaren Titel nur die ID. */
export function slugSegment({ id, title }: { id: string; title: string }): string {
  const slug = slugify(title);
  return slug ? `${slug}-${id}` : id;
}

/** Holt die ID aus einem Segment von `slugSegment` — oder einer nackten ID. */
export function idFromSegment(segment: string): string {
  const decoded = safeDecode(segment);
  return decoded.slice(decoded.lastIndexOf("-") + 1);
}

function safeDecode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/** Öffentliche Adresse eines Blogbeitrags. */
export function blogPostPath(post: { id: string; title: string }): string {
  return `/blog/${slugSegment(post)}`;
}
