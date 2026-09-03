"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";
import { Button, ButtonLink, Callout, Field, Input, Spinner } from "@/components/ui";

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
            <AuthShell
                title="Passwort zurücksetzen"
                footer={<AuthLink href="/login">Zurück zum Login</AuthLink>}
            >
                <Callout tone="danger">
                    Der Link zum Zurücksetzen deines Passworts ist ungültig oder unvollständig.
                    Bitte fordere einen neuen Link an.
                </Callout>
                <ButtonLink href="/forgot-password" size="lg" className="w-full">
                    Neuen Link anfordern
                </ButtonLink>
            </AuthShell>
        );
    }

    if (status === "success") {
        return (
            <AuthShell title="Erfolgreich!">
                <Callout tone="success">
                    Dein Passwort wurde zurückgesetzt. Du kannst dich jetzt mit deinem neuen
                    Passwort anmelden.
                </Callout>
                <ButtonLink href="/login" size="lg" className="w-full">
                    Zum Login
                </ButtonLink>
            </AuthShell>
        );
    }

    return (
        <>
            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Passwort zurücksetzen"
                onOpenChange={setFeatureDisabled}
            />
            <AuthShell
                title="Neues Passwort festlegen"
                footer={<AuthLink href="/login">Zurück zum Login</AuthLink>}
            >
                <form onSubmit={handleSubmit} className="grid gap-4">
                    {status === "error" && errorMessage && (
                        <Callout tone="danger">{errorMessage}</Callout>
                    )}

                    <Field label="Neues Passwort" htmlFor="reset-password" hint="Mindestens 8 Zeichen.">
                        <Input
                            id="reset-password"
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Field>

                    <Field label="Passwort bestätigen" htmlFor="reset-password-confirm">
                        <Input
                            id="reset-password-confirm"
                            type="password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Field>

                    <Button type="submit" size="lg" loading={status === "loading"} className="w-full">
                        Passwort speichern
                    </Button>
                </form>
            </AuthShell>
        </>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense
            fallback={
                <div className="grid place-items-center py-24 text-muted">
                    <Spinner className="size-6" />
                </div>
            }
        >
            <ResetPasswordForm />
        </Suspense>
    );
}
