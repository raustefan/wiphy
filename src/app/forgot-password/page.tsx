"use client";

import { useState } from "react";
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
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [featureDisabled, setFeatureDisabled] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json();
                if (data.code === "FEATURE_DISABLED") {
                    setFeatureDisabled(true);
                    setStatus("idle");
                    return;
                }
                throw new Error(data.error || "Etwas ist schiefgelaufen.");
            }

            setStatus("success");
        } catch (err: any) {
            console.error(err);
            setErrorMessage(err.message || "Es gab ein Problem beim Senden der E-Mail.");
            setStatus("error");
        }
    };

    return (
        <Container size="1" style={{ paddingTop: "20vh" }}>
            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Passwort zurücksetzen"
                onOpenChange={setFeatureDisabled}
            />
            <Card size="4">
                <Flex direction="column" gap="4">
                    <Heading as="h1" size="6" align="center">
                        Passwort vergessen
                    </Heading>

                    {status === "success" ? (
                        <Flex direction="column" gap="3">
                            <Text color="green" size="3" align="center">
                                Falls ein Konto mit dieser E-Mail-Adresse existiert, wurde ein Link zum Zurücksetzen gesendet.
                            </Text>
                            <Text align="center" size="2" color="gray" mt="2">
                                <Link href="/login" style={{ color: "var(--accent-9)", textDecoration: "none" }}>
                                    Zurück zum Login
                                </Link>
                            </Text>
                        </Flex>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <Flex direction="column" gap="4">
                                <Text size="2" color="gray" align="center">
                                    Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen Link, um Ihr Passwort zurückzusetzen.
                                </Text>

                                {status === "error" && errorMessage && (
                                    <Text color="red" size="2" align="center">
                                        {errorMessage}
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
                                        placeholder="beispiel@domain.de"
                                    />
                                </Flex>

                                <Button type="submit" size="3" mt="2" loading={status === "loading"}>
                                    Link anfordern
                                </Button>

                                <Text align="center" size="2" color="gray" mt="3">
                                    <Link href="/login" style={{ color: "var(--accent-9)", textDecoration: "none" }}>
                                        Zurück zum Login
                                    </Link>
                                </Text>
                            </Flex>
                        </form>
                    )}
                </Flex>
            </Card>
        </Container>
    );
}
