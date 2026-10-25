"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle01Icon, MailRemove01Icon, Unlink01Icon } from "@hugeicons/core-free-icons";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { Button, ButtonLink, Callout, Spinner } from "@/components/ui";
import { useActionForm } from "@/lib/client/useActionForm";
import { setNewsletterByTokenAction } from "./actions";

function UnsubscribeContent() {
    const token = useSearchParams().get("t") || "";
    const [subscribed, setSubscribed] = useState<boolean | null>(null);

    const form = useActionForm(
        (formData) =>
            setNewsletterByTokenAction(String(formData.get("token") ?? ""), formData.get("subscribed") === "1"),
        { onSuccess: (value) => setSubscribed(value === true) },
    );

    // Abgemeldet wird beim Öffnen der Seite, nicht beim Abruf des Links: ein
    // Linkprüfer im Mailfilter lädt nur das HTML und führt das hier nicht aus.
    const { run } = form;
    useEffect(() => {
        if (token) void run({ token, subscribed: "0" });
    }, [token, run]);

    if (!token) {
        return (
            <AuthShell icon={<HugeiconsIcon icon={Unlink01Icon} size={22} aria-hidden="true" />} title="Link unvollständig">
                <Callout tone="danger">
                    Der Abmeldelink ist unvollständig. Bitte nutze den Link aus der E-Mail oder
                    bestelle den Newsletter im Mitgliederbereich ab.
                </Callout>
                <ButtonLink href="/dashboard" size="lg" className="w-full">
                    Zum Mitgliederbereich
                </ButtonLink>
            </AuthShell>
        );
    }

    if (form.error) {
        return (
            <AuthShell
                icon={<HugeiconsIcon icon={Unlink01Icon} size={22} aria-hidden="true" />}
                title="Abmelden fehlgeschlagen"
                footer={<AuthLink href="/dashboard">Zum Mitgliederbereich</AuthLink>}
            >
                {form.feedback}
                <p className="text-sm text-muted">
                    Im Mitgliederbereich kannst du den Newsletter jederzeit selbst abbestellen.
                </p>
            </AuthShell>
        );
    }

    if (subscribed === null) {
        return (
            <AuthShell
                icon={<HugeiconsIcon icon={MailRemove01Icon} size={22} aria-hidden="true" />}
                title="Newsletter wird abbestellt …"
                description="Einen Augenblick."
            >
                <div className="grid place-items-center py-2 text-muted">
                    <Spinner className="size-6" />
                </div>
            </AuthShell>
        );
    }

    return (
        <AuthShell
            icon={<HugeiconsIcon icon={subscribed ? CheckmarkCircle01Icon : MailRemove01Icon} size={22} aria-hidden="true" />}
            title={subscribed ? "Newsletter wieder abonniert" : "Newsletter abbestellt"}
            footer={<AuthLink href="/dashboard">Zum Mitgliederbereich</AuthLink>}
        >
            <Callout tone="success">
                {subscribed
                    ? "Du bekommst den Newsletter wieder."
                    : "Du bekommst keine Newsletter mehr. Mails zu deiner Mitgliedschaft, etwa Einladungen zur Mitgliederversammlung, erreichen dich weiterhin."}
            </Callout>
            <Button
                size="lg"
                variant={subscribed ? "soft" : "solid"}
                color={subscribed ? "neutral" : undefined}
                className="w-full"
                loading={form.pending}
                onClick={() => void form.run({ token, subscribed: subscribed ? "0" : "1" })}
            >
                {subscribed ? "Doch abbestellen" : "Rückgängig – Newsletter behalten"}
            </Button>
        </AuthShell>
    );
}

export default function UnsubscribePage() {
    return (
        <Suspense
            fallback={
                <div className="grid place-items-center py-24 text-muted">
                    <Spinner className="size-6" />
                </div>
            }
        >
            <UnsubscribeContent />
        </Suspense>
    );
}
