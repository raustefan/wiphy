import type { Metadata } from "next";

// Die Seite ist eine Client-Komponente und kann keine Metadaten exportieren.
// `no-referrer`: der Token in der Adresse soll nicht über einen Link auf der
// Seite an fremde Server weitergereicht werden.
export const metadata: Metadata = {
    title: "Newsletter abbestellen",
    robots: { index: false, follow: false },
    referrer: "no-referrer",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
