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
    SlidersHorizontal,
    Send,
    BookOpen,
    Rows3,
    ToggleLeft,
    Mail,
    UserCog,
    ArrowRight,
    FileText,
    CreditCard,
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
import { countOpenApplications, getOpenApplication } from "@/lib/server/services/membershipService";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { MEMBERSHIP_ADMIN_PATH, MEMBERSHIP_APPLICATION_PATH } from "@/lib/membership";

const ADMIN_ACTIONS = [
    { href: "/dashboard/blog", label: "Blog", Icon: BookOpen },
    { href: "/dashboard/users/new", label: "Neuer User", Icon: User },
    { href: "/dashboard/mail", label: "Rundmail", Icon: Send },
    { href: "/dashboard/fees", label: "Beiträge", Icon: IdCard },
    { href: "/dashboard/kontakt", label: "Kontaktanfragen", Icon: Mail },
    { href: MEMBERSHIP_ADMIN_PATH, label: "Mitgliedsanträge", Icon: FileText },
    { href: "/dashboard/feature-flags", label: "Feature Flags", Icon: ToggleLeft },
];

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
    const last3Years = [currentYear - 2, currentYear - 1, currentYear];
    const userStatus = profile?.status ?? currentUser.status ?? "KEIN_MITGLIED";
    const memberSince = profile?.createdAt ?? null;

    // Der Antrags-CTA ist nur für Konten ohne Mitgliedschaft relevant.
    const isNonMember = userStatus === "KEIN_MITGLIED";
    const [openApplication, applicationEnabled, openApplicationCount] = await Promise.all([
        isNonMember ? getOpenApplication(currentUser.id) : null,
        isNonMember ? isFeatureEnabled("MEMBERSHIP_APPLICATION") : false,
        isAdmin ? countOpenApplications() : 0,
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

            {/* ---------- Header ---------- */}
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-center">
                <div className="grid min-w-0 gap-1">
                    <Eyebrow>
                        <User size={16} aria-hidden="true" />
                        Mitgliederbereich
                    </Eyebrow>
                    <PageTitle>
                        Hallo, {profile?.vorname ?? profile?.name ?? currentUser.email ?? "Gast"}!
                    </PageTitle>
                </div>
                <LogoutButton />
            </div>

            {/* ---------- Mitgliederselbstverwaltung CTA ---------- */}
            <Link
                href={`/dashboard/users/${currentUser.id}`}
                className="group mb-6 grid gap-2 rounded-2xl bg-physics px-5 py-5 text-on-physics transition-shadow hover:shadow-lg sm:mb-8 sm:px-6"
            >
                <span className="flex items-center gap-2 text-sm font-medium opacity-85">
                    <UserCog size={18} aria-hidden="true" />
                    Mitgliederselbstverwaltung
                </span>
                <span className="text-lg font-bold tracking-tight sm:text-xl">
                    Verwalte deine Mitgliedsdaten
                </span>
                <span className="max-w-prose text-sm opacity-85 text-pretty">
                    Persönliche Daten, Kontakt, Studium und Beruf jederzeit selbst einsehen und
                    aktualisieren.
                </span>
                <span className="mt-1 flex items-center gap-2 text-sm font-semibold">
                    Zu meinem Profil
                    <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                </span>
            </Link>

            {/* ---------- Mitgliedsantrag CTA (nur ohne Mitgliedschaft) ---------- */}
            {showApplicationCta && (
                <Link
                    href={MEMBERSHIP_APPLICATION_PATH}
                    className="group mb-6 grid gap-2 rounded-2xl border border-line bg-raised/60 px-5 py-5 transition-shadow hover:shadow-lg sm:mb-8 sm:px-6"
                >
                    <span className="flex items-center gap-2 text-sm font-medium text-physics">
                        <FileText size={18} aria-hidden="true" />
                        Mitgliedschaft
                    </span>
                    <span className="text-lg font-bold tracking-tight sm:text-xl">
                        {openApplication
                            ? "Dein Aufnahmeantrag wird geprüft"
                            : "Vereinsmitgliedschaft beantragen"}
                    </span>
                    <span className="max-w-prose text-sm text-muted text-pretty">
                        {openApplication
                            ? "Der Vorstand entscheidet über deinen Antrag. Hier siehst du den aktuellen Stand."
                            : "Du bist derzeit als „Kein Mitglied“ geführt. In fünf Schritten stellst du deinen Aufnahmeantrag."}
                    </span>
                    <span className="mt-1 flex items-center gap-2 text-sm font-semibold text-physics">
                        {openApplication ? "Status ansehen" : "Antrag starten"}
                        <ArrowRight
                            size={16}
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                        />
                    </span>
                </Link>
            )}

            {/* ---------- Profile summary ---------- */}
            <Card className="mb-6 grid gap-5 p-5 sm:mb-8 sm:grid-cols-3 sm:p-6">
                <div className="grid gap-1">
                    <p className="flex items-center gap-2 text-sm text-muted">
                        <IdCard size={16} className="text-faint" aria-hidden="true" />
                        Mitgliedschaft
                    </p>
                    <p className="text-base font-bold">{formatStatus(userStatus)}</p>
                </div>

                <div className="grid gap-1">
                    <p className="flex items-center gap-2 text-sm text-muted">
                        <Calendar size={16} className="text-faint" aria-hidden="true" />
                        Account seit
                    </p>
                    <p className="text-base font-bold">{formatDate(memberSince)}</p>
                </div>

                <div className="grid gap-1">
                    <p className="flex items-center gap-2 text-sm text-muted">
                        <UserCircle size={16} className="text-faint" aria-hidden="true" />
                        Rolle
                    </p>
                    <p className="text-base font-bold">
                        {currentUser.role === "ADMIN" ? "Administrator" : "Mitglied"}
                    </p>
                </div>
            </Card>

            {/* ---------- Admin actions ---------- */}
            {isAdmin && (
                <Card className="mb-6 p-5 sm:mb-8 sm:p-6">
                    <SectionHeader
                        icon={<SlidersHorizontal size={16} />}
                        eyebrow="Admin-Aktionen"
                        title="Verwaltung auf einen Blick"
                        description="Pflege Inhalte, lege neue Nutzer an und bearbeite Zahlungs- oder Mail-Aufgaben direkt aus dem Dashboard."
                    />
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {ADMIN_ACTIONS.map(({ href, label, Icon }) => (
                            <ButtonLink
                                key={href}
                                href={href}
                                variant="soft"
                                color="neutral"
                                className="w-full"
                            >
                                <Icon size={16} aria-hidden="true" />
                                {label}
                                {href === MEMBERSHIP_ADMIN_PATH && openApplicationCount > 0 && (
                                    <Badge tone="warning">{openApplicationCount}</Badge>
                                )}
                            </ButtonLink>
                        ))}
                    </div>
                </Card>
            )}

            {/* ---------- Fees ---------- */}
            <Card className="mb-6 p-5 sm:mb-8 sm:p-6">
                <SectionHeader
                    icon={<IdCard size={16} />}
                    eyebrow="Zahlungsübersicht"
                    title="Meine Beiträge der letzten drei Jahre"
                    aside={
                        <Badge className="self-start">
                            <Rows3 size={14} aria-hidden="true" />
                            {last3Years.length} Jahre
                        </Badge>
                    }
                />

                <Separator className="my-4" />

                <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
                    <div className="grid flex-1 gap-3 sm:grid-cols-3">
                        {last3Years.map((year) => {
                            const fee = myFees.find((f) => f.jahr === year);
                            const isPaid = fee?.bezahlt ?? false;
                            const isStudent = fee?.isStudent ?? false;
                            const amount = fee?.beitrag ?? 0;
                            return (
                                <div
                                    key={year}
                                    className="grid gap-2 rounded-xl border border-line bg-raised/60 p-4"
                                >
                                    <p className="flex items-center gap-2 text-sm text-muted">
                                        <Calendar size={14} className="text-faint" aria-hidden="true" />
                                        Beitragsjahr
                                    </p>
                                    <p className="font-mono text-2xl font-bold tracking-tight">{year}</p>
                                    <div className="flex flex-wrap gap-1">
                                        <Badge tone={isPaid ? "positive" : "negative"}>
                                            {isPaid ? "Bezahlt" : "Ausstehend"}
                                        </Badge>
                                        <Badge tone={isStudent ? "info" : "neutral"}>
                                            {isStudent ? "Student" : "Regulär"}
                                        </Badge>
                                    </div>
                                    <p className="text-xs font-medium text-muted">
                                        Betrag:{" "}
                                        {formatEuro(amount)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <Separator className="lg:hidden" />
                    <Separator orientation="vertical" className="hidden lg:block" />

                    <ButtonLink
                        href="/dashboard/zahlungen"
                        size="lg"
                        className="flex h-auto flex-col items-center justify-center gap-2 px-8 py-6 text-center lg:w-56"
                    >
                        <CreditCard size={22} aria-hidden="true" />
                        Zahlungen verwalten
                    </ButtonLink>
                </div>
            </Card>

            {/* ---------- Users table ---------- */}
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
                            ? "Alle Konten mit Rollen, Mitgliedsstatus und schnellen Aktionen."
                            : "Deine derzeit hinterlegten Kontodaten im Überblick."
                    }
                    aside={
                        <Badge className="self-start">
                            <Rows3 size={14} aria-hidden="true" />
                            {users.length} {users.length === 1 ? "Eintrag" : "Einträge"}
                        </Badge>
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
        </Container>
    );
}
