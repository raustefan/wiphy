import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, BookOpen01Icon, Bug01Icon, Calendar01Icon, ContactIcon, CreditCardIcon, FileAttachmentIcon, IdCardIcon, Key02Icon, Mail01Icon, SentIcon, ServerIcon, Shield01Icon, SlidersHorizontalIcon, SparklesIcon, ToggleOffIcon, UserCircleIcon, UserGroupIcon, UserIcon, UserSettings01Icon } from "@hugeicons/core-free-icons";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isDebugMode, requireUser } from "@/lib/server/authz";
import { toggleDebugMode } from "./actions";
import { MailSuccessDialog } from "./MailSuccessDialog";
import { getEditableUser } from "@/lib/server/services/userService";
import { getFeeDashboardData } from "@/lib/server/services/feeService";
import LogoutButton from "@/components/LogoutButton";
import { ProfileSummary } from "./ProfileSummary";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { formatStatus } from "@/lib/statusLabels";
import { formatDate, formatEuro } from "@/lib/format";
import {
    Badge,
    ButtonLink,
    Card,
    Container,
    Eyebrow,
    Separator,
} from "@/components/ui";
import { SectionHeader } from "./SectionHeader";
import { CtaCard } from "./CtaCard";
import { MembershipCertificateCard } from "./MembershipCertificateCard";
import { certificateFacts, isCertifiableStatus } from "@/lib/membershipCertificate";
import { countOpenApplications, getOpenApplication } from "@/lib/server/services/membershipService";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { getDashboardEvent } from "@/lib/server/services/eventService";
import { UpcomingEventAlert } from "./UpcomingEventAlert";
import { NewsletterRow } from "./NewsletterSettings";
import { processTerminations } from "@/lib/server/services/terminationService";
import { MEMBERSHIP_ADMIN_PATH, MEMBERSHIP_APPLICATION_PATH } from "@/lib/membership";

const ADMIN_ACTIONS = [
    { href: "/dashboard/users", label: "Benutzerverwaltung", description: "Konten, Rollen und Mitgliedsdaten", Icon: ContactIcon },
    { href: MEMBERSHIP_ADMIN_PATH, label: "Anträge & Austritte", description: "Aufnahmen bearbeiten, Austritte einsehen", Icon: FileAttachmentIcon },
    { href: "/dashboard/users/new", label: "Neuer User", description: "Konto anlegen oder importieren", Icon: UserIcon },
    { href: "/dashboard/mail", label: "Rundmail", description: "Nachricht an Mitglieder senden", Icon: SentIcon },
    { href: "/dashboard/termine", label: "Termine", description: "Veranstaltungen planen", Icon: Calendar01Icon },
    { href: "/dashboard/blog", label: "Blog", description: "Beiträge schreiben und pflegen", Icon: BookOpen01Icon },
    { href: "/dashboard/vorstand", label: "Vorstand", description: "Vorstandsseite aktualisieren", Icon: UserGroupIcon },
    { href: "/dashboard/kontakt", label: "Kontaktanfragen", description: "Nachrichten über das Formular", Icon: Mail01Icon },
    // Nur im Debug-Modus sichtbar und erreichbar (`requireDebugAdmin`).
    { href: "/dashboard/feature-flags", label: "Feature Flags", description: "Funktionen ein- und ausschalten", Icon: ToggleOffIcon, debug: true },
    { href: "/dashboard/security", label: "Sicherheit", description: "Protokoll und Rate-Limits", Icon: Shield01Icon, debug: true },
    { href: "/dashboard/server", label: "Server", description: "Systemzustand und Logs", Icon: ServerIcon, debug: true },
];

/**
 * Eine Angabe der Kopfleiste (Mitgliedschaft, Rolle, Account seit).
 *
 * Die drei standen vorher als eigene Karte mit drei Spalten unter dem Titel und
 * kosteten auf dem Telefon einen halben Bildschirm. Sie ändern sich praktisch
 * nie und tragen keine Aktion — als Zeile direkt unter der Begrüßung sind sie
 * abrufbar, ohne Platz von dem zu nehmen, weswegen man hier ist.
 */
