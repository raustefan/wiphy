import type { Metadata } from "next";

// Die Seite selbst ist eine Client-Komponente und kann keine Metadaten
// exportieren — ohne diesen Layout-Wrapper trüge der Tab nur den Vereinsnamen.
// Hilfsseiten ohne Inhalt: nicht in den Suchindex — sonst erbten sie
// obendrein `canonical: "/"` aus dem Root-Layout.
export const metadata: Metadata = { title: "Neues Passwort festlegen", robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
