import "./globals.css";
import AppThemeProvider from "@/components/AppThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallHint from "@/components/InstallHint";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Instrument_Sans } from "next/font/google";
import { Spline_Sans_Mono } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/siteUrl";
import { OrganizationJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  /**
   * `metadataBase` macht aus jedem relativen Pfad in `openGraph`/`twitter` eine
   * absolute URL. Ohne ihn lässt Next diese Felder weg — die Vorschau in
   * LinkedIn oder WhatsApp bliebe leer, ohne dass irgendwo ein Fehler auftaucht.
   */
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo-plain.png",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/blog/feed.xml", title: `${SITE_NAME} — Blog` }],
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE_NAME,
    url: "/",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

/**
 * `themeColor` färbt in iOS-Safari die Browserleiste. Der Wert hier ist nur
 * der Startwert für den hellen Modus — das eigentliche Umschalten übernimmt
 * das Inline-Skript unten bzw. `AppThemeProvider`, weil ein Media-Query-
 * basiertes theme-color den manuellen Umschalter ignorieren würde.
 */
export async function generateViewport(): Promise<Viewport> {
  const userAgent = (await headers()).get("user-agent") ?? "";
  return {
    width: "device-width",
    initialScale: 1,
    // iOS-Safari zoomt beim Antippen eines Formularfelds heran und nicht wieder
    // heraus. `maximum-scale=1` unterbindet dort nur diesen Auto-Zoom, Pinch-
    // Zoom erlaubt Safari trotzdem. Nur für iOS: Android würde damit wirklich
    // das Zoomen sperren. iPadOS meldet sich als Mac, ist aber am Server nicht
    // von einem Mac zu unterscheiden; dort bleibt es bei den 16-px-Feldern.
    // Serverseitig, weil Next das Meta-Tag nach der Hydration neu setzt.
    ...(/iPhone|iPad|iPod/.test(userAgent) && { maximumScale: 1 }),
    // Ohne `cover` liefert `env(safe-area-inset-*)` auf iOS immer 0 — die
    // Daumenleiste säße dann unter der Home-Leiste.
    viewportFit: "cover",
    themeColor: "#fafafa",
  };
}

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Setzt Appearance *und* theme-color vor der Hydration, damit weder
          // die Seite noch die iOS-Browserleiste kurz falsch eingefärbt sind.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme-appearance");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme-appearance",t);document.documentElement.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#0a0a0b":"#fafafa");}catch(e){}})();`,
          }}
        />
      </head>
      <body
        // Platz für die fixe Daumenleiste (nur Telefon), damit sie den Footer
        // nicht verdeckt.
        className="flex min-h-dvh flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0"
        suppressHydrationWarning
      >
        <OrganizationJsonLd />
        <AppThemeProvider>
          {/* Sprungmarke: ohne sie führt jeder Tastaturbesuch zuerst durch
              Wortmarke, sechs Navigationspunkte, Themenumschalter und
              Mitgliederknopf — auf jeder Unterseite erneut. Sichtbar wird sie
              nur im Fokus. */}
          <a
            href="#inhalt"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-physics focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-physics focus:outline-2 focus:outline-offset-2 focus:outline-physics"
          >
            Zum Inhalt springen
          </a>
          <Header />
          <main id="inhalt" className="flex-1">
            {children}
          </main>
          <Footer />
          <InstallHint />
        </AppThemeProvider>
      </body>
    </html>
  );
}
