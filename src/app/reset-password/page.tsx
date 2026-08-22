"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Container,
    Card,
    Heading,
    Flex,
    Text,
    TextField,
    Button,
} from "@radix-ui/themes";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [featureDisabled, setFeatureDisabled] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!token) {
            setErrorMessage("Ungültiger oder fehlender Token.");
            setStatus("error");
            return;
        }

        if (password.length < 8) {
            setErrorMessage("Das Passwort muss mindestens 8 Zeichen lang sein.");
            setStatus("error");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Die Passwörter stimmen nicht überein.");
            setStatus("error");
            return;
        }

        setStatus("loading");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
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
            setErrorMessage(err.message || "Fehler beim Zurücksetzen des Passworts.");
            setStatus("error");
        }
    };

    if (!token) {
        return (
            <Flex direction="column" gap="4">
                <Heading as="h1" size="6" align="center">
                    Passwort zurücksetzen
                </Heading>
                <Text color="red" size="3" align="center">
                    Der Link zum Zurücksetzen des Passworts ist ungültig oder unvollständig. Bitte fordern Sie einen neuen Link an.
                </Text>
                <Text align="center" size="2" color="gray" mt="2">
                    <Link href="/forgot-password" style={{ color: "var(--accent-9)", textDecoration: "none" }}>
                        Neuen Link anfordern
                    </Link>
                </Text>
            </Flex>
        );
    }

    if (status === "success") {
        return (
            <Flex direction="column" gap="4">
                <Heading as="h1" size="6" align="center">
                    Erfolgreich!
                </Heading>
                <Text color="green" size="3" align="center">
                    Ihr Passwort wurde erfolgreich zurückgesetzt. Sie können sich nun mit Ihrem neuen Passwort anmelden.
                </Text>
                <Button asChild size="3" mt="2">
                    <Link href="/login" style={{ textDecoration: "none", color: "white", textAlign: "center" }}>
                        Zum Login
                    </Link>
                </Button>
            </Flex>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Passwort zurücksetzen"
                onOpenChange={setFeatureDisabled}
            />
            <Flex direction="column" gap="4">
                <Heading as="h1" size="6" align="center">
                    Neues Passwort festlegen
                </Heading>

                {status === "error" && errorMessage && (
                    <Text color="red" size="2" align="center">
                        {errorMessage}
                    </Text>
                )}

                <Flex direction="column" gap="1">
                    <Text as="label" size="2" weight="bold">
                        Neues Passwort (mind. 8 Zeichen)
                    </Text>
                    <TextField.Root
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Flex>

                <Flex direction="column" gap="1">
                    <Text as="label" size="2" weight="bold">
                        Passwort bestätigen
                    </Text>
                    <TextField.Root
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Flex>

                <Button type="submit" size="3" mt="2" loading={status === "loading"}>
                    Passwort speichern
                </Button>
            </Flex>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <Container size="1" style={{ paddingTop: "20vh" }}>
            <Card size="4">
                <Suspense fallback={<Text align="center">Laden...</Text>}>
                    <ResetPasswordForm />
                </Suspense>
            </Card>
        </Container>
    );
}
