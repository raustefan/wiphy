import "@radix-ui/themes/styles.css";
import "./globals.css"; 
import { Theme } from "@radix-ui/themes";
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
    <html lang="de">
      <body style={{ margin: 0 }}>
        {/* Wir wählen "teal" als Basis, biegen die Farbe aber per CSS exakt auf deines um */}
        <Theme accentColor="teal" grayColor="slate" radius="medium">
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ flex: 1, padding: "24px 16px" }}>
              {children}
            </main>
            <Footer />
          </div>
        </Theme>
      </body>
    </html>
  );
}