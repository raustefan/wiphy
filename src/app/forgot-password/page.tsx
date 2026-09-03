"use client";

import { useState } from "react";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";
import { Button, Callout, Field, Input } from "@/components/ui";

/** Fehlermeldung aus einem unbekannten Fehlerwert, sonst der Standardtext. */
function messageOf(error: unknown, fallback: string): string {
    return error instanceof Error && error.message ? error.message : fallback;
}
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
        } catch (err: unknown) {
            console.error(err);
            setErrorMessage(messageOf(err, "Es gab ein Problem beim Senden der E-Mail."));
            setStatus("error");
        }
    };

    return (
        <>
            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Passwort zurücksetzen"
                onOpenChange={setFeatureDisabled}
            />
            <AuthShell
                title="Passwort vergessen"
                description={
                    status === "success"
                        ? undefined
                        : "Gib deine E-Mail-Adresse ein. Wir senden dir einen Link, um dein Passwort zurückzusetzen."
                }
                footer={<AuthLink href="/login">Zurück zum Login</AuthLink>}
            >
                {status === "success" ? (
                    <Callout tone="success">
                        Falls ein Konto mit dieser E-Mail-Adresse existiert, haben wir dir einen
                        Link zum Zurücksetzen geschickt.
                    </Callout>
                ) : (
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        {status === "error" && errorMessage && (
                            <Callout tone="danger">{errorMessage}</Callout>
                        )}

                        <Field label="E-Mail" htmlFor="forgot-email">
                            <Input
                                id="forgot-email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="beispiel@domain.de"
                            />
                        </Field>

                        <Button type="submit" size="lg" loading={status === "loading"} className="w-full">
                            Link anfordern
                        </Button>
                    </form>
                )}
            </AuthShell>
        </>
    );
}
