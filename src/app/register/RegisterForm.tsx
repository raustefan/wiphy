"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { registerUser } from "./actions";
import { Container, Card, Heading, Flex, Text, TextField, Button } from "@radix-ui/themes";
import Link from "next/link";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";

export function RegisterForm({ challengeJson }: { challengeJson: string }) {
    const [error, setError] = useState("");
    const [featureDisabled, setFeatureDisabled] = useState(false);

    useEffect(() => {
        import("altcha");
    }, []);

    async function handleAction(formData: FormData) {
        setError("");
        const res = await registerUser(formData);
        if (!res.ok) {
            if (res.code === "FORBIDDEN") {
                setFeatureDisabled(true);
            } else {
                setError(res.message);
            }
        }
    }

    return (
        <Container size="1" style={{ paddingTop: "12vh", paddingBottom: "8vh" }}>
            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Registrierung"
                onOpenChange={setFeatureDisabled}
            />
            <Card size="4" style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)" }}>
                <form action={handleAction}>
                    <Flex direction="column" gap="5">
                        <Flex direction="column" gap="2" align="center">
                            <Heading as="h1" size="7" align="center">
                                Neues Konto erstellen
                            </Heading>
                            <Text size="2" color="gray" align="center">
                                Ein Nutzerkonto bestätigt noch nicht die Mitgliedschaft im WirtschaftsPhysik Alumni e.V.
                            </Text>
                        </Flex>

                        {error && (
                            <Flex
                                style={{
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                    borderLeft: "4px solid rgb(239, 68, 68)",
                                    padding: "12px 16px",
                                    borderRadius: "4px",
                                }}
                            >
                                <Text color="red" size="2">
                                    {error}
                                </Text>
                            </Flex>
                        )}

                        <Flex direction="column" gap="4">
                            <Flex direction="column" gap="2">
                                <label>
                                    <Text size="2" weight="bold">Vorname</Text>
                                    <TextField.Root name="vorname" required placeholder="Dein Vorname" mt="1" />
                                </label>
                                <label>
                                    <Text size="2" weight="bold">Nachname</Text>
                                    <TextField.Root name="name" required placeholder="Dein Nachname" mt="1" />
                                </label>
                            </Flex>

                            <label>
                                <Text size="2" weight="bold">E-Mail-Adresse</Text>
                                <TextField.Root name="email" type="email" required placeholder="mail@beispiel.de" mt="1" />
                            </label>

                            <label>
                                <Text size="2" weight="bold">Passwort</Text>
                                <TextField.Root name="password" type="password" required minLength={8} placeholder="Mindestens 8 Zeichen" mt="1" />
                                <Text size="1" color="gray" mt="1">
                                    Verwende eine starke Kombination aus Buchstaben, Zahlen und Sonderzeichen
                                </Text>
                            </label>
                        </Flex>

                        <label>
                            <Text size="2" weight="bold">Sicherheitsüberprüfung</Text>
                            <altcha-widget
                                challenge={challengeJson}
                                name="altcha"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    marginTop: "4px",
                                    "--altcha-max-width": "100%",
                                    "--altcha-border-radius": "var(--radius-3)",
                                    "--altcha-border-color": "var(--gray-a7)",
                                    "--altcha-color-base": "var(--color-panel)",
                                    "--altcha-color-base-content": "var(--gray-12)",
                                    "--altcha-color-primary": "var(--accent-9)",
                                } as CSSProperties}
                            />
                        </label>

                        <Button type="submit" size="3">
                            Konto erstellen
                        </Button>

                        <Flex direction="column" gap="2" align="center">
                            <Text align="center" size="2" color="gray">
                                Du hast schon ein Konto?{" "}
                                <Link href="/login" style={{ color: "var(--accent-9)", textDecoration: "none", fontWeight: "500" }}>
                                    Hier anmelden
                                </Link>
                            </Text>
                        </Flex>
                    </Flex>
                </form>
            </Card>
        </Container>
    );
}
