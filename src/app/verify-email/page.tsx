"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";
import { ButtonLink, Callout, Spinner } from "@/components/ui";

/** Fehlermeldung aus einem unbekannten Fehlerwert, sonst der Standardtext. */
function messageOf(error: unknown, fallback: string): string {
    return error instanceof Error && error.message ? error.message : fallback;
}
function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("loading");
    const [errorMessage, setErrorMessage] = useState("");
    const [featureDisabled, setFeatureDisabled] = useState(false);

    useEffect(() => {
        // Ohne Token wird gar nicht erst angefragt — das rendert unten den
        // eigenen Hinweis.
        if (!token) return;

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
            .catch((err: unknown) => {
                console.error(err);
                setErrorMessage(messageOf(err, "Fehler bei der E-Mail-Bestätigung."));
                setStatus("error");
            });
    }, [token]);

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

    if (status === "loading") {
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

    if (status === "success") {
        return (
            <AuthShell title="Erfolgreich bestätigt!">
                <Callout tone="success">Deine E-Mail-Adresse wurde bestätigt.</Callout>
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
                featureLabel="E-Mail-Verifizierung"
                onOpenChange={setFeatureDisabled}
            />
            <AuthShell
                title="Fehler bei der Verifizierung"
                footer={<AuthLink href="/login">Zurück zum Login</AuthLink>}
            >
                <Callout tone="danger">
                    {errorMessage || "Der Bestätigungslink ist ungültig oder abgelaufen."}
                </Callout>
                <ButtonLink href="/login" size="lg" color="neutral" variant="soft" className="w-full">
                    Zurück zum Login
                </ButtonLink>
            </AuthShell>
        </>
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
