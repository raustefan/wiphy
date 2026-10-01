"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AtSign, Send } from "lucide-react";
import { Button, Callout, Field, Input } from "@/components/ui";
import { PasswordInput } from "@/components/PasswordField";
import { useActionForm } from "@/lib/client/useActionForm";
import { requestEmailChangeAction, requestPasswordChange } from "./actions";

function Disabled({ label }: { label: string }) {
    return (
        <Callout tone="warning">{label} wurde von einem Administrator vorübergehend deaktiviert.</Callout>
    );
}

export function PasswordChangeButton({ enabled }: { enabled: boolean }) {
    const [sentTo, setSentTo] = useState("");
    const form = useActionForm(() => requestPasswordChange(), {
        featureLabel: "Passwort zurücksetzen",
        onSuccess: (data) => setSentTo(data?.sentTo ?? ""),
    });

    if (!enabled) return <Disabled label="Passwort zurücksetzen" />;

    return (
        <div className="grid gap-3">
            {form.feedback}
            {sentTo && (
                <Callout tone="success" title="Link gesendet">
                    Schau in dein Postfach ({sentTo}). Der Link ist 30 Minuten gültig — ein neuer
                    Link macht den vorigen ungültig.
                </Callout>
            )}
            <Button onClick={() => void form.run()} loading={form.pending} className="w-full sm:w-auto sm:justify-self-start">
                <Send size={16} aria-hidden="true" />
                {sentTo ? "Link erneut senden" : "Link zum Ändern senden"}
            </Button>
        </div>
    );
}

export function EmailChangeForm({ enabled }: { enabled: boolean }) {
    const router = useRouter();
    const [sentTo, setSentTo] = useState("");
    const form = useActionForm(requestEmailChangeAction, {
        featureLabel: "E-Mail-Adresse ändern",
        onSuccess: (data) => {
            setSentTo(data?.sentTo ?? "");
            // Zeigt die ausstehende Änderung oben in der Karte an.
            router.refresh();
        },
    });

    if (!enabled) return <Disabled label="E-Mail-Adresse ändern" />;

    if (sentTo) {
        return (
            <div className="grid gap-3">
                <Callout tone="success" title="Bestätigungslink gesendet">
                    Wir haben eine E-Mail an <strong className="break-all">{sentTo}</strong>{" "}
                    geschickt. Klicke dort auf den Link, um die Änderung abzuschließen. Danach
                    meldest du dich mit der neuen Adresse an.
                </Callout>
                <Button variant="soft" color="neutral" onClick={() => setSentTo("")} className="w-full sm:w-auto sm:justify-self-start">
                    Andere Adresse eingeben
                </Button>
            </div>
        );
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                void form.submit(new FormData(event.currentTarget));
            }}
            className="grid gap-4"
        >
            {form.feedback}
            <Field label="Neue E-Mail-Adresse" htmlFor="new-email" required>
                <div className="relative">
                    <Input id="new-email" name="email" type="email" autoComplete="email" required className="pl-10" />
                    <AtSign
                        size={15}
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-faint"
                    />
                </div>
            </Field>
            <Field label="Aktuelles Passwort" htmlFor="current-password" hint="Damit niemand über eine offene Sitzung deine Adresse übernehmen kann." required>
                <PasswordInput id="current-password" name="currentPassword" autoComplete="current-password" required />
            </Field>
            <Button type="submit" loading={form.pending} className="w-full sm:w-auto sm:justify-self-start">
                <Send size={16} aria-hidden="true" />
                Bestätigungslink senden
            </Button>
        </form>
    );
}
