import type { Metadata } from "next";

// Die Seite selbst ist eine Client-Komponente und kann keine Metadaten
// exportieren — ohne diesen Layout-Wrapper trüge der Tab nur den Vereinsnamen.
export const metadata: Metadata = { title: "Passwort vergessen" };

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
