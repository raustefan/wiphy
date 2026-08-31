"use client";

import { useState, useEffect } from "react";
import { Container, Card, Heading, Flex, Text, Button, Box } from "@radix-ui/themes";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { MailForm, type MailUserOption } from "./MailForm";
import Link from "next/link";
import { DashboardPageHeader } from "../DashboardPageHeader";

export function MailDashboard() {
    const [success, setSuccess] = useState(false);
    const [sentCount, setSentCount] = useState(0);
    const [users, setUsers] = useState<MailUserOption[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("/api/users");
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (success) {
        return (
            <Container size="2" mt="6" mb="6" px={{ initial: "4", sm: "5" }}>
                <Card size="4">
                    <Flex direction="column" align="center" gap="3" py="4">
                        <CheckCircledIcon
                            width={56}
                            height={56}
                            color="var(--green-9)"
                            aria-hidden
                        />
                        <Heading as="h1" mb="0">E-Mail gesendet</Heading>
                        <Text size="2" align="center" mb="0">
                            Die Nachricht wurde an {sentCount} {sentCount === 1 ? "Empfänger" : "Empfänger"} versendet.
                        </Text>
                        <Flex justify="center" mt="2" width="100%" gap="3" direction={{ initial: "column", xs: "row" }}>
                            <Button size="3" asChild>
                                <Link href="/dashboard/mail">Weitere E-Mail senden</Link>
                            </Button>
                            <Button size="3" variant="soft" asChild>
                                <Link href="/dashboard">Zum Dashboard</Link>
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
            </Container>
        );
    }

    if (loading) {
        return (
            <Container size="2" mt="6" mb="6" px={{ initial: "4", sm: "5" }}>
                <Card size="4">
                    <Text>Lade Benutzer...</Text>
                </Card>
            </Container>
        );
    }

    return (
        <Box py={{ initial: "6", sm: "8" }} style={{ minHeight: "100%" }}>
            <Container size="3" px={{ initial: "4", sm: "5" }}>
                <DashboardPageHeader
                    eyebrow="Internbereich"
                    title="Rundmail verschicken"
                    description="Wähle eine Empfängergruppe nach Mitgliedsstatus oder einzelne Nutzer aus."
                    backHref="/dashboard"
                />

                <Card size={{ initial: "3", sm: "4" }}>
                    <MailForm users={users} onSuccess={(count) => {
                        setSentCount(count);
                        setSuccess(true);
                    }} />
                </Card>
            </Container>
        </Box>
    );
}
