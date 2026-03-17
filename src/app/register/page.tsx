"use client";

import { useState } from "react";
import { registerUser } from "./actions";
import { Container, Card, Heading, Flex, Text, TextField, Button } from "@radix-ui/themes";
import Link from "next/link";

export default function RegisterPage() {
    const [error, setError] = useState("");

    async function handleAction(formData: FormData) {
        setError("");
        const res = await registerUser(formData);
        if (res?.error) {
            setError(res.error);
        }
    }

    return (
        <Container size="1" mt="9">
            <Card size="4">
                <form action={handleAction}>
                    <Flex direction="column" gap="4">
                        <Heading as="h1" size="6" align="center">
                            Registrieren
                        </Heading>

                        {error && (
                            <Text color="red" size="2" align="center">
                                {error}
                            </Text>
                        )}

                        <label>
                            <Text size="2" weight="bold">Name</Text>
                            <TextField.Root name="name" required placeholder="Max Mustermann" mt="1" />
                        </label>

                        <label>
                            <Text size="2" weight="bold">E-Mail</Text>
                            <TextField.Root name="email" type="email" required placeholder="max@beispiel.de" mt="1" />
                        </label>

                        <label>
                            <Text size="2" weight="bold">Passwort</Text>
                            <TextField.Root name="password" type="password" required placeholder="Mindestens 6 Zeichen" mt="1" />
                        </label>

                        <Button type="submit" size="3" mt="2">
                            Konto erstellen
                        </Button>

                        <Text align="center" size="2" color="gray">
                            Du hast schon ein Konto?{" "}
                            <Link href="/login" style={{ color: "var(--accent-9)", textDecoration: "none" }}>
                                Hier einloggen
                            </Link>
                        </Text>
                    </Flex>
                </form>
            </Card>
        </Container>
    );
}