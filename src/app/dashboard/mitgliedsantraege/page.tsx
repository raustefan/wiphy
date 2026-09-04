import { Info } from "lucide-react";
import { requireAdmin } from "@/lib/server/authz";
import { getApplications } from "@/lib/server/services/membershipService";
import { getFeeDefaults } from "@/lib/server/services/feeDefaultService";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { planApplicationFees } from "@/lib/feeDefaults";
import { Callout, Card, Container } from "@/components/ui";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { ApplicationList } from "./ApplicationList";

export const dynamic = "force-dynamic";

export default async function MembershipApplicationsPage() {
    await requireAdmin();

    const [applications, feeDefaults, applicationEnabled, mailEnabled] = await Promise.all([
        getApplications(),
        getFeeDefaults(),
        isFeatureEnabled("MEMBERSHIP_APPLICATION"),
        isFeatureEnabled("MEMBERSHIP_APPLICATION_MAIL"),
    ]);

    // Vorschau für „heute beschlossen“; die Annahme rechnet mit dem im Dialog
    // gewählten Beschlussdatum neu.
    const today = new Date();
    const openCount = applications.filter((a) => a.status === "EINGEREICHT").length;

    // Der Beitragsplan wird serverseitig vorberechnet, damit die Liste zeigen
    // kann, was eine Annahme konkret anlegen würde.
    const items = applications.map((application) => ({
        id: application.id,
        status: application.status,
        submittedAt: application.submittedAt.toISOString(),
        decidedAt: application.decidedAt?.toISOString() ?? null,
        decisionNote: application.decisionNote,
        mailedAt: application.mailedAt?.toISOString() ?? null,
        consentVersion: application.consentVersion,
        applicant: {
            id: application.user.id,
            email: application.user.email,
            status: application.user.status,
            mitgliedId: application.user.mitgliedId,
        },
        vorname: application.vorname,
        name: application.name,
        titel: application.titel,
        geburtsdatum: application.geburtsdatum.toISOString(),
        strasse: application.strasse,
        plz: application.plz,
        stadt: application.stadt,
        land: application.land,
        telefon: application.telefon,
        studiengang: application.studiengang,
        studienbeginn: application.studienbeginn?.toISOString() ?? null,
        studienende: application.studienende?.toISOString() ?? null,
        arbeitgeber: application.arbeitgeber,
        berufsstand: application.berufsstand,
        berufszweig: application.berufszweig,
        position: application.position,
        studentYears: application.studentYears,
        kontoinhaber: application.kontoinhaber,
        IBAN: application.IBAN,
        BIC: application.BIC,
        bank: application.bank,
        mandatDatum: application.mandatDatum.toISOString(),
        beitragRegularSnapshot: application.beitragRegularSnapshot,
        beitragStudentSnapshot: application.beitragStudentSnapshot,
        feePlan: planApplicationFees({
            aufnahmedatum: today,
            studentYears: application.studentYears,
            defaults: feeDefaults,
            bankeinzug: application.bankeinzug,
        }),
    }));

    return (
        <Container size="3" className="py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Admin"
                title="Mitgliedsanträge"
                description={
                    openCount === 1
                        ? "1 Antrag wartet auf eine Entscheidung."
                        : `${openCount} Anträge warten auf eine Entscheidung.`
                }
                backHref="/dashboard"
            />

            {!applicationEnabled && (
                <Callout tone="warning" icon={<Info size={16} />} className="mb-4">
                    Die Online-Antragstellung ist deaktiviert. Neue Anträge können derzeit nicht
                    gestellt werden — bereits eingegangene Anträge lassen sich hier weiterhin
                    bearbeiten.
                </Callout>
            )}

            {!mailEnabled && applicationEnabled && (
                <Callout tone="warning" icon={<Info size={16} />} className="mb-4">
                    Die Mail-Benachrichtigung für neue Anträge ist deaktiviert. Neue Anträge
                    landen nur hier — bitte regelmäßig prüfen.
                </Callout>
            )}

            {feeDefaults.length === 0 && (
                <Callout tone="warning" icon={<Info size={16} />} className="mb-4">
                    Es sind noch keine Standard-Beitragssätze hinterlegt. Antragstellern wird
                    deshalb 0 € angezeigt, und eine Annahme legt Beiträge in Höhe von 0 € an.
                    Bitte zuerst unter „Beiträge“ die Sätze pflegen.
                </Callout>
            )}

            {items.length === 0 ? (
                <Card className="p-6">
                    <p className="py-8 text-center text-sm text-muted">
                        Noch keine Mitgliedsanträge.
                    </p>
                </Card>
            ) : (
                <ApplicationList applications={items} />
            )}
        </Container>
    );
}
