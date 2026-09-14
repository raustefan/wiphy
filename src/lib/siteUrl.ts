/**
 * Die kanonische Adresse der Seite — an *einer* Stelle.
 *
 * Sitemap, robots.txt, RSS-Feed, OpenGraph-Bilder und JSON-LD brauchen alle
 * absolute URLs. Fällt das hier auf `localhost` zurück, weil in der Produktion
 * keine Variable gesetzt ist, verweist jede geteilte Vorschau und jeder
 * Feed-Eintrag ins Nichts — der Fehler ist im Browser unsichtbar und fällt erst
 * auf, wenn jemand einen Link in LinkedIn oder WhatsApp einfügt. Deshalb im
 * Produktionsbetrieb ein harter Abbruch beim Build statt eines stillen
 * Fallbacks.
 *
 * `NEXT_PUBLIC_SITE_URL` geht vor `NEXTAUTH_URL`: die beiden dürfen
 * auseinanderlaufen (Auth hinter einem internen Host, Seite öffentlich hinter
 * einem Reverse-Proxy).
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXTAUTH_URL;

  if (!configured) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL (oder NEXTAUTH_URL) muss gesetzt sein — sonst zeigen Sitemap, Feed und Link-Vorschauen auf localhost.",
      );
    }
    return "http://localhost:3000";
  }

  // Ohne abschließenden Schrägstrich, damit `${SITE_URL}/blog` nie `//blog` wird.
  return configured.replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl();

/** Macht aus einem Pfad wie `/blog/abc` eine absolute URL. */
export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Name und Kurzname des Vereins — für Manifest, OpenGraph und JSON-LD. */
export const SITE_NAME = "WirtschaftsPhysik Alumni e.V.";
export const SITE_SHORT_NAME = "WiPhy Alumni";
export const SITE_DESCRIPTION =
  "Verein für Physik- und Wirtschaftsphysik-Alumni sowie Studierende der Universität Ulm. Statistische Physik, Modellbildung und Datenanalyse — angewendet auf reale Systeme.";
