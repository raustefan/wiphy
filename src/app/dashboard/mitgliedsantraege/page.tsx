import { HugeiconsIcon } from "@hugeicons/react";
import { Door01Icon, FileAttachmentIcon, InformationCircleIcon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/server/authz";
import { getApplications, getMaxMemberNumber } from "@/lib/server/services/membershipService";
import { getFeeDefaults } from "@/lib/server/services/feeDefaultService";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { planApplicationFees } from "@/lib/feeDefaults";
import { Callout, Card, Container, EmptyState } from "@/components/ui";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { ApplicationList } from "./ApplicationList";
import { TerminationList } from "./TerminationList";
import { SectionHeader } from "../SectionHeader";
import { getTerminations, processTerminations } from "@/lib/server/services/terminationService";

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
        maxMemberNumber,
        terminations,
        terminationEnabled,
        terminationMailEnabled,
    ] = await Promise.all([
            getApplications(),
            getFeeDefaults(),
            isFeatureEnabled("MEMBERSHIP_APPLICATION"),
            isFeatureEnabled("MEMBERSHIP_APPLICATION_MAIL"),
            getMaxMemberNumber(),
            getTerminations(),
            isFeatureEnabled("MEMBERSHIP_TERMINATION"),
            isFeatureEnabled("MEMBERSHIP_TERMINATION_MAIL"),
        ]);
    // Vorschau der ID, die eine Annahme vergeben würde (nächste freie ID).
    const nextMemberNumber = maxMemberNumber + 1;

    // Vorschau für „heute beschlossen“; die Annahme rechnet mit dem im Dialog
    // gewählten Beschlussdatum neu.
    const today = new Date();
    const openCount = applications.filter((a) => a.status === "SUBMITTED").length;

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
            memberNumber: application.user.memberNumber,
        },
        firstName: application.firstName,
        lastName: application.lastName,
        title: application.title,
        birthDate: application.birthDate.toISOString(),
        addressLine1: application.addressLine1,
        addressLine2: application.addressLine2,
        postalCode: application.postalCode,
        city: application.city,
        region: application.region,
        countryCode: application.countryCode,
        phone: application.phone,
        degreeProgram: application.degreeProgram,
        studyStart: application.studyStart?.toISOString() ?? null,
        studyEnd: application.studyEnd?.toISOString() ?? null,
        employer: application.employer,
        employmentStatus: application.employmentStatus,
        industry: application.industry,
        jobTitle: application.jobTitle,
        studentYears: application.studentYears,
        accountHolder: application.accountHolder,
        iban: application.iban,
        bic: application.bic,
        mandateSignedAt: application.mandateSignedAt?.toISOString() ?? null,
        regularFeeSnapshot: application.regularFeeSnapshot,
        studentFeeSnapshot: application.studentFeeSnapshot,
        feePlan: planApplicationFees({
            joinedAt: today,
            studentYears: application.studentYears,
            defaults: feeDefaults,
            directDebit: application.directDebit,
        }),
    }));

    const terminationItems = terminations.map((t) => ({
        id: t.id,
        status: t.status,
        effectiveAt: t.effectiveAt.toISOString(),
        decisionNote: t.decisionNote,
        completedAt: t.completedAt?.toISOString() ?? null,
        deleteWhenSettled: t.deleteWhenSettled,
        member: {
            id: t.user.id,
            email: t.user.email,
            firstName: t.user.firstName,
            lastName: t.user.lastName,
            memberNumber: t.user.memberNumber,
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
                <Callout tone="warning" icon={<HugeiconsIcon icon={InformationCircleIcon} size={16} />} className="mb-4">
                    Die Online-Antragstellung ist deaktiviert. Neue Anträge können derzeit nicht
                    gestellt werden — bereits eingegangene Anträge lassen sich hier weiterhin
                    bearbeiten.
                </Callout>
            )}

            {!mailEnabled && applicationEnabled && (
                <Callout tone="warning" icon={<HugeiconsIcon icon={InformationCircleIcon} size={16} />} className="mb-4">
                    Die Mail-Benachrichtigung für neue Anträge ist deaktiviert. Neue Anträge
                    landen nur hier — bitte regelmäßig prüfen.
                </Callout>
            )}

            {feeDefaults.length === 0 && (
                <Callout tone="warning" icon={<HugeiconsIcon icon={InformationCircleIcon} size={16} />} className="mb-4">
                    Es sind noch keine Standard-Beitragssätze hinterlegt. Antragstellern wird
                    deshalb 0 € angezeigt, und eine Annahme legt Beiträge in Höhe von 0 € an.
                    Bitte zuerst unter „Beiträge“ die Sätze pflegen.
                </Callout>
            )}

            {items.length === 0 ? (
                <Card>
                    <EmptyState
                        icon={<HugeiconsIcon icon={FileAttachmentIcon} size={22} />}
                        title="Noch keine Mitgliedsanträge"
                        description="Anträge aus dem Mitgliederbereich landen hier zur Entscheidung durch den Vorstand."
                    />
                </Card>
            ) : (
                <ApplicationList applications={items} nextMemberNumber={nextMemberNumber} />
            )}

            <div className="mt-10 grid gap-4">
                <SectionHeader
                    icon={<HugeiconsIcon icon={Door01Icon} size={16} />}
                    eyebrow="Kündigungen"
                    title="Austritte"
                    description="Mitglieder treten mit sofortiger Wirkung aus. Ohne offene Beiträge wird das Konto sofort gelöscht und erscheint hier nicht; sonst bleibt es, bis die Beiträge als bezahlt markiert sind."
                />
                {!terminationEnabled && (
                    <Callout tone="warning" icon={<HugeiconsIcon icon={InformationCircleIcon} size={16} />}>
                        Die Online-Kündigung ist deaktiviert. Mitglieder werden auf Kontaktformular
                        und E-Mail an den Vorstand verwiesen — solche Kündigungen erscheinen nicht
                        hier und müssen von Hand erfasst werden (Status im Profil).
                    </Callout>
                )}
                {terminationEnabled && !terminationMailEnabled && (
                    <Callout tone="warning" icon={<HugeiconsIcon icon={InformationCircleIcon} size={16} />}>
                        Die Mail-Benachrichtigung für Austritte ist deaktiviert. Austritte ohne
                        offene Beiträge löschen das Konto sofort und sind dann nirgends mehr zu
                        sehen — der Vorstand erfährt davon nichts.
                    </Callout>
                )}
                {terminationItems.length === 0 ? (
                    <Card>
                        <EmptyState
                            icon={<HugeiconsIcon icon={Door01Icon} size={22} />}
                            title="Keine Austritte"
                            description="Ausgetretene mit offenen Beiträgen erscheinen hier, bis ihr Konto gelöscht ist."
                        />
                    </Card>
                ) : (
                    <TerminationList terminations={terminationItems} />
                )}
            </div>
        </Container>
    );
}
