"use client";

import { useState, useEffect } from "react";
import { Container, Card, Heading, Flex, Text, Button, Box } from "@radix-ui/themes";
import { CheckCircledIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { MailForm, type MailUserOption } from "./MailForm";
import Link from "next/link";

export default function MailDashboardPage() {
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
            <Container size="2" mt="6" mb="6">
                <Card size="4">
                    <Flex direction="column" align="center" gap="3" py="4">
                        <CheckCircledIcon
                            width={56}
                            height={56}
                            color="var(--green-9)"
                            aria-hidden
                        />
                        <Heading mb="0">E-Mail gesendet</Heading>
                        <Text size="2" align="center" mb="0">
                            Die Nachricht wurde an {sentCount} {sentCount === 1 ? "Empfänger" : "Empfänger"} versendet.
                        </Text>
                        <Flex justify="center" mt="2" width="100%">
                            <Link href="/dashboard/mail">
                                <Button>Weitere E-Mail senden</Button>
                            </Link>
                            <Link href="/dashboard" style={{ marginLeft: "8px" }}>
                                <Button variant="soft">Zum Dashboard</Button>
                            </Link>
                        </Flex>
                    </Flex>
                </Card>
            </Container>
        );
    }

    if (loading) {
        return (
            <Container size="2" mt="6" mb="6">
                <Card size="4">
                    <Text>Lade Benutzer...</Text>
                </Card>
            </Container>
        );
    }

    return (
        <Box py="5" style={{ minHeight: "100%" }}>
            <Container size="4">
                <Flex justify="between" align="center" mb="4">
                    <Box>
                        <Text size="2" color="gray">
                            Internbereich
                        </Text>
                        <Heading size="6">Rundmail verschicken</Heading>
                    </Box>
                    <Link href="/dashboard">
                        <Button variant="soft" color="gray">
                            <ArrowLeftIcon /> Zurück zum Dashboard
                        </Button>
                    </Link>
                </Flex>

                <Card size="3">
                    <MailForm users={users} onSuccess={(count) => {
                        setSentCount(count);
                        setSuccess(true);
                    }} />
                </Card>
            </Container>
        </Box>
    );
}
