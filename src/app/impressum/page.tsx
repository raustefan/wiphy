import type { Metadata } from "next";
import { LegalPage, LegalSections } from "@/components/LegalPage";
import { impressum } from "./impressumstext";
import { getSignatureBoardMembers } from "@/lib/server/services/boardService";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Impressum",
    description:
        "Anbieterkennzeichnung nach § 5 TMG: Anschrift, vertretungsberechtigter Vorstand und Registereintrag des WirtschaftsPhysik Alumni e.V.",
    path: "/impressum",
});

export default async function ImpressumPage() {
    const board = await getSignatureBoardMembers();
    return (
        <LegalPage title="Impressum">
            <LegalSections document={impressum(board)} separators />
        </LegalPage>
    );
}
