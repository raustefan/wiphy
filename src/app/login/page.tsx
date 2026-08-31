"use client";

import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { RegSuccessDialog } from "./RegSuccessDialog";
import { checkLoginFeatureEnabled } from "./actions";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [featureDisabled, setFeatureDisabled] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const loginEnabled = await checkLoginFeatureEnabled(email);
        if (!loginEnabled) {
            setFeatureDisabled(true);
            return;
        }

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Login fehlgeschlagen. Bitte prüfe deine Daten.");
            setPassword("");
        } else {
            router.push("/dashboard");
            router.refresh();
        }
    };

    return (
        <Container size="1" style={{ paddingTop: "12vh", paddingBottom: "8vh" }}>
            <Suspense fallback={null}>
                <RegSuccessDialog />
            </Suspense>
            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Login"
                onOpenChange={setFeatureDisabled}
            />

            <Card size="4" style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)" }}>
                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="5">
                        <Flex direction="column" gap="2" align="center">
                            <Heading as="h1" size="7" align="center">
                                Mitgliederbereich
                            </Heading>
                            <Text size="2" color="gray">
                                Melde dich an um fortzufahren
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
                                <Text as="label" size="2" weight="bold">
                                    E-Mail-Adresse
                                </Text>
                                <TextField.Root
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="mail@beispiel.de"
                                    required
                                />
                            </Flex>

                            <Flex direction="column" gap="2">
                                <Flex justify="between" align="center">
                                    <Text as="label" size="2" weight="bold">
                                        Passwort
                                    </Text>
                                    <Link href="/forgot-password" size="1" style={{ color: "var(--accent-9)", textDecoration: "none" }}>
                                        Passwort zurücksetzen
                                    </Link>
                                </Flex>
                                <TextField.Root
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Dein Passwort"
                                    required
                                />
                            </Flex>
                        </Flex>

                        <Button type="submit" size="3">
                            Anmelden
                        </Button>

                        <Flex direction="column" gap="2" align="center">
                            <Text align="center" size="2" color="gray">
                                Noch nicht registriert?{" "}
                                <Link href="/register" style={{ color: "var(--accent-9)", textDecoration: "none", fontWeight: "500" }}>
                                    Jetzt Konto erstellen
                                </Link>
                            </Text>
                        </Flex>
                    </Flex>
                </form>
            </Card>
        </Container>
    );
}