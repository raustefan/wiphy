import "@radix-ui/themes/styles.css";
import "./globals.css";
import AppThemeProvider from "@/components/AppThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Fraunces } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";

export const metadata = {
  title: "WirtschaftsPhysik Alumni e.V.",
  description: "Die offizielle Vereinswebsite des WirtschaftsPhysik Alumni e.V.",
  icons: {
    icon: "/logo-plain.png",
  },
};

// app/layout.tsx (Ausschnitt)

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600"],
  style: ["italic", "normal"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

// im <html> oder <body>: className={`${serif.variable} ${mono.variable}`}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script
          // Sets the appearance attribute before hydration to avoid a flash of the wrong theme.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme-appearance");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme-appearance",t);}catch(e){}})();`,
          }}
        />
      </head>
      <body style={{ margin: 0 }} suppressHydrationWarning>
        <AppThemeProvider>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ flex: 1, padding: "24px 16px" }}>
              {children}
            </main>
            <Footer />
          </div>
        </AppThemeProvider>
      </body>
    </html>
  );
}