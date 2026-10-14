import type { Metadata } from "next";
import { LegalPage, LegalSections } from "@/components/LegalPage";
import { DATENSCHUTZ } from "./datenschutztext";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Datenschutzerklärung",
    description:
        "Welche personenbezogenen Daten der WirtschaftsPhysik Alumni e.V. verarbeitet, auf welcher Rechtsgrundlage, wie lange — und welche Rechte Betroffene haben.",
    path: "/datenschutz",
});

export default function DatenschutzPage() {
    return (
        <LegalPage
            title="Datenschutz"
            description="Welche Daten wir verarbeiten, wofür, wie lange — und welche Rechte du dabei hast."
        >
            <LegalSections document={DATENSCHUTZ} />
        </LegalPage>
    );
}
