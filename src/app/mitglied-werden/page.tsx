import Link from "next/link";
import { CheckCircle2, Clock, Info, LayoutDashboard, Sparkles } from "lucide-react";
import { createAltchaChallenge } from "@/lib/server/altcha";
import { getOptionalUser } from "@/lib/server/authz";
import { getEditableUser } from "@/lib/server/services/userService";
import { getOpenApplication } from "@/lib/server/services/membershipService";
import { getFeeDefaults } from "@/lib/server/services/feeDefaultService";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { resolveFeeDefault } from "@/lib/feeDefaults";
import { deriveStudentYears, selectableStudentYears } from "@/lib/membership";
import {
    JOURNEY_STEPS,
    journeyStepIndex,
    resolveJourneyStage,
} from "@/lib/membershipJourney";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/format";
import { Badge, ButtonLink, Callout, Card, Container, Eyebrow, PageTitle } from "@/components/ui";
import { JourneyRail } from "./JourneyRail";
import { AccountPanel } from "./AccountPanel";
import { VerifyPanel } from "./VerifyPanel";
import { ApplicationWizard } from "./ApplicationWizard";
import { WithdrawApplicationButton } from "./WithdrawApplicationButton";

// Session, offener Antrag und die ALTCHA-Aufgabe sind pro Aufruf verschieden —
// diese Seite darf nie aus dem Cache kommen.
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
    title: "Mitglied werden",
    description:
        "In vier Schritten Mitglied im WirtschaftsPhysik Alumni e.V. werden: Konto anlegen, E-Mail bestätigen, Aufnahmeantrag stellen, Aufnahme durch den Vorstand.",
    path: "/mitglied-werden",
});

type Props = { searchParams: Promise<{ konto?: string }> };

function toDateInput(value: Date | null | undefined) {
    return value ? value.toISOString().slice(0, 10) : "";
}

