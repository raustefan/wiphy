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
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { Button, Container, Field, Input } from "@/components/ui";

/** Altcha-Widget an die Design-Tokens angleichen. */
const ALTCHA_STYLE = {
    display: "block",
    width: "100%",
    "--altcha-max-width": "100%",
    "--altcha-border-radius": "0.75rem",
    "--altcha-border-color": "var(--line-strong)",
    "--altcha-color-base": "var(--surface)",
    "--altcha-color-base-content": "var(--foreground)",
    "--altcha-color-primary": "var(--physics)",
} as CSSProperties;

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
        <Container size="4" className="py-8 sm:py-14">
            <Suspense fallback={null}>
                <RegSuccessDialog />
            </Suspense>
            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Login"
                onOpenChange={setFeatureDisabled}
            />

            <div className="flex flex-col items-center justify-center gap-6 lg:flex-row-reverse lg:items-start lg:gap-10">
                <div className="w-full max-w-md shrink-0">
                    <AuthShell
                        title="Mitgliederbereich"
                        description="Melde dich an, um fortzufahren."
                        footer={
                            <>
                                Noch nicht registriert?{" "}
                                <AuthLink href="/register">Jetzt Konto erstellen</AuthLink>
                            </>
                        }
                    >
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            {error && (
                                <div
                                    role="alert"
                                    className="grid gap-2 rounded-xl border-l-4 border-negative bg-negative/8 px-3.5 py-3"
                                >
                                    <p className="text-sm text-negative">{error}</p>
                                    {emailUnverified && resendState !== "sent" && (
                                        <Button
                                            type="button"
                                            variant="soft"
                                            color="neutral"
                                            size="sm"
                                            onClick={handleResend}
                                            loading={resendState === "sending"}
                                            className="w-full"
                                        >
                                            Bestätigungs-E-Mail erneut senden
                                        </Button>
                                    )}
                                    {resendMessage && (
                                        <p
                                            className={
                                                resendState === "error"
                                                    ? "text-sm text-negative"
                                                    : "text-sm text-positive"
                                            }
                                        >
                                            {resendMessage}
                                        </p>
                                    )}
                                </div>
                            )}

                            <Field label="E-Mail-Adresse" htmlFor="login-email">
                                <Input
                                    id="login-email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="mail@beispiel.de"
                                    required
                                />
                            </Field>

                            <div className="grid gap-1.5">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                    <label
                                        htmlFor="login-password"
                                        className="text-sm font-semibold text-foreground"
                                    >
                                        Passwort
                                    </label>
                                    <AuthLink href="/forgot-password">
                                        <span className="text-xs">Passwort zurücksetzen</span>
                                    </AuthLink>
                                </div>
                                <Input
                                    id="login-password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Dein Passwort"
                                    required
                                />
                            </div>

                            <div className="grid gap-1.5">
                                <span className="text-sm font-semibold text-foreground">
                                    Sicherheitsüberprüfung
                                </span>
                                <altcha-widget
                                    key={challenge}
                                    challenge={challenge}
                                    name="altcha"
                                    style={ALTCHA_STYLE}
                                />
                            </div>

                            <Button type="submit" size="lg" loading={submitting} className="w-full">
                                Anmelden
                            </Button>
                        </form>
                    </AuthShell>
                </div>

                <div className="w-full max-w-xl lg:mt-12">
                    <LoginFaq />
                </div>
            </div>
        </Container>
    );
}
