"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Container,
    Card,
    Heading,
    Flex,
    Text,
    TextField,
    Button,
    Link,
} from "@radix-ui/themes";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("admin@wiphy.de");
    const [password, setPassword] = useState("admin123");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Login fehlgeschlagen. Bitte prüfe deine Daten.");
        } else {
            router.push("/dashboard"); // <-- Jetzt geht's direkt ins Dashboard!
            router.refresh();
        }
    };

    return (
        <Container size="1" style={{ paddingTop: "20vh" }}>
            <Card size="4">
                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="4">
                        <Heading as="h1" size="6" align="center">
                            wiphy Login
                        </Heading>

                        {error && (
                            <Text color="red" size="2" align="center">
                                {error}
                            </Text>
                        )}

                        <Flex direction="column" gap="1">
                            <Text as="label" size="2" weight="bold">
                                E-Mail
                            </Text>
                            <TextField.Root
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Flex>

                        <Flex direction="column" gap="1">
                            <Text as="label" size="2" weight="bold">
                                Passwort
                            </Text>
                            <TextField.Root
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Flex>

                        <Button type="submit" size="3" mt="2">
                            Einloggen
                        </Button>

                        {/* NEU: Link zur Registrierung */}
                        <Text align="center" size="2" color="gray" mt="3">
                            Noch kein Konto?{" "}
                            <Link href="/register" style={{ color: "var(--accent-9)", textDecoration: "none" }}>
                                Jetzt registrieren
                            </Link>
                        </Text>

                    </Flex>
                </form>
            </Card>
        </Container>
    );
}