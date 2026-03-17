import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
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
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
    const session = await auth();
    if (!session) redirect("/login");

    const currentUser = session.user as any;
    const isAdmin = currentUser.role === "ADMIN";

    // Wichtig: Wenn ID fehlt, laden wir ein leeres Array zur Sicherheit
    if (!currentUser.id) return <Text>Session-Fehler: Bitte neu einloggen!</Text>;

    const users = isAdmin
        ? await prisma.user.findMany({ orderBy: { createdAt: "desc" } })
        : await prisma.user.findMany({ where: { id: currentUser.id } });

    return (
        <Box
            py="5"
            style={{
                minHeight: "100%",
                background:
                    "radial-gradient(circle at top left, rgba(0,191,168,0.16), transparent 55%), radial-gradient(circle at bottom right, rgba(148,28,77,0.12), transparent 55%)",
            }}
        >
            <Container size="4">
                <Flex justify="between" align="center" mb="4">
                    <Box>
                        <Text size="2" color="gray">
                            Internbereich
                        </Text>
                        <Heading size="6">Dashboard</Heading>
                    </Box>
                    <LogoutButton />
                </Flex>

                <Flex gap="4" direction={{ initial: "column", md: "row" }} mb="4">
                    <Card size="3" style={{ flex: 1, minWidth: 0 }}>
                        <Text size="2" color="gray" mb="1">
                            Willkommen
                        </Text>
                        <Heading size="4" mb="1">
                            {currentUser.titel
                                ? `${currentUser.titel} ${currentUser.name || currentUser.email}`
                                : currentUser.name || currentUser.email}
                        </Heading>
                        <Flex align="center" gap="2">
                            Rolle:
                            <Text size="2" color="gray">
                            </Text>
                            <Badge color={isAdmin ? "red" : "blue"}>{currentUser.role}</Badge>
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
                            <Heading size="4">
                                {isAdmin ? "Benutzerverwaltung" : "Mein Profil"}
                            </Heading>
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
                                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Rolle</Table.ColumnHeaderCell>
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