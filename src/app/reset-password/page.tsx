"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, KeyRound, Unlink } from "lucide-react";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { NewPasswordFields, validateNewPassword } from "@/components/PasswordField";
import { Button, ButtonLink, Callout, Spinner } from "@/components/ui";
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

        const problem = validateNewPassword(password, confirmPassword);
        if (problem) {
            form.setError(problem);
            return;
        }

        void form.run({ password });
    }

    if (!token) {
        return (
            <AuthShell
                icon={<Unlink size={22} aria-hidden="true" />}
                title="Link ungültig"
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
            <AuthShell
                icon={<CheckCircle2 size={22} aria-hidden="true" />}
                title="Passwort geändert"
            >
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
            icon={<KeyRound size={22} aria-hidden="true" />}
            title="Neues Passwort festlegen"
            description="Wähle ein Passwort, das du noch nirgends sonst benutzt."
            footer={<AuthLink href="/login">Zurück zum Login</AuthLink>}
        >
            <form onSubmit={handleSubmit} className="grid gap-4">
                {form.feedback}

                <NewPasswordFields
                    idPrefix="reset"
                    label="Neues Passwort"
                    confirmLabel="Neues Passwort bestätigen"
                    password={password}
                    onPasswordChange={setPassword}
                    confirmPassword={confirmPassword}
                    onConfirmPasswordChange={setConfirmPassword}
                />

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
