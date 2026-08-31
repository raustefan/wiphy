"use client";

import { signIn } from "next-auth/react";
import { Suspense, useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { RegSuccessDialog } from "./RegSuccessDialog";
import { LoginFaq } from "./LoginFaq";
import {
    checkLoginFeatureEnabled,
    createLoginChallenge,
    resendVerificationEmail,
} from "./actions";
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

export function LoginForm({ challengeJson }: { challengeJson: string }) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailUnverified, setEmailUnverified] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [resendState, setResendState] = useState<
        "idle" | "sending" | "sent" | "error"
    >("idle");
    const [resendMessage, setResendMessage] = useState("");
    const [featureDisabled, setFeatureDisabled] = useState(false);
    const [challenge, setChallenge] = useState(challengeJson);

    useEffect(() => {
        import("altcha");
    }, []);

    // A solved challenge is single-use on the server, so every failed attempt
    // needs a fresh one. Changing the `key` remounts the widget, which clears
    // the spent solution and makes the user re-run the check.
    const renewChallenge = async () => {
        const next = await createLoginChallenge();
        setChallenge(next);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;

        const altcha = String(new FormData(e.currentTarget).get("altcha") ?? "");

        setSubmitting(true);
        setError("");
        setEmailUnverified(false);
        setResendState("idle");
        setResendMessage("");

        try {
            if (!altcha) {
                setError("Bitte bestätige zuerst die Sicherheitsüberprüfung.");
                return;
            }

            const loginEnabled = await checkLoginFeatureEnabled(email);
            if (!loginEnabled) {
                setFeatureDisabled(true);
                return;
            }

            const res = await signIn("credentials", {
                email,
                password,
                altcha,
                redirect: false,
            });

            if (res?.error) {
                if (res.code === "email_not_verified") {
                    setEmailUnverified(true);
                    setError(
                        "Deine E-Mail-Adresse ist noch nicht bestätigt. Bitte bestätige sie über den Link in deiner E-Mail, bevor du dich anmeldest.",
                    );
                } else if (res.code === "rate_limited") {
                    setError(
                        "Zu viele Login-Versuche. Bitte warte 10 Minuten und versuche es dann erneut.",
                    );
                } else if (res.code === "captcha_failed") {
                    setError(
                        "Die Sicherheitsüberprüfung ist abgelaufen. Bitte führe sie erneut durch.",
                    );
                } else {
                    setError("Login fehlgeschlagen. Bitte prüfe deine Daten.");
                }
                setPassword("");
                await renewChallenge();
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleResend = async () => {
        setResendState("sending");
        setResendMessage("");
        const result = await resendVerificationEmail(email);
        if (result.ok) {
            setResendState("sent");
            setResendMessage(
                "Wir haben dir eine neue E-Mail zur Bestätigung geschickt. Bitte prüfe dein Postfach (auch den Spam-Ordner).",
            );
        } else {
            setResendState("error");
            setResendMessage(result.message);
        }
    };

    return (
        <Container
            size="4"
            style={{
                paddingTop: "5vh",
                paddingBottom: "5vh",
                paddingLeft: "16px",
                paddingRight: "16px",
            }}
        >
            <Suspense fallback={null}>
                <RegSuccessDialog />
            </Suspense>
            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Login"
                onOpenChange={setFeatureDisabled}
            />

            <Flex
                direction={{ initial: "column", md: "row-reverse" }}
                gap={{ initial: "4", md: "5" }}
                align="center"
                justify="center"
            >
                <Card
                    size={{ initial: "3", md: "4" }}
                    style={{
                        boxShadow: "0 4px 6px var(--gray-a4)",
                        width: "100%",
                        maxWidth: "420px",
                        flexShrink: 0,
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Flex direction="column" gap="4" align="center">
                            <Flex direction="column" gap="2" align="center">
                                <Heading
                                    as="h1"
                                    size={{ initial: "6", sm: "7" }}
                                    align="center"
                                >
                                    Mitgliederbereich
                                </Heading>
                                <Text size="2" color="gray" align="center">
                                    Melde dich an um fortzufahren
                                </Text>
                            </Flex>

                            {error && (
                                <Flex
                                    style={{
                                        backgroundColor: "var(--red-a3)",
                                        borderLeft: "4px solid var(--red-9)",
                                        padding: "12px",
                                        borderRadius: "var(--radius-2)",
                                        width: "100%",
                                    }}
                                >
                                    <Flex direction="column" gap="2" style={{ width: "100%" }}>
                                        <Text color="red" size="2">
                                            {error}
                                        </Text>
                                        {emailUnverified && resendState !== "sent" && (
                                            <Button
                                                type="button"
                                                variant="soft"
                                                size="2"
                                                onClick={handleResend}
                                                disabled={resendState === "sending"}
                                                style={{ width: "100%" }}
                                            >
                                                {resendState === "sending"
                                                    ? "Wird gesendet..."
                                                    : "Bestätigungs-E-Mail erneut senden"}
                                            </Button>
                                        )}
                                        {resendMessage && (
                                            <Text
                                                size="2"
                                                color={resendState === "error" ? "red" : "green"}
                                            >
                                                {resendMessage}
                                            </Text>
                                        )}
                                    </Flex>
                                </Flex>
                            )}

                            <Flex direction="column" gap="4" style={{ width: "100%" }}>
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
                                        size="3"
                                    />
                                </Flex>

                                <Flex direction="column" gap="2">
                                    <Flex
                                        direction={{ initial: "column", sm: "row" }}
                                        justify="between"
                                        align={{ initial: "center", sm: "center" }}
                                        gap="1"
                                    >
                                        <Text as="label" size="2" weight="bold">
                                            Passwort
                                        </Text>
                                        <Link
                                            href="/forgot-password"
                                            size="1"
                                            style={{
                                                color: "var(--accent-9)",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Passwort zurücksetzen
                                        </Link>
                                    </Flex>
                                    <TextField.Root
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Dein Passwort"
                                        required
                                        size="3"
                                    />
                                </Flex>

                                <Flex direction="column" gap="2">
                                    <Text as="label" size="2" weight="bold">
                                        Sicherheitsüberprüfung
                                    </Text>
                                    <altcha-widget
                                        key={challenge}
                                        challenge={challenge}
                                        name="altcha"
                                        style={{
                                            display: "block",
                                            width: "100%",
                                            "--altcha-max-width": "100%",
                                            "--altcha-border-radius": "var(--radius-3)",
                                            "--altcha-border-color": "var(--gray-a7)",
                                            "--altcha-color-base": "var(--color-panel)",
                                            "--altcha-color-base-content": "var(--gray-12)",
                                            "--altcha-color-primary": "var(--accent-9)",
                                        } as CSSProperties}
                                    />
                                </Flex>
                            </Flex>

                            <Button
                                type="submit"
                                size="3"
                                loading={submitting}
                                style={{ minHeight: "44px", width: "100%" }}
                            >
                                Anmelden
                            </Button>

                            <Flex direction="column" gap="2" align="center">
                                <Text align="center" size="2" color="gray">
                                    Noch nicht registriert?{" "}
                                    <Link
                                        href="/register"
                                        style={{
                                            color: "var(--accent-9)",
                                            textDecoration: "none",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Jetzt Konto erstellen
                                    </Link>
                                </Text>
                            </Flex>
                        </Flex>
                    </form>
                </Card>

                <Flex
                    style={{ width: "100%", maxWidth: "560px" }}
                    justify="center"
                >
                    <LoginFaq />
                </Flex>
            </Flex>
        </Container>
    );
}
