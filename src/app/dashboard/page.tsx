import { Suspense } from "react";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import { MailSuccessDialog } from "./MailSuccessDialog";
import { EmailChangeDialog } from "./EmailChangeDialog";
import {
    getDashboardUsers,
    getEditableUser,
} from "@/lib/server/services/userService";
import {
    Flex,
    Heading,
    Text,
    Button,
    Container,
    Card,
    Table,
    Badge,
    Separator,
    Box,
    Grid,
} from "@radix-ui/themes";
import { getFeeDashboardUsers } from "@/lib/server/services/feeService";
import Link from "next/link";
import {
    User,
    UserCircle,
    IdCard,
    Calendar,
    CheckCircle2,
    Clock,
    Mail,
    SlidersHorizontal,
    Send,
    Pencil,
    BookOpen,
    Rows3,
    Star,
    ToggleLeft,
    UserCog,
    ArrowRight,
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import { DashboardUserActions } from "./DashboardUserActions";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { formatStatus, getStatusTone } from "@/lib/statusLabels";
import type { Status } from "@prisma/client";

function formatDate(d?: string | Date | null) {
    if (!d) return "—";
    const dt = typeof d === "string" ? new Date(d) : d;
    return dt.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function getStatusIcon(status?: Status | string) {
    switch (status) {
        case "EHRENMITGLIED":
            return <Star size={14} />;
        case "ORDENTLICHES_MITGLIED":
            return <CheckCircle2 size={14} />;
        case "KEIN_MITGLIED":
        default:
            return <Clock size={14} />;
    }
}

export default async function DashboardPage() {
    const currentUser = await requireUser();
    const isAdmin = currentUser.role === "ADMIN";
    if (!currentUser.id) redirect("/login");
    const users = await getDashboardUsers(currentUser.id, currentUser.role);
    const profile = await getEditableUser(currentUser.id);

    // Fetch current user's fee data for the visualizer
    const feeUsers = await getFeeDashboardUsers(currentUser.id, "MEMBER");
    const myRecord = feeUsers.find((u) => u.id === currentUser.id);
    const myFees = myRecord?.fees || [];

    const currentYear = new Date().getFullYear();
    const last3Years = [currentYear - 2, currentYear - 1, currentYear];
    const userStatus = profile?.status ?? currentUser.status ?? "KEIN_MITGLIED";
    const memberSince = profile?.createdAt ?? null;

    return (
        <Box py={{ initial: "6", sm: "8" }} style={{ minHeight: "100%" }}>
            <Suspense fallback={null}>
                <MailSuccessDialog />
            </Suspense>
            <Suspense fallback={null}>
                <EmailChangeDialog />
            </Suspense>
            <Suspense fallback={null}>
                <FeatureDisabledQueryDialog />
            </Suspense>

            <Container size="4" px={{ initial: "4", sm: "5" }}>
                {/* ---------- Header ---------- */}
                <Flex
                    justify="between"
                    align={{ initial: "start", sm: "center" }}
                    direction={{ initial: "column", sm: "row" }}
                    gap="4"
                    mb={{ initial: "6", sm: "7" }}
                >
                    <Flex direction="column" gap="1">
                        <Flex align="center" gap="2">
                            <User size={16} color="var(--accent-9)" />
                            <Text size="2" weight="medium" color="blue">
                                Mitgliederbereich
                            </Text>
                        </Flex>
                        <Heading as="h1" size={{ initial: "7", sm: "8" }} style={{ letterSpacing: "-0.03em" }}>
                            Hallo, {profile?.vorname ?? profile?.name ?? currentUser.email ?? "Gast"}!
                        </Heading>
                    </Flex>
                    <LogoutButton />
                </Flex>

                {/* ---------- Mitgliederselbstverwaltung CTA ---------- */}
                <Box asChild mb={{ initial: "5", sm: "6" }}>
                    <Link
                        href={`/dashboard/users/${currentUser.id}`}
                        style={{
                            display: "block",
                            borderRadius: "var(--radius-4)",
                            padding: "var(--space-4) var(--space-5)",
                            background:
                                "linear-gradient(135deg, var(--accent-9), var(--accent-10))",
                            boxShadow: "var(--shadow-3)",
                            width: "100%",
                            textDecoration: "none",
                            color: "inherit",
                            cursor: "pointer",
                        }}
                    >
                        <Flex
                            direction="column"
                            gap="3"
                            width="100%"
                        >
                            <Flex align="center" gap="2">
                                <UserCog size={18} color="white" />
                                <Text size="2" weight="medium" style={{ color: "white", opacity: 0.85 }}>
                                    Mitgliederselbstverwaltung
                                </Text>
                            </Flex>
                            <Heading as="h2" size={{ initial: "4", sm: "5" }} style={{ color: "white", margin: 0 }}>
                                Verwalte deine Mitgliedsdaten
                            </Heading>
                            <Text size="2" style={{ color: "white", opacity: 0.85 }}>
                                Persönliche Daten, Kontakt, Studium und Beruf jederzeit
                                selbst einsehen und aktualisieren.
                            </Text>
                            <Flex align="center" gap="2" style={{ color: "white", marginTop: "var(--space-2)" }}>
                                Zu meinem Profil <ArrowRight size={16} />
                            </Flex>
                        </Flex>
                    </Link>
                </Box>

                {/* ---------- Profile summary ---------- */}
                <Card size="3" mb={{ initial: "5", sm: "6" }}>
                    <Grid columns={{ initial: "1", xs: "3" }} gap="5">
                        <Flex direction="column" gap="1">
                            <Flex align="center" gap="2">
                                <IdCard size={16} color="var(--gray-9)" />
                                <Text size="2" color="gray">
                                    Mitgliedschaft
                                </Text>
                            </Flex>
                            <Heading as="h2" size="4">{formatStatus(userStatus)}</Heading>
                        </Flex>

                        <Flex direction="column" gap="1">
                            <Flex align="center" gap="2">
                                <Calendar size={16} color="var(--gray-9)" />
                                <Text size="2" color="gray">
                                    Account seit
                                </Text>
                            </Flex>
                            <Heading as="h2" size="4">{formatDate(memberSince)}</Heading>
                        </Flex>

                        <Flex direction="column" gap="1">
                            <Flex align="center" gap="2">
                                <UserCircle size={16} color="var(--gray-9)" />
                                <Text size="2" color="gray">
                                    Rolle
                                </Text>
                            </Flex>
                            <Heading as="h2" size="4">
                                {currentUser.role === "ADMIN" ? "Administrator" : "Mitglied"}
                            </Heading>
                        </Flex>
                    </Grid>
                </Card>

                {/* ---------- Admin actions ---------- */}
                {isAdmin && (
                    <Card size="3" mb={{ initial: "5", sm: "6" }}>
                        <Flex direction="column" gap="4">
                            <Flex direction="column" gap="1">
                                <Flex align="center" gap="2">
                                    <SlidersHorizontal size={16} color="var(--gray-9)" />
                                    <Text size="2" color="gray">
                                        Admin-Aktionen
                                    </Text>
                                </Flex>
                                <Heading as="h2" size="5">Verwaltung auf einen Blick</Heading>
                                <Text size="2" color="gray" style={{ maxWidth: 640 }}>
                                    Pflege Inhalte, lege neue Nutzer an und bearbeite
                                    Zahlungs- oder Mail-Aufgaben direkt aus dem Dashboard.
                                </Text>
                            </Flex>

                            <Grid columns={{ initial: "1", xs: "2", sm: "3" }} gap="3">
                                <Button size="3" variant="soft" asChild>
                                    <Link href="/dashboard/blog">
                                        <BookOpen size={16} />
                                        Blog
                                    </Link>
                                </Button>
                                <Button size="3" variant="soft" asChild>
                                    <Link href="/dashboard/users/new">
                                        <User size={16} />
                                        Neuer User
                                    </Link>
                                </Button>
                                <Button size="3" variant="soft" asChild>
                                    <Link href="/dashboard/mail">
                                        <Send size={16} />
                                        Rundmail
                                    </Link>
                                </Button>
                                <Button size="3" variant="soft" asChild>
                                    <Link href="/dashboard/fees">
                                        <IdCard size={16} />
                                        Beiträge
                                    </Link>
                                </Button>
                                <Button size="3" variant="soft" asChild>
                                    <Link href="/dashboard/feature-flags">
                                        <ToggleLeft size={16} />
                                        Feature Flags
                                    </Link>
                                </Button>
                            </Grid>
                        </Flex>
                    </Card>
                )}

                {/* ---------- Fees ---------- */}
                <Card size="3" mb={{ initial: "5", sm: "6" }}>
                    <Flex
                        justify="between"
                        align={{ initial: "start", sm: "baseline" }}
                        direction={{ initial: "column", sm: "row" }}
                        gap="2"
                        mb="4"
                    >
                        <Flex direction="column" gap="1">
                            <Flex align="center" gap="2">
                                <IdCard size={16} color="var(--gray-9)" />
                                <Text size="2" color="gray">
                                    Zahlungsübersicht
                                </Text>
                            </Flex>
                            <Heading as="h2" size="5">Meine Beiträge der letzten drei Jahre</Heading>
                        </Flex>
                        <Badge size="2" color="gray" variant="soft">
                            <Rows3 size={14} />
                            {last3Years.length} Jahre
                        </Badge>
                    </Flex>

                    <Separator size="4" mb="4" />

                    <Grid columns={{ initial: "1", xs: "3" }} gap="3">
                        {last3Years.map((year) => {
                            const fee = myFees.find((f) => f.jahr === year);
                            const isPaid = fee?.bezahlt ?? false;
                            const isStudent = fee?.isStudent ?? false;
                            const amount = fee?.beitrag ?? 0;
                            return (
                                <Card key={year} size="2" variant="surface">
                                    <Flex direction="column" gap="2">
                                        <Flex align="center" gap="2">
                                            <Calendar size={14} color="var(--gray-9)" />
                                            <Text size="2" color="gray">
                                                Beitragsjahr
                                            </Text>
                                        </Flex>
                                        <Heading as="h3" size="6">{year}</Heading>
                                        <Flex gap="1" wrap="wrap">
                                            <Badge color={isPaid ? "green" : "red"} size="1">
                                                {isPaid ? "Bezahlt" : "Ausstehend"}
                                            </Badge>
                                            <Badge color={isStudent ? "blue" : "gray"} size="1">
                                                {isStudent ? "Student" : "Regulär"}
                                            </Badge>
                                        </Flex>
                                        <Text size="1" weight="medium" color="gray">
                                            Betrag:{" "}
                                            {amount.toLocaleString("de-DE", {
                                                style: "currency",
                                                currency: "EUR",
                                            })}
                                        </Text>
                                    </Flex>
                                </Card>
                            );
                        })}
                    </Grid>
                </Card>

                {/* ---------- Users table ---------- */}
                <Card size="3">
                    <Flex
                        justify="between"
                        align={{ initial: "start", sm: "baseline" }}
                        direction={{ initial: "column", sm: "row" }}
                        gap="3"
                        mb="4"
                    >
                        <Flex direction="column" gap="1">
                            <Flex align="center" gap="2">
                                <BookOpen size={16} color="var(--gray-9)" />
                                <Text size="2" color="gray">
                                    {isAdmin
                                        ? "Übersicht aller registrierten Nutzer"
                                        : "Deine hinterlegten Daten"}
                                </Text>
                            </Flex>
                            <Heading as="h2" size="5">
                                {isAdmin ? "Benutzerverwaltung" : "Mein Profil"}
                            </Heading>
                            <Text size="2" color="gray">
                                {isAdmin
                                    ? "Alle Konten mit Rollen, Mitgliedsstatus und schnellen Aktionen."
                                    : "Deine derzeit hinterlegten Kontodaten im Überblick."}
                            </Text>
                        </Flex>
                        <Badge size="2" color="gray" variant="soft">
                            <Rows3 size={14} />
                            {users.length} {users.length === 1 ? "Eintrag" : "Einträge"}
                        </Badge>
                    </Flex>

                    <Separator size="4" mb="4" />

                    <Box style={{ overflowX: "auto" }} mx={{ initial: "-4", sm: "0" }}>
                        <Table.Root variant="surface" style={{ minWidth: 640 }}>
                            <Table.Header>
                                <Table.Row>
                                    {isAdmin && (
                                        <Table.ColumnHeaderCell>
                                            <Flex align="center" gap="2">
                                                <IdCard size={14} />
                                                ID
                                            </Flex>
                                        </Table.ColumnHeaderCell>
                                    )}
                                    <Table.ColumnHeaderCell>
                                        <Flex align="center" gap="2">
                                            <User size={14} />
                                            Name
                                        </Flex>
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>
                                        <Flex align="center" gap="2">
                                            <UserCircle size={14} />
                                            Rolle
                                        </Flex>
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>
                                        <Flex align="center" gap="2">
                                            <CheckCircle2 size={14} />
                                            Mitgliedschaft
                                        </Flex>
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>
                                        <Flex align="center" gap="2">
                                            <Mail size={14} />
                                            E-Mail-Status
                                        </Flex>
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell align="right">
                                        <Flex align="center" gap="2" justify="end">
                                            <Pencil size={14} />
                                            Aktion
                                        </Flex>
                                    </Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {users.map((u) => (
                                    <Table.Row key={u.id}>
                                        {isAdmin && (
                                            <Table.Cell>
                                                <Text>{u.mitgliedId || "—"}</Text>
                                            </Table.Cell>
                                        )}
                                        <Table.Cell>
                                            <Text weight="medium">
                                                {[u.vorname, u.name].filter(Boolean).join(" ") || "—"}
                                            </Text>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Badge color={u.role === "ADMIN" ? "red" : "blue"} variant="soft">
                                                {u.role === "ADMIN" ? "Admin" : "Member"}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Badge color={getStatusTone(u.status)} variant="soft">
                                                {getStatusIcon(u.status)}
                                                {formatStatus(u.status)}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Badge color={(u as any).emailVerified ? "green" : "orange"} variant="soft">
                                                {(u as any).emailVerified ? (
                                                    <CheckCircle2 size={14} />
                                                ) : (
                                                    <Clock size={14} />
                                                )}
                                                {(u as any).emailVerified ? "Verifiziert" : "Nicht verifiziert"}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell align="right">
                                            <DashboardUserActions
                                                user={{
                                                    id: u.id,
                                                    email: u.email,
                                                    vorname: u.vorname,
                                                    name: u.name,
                                                }}
                                                isAdmin={isAdmin}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Box>
                </Card>
            </Container>
        </Box>
    );
}