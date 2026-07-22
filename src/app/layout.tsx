import "@radix-ui/themes/styles.css";
import "./globals.css"; 
import { Theme } from "@radix-ui/themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "WirtschaftsPhysik Alumni e.V.",
  description: "Die offizielle Vereinswebsite des WirtschaftsPhysik Alumni e.V.",
  icons: {
    icon: "public/logo-plain.png", // <-- Add this line inside metadata
  },
};

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