import "@radix-ui/themes/styles.css";
import "./globals.css";
import AppThemeProvider from "@/components/AppThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Viewport } from "next";
import { Newsreader } from "next/font/google";
import { Bricolage_Grotesque } from "next/font/google";
import { Instrument_Sans } from "next/font/google";
import { Spline_Sans_Mono } from "next/font/google";

export const metadata = {
  title: {
    default: "WirtschaftsPhysik Alumni e.V.",
    template: "%s — WirtschaftsPhysik Alumni e.V.",
  },
  description:
    "Verein für Physik- und Wirtschaftsphysik-Alumni sowie Studierende der Universität Ulm. Statistische Physik, Modellbildung und Datenanalyse — angewendet auf reale Systeme.",
  icons: {
    icon: "/logo-plain.png",
  },
};

/**
 * `themeColor` färbt in iOS-Safari die Browserleiste. Der Wert hier ist nur
 * der Startwert für den hellen Modus — das eigentliche Umschalten übernimmt
 * das Inline-Skript unten bzw. `AppThemeProvider`, weil ein Media-Query-
 * basiertes theme-color den manuellen Umschalter ignorieren würde.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfbfa",
};

/* Fraunces/Space Grotesk wurden ersetzt: Newsreader (Editorial-Serif mit
   eigenwilliger Kursiven), Bricolage Grotesque (leicht schräge Grotesk fürs
   UI-Chrome), Instrument Sans für den Fließtext und Spline Sans Mono für
   Messwerte. */
const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${serif.variable} ${mono.variable} ${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Setzt Appearance *und* theme-color vor der Hydration, damit weder
          // die Seite noch die iOS-Browserleiste kurz falsch eingefärbt sind.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme-appearance");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme-appearance",t);document.documentElement.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#0b0d10":"#fbfbfa");}catch(e){}})();`,
          }}
        />
      </head>
      <body style={{ margin: 0 }} suppressHydrationWarning>
        <AppThemeProvider>
          {/* Millimeterpapier, Aurora und Korn liegen hinter der gesamten Seite. */}
          <div className="site-backdrop" aria-hidden="true">
            <div className="aurora" />
          </div>

          <div className="site-shell">
            <Header />
            <main className="site-main">{children}</main>
            <Footer />
          </div>
        </AppThemeProvider>
      </body>
    </html>
  );
}
