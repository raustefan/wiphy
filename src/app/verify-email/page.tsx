"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { ButtonLink, Callout, Spinner } from "@/components/ui";
import { useActionForm } from "@/lib/client/useActionForm";
import { postJson } from "@/lib/client/postJson";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const [verified, setVerified] = useState(false);

    const form = useActionForm(
        (formData) =>
            postJson(
                "/api/auth/verify-email",
                { token: formData.get("token") },
                "Fehler bei der E-Mail-Bestätigung.",
            ),
        { featureLabel: "E-Mail-Verifizierung", onSuccess: () => setVerified(true) },
    );

    // Die Bestätigung passiert beim Öffnen des Links, nicht auf Knopfdruck.
    // `form.run` ist über Renders hinweg stabil, der Effekt läuft also nur bei
    // einem tatsächlich neuen Token.
    const { run } = form;
    useEffect(() => {
        if (token) void run({ token });
    }, [token, run]);

    if (!token) {
        return (
            <AuthShell title="E-Mail bestätigen">
                <Callout tone="danger">
                    Der Bestätigungslink ist ungültig oder unvollständig. Bitte registriere dich
                    erneut oder nutze den Link aus deiner E-Mail.
                </Callout>
                <ButtonLink href="/register" size="lg" className="w-full">
                    Zur Registrierung
                </ButtonLink>
            </AuthShell>
        );
    }

    if (verified) {
        return (
            <AuthShell title="Erfolgreich bestätigt!">
                <Callout tone="success">Deine E-Mail-Adresse wurde bestätigt.</Callout>
                <ButtonLink href="/login" size="lg" className="w-full">
                    Zum Login
                </ButtonLink>
            </AuthShell>
        );
    }

    if (!form.error && !form.featureDisabled) {
        return (
            <AuthShell
                title="E-Mail wird verifiziert …"
                description="Bitte habe einen Augenblick Geduld."
            >
                <div className="grid place-items-center py-2 text-muted">
                    <Spinner className="size-6" />
                </div>
            </AuthShell>
        );
    }

    return (
        <AuthShell
            title="Fehler bei der Verifizierung"
            footer={<AuthLink href="/login">Zurück zum Login</AuthLink>}
        >
            {form.feedback}
            {!form.error && (
                <Callout tone="danger">
                    Der Bestätigungslink ist ungültig oder abgelaufen.
                </Callout>
            )}
            <ButtonLink href="/login" size="lg" color="neutral" variant="soft" className="w-full">
                Zurück zum Login
            </ButtonLink>
        </AuthShell>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense
            fallback={
                <div className="grid place-items-center py-24 text-muted">
                    <Spinner className="size-6" />
                </div>
            }
        >
            <VerifyEmailContent />
        </Suspense>
    );
}
