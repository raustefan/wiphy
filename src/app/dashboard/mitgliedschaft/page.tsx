import { CheckCircle2, Clock, Info } from "lucide-react";
import { requireUser } from "@/lib/server/authz";
import { getEditableUser } from "@/lib/server/services/userService";
import { getOpenApplication } from "@/lib/server/services/membershipService";
import { getFeeDefaults } from "@/lib/server/services/feeDefaultService";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { resolveFeeDefault } from "@/lib/feeDefaults";
import { deriveStudentYears, selectableStudentYears } from "@/lib/membership";
import { Badge, Callout, Card, Container } from "@/components/ui";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { formatDate } from "@/lib/format";
import { ApplicationWizard } from "./ApplicationWizard";
import { WithdrawApplicationButton } from "./WithdrawApplicationButton";

export const dynamic = "force-dynamic";

function toDateInput(value: Date | null | undefined) {
    return value ? value.toISOString().slice(0, 10) : "";
}

export default async function MembershipApplicationPage() {
    const currentUser = await requireUser();

    const [profile, openApplication, feeDefaults, featureEnabled] = await Promise.all([
        getEditableUser(currentUser.id),
        getOpenApplication(currentUser.id),
        getFeeDefaults(),
        isFeatureEnabled("MEMBERSHIP_APPLICATION"),
    ]);

    const currentYear = new Date().getFullYear();
    const rates = resolveFeeDefault(feeDefaults, currentYear);

    const header = (
        <DashboardPageHeader
            eyebrow="Mitgliederbereich"
            title="Vereinsmitgliedschaft beantragen"
            description="In fünf Schritten zum Aufnahmeantrag beim WirtschaftsPhysik Alumni e.V."
            backHref="/dashboard"
        />
    );

    // Bereits Mitglied: der Antrag wäre gegenstandslos.
    if (profile && profile.status !== "KEIN_MITGLIED") {
        return (
            <Container size="3" className="py-8 sm:py-12">
                {header}
                <Card className="grid gap-3 p-6">
                    <Badge tone="positive" className="justify-self-start">
                        <CheckCircle2 size={14} aria-hidden="true" />
                        Mitgliedschaft aktiv
                    </Badge>
                    <p className="text-sm text-muted text-pretty">
                        Für dein Konto besteht bereits eine Mitgliedschaft. Deine Daten
                        pflegst du in der Mitgliederselbstverwaltung.
                    </p>
                </Card>
            </Container>
        );
    }

    // Offener Antrag: Status statt Formular, sonst entstehen Doppelanträge.
    if (openApplication) {
        return (
            <Container size="3" className="py-8 sm:py-12">
                {header}
                <Card className="grid gap-4 p-6">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="warning">
                            <Clock size={14} aria-hidden="true" />
                            In Bearbeitung
                        </Badge>
                        <span className="text-sm text-muted">
                            eingereicht am{" "}
                            {formatDate(openApplication.submittedAt)}
                        </span>
                    </div>
                    <p className="max-w-prose text-sm text-muted text-pretty">
                        Dein Aufnahmeantrag liegt dem Vorstand vor. Über die Aufnahme wird in
                        einer Vorstandssitzung entschieden — bis dahin besteht noch keine
                        Mitgliedschaft und keine Beitragspflicht. Du erhältst eine Nachricht,
                        sobald entschieden wurde.
                    </p>
                    <WithdrawApplicationButton applicationId={openApplication.id} />
                </Card>
            </Container>
        );
    }

    if (!featureEnabled) {
        return (
            <Container size="3" className="py-8 sm:py-12">
                {header}
                <Callout tone="warning" icon={<Info size={16} />}>
                    Die Online-Antragstellung ist derzeit deaktiviert. Bitte wende dich für eine
                    Mitgliedschaft direkt an den Vorstand.
                </Callout>
            </Container>
        );
    }

    return (
        <Container size="3" className="py-8 sm:py-12">
            {header}
            <ApplicationWizard
                initial={{
                    vorname: profile?.vorname ?? "",
                    name: profile?.name ?? "",
                    titel: profile?.titel ?? "",
                    geburtsdatum: toDateInput(profile?.geburtsdatum),
                    strasse: profile?.strasse ?? "",
                    plz: profile?.plz ?? "",
                    stadt: profile?.stadt ?? "",
                    land: profile?.land ?? "Deutschland",
                    telefon: profile?.telefon ?? "",
                    studiengang: profile?.studiengang ?? "",
                    studienbeginn: toDateInput(profile?.studienbeginn),
                    studienende: toDateInput(profile?.studienende),
                    arbeitgeber: profile?.arbeitgeber ?? "",
                    berufsstand: profile?.berufsstand ?? "",
                    berufszweig: profile?.berufszweig ?? "",
                    position: profile?.position ?? "",
                    kontoinhaber:
                        `${profile?.vorname ?? ""} ${profile?.name ?? ""}`.trim(),
                    IBAN: profile?.IBAN ?? "",
                    BIC: profile?.BIC ?? "",
                    bank: profile?.bank ?? "",
                }}
                selectableYears={selectableStudentYears(currentYear)}
                preselectedYears={deriveStudentYears(profile?.studienende, currentYear)}
                rates={rates}
                feeYear={currentYear}
            />
        </Container>
    );
}
