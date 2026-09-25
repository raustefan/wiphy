import type { Metadata } from "next";
import { DoorOpen, FileText, Info } from "lucide-react";
import { requireAdmin } from "@/lib/server/authz";
import { getApplications, getMaxMitgliedId } from "@/lib/server/services/membershipService";
import { getFeeDefaults } from "@/lib/server/services/feeDefaultService";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { planApplicationFees } from "@/lib/feeDefaults";
import { Callout, Card, Container, EmptyState } from "@/components/ui";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { ApplicationList } from "./ApplicationList";
import { TerminationList } from "./TerminationList";
import { SectionHeader } from "../SectionHeader";
import { getTerminations, processTerminations } from "@/lib/server/services/terminationService";
import { isTerminationDue } from "@/lib/membershipTermination";

export const metadata: Metadata = { title: "Anträge & Austritte" };

export const dynamic = "force-dynamic";

export default async function MembershipApplicationsPage() {
    await requireAdmin();
    // Vor dem Laden: fällige Austritte sollen hier schon vollzogen erscheinen.
    await processTerminations();

    const [
        applications,
        feeDefaults,
        applicationEnabled,
        mailEnabled,
        maxMitgliedId,
        terminations,
        terminationEnabled,
        terminationMailEnabled,
        terminationConfirmationMailEnabled,
    ] = await Promise.all([
            getApplications(),
            getFeeDefaults(),
            isFeatureEnabled("MEMBERSHIP_APPLICATION"),
            isFeatureEnabled("MEMBERSHIP_APPLICATION_MAIL"),
            getMaxMitgliedId(),
            getTerminations(),
            isFeatureEnabled("MEMBERSHIP_TERMINATION"),
            isFeatureEnabled("MEMBERSHIP_TERMINATION_MAIL"),
            isFeatureEnabled("MEMBERSHIP_TERMINATION_CONFIRMATION_MAIL"),
        ]);
    // Vorschau der ID, die eine Annahme vergeben würde (nächste freie ID).
    const nextMitgliedId = maxMitgliedId + 1;

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
        mandatDatum: application.mandatDatum?.toISOString() ?? null,
        beitragRegularSnapshot: application.beitragRegularSnapshot,
        beitragStudentSnapshot: application.beitragStudentSnapshot,
        feePlan: planApplicationFees({
            aufnahmedatum: today,
            studentYears: application.studentYears,
            defaults: feeDefaults,
            bankeinzug: application.bankeinzug,
        }),
    }));

    const terminationItems = terminations.map((t) => ({
        id: t.id,
        status: t.status,
        submittedAt: t.submittedAt.toISOString(),
        effectiveAt: t.effectiveAt.toISOString(),
        keepAccount: t.keepAccount,
        decisionNote: t.decisionNote,
        completedAt: t.completedAt?.toISOString() ?? null,
        overdue: t.status === "EINGEREICHT" && isTerminationDue(t.effectiveAt, today),
        member: {
            id: t.user.id,
            email: t.user.email,
            vorname: t.user.vorname,
            name: t.user.name,
            mitgliedId: t.user.mitgliedId,
            loginDisabled: t.user.loginDisabled,
        },
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
                <Card>
                    <EmptyState
                        icon={<FileText size={22} />}
                        title="Noch keine Mitgliedsanträge"
                        description="Anträge aus dem Mitgliederbereich landen hier zur Entscheidung durch den Vorstand."
                    />
                </Card>
            ) : (
                <ApplicationList applications={items} nextMitgliedId={nextMitgliedId} />
            )}

            <div className="mt-10 grid gap-4">
                <SectionHeader
                    icon={<DoorOpen size={16} />}
                    eyebrow="Kündigungen"
                    title="Austritte"
                    description="Austrittserklärungen aus dem Mitgliederbereich. Nach der Bestätigung wird der Status am Tag nach dem Austrittsdatum automatisch auf „Kein Mitglied“ gesetzt."
                />
                {!terminationEnabled && (
                    <Callout tone="warning" icon={<Info size={16} />}>
                        Die Online-Kündigung ist deaktiviert. Mitglieder werden auf Kontaktformular
                        und E-Mail an den Vorstand verwiesen — solche Kündigungen erscheinen nicht
                        hier und müssen von Hand erfasst werden (Status im Profil).
                    </Callout>
                )}
                {terminationEnabled && !terminationMailEnabled && (
                    <Callout tone="warning" icon={<Info size={16} />}>
                        Die Mail-Benachrichtigung für Kündigungen ist deaktiviert. Neue Kündigungen
                        landen nur hier — bitte regelmäßig prüfen, die Frist läuft ab Eingang.
                    </Callout>
                )}
                {!terminationConfirmationMailEnabled && (
                    <Callout tone="warning" icon={<Info size={16} />}>
                        Die Mails an Mitglieder zur Kündigung sind deaktiviert. Eine Bestätigung
                        verschickt dann keine Mail — bitte den Austritt anderweitig schriftlich
                        bestätigen.
                    </Callout>
                )}
                {terminationItems.length === 0 ? (
                    <Card>
                        <EmptyState
                            icon={<DoorOpen size={22} />}
                            title="Keine Austritte"
                            description="Kündigungen von Mitgliedern erscheinen hier zur Bestätigung."
                        />
                    </Card>
                ) : (
                    <TerminationList
                        terminations={terminationItems}
                        mailEnabled={terminationConfirmationMailEnabled}
                    />
                )}
            </div>
        </Container>
    );
}
