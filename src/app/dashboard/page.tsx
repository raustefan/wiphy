import { Suspense } from "react";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import { MailSuccessDialog } from "./MailSuccessDialog";
import { getDashboardUsers, getEditableUser } from "@/lib/server/services/userService";
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
} from "@radix-ui/themes";
import { getFeeDashboardUsers } from "@/lib/server/services/feeService";
import Link from "next/link";
import type { Status } from "@prisma/client";
import {
    AvatarIcon,
    CalendarIcon,
    CheckCircledIcon,
    ClockIcon,
    EnvelopeClosedIcon,
    IdCardIcon,
    MixerHorizontalIcon,
    PaperPlaneIcon,
    Pencil2Icon,
    PersonIcon,
    ReaderIcon,
    RowsIcon,
    StarIcon,
} from "@radix-ui/react-icons";
import LogoutButton from "@/components/LogoutButton";
import { adminDeleteUser } from "@/lib/server/services/userService";
import { revalidatePath } from "next/cache";
import { DashboardUserActions } from "./DashboardUserActions";

export function formatStatus(status?: Status | string): string {
    switch (status) {
        case "KEIN_MITGLIED":
            return "Kein Mitglied";
        case "ORDENTLICHES_MITGLIED":
            return "Ordentliches Mitglied";
        case "EHRENMITGLIED":
            return "Ehrenmitglied";
        default:
            return "Unbekannt";
    }
}

