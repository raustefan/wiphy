import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { requireUser } from "@/lib/server/authz";
import { MailSuccessDialog } from "./MailSuccessDialog";
import { EmailChangeDialog } from "./EmailChangeDialog";
import {
    getDashboardUsers,
    getEditableUser,
} from "@/lib/server/services/userService";
import { getFeeDashboardData } from "@/lib/server/services/feeService";
import {
    User,
    UserCircle,
    IdCard,
    Calendar,
    CalendarDays,
    SlidersHorizontal,
    Send,
    BookOpen,
    Rows3,
    ToggleLeft,
    Mail,
    UserCog,
    FileText,
    CreditCard,
    ShieldAlert,
    Pencil,
    ChevronRight,
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import { DashboardUsersTable } from "./DashboardUsersTable";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { formatStatus } from "@/lib/statusLabels";
import { formatDate, formatEuro } from "@/lib/format";
import {
    Badge,
    ButtonLink,
    Card,
    Container,
    Eyebrow,
    PageTitle,
    Separator,
} from "@/components/ui";
import { SectionHeader } from "./SectionHeader";
import { CtaCard } from "./CtaCard";
import { countOpenApplications, getOpenApplication } from "@/lib/server/services/membershipService";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { getDashboardEvent } from "@/lib/server/services/eventService";
import { UpcomingEventAlert } from "./UpcomingEventAlert";
import { MEMBERSHIP_ADMIN_PATH, MEMBERSHIP_APPLICATION_PATH } from "@/lib/membership";

const ADMIN_ACTIONS = [
    { href: "/dashboard/blog", label: "Blog", Icon: BookOpen },
    { href: "/dashboard/users/new", label: "Neuer User", Icon: User },
    { href: "/dashboard/mail", label: "Rundmail", Icon: Send },
    { href: "/dashboard/termine", label: "Termine", Icon: CalendarDays },
    { href: "/dashboard/fees", label: "Beiträge", Icon: IdCard },
    { href: "/dashboard/kontakt", label: "Kontaktanfragen", Icon: Mail },
    { href: MEMBERSHIP_ADMIN_PATH, label: "Mitgliedsanträge", Icon: FileText },
    { href: "/dashboard/feature-flags", label: "Feature Flags", Icon: ToggleLeft },
    { href: "/dashboard/security", label: "Sicherheit", Icon: ShieldAlert },
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
        <div className="flex min-w-0 items-center gap-2">
            <span className="text-faint" aria-hidden="true">
                {icon}
            </span>
            <dt className="sr-only">{label}</dt>
            <dd className="min-w-0 truncate">
                <span className="text-muted">{label}: </span>
                <span className="font-semibold text-foreground">{value}</span>
            </dd>
        </div>
    );
}

