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

import { getFeeYears } from "@/lib/server/services/feeService";

import Link from "next/link";
import type { Status } from "@prisma/client";
import LogoutButton from "@/components/LogoutButton";




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

const years = getFeeYears(2000);
const users = (await getFeeDashboardUsers(currentUser.id, currentUser.role)) as Array<
    User & { fees: MemberFee[] }
>;

const currentYear = new Date().getFullYear();
// Find the current user's record in the users array
const myRecord = users.find((u) => u.id === currentUser.id);
const myCurrentYearFeePaid = myRecord?.fees?.find((f) => f.jahr === currentYear)?.bezahlt ?? false;


export default async function DashboardPage() {
    const currentUser = await requireUser();
    const isAdmin = currentUser.role === "ADMIN";
    if (!currentUser.id) redirect("/login");
    const users = await getDashboardUsers(currentUser.id, currentUser.role);
    const profile = await getEditableUser(currentUser.id);

    // Resolve status and memberSince once, safely
    const userStatus = profile?.status ?? currentUser.status ?? "KEIN_MITGLIED";
    const memberSince = profile?.createdAt ?? null;

    return (
        <Box
            py="5"
            style={{
                minHeight: "100%",
                background:
                    "radial-gradient(circle at top left, rgba(0,191,168,0.16), transparent 55%), radial-gradient(circle at bottom right, rgba(148,28,77,0.12), transparent 55%)",
            }}
        >
            <Suspense fallback={null}>
                <MailSuccessDialog />
            </Suspense>
            <Container size="4">
                <Flex justify="between" align="center" mb="4">
                    <Heading size="8" mb="1">
                        {"Hallo, "}
                        {profile?.vorname ?? profile?.name ?? currentUser.email ?? "Gast"}
                        {"!"}
                    </Heading>
                    <LogoutButton />
                </Flex>

                <Flex gap="4" direction={{ initial: "column", md: "row" }} mb="4">
                    <Card size="3" style={{ flex: 1, minWidth: 0 }}>
                        <Flex gap="2" direction={{ initial: "column", md: "row" }}>
                            <Flex direction="column" gap="1">
                                <Text size="2" color="gray">Mitgliedschaft</Text>
                                <Badge color={userStatus === "KEIN_MITGLIED" ? "red" : "blue"}>
                                    <Text>{formatStatus(userStatus)}</Text>
                                </Badge>
                            </Flex>

                            <Flex direction="column" gap="1">
                                <Text size="2" color="gray">Account seit</Text>
                                <Badge color={userStatus === "KEIN_MITGLIED" ? "red" : "blue"}>
                                    <Text>{formatDate(memberSince)}</Text>
                                </Badge>
                            </Flex>
                        </Flex>
                    </Card>

                    {isAdmin && (
                        <Card size="3" style={{ flex: 1, minWidth: 0 }}>
                            <Text size="2" color="gray" mb="1">
                                Admin-Aktionen
                            </Text>
                            <Flex justify="between" align="center" mb="2">
                                <Heading size="4">Inhalte & Verwaltung</Heading>
                            </Flex>
                            <Flex gap="2" wrap="wrap">
                                <Link href="/dashboard/blog">
                                    <Button size="2" variant="soft">
                                        Blog verwalten
                                    </Button>
                                </Link>
                                <Link href="/dashboard/mail">
                                    <Button size="2" color="blue" variant="solid">
                                        Rundmail senden
                                    </Button>
                                </Link>
                                <Link href="/dashboard/fees">
                                    <Button size="2" variant="outline">
                                        Beiträge & Zahlungen
                                    </Button>
                                </Link>
                            </Flex>
                        </Card>
                    )}
                </Flex>

                <Card size="3">
                    <Flex justify="between" align="baseline" mb="3">
                        <Box>
                            <Text size="2" color="gray">
                                {isAdmin ? "Übersicht aller registrierten Nutzer" : "Deine hinterlegten Daten"}
                            </Text>
                            <Heading size="4">{isAdmin ? "Benutzerverwaltung" : "Mein Profil"}</Heading>
                        </Box>
                        <Text size="2" color="gray">
                            {users.length} {users.length === 1 ? "Eintrag" : "Einträge"}
                        </Text>
                    </Flex>

                    <Separator mb="3" />

                    <Table.Root variant="surface">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>E-Mail</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Rolle</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Mitgliedschaft</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell align="right">Aktion</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {users.map((u) => (
                                <Table.Row key={u.id}>
                                    <Table.Cell>{u.name || "—"}</Table.Cell>
                                    <Table.Cell>{u.email}</Table.Cell>
                                    <Table.Cell>
                                        <Badge color={u.role === "ADMIN" ? "red" : "blue"}>{u.role}</Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge color={u.status === "KEIN_MITGLIED" ? "red" : "blue"}>
                                            <Text>{formatStatus(u.status)}</Text>
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell align="right">
                                        <Link href={`/dashboard/users/${u.id}`}>
                                            <Button size="1" variant="soft">
                                                Bearbeiten
                                            </Button>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Card>
            </Container>
        </Box>
    );
}