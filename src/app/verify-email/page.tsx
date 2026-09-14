"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, MailCheck, Unlink } from "lucide-react";
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
            <AuthShell
                icon={<Unlink size={22} aria-hidden="true" />}
                title="Link unvollständig"
            >
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
            <AuthShell
                icon={<CheckCircle2 size={22} aria-hidden="true" />}
                title="E-Mail bestätigt"
            >
                <Callout tone="success">
                    Deine E-Mail-Adresse wurde bestätigt. Du kannst dich jetzt anmelden.
                </Callout>
                <ButtonLink href="/login" size="lg" className="w-full">
                    Zum Login
                </ButtonLink>
            </AuthShell>
        );
    }

    if (!form.error && !form.featureDisabled) {
        return (
            <AuthShell
                icon={<MailCheck size={22} aria-hidden="true" />}
                title="E-Mail wird bestätigt …"
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
            icon={<Unlink size={22} aria-hidden="true" />}
            title="Bestätigung fehlgeschlagen"
            footer={<AuthLink href="/login">Zurück zum Login</AuthLink>}
        >
            {form.feedback}
            {!form.error && (
                <Callout tone="danger">
                    Der Bestätigungslink ist ungültig oder abgelaufen.
                </Callout>
            )}
            {/* Der Link hält 24 Stunden. Abgelaufen ist damit der häufigste
                Fehlerfall — und einen neuen gibt es über den Anmeldeversuch,
                der den Knopf „erneut senden“ einblendet. */}
            <Callout tone="info">
                Bestätigungslinks sind 24 Stunden gültig. Melde dich einfach an: falls deine
                Adresse noch unbestätigt ist, kannst du dir dort eine neue Bestätigungs-E-Mail
                schicken lassen.
            </Callout>
            <ButtonLink href="/login" size="lg" className="w-full">
                Zum Login
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
