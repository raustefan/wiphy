"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    Container,
    Card,
    Heading,
    Flex,
    Text,
    Button,
    Link,
} from "@radix-ui/themes";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [featureDisabled, setFeatureDisabled] = useState(false);

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setErrorMessage("Ungültiger oder fehlender Token.");
            return;
        }

        setStatus("loading");

        fetch("/api/auth/verify-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        })
            .then(async (res) => {
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
            })
            .catch((err: any) => {
                console.error(err);
                setErrorMessage(err.message || "Fehler bei der E-Mail-Bestätigung.");
                setStatus("error");
            });
    }, [token]);

    if (!token) {
        return (
            <Flex direction="column" gap="4">
                <Heading as="h1" size="6" align="center">
                    E-Mail bestätigen
                </Heading>
                <Text color="red" size="3" align="center">
                    Der Bestätigungslink ist ungültig oder unvollständig. Bitte registriere dich erneut oder nutze den Link aus deiner E-Mail.
                </Text>
                <Button asChild size="3" mt="2">
                    <Link href="/register" style={{ textDecoration: "none", color: "white", textAlign: "center" }}>
                        Zur Registrierung
                    </Link>
                </Button>
            </Flex>
        );
    }

    if (status === "loading") {
        return (
            <Flex direction="column" gap="4" align="center">
                <Heading as="h1" size="6">
                    E-Mail wird verifiziert...
                </Heading>
                <Text size="3" color="gray">
                    Bitte habe einen Augenblick Geduld.
                </Text>
            </Flex>
        );
    }

    if (status === "success") {
        return (
            <Flex direction="column" gap="4">
                <Heading as="h1" size="6" align="center">
                    Erfolgreich bestätigt!
                </Heading>
                <Text color="green" size="3" align="center">
                    Deine E-Mail-Adresse wurde erfolgreich bestätigt.
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
        <Flex direction="column" gap="4">
            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="E-Mail-Verifizierung"
                onOpenChange={setFeatureDisabled}
            />
            <Heading as="h1" size="6" align="center">
                Fehler bei der Verifizierung
            </Heading>
            <Text color="red" size="3" align="center">
                {errorMessage || "Der Bestätigungslink ist ungültig oder abgelaufen."}
            </Text>
            <Button asChild size="3" mt="2" color="gray">
                <Link href="/login" style={{ textDecoration: "none", color: "white", textAlign: "center" }}>
                    Zurück zum Login
                </Link>
            </Button>
        </Flex>
    );
}

export default function VerifyEmailPage() {
    return (
        <Container size="1" style={{ paddingTop: "20vh" }}>
            <Card size="4">
                <Suspense fallback={<Text align="center">Laden...</Text>}>
                    <VerifyEmailContent />
                </Suspense>
            </Card>
        </Container>
    );
}