export default async function DashboardPage() {
    const currentUser = await requireUser();
    const isAdmin = currentUser.role === "ADMIN";
    if (!currentUser.id) redirect("/login");
    const users = await getDashboardUsers(currentUser.id, currentUser.role);
    const profile = await getEditableUser(currentUser.id);

    // Fetch current user's fee data for the visualizer
    const feeUsers = await getFeeDashboardData(currentUser.id, "MEMBER");
    const myRecord = feeUsers.find((u) => u.id === currentUser.id);
    const myFees = myRecord?.fees || [];

    const currentYear = new Date().getFullYear();
    // Nur Beitragsjahre anzeigen, in denen das Mitglied auch dabei war: ein
    // Erstjahresmitglied sähe sonst zwei Jahre „Ausstehend“, für die es nie
    // beitragspflichtig war. Ohne Aufnahmedatum (Altbestand) bleibt es bei
    // den letzten drei Jahren.
    const membershipStartYear = myRecord?.aufnahmedatum?.getFullYear() ?? null;
    const last3Years = [currentYear - 2, currentYear - 1, currentYear].filter(
        (year) => membershipStartYear == null || year >= membershipStartYear,
    );
    const userStatus = profile?.status ?? currentUser.status ?? "KEIN_MITGLIED";
    const memberSince = profile?.createdAt ?? null;

    // Der Antrags-CTA ist nur für Konten ohne Mitgliedschaft relevant.
    const isNonMember = userStatus === "KEIN_MITGLIED";
    const [openApplication, applicationEnabled, openApplicationCount, upcomingEvent] =
        await Promise.all([
            isNonMember ? getOpenApplication(currentUser.id) : null,
            isNonMember ? isFeatureEnabled("MEMBERSHIP_APPLICATION") : false,
            isAdmin ? countOpenApplications() : 0,
            getDashboardEvent(),
        ]);
    const showApplicationCta = isNonMember && (applicationEnabled || openApplication != null);


    return (
        <Container size="4" className="py-8 sm:py-12">
            <Suspense fallback={null}>
                <MailSuccessDialog />
            </Suspense>
            <Suspense fallback={null}>
                <EmailChangeDialog />
            </Suspense>
            <Suspense fallback={null}>
                <FeatureDisabledQueryDialog />
            </Suspense>

            {/* Ein Abstandsmaß für die ganze Seite: zwischen Kopf, Antrag und
                Raster liegt derselbe Wert wie zwischen zwei Karten darin. */}
            <div className="grid grid-cols-1 gap-6">
                {/* ---------- Kopf: Begrüßung, Stammdaten, Abmelden ---------- */}
                <header className="grid gap-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="grid min-w-0 gap-1">
                            <Eyebrow>
                                <User size={16} aria-hidden="true" />
                                Mitgliederbereich
                            </Eyebrow>
                            <PageTitle>
                                Hallo,{" "}
                                {profile?.vorname ?? profile?.name ?? currentUser.email ?? "Gast"}!
                            </PageTitle>
                        </div>
                        <LogoutButton />
                    </div>

                    {/* Innenabstand wie bei den Karten, damit die Angaben auf
                        derselben Kante beginnen wie alle Überschriften darunter. */}
                    <dl className="flex flex-col gap-2 rounded-2xl border border-line bg-surface px-5 py-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:px-6">
                        <HeaderMeta
                            icon={<IdCard size={15} aria-hidden="true" />}
                            label="Mitgliedschaft"
                            value={formatStatus(userStatus)}
                        />
                        <HeaderMeta
                            icon={<UserCircle size={15} aria-hidden="true" />}
                            label="Rolle"
                            value={isAdmin ? "Administrator" : "Mitglied"}
                        />
                        <HeaderMeta
                            icon={<Calendar size={15} aria-hidden="true" />}
                            label="Account seit"
                            value={formatDate(memberSince)}
                        />
                    </dl>
                </header>

                {/*
                  Der Aufnahmeantrag steht über der ganzen Breite und über dem
                  Raster: für ein Konto ohne Mitgliedschaft ist er der Grund,
                  warum diese Seite offen ist. In der schmalen Seitenspalte wäre
                  er eine Kachel unter anderen gewesen.
                */}
                {showApplicationCta && (
                    <CtaCard
                        href={MEMBERSHIP_APPLICATION_PATH}
                        icon={<FileText size={18} aria-hidden="true" />}
                        eyebrow="Mitgliedschaft"
                        title={
                            openApplication
                                ? "Dein Aufnahmeantrag wird geprüft"
                                : "Vereinsmitgliedschaft beantragen"
                        }
                        description={
                            openApplication
                                ? "Der Vorstand entscheidet über deinen Antrag. Hier siehst du den aktuellen Stand."
                                : "Du bist derzeit als „Kein Mitglied“ geführt. In fünf Schritten stellst du deinen Aufnahmeantrag."
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

                        <CtaCard
                            href={`/dashboard/users/${currentUser.id}`}
                            tone="accent"
                            icon={<UserCog size={18} aria-hidden="true" />}
                            eyebrow="Mitgliederselbstverwaltung"
                            title="Verwalte deine Mitgliedsdaten"
                            description="Persönliche Daten, Kontakt, Studium und Beruf jederzeit selbst einsehen und aktualisieren."
                            action="Zu meinem Profil"
                        />

                        {/* ---------- Admin-Aktionen ---------- */}
                        {isAdmin && (
                            <Card className="p-5 sm:p-6">
                                <SectionHeader
                                    icon={<SlidersHorizontal size={16} />}
                                    eyebrow="Admin-Aktionen"
                                    title="Verwaltung"
                                />
                                {/*
                                  Vorher neun Knöpfe in voller Zeilenbreite —
                                  untereinander fast ein ganzer Telefonbildschirm
                                  für eine reine Linkliste. Als schmale Zeilen
                                  bleibt dieselbe Auswahl auf einen Blick lesbar.

                                  `-mx-3` hebt den Innenabstand der Zeilen wieder
                                  auf: die Symbole stehen damit auf derselben
                                  Kante wie die Überschrift darüber, und die
                                  Hover-Fläche reicht bis an den Kartenrand.
                                */}
                                <ul className="mt-3 -mx-3 grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-1">
                                    {ADMIN_ACTIONS.map(({ href, label, Icon }) => (
                                        <li key={href}>
                                            <Link
                                                href={href}
                                                className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-physics"
                                            >
                                                <Icon
                                                    size={16}
                                                    aria-hidden="true"
                                                    className="shrink-0 text-faint transition-colors group-hover:text-physics"
                                                />
                                                <span className="min-w-0 flex-1 truncate">
                                                    {label}
                                                </span>
                                                {href === MEMBERSHIP_ADMIN_PATH &&
                                                    openApplicationCount > 0 && (
                                                        <Badge tone="warning">
                                                            {openApplicationCount}
                                                        </Badge>
                                                    )}
                                                <ChevronRight
                                                    size={15}
                                                    aria-hidden="true"
                                                    className="shrink-0 text-faint opacity-0 transition-opacity group-hover:opacity-100"
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:order-1">
                        {/* ---------- Beiträge ----------
                          Nur für Mitglieder: wer keine Mitgliedschaft hat,
                          schuldet auch keinen Beitrag — die Zahlungshistorie
                          wäre für dieses Konto grundsätzlich leer und suggeriert
                          eine Beitragspflicht, die es nicht gibt. */}
                        {!isNonMember && (
                            <Card className="p-5 sm:p-6">
                                <SectionHeader
                                    icon={<IdCard size={16} />}
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
                                            <CreditCard size={15} aria-hidden="true" />
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
                                <ul className="mt-4 grid grid-cols-1 divide-y divide-line rounded-xl border border-line">
                                    {last3Years.map((year) => {
                                        const fee = myFees.find((f) => f.jahr === year);
                                        const isPaid = fee?.bezahlt ?? false;
                                        const isStudent = fee?.isStudent ?? false;
                                        const amount = fee?.beitrag ?? 0;
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

                        {/* ---------- Konten ---------- */}
                        <Card className="p-5 sm:p-6">
                            <SectionHeader
                                icon={<BookOpen size={16} />}
                                eyebrow={
                                    isAdmin
                                        ? "Übersicht aller registrierten Nutzer"
                                        : "Deine hinterlegten Daten"
                                }
                                title={isAdmin ? "Benutzerverwaltung" : "Mein Profil"}
                                description={
                                    isAdmin
                                        ? "Alle Konten mit Rollen, Mitgliedsstatus und schnellen Aktionen. Über die Spaltenköpfe lässt sich die Tabelle sortieren."
                                        : undefined
                                }
                                aside={
                                    isAdmin ? (
                                        <Badge className="self-start">
                                            <Rows3 size={14} aria-hidden="true" />
                                            {users.length}{" "}
                                            {users.length === 1 ? "Eintrag" : "Einträge"}
                                        </Badge>
                                    ) : (
                                        // Für Mitglieder ist dieser Abschnitt das
                                        // eigene Profil — ein Zähler „1 Eintrag“
                                        // sagte darüber nichts, der Weg zum
                                        // Bearbeiten schon.
                                        <ButtonLink
                                            href={`/dashboard/users/${currentUser.id}`}
                                            variant="soft"
                                            color="neutral"
                                            size="sm"
                                            className="self-start"
                                        >
                                            <Pencil size={15} aria-hidden="true" />
                                            Bearbeiten
                                        </ButtonLink>
                                    )
                                }
                            />

                            <Separator className="my-4" />

                            <DashboardUsersTable
                                users={users.map((u) => ({
                                    id: u.id,
                                    email: u.email,
                                    vorname: u.vorname,
                                    name: u.name,
                                    mitgliedId: u.mitgliedId,
                                    role: u.role,
                                    status: u.status,
                                    emailVerified: u.emailVerified,
                                }))}
                                isAdmin={isAdmin}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </Container>
    );
}