function HeaderMeta({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="grid min-w-0 gap-0.5">
            <dt className="flex items-center gap-1.5 font-serif text-sm text-muted italic">
                <span aria-hidden="true">{icon}</span>
                {label}
            </dt>
            <dd className="min-w-0 truncate font-semibold text-foreground">{value}</dd>
        </div>
    );
}

/** Zeile der Konto-Karte: Icon, Bezeichnung, Pfeil. */
function AccountLink({ href, Icon, label }: { href: string; Icon: typeof Key02Icon; label: string }) {
    return (
        <li>
            <Link
                href={href}
                className="group flex items-center gap-3 py-3 font-medium transition-colors hover:text-physics focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
            >
                <HugeiconsIcon icon={Icon} size={18} aria-hidden="true" className="shrink-0 text-physics" />
                <span className="min-w-0 flex-1">{label}</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} aria-hidden="true" className="shrink-0 text-faint transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </Link>
        </li>
    );
}

export default async function DashboardPage() {
    const currentUser = await requireUser();
    const isAdmin = currentUser.role === "ADMIN";
    if (!currentUser.id) redirect("/login");
    // Huckepack wie das Aufräumen der Registrierungen: gedrosselt, ohne Cron.
    await processTerminations();
    const [profile, feeUsers] = await Promise.all([
        getEditableUser(currentUser.id),
        getFeeDashboardData(currentUser.id, "MEMBER"),
    ]);
    const myRecord = feeUsers.find((u) => u.id === currentUser.id);
    const myFees = myRecord?.fees || [];

    const currentYear = new Date().getFullYear();
    // Nur Beitragsjahre anzeigen, in denen das Mitglied auch dabei war: ein
    // Erstjahresmitglied sähe sonst zwei Jahre „Ausstehend“, für die es nie
    // beitragspflichtig war. Ohne Aufnahmedatum (Altbestand) bleibt es bei
    // den letzten drei Jahren.
    const membershipStartYear = myRecord?.joinedAt?.getFullYear() ?? null;
    const last3Years = [currentYear - 2, currentYear - 1, currentYear].filter(
        (year) => membershipStartYear == null || year >= membershipStartYear,
    );
    const userStatus = profile?.status ?? currentUser.status ?? "NON_MEMBER";
    const memberSince = profile?.createdAt ?? null;

    // Der Antrags-CTA ist nur für Konten ohne Mitgliedschaft relevant.
    const isNonMember = userStatus === "NON_MEMBER";
    // Nach einem Austritt mit offenen Beiträgen: die bleiben sichtbar und bezahlbar.
    const owesFees = myFees.some((f) => !f.paid && f.amount > 0);

    /*
     * Das Zertifikat gibt es für ordentliche Mitglieder und Ehrenmitglieder —
     * ein Konto ohne Mitgliedschaft hat nichts zu bescheinigen. Die Angaben
     * werden hier schon berechnet, damit die Kachel sie zeigen kann, ohne dass
     * jemand dafür das PDF öffnen muss.
     */
    const certificate = isCertifiableStatus(userStatus)
        ? certificateFacts({
              status: userStatus,
              joinedAt: profile?.joinedAt ?? null,
              fees: myFees,
              issuedAt: new Date(),
          })
        : null;
    const [openApplication, applicationEnabled, openApplicationCount, upcomingEvent, debugMode, kosmosEnabled, pdfEnabled] =
        await Promise.all([
            isNonMember ? getOpenApplication(currentUser.id) : null,
            isNonMember ? isFeatureEnabled("MEMBERSHIP_APPLICATION") : false,
            isAdmin ? countOpenApplications() : 0,
            getDashboardEvent(),
            isAdmin ? isDebugMode() : false,
            isNonMember ? false : isFeatureEnabled("KOSMOS"),
            certificate ? isFeatureEnabled("PDF_DOCUMENTS") : false,
        ]);
    const showApplicationCta = isNonMember && !owesFees && (applicationEnabled || openApplication != null);


    return (
        <Container size="4" className="py-8 sm:py-12">
            <Suspense fallback={null}>
                <MailSuccessDialog />
            </Suspense>
            <Suspense fallback={null}>
                <FeatureDisabledQueryDialog />
            </Suspense>

            {/* Ein Abstandsmaß für die ganze Seite: zwischen Kopf, Antrag und
                Raster liegt derselbe Wert wie zwischen zwei Karten darin. */}
            <div className="grid grid-cols-1 gap-6">
                {/* ---------- Kopf: Begrüßung, Stammdaten, Abmelden ---------- */}
                <header className="relative isolate grid gap-6 pt-4 pb-2">
                    <div aria-hidden="true" className="decor paper paper-fade absolute -inset-x-5 -top-12 bottom-0 -z-10 sm:-inset-x-8" />
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="grid min-w-0 gap-2">
                            <Eyebrow>Mitgliederbereich</Eyebrow>
                            <h1 className="display text-[clamp(2.75rem,8vw,5rem)] [overflow-wrap:anywhere]">
                                Hallo,{" "}
                                {profile?.firstName ?? profile?.lastName ?? currentUser.email ?? "Gast"}
                            </h1>
                        </div>
                        <LogoutButton />
                    </div>

                    <dl className="flex flex-col gap-4 border-t border-foreground pt-4 text-sm sm:flex-row sm:flex-wrap sm:gap-x-12">
                        <HeaderMeta
                            icon={<HugeiconsIcon icon={IdCardIcon} size={15} aria-hidden="true" />}
                            label="Mitgliedschaft"
                            value={formatStatus(userStatus)}
                        />
                        {isAdmin && (
                            <HeaderMeta
                                icon={<HugeiconsIcon icon={UserCircleIcon} size={15} aria-hidden="true" />}
                                label="Rolle"
                                value="Administrator"
                            />
                        )}
                        <HeaderMeta
                            icon={<HugeiconsIcon icon={Calendar01Icon} size={15} aria-hidden="true" />}
                            label="Account seit"
                            value={formatDate(memberSince)}
                        />
                    </dl>
                </header>

                {/* ---------- Admin-Aktionen ----------
                  Über die ganze Breite und vor allem anderen: wer hier als
                  Admin ist, ist meist zum Verwalten hier. In der Seitenspalte
                  waren die Einstiege eine schmale Linkliste; als Kacheln mit
                  Kurzbeschreibung findet man den Bereich ohne Lesen der Labels. */}
                {isAdmin && (
                    <Card className="p-5 sm:p-6">
                        <SectionHeader
                            icon={<HugeiconsIcon icon={SlidersHorizontalIcon} size={16} />}
                            eyebrow="Admin-Aktionen"
                            title="Verwaltung"
                            aside={
                                <form action={toggleDebugMode} className="self-start">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 rounded-[3px] border border-line px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                                    >
                                        <HugeiconsIcon icon={Bug01Icon} size={15} aria-hidden="true" className={debugMode ? "text-warning" : "text-faint"} />
                                        Debug-Modus
                                        <Badge tone={debugMode ? "warning" : "neutral"}>
                                            {debugMode ? "An" : "Aus"}
                                        </Badge>
                                    </button>
                                </form>
                            }
                        />
                        <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                            {ADMIN_ACTIONS.filter((a) => debugMode || !("debug" in a)).map(({ href, label, description, Icon, ...a }) => {
                                const isDebug = "debug" in a;
                                const count = href === MEMBERSHIP_ADMIN_PATH ? openApplicationCount : 0;
                                return (
                                    <li key={href} className="min-w-0">
                                        <Link
                                            href={href}
                                            className={`group relative flex h-full items-center gap-3 rounded-[3px] border p-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics ${
                                                isDebug
                                                    ? "border-dashed border-warning/50 bg-warning/5 hover:border-warning"
                                                    : "border-line-strong bg-surface hover:border-physics"
                                            }`}
                                        >
                                            <span
                                                className={`grid size-9 shrink-0 place-items-center rounded-[3px] transition-colors ${
                                                    isDebug
                                                        ? "bg-warning/15 text-warning"
                                                        : "border border-physics/40 text-physics group-hover:bg-physics group-hover:text-on-physics"
                                                }`}
                                                aria-hidden="true"
                                            >
                                                <HugeiconsIcon icon={Icon} size={17} />
                                            </span>
                                            <div className="grid min-w-0 flex-1 gap-0.5">
                                                {/* Umbrechen statt abschneiden: in zwei
                                                    Spalten auf dem Telefon passt
                                                    „Benutzerverwaltung“ sonst nicht. */}
                                                <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-serif text-base leading-snug font-medium text-foreground">
                                                    <span className="min-w-0 hyphens-auto break-words">{label}</span>
                                                    {count > 0 && <Badge tone="warning">{count} offen</Badge>}
                                                    {isDebug && <Badge tone="warning">Debug</Badge>}
                                                </span>
                                                <span className="hidden text-xs text-muted text-pretty sm:block">
                                                    {description}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </Card>
                )}

                {/*
                  Der Aufnahmeantrag steht über der ganzen Breite und über dem
                  Raster: für ein Konto ohne Mitgliedschaft ist er der Grund,
                  warum diese Seite offen ist. In der schmalen Seitenspalte wäre
                  er eine Kachel unter anderen gewesen.
                */}
                {showApplicationCta && (
                    <CtaCard
                        href={MEMBERSHIP_APPLICATION_PATH}
                        icon={<HugeiconsIcon icon={FileAttachmentIcon} size={18} aria-hidden="true" />}
                        eyebrow="Mitgliedschaft"
                        title={
                            openApplication
                                ? "Dein Aufnahmeantrag wird geprüft"
                                : "Vereinsmitgliedschaft beantragen"
                        }
                        description={
                            openApplication
                                ? "Der Vorstand entscheidet über deinen Antrag. Hier siehst du den aktuellen Stand."
                                : "Du bist derzeit als „Kein Mitglied“ geführt. Die Seite „Mitglied werden“ führt dich durch den Aufnahmeantrag."
                        }
                        action={openApplication ? "Status ansehen" : "Antrag starten"}
                    />
                )}

                {/*
                  Zwei Spalten ab `lg`: links das Nachschlagewerk (Beiträge,
                  Konten), rechts das Handeln (Termin, Profil, Verwaltung).

                  Die Seitenspalte steht im Quelltext zuerst: so liegt auf dem
                  Telefon, wo beide Spalten untereinander fallen, das Dringliche
                  oben — der nächste Termin lässt sich nicht nachholen.

                  `grid-cols-1` statt eines bloßen `grid`: eine Rasterspur ohne
                  Angabe ist `auto` und wächst auf die Mindestbreite ihres
                  Inhalts. Die Benutzertabelle bringt `min-w-[640px]` mit — die
                  Karten sprengten damit ihre Spalte und schoben sich unter die
                  Seitenspalte. `minmax(0,…)` hinter `grid-cols-1` deckelt das.
                */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start">
                    <div className="grid grid-cols-1 gap-6 lg:order-2">
                        {upcomingEvent && <UpcomingEventAlert event={upcomingEvent} />}

                        {kosmosEnabled && (
                            <CtaCard
                                href="/dashboard/kosmos"
                                tone="accent"
                                icon={<HugeiconsIcon icon={SparklesIcon} size={18} aria-hidden="true" />}
                                eyebrow="Alumni-Kosmos"
                                title="Wer war wann an der Uni?"
                                description="Finde ehemalige Kommilitoninnen und Kommilitonen und nimm Kontakt auf."
                                action="Kosmos öffnen"
                            />
                        )}

                        {/* ---------- Mein Konto ----------
                          Eine Karte mit Zeilen statt vier großer Kacheln: die
                          Einstiege werden selten gebraucht und drängten den
                          Termin und die Beiträge aus dem Blick. */}
                        <Card className="p-5 sm:p-6">
                            <SectionHeader
                                icon={<HugeiconsIcon icon={UserSettings01Icon} size={16} />}
                                eyebrow="Einstellungen"
                                title="Mein Konto"
                            />
                            <ul className="mt-3 grid grid-cols-1 divide-y divide-line">
                                <AccountLink href="/dashboard/konto" Icon={Key02Icon} label="Passwort & E-Mail-Adresse" />
                                <NewsletterRow
                                    initial={profile?.newsletter ?? true}
                                    profileHref={`/dashboard/users/${currentUser.id}#newsletter`}
                                />
                            </ul>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:order-1">
                        {/* ---------- Mein Profil ----------
                          Für Admins dasselbe wie für alle anderen: die
                          Übersicht aller Konten steht in der
                          Benutzerverwaltung. */}
                        {profile && (
                            <Card className="p-5 sm:p-6">
                                <SectionHeader
                                    icon={<HugeiconsIcon icon={BookOpen01Icon} size={16} />}
                                    eyebrow="Deine hinterlegten Daten"
                                    title="Mein Profil"
                                />

                                <Separator className="my-4" />

                                <ProfileSummary user={profile} editHref={`/dashboard/users/${currentUser.id}`} />
                            </Card>
                        )}

                        {/* ---------- Beiträge ----------
                          Nur für Mitglieder und Ausgetretene mit offenen
                          Beiträgen: wer sonst keine Mitgliedschaft hat,
                          schuldet auch keinen Beitrag — die Zahlungshistorie
                          wäre für dieses Konto grundsätzlich leer und suggeriert
                          eine Beitragspflicht, die es nicht gibt. */}
                        {(!isNonMember || owesFees) && (
                            <Card className="p-5 sm:p-6">
                                <SectionHeader
                                    icon={<HugeiconsIcon icon={IdCardIcon} size={16} />}
                                    eyebrow="Zahlungsübersicht"
                                    title={
                                        membershipStartYear == null
                                            ? "Meine Beiträge der letzten drei Jahre"
                                            : "Meine Beiträge seit Aufnahme"
                                    }
                                    aside={
                                        <ButtonLink
                                            href="/dashboard/zahlungen"
                                            variant="soft"
                                            color="neutral"
                                            size="sm"
                                            className="self-start"
                                        >
                                            <HugeiconsIcon icon={CreditCardIcon} size={15} aria-hidden="true" />
                                            Zahlungen verwalten
                                        </ButtonLink>
                                    }
                                />

                                {/*
                                  Je Jahr eine Zeile statt einer Kachel: die drei
                                  Kacheln fielen auf dem Telefon untereinander und
                                  brauchten für drei Zahlen mehr Platz als die
                                  Tabelle darunter für dreizehn Konten.
                                */}
                                <ul className="mt-4 grid grid-cols-1 divide-y divide-line rounded-[3px] border border-line">
                                    {last3Years.map((year) => {
                                        const fee = myFees.find((f) => f.year === year);
                                        const isPaid = fee?.paid ?? false;
                                        const isStudent = fee?.isStudent ?? false;
                                        const amount = fee?.amount ?? 0;
                                        return (
                                            <li
                                                key={year}
                                                className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3"
                                            >
                                                <span className="font-mono text-base font-bold tracking-tight tabular-nums">
                                                    {year}
                                                </span>
                                                <Badge tone={isPaid ? "positive" : "negative"}>
                                                    {isPaid ? "Bezahlt" : "Ausstehend"}
                                                </Badge>
                                                <Badge tone={isStudent ? "info" : "neutral"}>
                                                    {isStudent ? "Student" : "Regulär"}
                                                </Badge>
                                                <span className="ml-auto font-semibold tabular-nums">
                                                    {formatEuro(amount)}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Card>
                        )}

                        {/* ---------- Mitgliedschaftszertifikat ---------- */}
                        {certificate && <MembershipCertificateCard facts={certificate} downloadable={pdfEnabled} />}
                    </div>
                </div>
            </div>
        </Container>
    );
}
