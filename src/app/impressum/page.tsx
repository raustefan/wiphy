import { LegalPage, LegalSections } from "@/components/LegalPage";
import { IMPRESSUM } from "./impressumstext";

export default function ImpressumPage() {
    return (
        <LegalPage title="Impressum">
            <LegalSections document={IMPRESSUM} separators />
        </LegalPage>
    );
}
