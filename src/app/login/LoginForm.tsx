"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, LogIn, MailCheck } from "lucide-react";
import { LoginFaq } from "./LoginFaq";
import {
    checkLoginFeatureEnabled,
    createLoginChallenge,
    resendVerificationEmail,
} from "./actions";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";
import { useActionForm } from "@/lib/client/useActionForm";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { AltchaField } from "@/components/AltchaField";
import { PasswordInput } from "@/components/PasswordField";
import { Button, Callout, Container, Field, Input } from "@/components/ui";
import { MEMBERSHIP_APPLICATION_PATH } from "@/lib/membership";

export function LoginForm({
    challengeJson,
    next,
    notice,
}: {
    challengeJson: string;
    /** Wohin nach erfolgreicher Anmeldung — vom Server auf eigene Pfade begrenzt. */
    next?: string | null;
    /** Rückmeldung nach Sperren/Löschen des eigenen Kontos. */
    notice?: string | null;
}) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailUnverified, setEmailUnverified] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [resendSent, setResendSent] = useState(false);
    const [featureDisabled, setFeatureDisabled] = useState(false);
    const [challenge, setChallenge] = useState(challengeJson);

    // Der Login selbst läuft über next-auth und nicht über eine Serveraktion;
    // das erneute Senden der Bestätigungsmail schon.
    const resend = useActionForm(() => resendVerificationEmail(email), {
        onSuccess: () => setResendSent(true),
    });

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
        setResendSent(false);
        resend.setError("");

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
                } else if (res.code === "account_disabled") {
                    setError(
                        "Dein Zugang ist deaktiviert. Wende dich bitte an den Vorstand, wenn du ihn wieder nutzen möchtest.",
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
                router.push(next ?? "/dashboard");
                router.refresh();
            }
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <Container size="4" className="py-8 sm:py-14">
            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Login"
                onOpenChange={setFeatureDisabled}
            />

            <div className="flex flex-col items-center justify-center gap-6 lg:flex-row-reverse lg:items-start lg:gap-10">
                <div className="w-full max-w-md shrink-0">
                    <AuthShell
                        icon={<LogIn size={22} aria-hidden="true" />}
                        title="Mitgliederbereich"
                        description={
                            // Wer aus dem Aufnahmeantrag hierher geschickt
                            // wurde, soll wissen, dass die Anmeldung kein
                            // Umweg ist, sondern der nächste Schritt.
                            next === MEMBERSHIP_APPLICATION_PATH
                                ? "Melde dich an — danach geht es direkt mit deinem Aufnahmeantrag weiter."
                                : "Melde dich mit deiner E-Mail-Adresse an."
                        }
                        footer={
                            <>
                                Noch kein Konto?{" "}
                                <AuthLink href={MEMBERSHIP_APPLICATION_PATH}>
                                    Konto erstellen und Mitglied werden
                                </AuthLink>
                            </>
                        }
                    >
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            {notice && !error && <Callout tone="success">{notice}</Callout>}
                            {error && (
                                <Callout tone="danger" icon={<AlertCircle size={16} />}>
                                    <span className="grid gap-2">
                                        <span className="block text-foreground">{error}</span>
                                        {emailUnverified && !resendSent && (
                                            <Button
                                                type="button"
                                                variant="soft"
                                                color="neutral"
                                                size="sm"
                                                onClick={() => void resend.run()}
                                                loading={resend.pending}
                                                className="w-full"
                                            >
                                                <MailCheck size={15} aria-hidden="true" />
                                                Bestätigungs-E-Mail erneut senden
                                            </Button>
                                        )}
                                        {resendSent && (
                                            <span className="block font-medium text-positive">
                                                Wir haben dir eine neue E-Mail zur Bestätigung
                                                geschickt. Bitte prüfe dein Postfach (auch den
                                                Spam-Ordner).
                                            </span>
                                        )}
                                        {resend.error && (
                                            <span className="block text-negative">
                                                {resend.error}
                                            </span>
                                        )}
                                    </span>
                                </Callout>
                            )}

                            <Field label="E-Mail-Adresse" htmlFor="login-email">
                                <Input
                                    id="login-email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="deine@email.de"
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
                                        <span className="text-xs">Passwort vergessen?</span>
                                    </AuthLink>
                                </div>
                                {/* Sichtbarkeitsschalter wie im Registrierungs-
                                    formular: ein vertipptes Passwort ist hier
                                    der häufigste Grund für „Login
                                    fehlgeschlagen“, und blind zu tippen macht
                                    es auf dem Telefon nicht besser. */}
                                <PasswordInput
                                    id="login-password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Dein Passwort"
                                    required
                                />
                            </div>

                            <AltchaField key={challenge} challengeJson={challenge} />

                            <Button type="submit" size="lg" loading={submitting} className="w-full">
                                <LogIn size={16} aria-hidden="true" />
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
