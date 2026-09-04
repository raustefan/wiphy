"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { Button, ButtonLink, Callout, Field, Input, Spinner } from "@/components/ui";
import { useActionForm } from "@/lib/client/useActionForm";
import { postJson } from "@/lib/client/postJson";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [done, setDone] = useState(false);

    const form = useActionForm(
        (formData) =>
            postJson(
                "/api/auth/reset-password",
                { token, password: formData.get("password") },
                "Fehler beim Zurücksetzen des Passworts.",
            ),
        { featureLabel: "Passwort zurücksetzen", onSuccess: () => setDone(true) },
    );

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        // Beide Prüfungen kann nur der Browser machen — der Server sieht das
        // Bestätigungsfeld nie.
        if (password.length < 8) {
            form.setError("Das Passwort muss mindestens 8 Zeichen lang sein.");
            return;
        }
        if (password !== confirmPassword) {
            form.setError("Die Passwörter stimmen nicht überein.");
            return;
        }

        void form.run({ password });
    }

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

    if (done) {
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
        <AuthShell
            title="Neues Passwort festlegen"
            footer={<AuthLink href="/login">Zurück zum Login</AuthLink>}
        >
            <form onSubmit={handleSubmit} className="grid gap-4">
                {form.feedback}

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

                <Button type="submit" size="lg" loading={form.pending} className="w-full">
                    Passwort speichern
                </Button>
            </form>
        </AuthShell>
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