function formatDate(d?: string | Date | null) {
    if (!d) return "—";
    const dt = typeof d === "string" ? new Date(d) : d;
    return dt.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function getStatusTone(status?: Status | string): "red" | "blue" | "green" {
    switch (status) {
        case "EHRENMITGLIED":
            return "green";
        case "ORDENTLICHES_MITGLIED":
            return "blue";
        case "KEIN_MITGLIED":
        default:
            return "red";
    }
}

function getStatusIcon(status?: Status | string) {
    switch (status) {
        case "EHRENMITGLIED":
            return <StarIcon />;
        case "ORDENTLICHES_MITGLIED":
            return <CheckCircledIcon />;
        case "KEIN_MITGLIED":
        default:
            return <ClockIcon />;
    }
}

async function deleteUserAction(formData: FormData) {
    "use server";
    const { requireUser } = await import("@/lib/server/authz");
    const currentUser = await requireUser();
    const id = formData.get("id") as string;
    if (currentUser.role !== "ADMIN" || !id) return;
    if (currentUser.id === id) return; // Prevent self-deletion
    await adminDeleteUser(id, currentUser.role);
    revalidatePath("/dashboard");
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
        <Box
            py={{ initial: "5", md: "7" }}
            className="dashboard-shell"
            style={{
                minHeight: "100%",
                background:
                    "radial-gradient(circle at top left, rgba(22, 163, 74, 0.14), transparent 32%), radial-gradient(circle at top right, rgba(14, 116, 144, 0.12), transparent 28%), linear-gradient(180deg, rgba(247, 250, 252, 0.98) 0%, rgba(255, 255, 255, 1) 42%, rgba(245, 247, 250, 0.98) 100%)",
            }}
        >
            <Suspense fallback={null}>
                <MailSuccessDialog />
            </Suspense>
            <Container size="4">
                <Flex
                    justify="between"
                    align={{ initial: "start", md: "center" }}
                    direction={{ initial: "column", md: "row" }}
                    gap="3"
                    mb="5"
                >
                    <Box>
                        <Flex align="center" gap="2">
                            <PersonIcon className="dashboard-section-icon" />
                            <Text size="2" weight="bold" className="dashboard-kicker">
                                Mitgliederbereich
                            </Text>
                        </Flex>
                        <Heading size="8" mt="2" style={{ letterSpacing: "-0.04em" }}>
                            Hallo, {profile?.vorname ?? profile?.name ?? currentUser.email ?? "Gast"}!
                        </Heading>
                    </Box>
                    <LogoutButton />
                </Flex>

                <Card
                    size="3"
                    mb="5"
                    style={{
                        border: "1px solid rgba(15, 23, 42, 0.06)",
                        boxShadow: "0 18px 50px rgba(15, 23, 42, 0.06)",
                    }}
                >
                    <Flex
                        gap="4"
                        direction={{ initial: "column", md: "row" }}
                        justify="between"
                    >
                        <Box style={{ flex: 1, minWidth: 0 }}>
                            <Flex align="center" gap="2" mb="1">
                                <IdCardIcon className="dashboard-card-icon" />
                                <Text size="2" color="gray">
                                    Mitgliedschaft
                                </Text>
                            </Flex>
                            <Heading size="4" mt="1" mb="3">
                                {formatStatus(userStatus)}
                            </Heading>
                        </Box>

                        <Box style={{ flex: 1, minWidth: 0 }}>
                            <Flex align="center" gap="2" mb="1">
                                <CalendarIcon className="dashboard-card-icon" />
                                <Text size="2" color="gray">
                                    Account seit
                                </Text>
                            </Flex>
                            <Heading size="4" mt="1" mb="3">
                                {formatDate(memberSince)}
                            </Heading>
                        </Box>

                        <Box style={{ flex: 1, minWidth: 0 }}>
                            <Flex align="center" gap="2" mb="1">
                                <AvatarIcon className="dashboard-card-icon" />
                                <Text size="2" color="gray">
                                    Rolle
                                </Text>
                            </Flex>
                            <Heading size="4" mt="1" mb="3">
                                {currentUser.role === "ADMIN" ? "Administrator" : "Mitglied"}
                            </Heading>
                        </Box>
                    </Flex>
                </Card>

                {isAdmin && (
                    <Card
                        size="3"
                        mb="5"
                        style={{
                            border: "1px solid rgba(15, 23, 42, 0.06)",
                            boxShadow: "0 22px 60px rgba(15, 23, 42, 0.07)",
                        }}
                    >
                        <Flex
                            justify="between"
                            align={{ initial: "start", md: "center" }}
                            direction={{ initial: "column", md: "row" }}
                            gap="4"
                        >
                            <Box>
                                <Flex align="center" gap="2" mb="1">
                                    <MixerHorizontalIcon className="dashboard-card-icon" />
                                    <Text size="2" color="gray">
                                        Admin-Aktionen
                                    </Text>
                                </Flex>
                                <Heading size="5" mt="1" mb="2">
                                    Verwaltung auf einen Blick
                                </Heading>
                                <Text size="2" color="gray" style={{ maxWidth: 720 }}>
                                    Pflege Inhalte, lege neue Nutzer an und bearbeite Zahlungs- oder Mail-Aufgaben
                                    direkt aus dem Dashboard.
                                </Text>
                            </Box>
                            <Flex gap="2" wrap="wrap" className="dashboard-admin-actions">
                                <Link href="/dashboard/blog">
                                    <Button size="2" variant="soft" className="dashboard-admin-button">
                                        <ReaderIcon />
                                        Blog verwalten
                                    </Button>
                                </Link>
                                <Link href="/dashboard/users/new">
                                    <Button size="2" variant="soft" className="dashboard-admin-button">
                                        <PersonIcon />
                                        User hinzufügen
                                    </Button>
                                </Link>
                                <Link href="/dashboard/mail">
                                    <Button size="2" variant="soft" className="dashboard-admin-button">
                                        <PaperPlaneIcon />
                                        Rundmail senden
                                    </Button>
                                </Link>
                                <Link href="/dashboard/fees">
                                    <Button size="2" variant="soft" className="dashboard-admin-button">
                                        <IdCardIcon />
                                        Beiträge & Zahlungen
                                    </Button>
                                </Link>
                            </Flex>
                        </Flex>
                    </Card>
                )}

                <Card
                    size="3"
                    mb="5"
                    style={{
                        border: "1px solid rgba(15, 23, 42, 0.06)",
                        boxShadow: "0 22px 60px rgba(15, 23, 42, 0.07)",
                    }}
                >
                    <Flex justify="between" align="baseline" mb="3">
                        <Box>
                            <Flex align="center" gap="2" mb="1">
                                <EnvelopeClosedIcon className="dashboard-card-icon" />
                                <Text size="2" color="gray">
                                    Zahlungsübersicht
                                </Text>
                            </Flex>
                            <Heading size="5" mt="1">
                                Meine Beiträge der letzten drei Jahre
                            </Heading>
                        </Box>
                        <Badge size="2" color="gray" variant="soft">
                            <RowsIcon />
                            {last3Years.length} Jahre
                        </Badge>
                    </Flex>

                    <Separator mb="4" />

                    <Flex gap="3" wrap="wrap">
                        {last3Years.map((year) => {
                            const fee = myFees.find((f) => f.jahr === year);
                            const isPaid = fee?.bezahlt ?? false;
                            return (
                                <Card
                                    key={year}
                                    size="2"
                                    className="dashboard-fee-card"
                                    style={{
                                        minWidth: 170,
                                        flex: "1 1 170px",
                                        border: "1px solid rgba(15, 23, 42, 0.06)",
                                    }}
                                >
                                    <Flex direction="column" gap="3">
                                        <Flex align="center" gap="2">
                                            <CalendarIcon className="dashboard-card-icon" />
                                            <Text size="2" color="gray">
                                                Beitragsjahr
                                            </Text>
                                        </Flex>
                                        <Heading size="6">{year}</Heading>
                                        <Badge color={isPaid ? "green" : "red"} size="2" style={{ width: "fit-content" }}>
                                            {isPaid ? "Bezahlt" : "Ausstehend"}
                                        </Badge>
                                    </Flex>
                                </Card>
                            );
                        })}
                    </Flex>
                </Card>

                <Card
                    size="3"
                    style={{
                        border: "1px solid rgba(15, 23, 42, 0.06)",
                        boxShadow: "0 22px 60px rgba(15, 23, 42, 0.07)",
                    }}
                >
                    <Flex
                        justify="between"
                        align={{ initial: "start", md: "baseline" }}
                        direction={{ initial: "column", md: "row" }}
                        gap="3"
                        mb="3"
                    >
                        <Box>
                            <Flex align="center" gap="2" mb="1">
                                <ReaderIcon className="dashboard-card-icon" />
                                <Text size="2" color="gray">
                                    {isAdmin ? "Übersicht aller registrierten Nutzer" : "Deine hinterlegten Daten"}
                                </Text>
                            </Flex>
                            <Heading size="5" mt="1">
                                {isAdmin ? "Benutzerverwaltung" : "Mein Profil"}
                            </Heading>
                            <Text size="2" color="gray" mt="2">
                                {isAdmin
                                    ? "Alle Konten mit Rollen, Mitgliedsstatus und schnellen Aktionen."
                                    : "Deine derzeit hinterlegten Kontodaten im Überblick."}
                            </Text>
                        </Box>
                        <Badge size="2" color="gray" variant="soft">
                            <RowsIcon />
                            {users.length} {users.length === 1 ? "Eintrag" : "Einträge"}
                        </Badge>
                    </Flex>

                    <Separator mb="4" />

                    <Box style={{ overflowX: "auto" }}>
                        <Table.Root variant="surface" className="dashboard-table">
                            <Table.Header>
                                <Table.Row>
                                    {isAdmin && (
                                        <Table.ColumnHeaderCell>
                                            <Flex align="center" gap="2">
                                                <IdCardIcon className="dashboard-table-icon" />
                                                ID
                                            </Flex>
                                        </Table.ColumnHeaderCell>
                                    )}
                                    <Table.ColumnHeaderCell>
                                        <Flex align="center" gap="2">
                                            <PersonIcon className="dashboard-table-icon" />
                                            Name
                                        </Flex>
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>
                                        <Flex align="center" gap="2">
                                            <AvatarIcon className="dashboard-table-icon" />
                                            Rolle
                                        </Flex>
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>
                                        <Flex align="center" gap="2">
                                            <CheckCircledIcon className="dashboard-table-icon" />
                                            Mitgliedschaft
                                        </Flex>
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell align="right">
                                        <Flex align="center" gap="2" justify="end">
                                            <Pencil2Icon className="dashboard-table-icon" />
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
                                                <Flex align="center" gap="2">
                                                    <IdCardIcon className="dashboard-cell-icon" />
                                                    <Text>{u.mitgliedId || "—"}</Text>
                                                </Flex>
                                            </Table.Cell>
                                        )}
                                        <Table.Cell>
                                            <Flex align="start" gap="2">
                                                <Flex direction="column" gap="1">
                                                    <Text weight="medium">
                                                        {[u.vorname, u.name].filter(Boolean).join(" ") || "—"}
                                                    </Text>
                                                </Flex>
                                            </Flex>
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
                                        <Table.Cell align="right">
                                            <DashboardUserActions
                                                user={{
                                                    id: u.id,
                                                    email: u.email,
                                                    vorname: u.vorname,
                                                    name: u.name,
                                                }}
                                                isAdmin={isAdmin}
                                                currentUserId={currentUser.id}
                                                deleteUserAction={deleteUserAction}
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
