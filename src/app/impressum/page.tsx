import type { Metadata } from "next";
import { LegalPage, LegalSections } from "@/components/LegalPage";
import { IMPRESSUM } from "./impressumstext";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Impressum",
    description:
        "Anbieterkennzeichnung nach § 5 TMG: Anschrift, vertretungsberechtigter Vorstand und Registereintrag des WirtschaftsPhysik Alumni e.V.",
    path: "/impressum",
});

export default function ImpressumPage() {
    return (
        <LegalPage title="Impressum">
            <LegalSections document={IMPRESSUM} separators />
        </LegalPage>
    );
}
