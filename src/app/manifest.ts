import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME } from "@/lib/siteUrl";

/**
 * Damit die Seite sich auf dem Homescreen wie eine App verhält statt als
 * namenloses Lesezeichen mit Screenshot-Icon zu landen.
 *
 * `theme_color` ist der helle Startwert wie in `layout.tsx`; das eigentliche
 * Umschalten macht weiterhin das Inline-Skript. Ein Manifest kann nur *einen*
 * Wert haben, und der helle ist der häufigere Erstkontakt.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    lang: "de",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#fafafa",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