export default async function MitgliedWerdenPage({ searchParams }: Props) {
    const [{ konto }, currentUser] = await Promise.all([searchParams, getOptionalUser()]);

    const profile = currentUser ? await getEditableUser(currentUser.id) : null;
    const status = profile?.status ?? currentUser?.status ?? "KEIN_MITGLIED";
    const isMember = status !== "KEIN_MITGLIED";

    const openApplication =
        currentUser && !isMember ? await getOpenApplication(currentUser.id) : null;

    const stage = resolveJourneyStage({
        signedIn: Boolean(currentUser),
        // Ohne bestätigte Adresse gibt es normalerweise gar keine Sitzung; der
        // Fall bleibt trotzdem abgedeckt, weil eine Adressänderung das Konto
        // vorübergehend wieder auf „unbestätigt“ setzt.
        emailVerified: profile?.emailVerified ?? true,
        isMember,
        hasOpenApplication: openApplication != null,
        justRegistered: konto === "erstellt",
    });

    const step = JOURNEY_STEPS[journeyStepIndex(stage)];

    // Die Aufgabe wird auf dem Server erzeugt und in der Seite mitgeliefert:
    // das Widget löst sie lokal, es gibt also keinen Endpunkt, der ausfallen
    // könnte. Nur die erste Station braucht sie.
    const challenge = stage === "konto" ? await createAltchaChallenge() : null;

    return (
        <Container size="3" className="py-8 sm:py-12">
            <header className="grid gap-2">
                <Eyebrow>
                    <Sparkles size={14} aria-hidden="true" />
                    Mitgliedschaft
                </Eyebrow>
                <PageTitle>Mitglied werden</PageTitle>
                <p className="max-w-prose text-sm leading-relaxed text-muted text-pretty sm:text-base">
                    Vier Schritte, ein paar Minuten. Du kannst jederzeit unterbrechen und
                    später weitermachen — wir zeigen dir hier immer, was als Nächstes dran
                    ist.
                </p>
            </header>

            <div className="mt-6 sm:mt-8">
                <JourneyRail stage={stage} />
            </div>

            <div className="mt-6 grid gap-4 sm:mt-8">
                {/* Der Antrag bringt eigene Schrittüberschriften mit — eine
                    Überschrift darüber, die dasselbe noch einmal sagt, kostet
                    auf dem Telefon nur Höhe. */}
                {step && stage !== "antrag" && (
                    <div className="grid gap-1">
                        <h2 className="text-xl font-bold tracking-tight text-balance">
                            {step.title}
                        </h2>
                        <p className="max-w-prose text-sm text-muted text-pretty">
                            {step.description}
                        </p>
                    </div>
                )}

                {stage === "konto" && challenge && (
                    <Card className="p-5 sm:p-6">
                        <AccountPanel challengeJson={JSON.stringify(challenge)} />
                    </Card>
                )}

                {stage === "bestaetigung" && (
                    <Card className="p-5 sm:p-6">
                        <VerifyPanel email={profile?.email ?? currentUser?.email ?? null} />
                    </Card>
                )}

                {stage === "antrag" && currentUser && <ApplicationStage profile={profile} />}

                {stage === "pruefung" && openApplication && (
                    <Card className="grid gap-4 p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge tone="warning">
                                <Clock size={14} aria-hidden="true" />
                                In Bearbeitung
                            </Badge>
                            <span className="text-sm text-muted">
                                eingereicht am {formatDate(openApplication.submittedAt)}
                            </span>
                        </div>
                        <p className="max-w-prose text-sm text-muted text-pretty">
                            Dein Aufnahmeantrag liegt dem Vorstand vor. Über die Aufnahme wird
                            in einer Vorstandssitzung entschieden — bis dahin besteht noch
                            keine Mitgliedschaft und keine Beitragspflicht. Du erhältst eine
                            Nachricht, sobald entschieden wurde.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <ButtonLink href="/dashboard" variant="soft" color="neutral">
                                <LayoutDashboard size={15} aria-hidden="true" />
                                Zum Mitgliederbereich
                            </ButtonLink>
                            <WithdrawApplicationButton applicationId={openApplication.id} />
                        </div>
                    </Card>
                )}

                {stage === "mitglied" && (
                    <Card className="grid gap-3 p-5 sm:p-6">
                        <Badge tone="positive" className="justify-self-start">
                            <CheckCircle2 size={14} aria-hidden="true" />
                            Mitgliedschaft aktiv
                        </Badge>
                        <p className="max-w-prose text-sm text-muted text-pretty">
                            Für dein Konto besteht bereits eine Mitgliedschaft — hier ist also
                            nichts mehr zu tun. Deine Daten pflegst du im Mitgliederbereich.
                        </p>
                        <ButtonLink href="/dashboard" className="justify-self-start">
                            <LayoutDashboard size={15} aria-hidden="true" />
                            Zum Mitgliederbereich
                        </ButtonLink>
                    </Card>
                )}

                {currentUser && (
                    <p className="text-xs text-faint">
                        Angemeldet als {currentUser.email ?? profile?.email}.{" "}
                        <Link href="/dashboard" className="underline underline-offset-2">
                            Mitgliederbereich
                        </Link>
                    </p>
                )}
            </div>
        </Container>
    );
}

/**
 * Dritte Station: der Antrag selbst.
 *
 * Eigene Komponente, weil hier als Einziges noch Beitragssätze und der
 * Feature-Schalter gebraucht werden — beides wäre für die anderen Stationen
 * eine Datenbankabfrage ohne Abnehmer.
 */
async function ApplicationStage({
    profile,
}: {
    profile: Awaited<ReturnType<typeof getEditableUser>>;
}) {
    const [feeDefaults, featureEnabled] = await Promise.all([
        getFeeDefaults(),
        isFeatureEnabled("MEMBERSHIP_APPLICATION"),
    ]);

    if (!featureEnabled) {
        return (
            <Callout tone="warning" icon={<Info size={16} />}>
                Die Online-Antragstellung ist derzeit deaktiviert. Bitte wende dich für eine
                Mitgliedschaft direkt an den Vorstand.
            </Callout>
        );
    }

    const currentYear = new Date().getFullYear();

    return (
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
                kontoinhaber: `${profile?.vorname ?? ""} ${profile?.name ?? ""}`.trim(),
                IBAN: profile?.IBAN ?? "",
                BIC: profile?.BIC ?? "",
                bank: profile?.bank ?? "",
            }}
            selectableYears={selectableStudentYears(currentYear)}
            preselectedYears={deriveStudentYears(profile?.studienende, currentYear)}
            rates={resolveFeeDefault(feeDefaults, currentYear)}
            feeYear={currentYear}
        />
    );
}
