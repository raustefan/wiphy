import { LegalPage, LegalSections } from "@/components/LegalPage";
import { DATENSCHUTZ } from "./datenschutztext";

export default function DatenschutzPage() {
    return (
        <LegalPage title="Datenschutzerklärung">
            <LegalSections document={DATENSCHUTZ} separators />
        </LegalPage>
    );
}
