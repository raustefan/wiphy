import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/siteUrl";

/**
 * Baut die Metadaten einer öffentlichen Seite.
 *
 * Der Grund für den Helfer ist eine Eigenheit von Next: `openGraph` wird
 * **nicht** mit dem Layout zusammengeführt, sondern ersetzt. Eine Seite, die
 * nur Titel und Beschreibung setzt, verliert damit `og:site_name`, `og:locale`
 * *und* das Vorschaubild aus `app/opengraph-image.tsx` — und wird beim Teilen
 * wieder zum nackten Link. Statt dieselben vier Felder auf jeder Seite von Hand
 * zu wiederholen (und auf der nächsten neuen Seite zu vergessen), stehen sie
 * hier einmal.
 */

/** Das gezeichnete Standardbild aus `app/opengraph-image.tsx`. */
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

export type OgImage = { url: string; width?: number; height?: number; alt?: string };

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  images,
  article,
}: {
  title: string;
  description: string;
  /** Pfad mit führendem Schrägstrich; wird zu `canonical` und `og:url`. */
  path: string;
  type?: "website" | "article";
  /** Eigene Vorschaubilder; ohne Angabe das Standardbild. */
  images?: OgImage[];
  article?: { publishedTime?: string; modifiedTime?: string; authors?: string[] };
}): Metadata {
  const ogImages = images?.length ? images : [DEFAULT_OG_IMAGE];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "de_DE",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: ogImages,
      ...(type === "article" ? article : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((image) => image.url),
    },
  };
}
