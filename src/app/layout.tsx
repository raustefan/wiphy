import "./globals.css";
import AppThemeProvider from "@/components/AppThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Viewport } from "next";
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
  themeColor: "#fafafa",
};

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
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <AppThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppThemeProvider>
      </body>
    </html>
  );
}
