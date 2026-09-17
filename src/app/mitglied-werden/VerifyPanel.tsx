"use client";

import { useState } from "react";
import { MailCheck, Send } from "lucide-react";
import { resendVerificationEmail } from "@/app/login/actions";
import { useActionForm } from "@/lib/client/useActionForm";
import { Button, ButtonLink, Callout, Field, Input } from "@/components/ui";
import { MEMBERSHIP_LOGIN_PATH } from "@/lib/membership";

/**
 * Zweite Station: die Bestätigungsmail.
 *
 * Diese Station hat keinen Knopf, der sie weiterschaltet — sie wartet auf einen
 * Klick in einem fremden Programm. Genau deshalb steht hier, was als Nächstes
 * passiert und was zu tun ist, wenn nichts ankommt: der häufigste Abbruchgrund
 * ist eine Mail im Spam-Ordner und keine Auskunft dazu, was man dann machen
 * kann.
 */
export function VerifyPanel({ email }: { email?: string | null }) {
    const [address, setAddress] = useState(email ?? "");
    const [sent, setSent] = useState(false);
    const resend = useActionForm(() => resendVerificationEmail(address), {
        featureLabel: "E-Mail-Verifizierung",
        onSuccess: () => setSent(true),
    });

    return (
        <div className="grid gap-4">
            <Callout tone="success" icon={<MailCheck size={16} />} title="E-Mail ist unterwegs">
                {email ? (
                    <>
                        Wir haben den Bestätigungslink an{" "}
                        <strong className="font-semibold text-foreground">{email}</strong>{" "}
                        geschickt.
                    </>
                ) : (
                    <>
                        Wir haben dir einen Bestätigungslink an die angegebene Adresse
                        geschickt.
                    </>
                )}
            </Callout>

            <ol className="grid gap-2.5 text-sm">
                {[
                    "Postfach öffnen — falls nichts da ist, auch im Spam- oder Werbung-Ordner nachsehen.",
                    "Auf „E-Mail-Adresse bestätigen“ klicken. Der Link gilt 24 Stunden; ohne Bestätigung löschen wir das Konto danach wieder.",
                    "Anmelden — danach geht es hier direkt mit dem Aufnahmeantrag weiter.",
                ].map((text, index) => (
                    <li key={index} className="flex gap-3">
                        <span
                            aria-hidden="true"
                            className="grid size-6 shrink-0 place-items-center rounded-full bg-physics/12 text-xs font-bold text-physics"
                        >
                            {index + 1}
                        </span>
                        <span className="text-pretty text-muted">{text}</span>
                    </li>
                ))}
            </ol>

            <ButtonLink href={MEMBERSHIP_LOGIN_PATH} size="lg" className="w-full sm:w-auto sm:justify-self-start">
                Ich habe bestätigt — zur Anmeldung
            </ButtonLink>

            {/* Eingeklappt, weil es die Ausnahme ist: aufgeklappt stünde ein
                zweites Formular über dem, worauf es hier ankommt. */}
            <details className="group rounded-xl border border-line bg-raised/50 px-4 py-3">
                <summary className="cursor-pointer list-none text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    Keine E-Mail bekommen?
                </summary>
                <div className="mt-3 grid gap-3">
                    {resend.feedback}
                    {sent ? (
                        <p className="text-sm font-medium text-positive">
                            Falls für diese Adresse ein unbestätigtes Konto besteht, ist eine
                            neue E-Mail unterwegs.
                        </p>
                    ) : (
                        <>
                            <Field label="E-Mail-Adresse" htmlFor="resend-email">
                                <Input
                                    id="resend-email"
                                    type="email"
                                    autoComplete="email"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                    placeholder="deine@email.de"
                                />
                            </Field>
                            <Button
                                type="button"
                                variant="soft"
                                color="neutral"
                                onClick={() => void resend.run()}
                                loading={resend.pending}
                                className="justify-self-start"
                            >
                                <Send size={15} aria-hidden="true" />
                                Link erneut senden
                            </Button>
                        </>
                    )}
                </div>
            </details>
        </div>
    );
}
