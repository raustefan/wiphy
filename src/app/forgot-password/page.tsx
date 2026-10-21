"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Key02Icon, MailValidation01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { Button, Callout, Field, Input } from "@/components/ui";
import { useActionForm } from "@/lib/client/useActionForm";
import { requestPasswordReset } from "./actions";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const form = useActionForm(requestPasswordReset, {
        featureLabel: "Passwort zurücksetzen",
        onSuccess: () => setSent(true),
    });

    return (
        <AuthShell
            icon={
                sent ? (
                    <HugeiconsIcon icon={MailValidation01Icon} size={22} aria-hidden="true" />
                ) : (
                    <HugeiconsIcon icon={Key02Icon} size={22} aria-hidden="true" />
                )
            }
            title={sent ? "E-Mail unterwegs" : "Passwort vergessen"}
            description={
                sent
                    ? undefined
                    : "Gib deine E-Mail-Adresse ein. Wir senden dir einen Link, um dein Passwort zurückzusetzen."
            }
            footer={<AuthLink href="/login">Zurück zum Login</AuthLink>}
        >
            {sent ? (
                <>
                    <Callout tone="success">
                        Falls ein Konto mit{" "}
                        <strong className="font-semibold break-all text-foreground">
                            {email}
                        </strong>{" "}
                        existiert, haben wir dir einen Link zum Zurücksetzen geschickt. Er ist
                        30 Minuten gültig.
                    </Callout>
                    {/* Der Spam-Ordner ist der häufigste Grund, warum die Mail
                        „nicht ankommt“ — und der zweithäufigste ein Tippfehler
                        in der Adresse. Beides lässt sich von hier aus lösen. */}
                    <p className="text-sm text-muted">
                        Nichts im Postfach? Sieh im Spam-Ordner nach oder{" "}
                        <button
                            type="button"
                            onClick={() => setSent(false)}
                            className="cursor-pointer font-semibold text-physics underline-offset-4 hover:underline"
                        >
                            versuche es mit einer anderen Adresse
                        </button>
                        .
                    </p>
                </>
            ) : (
                <form action={form.submit} className="grid gap-4">
                    {form.feedback}

                    <Field label="E-Mail" htmlFor="forgot-email">
                        <Input
                            id="forgot-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="beispiel@domain.de"
                        />
                    </Field>

                    {/* Honeypot, off-canvas wie bei Kontakt und Registrierung. */}
                    <div aria-hidden="true" className="form-honeypot">
                        <label htmlFor="forgot-website">
                            Website (bitte freilassen)
                            <input
                                id="forgot-website"
                                type="text"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </label>
                    </div>

                    <Button type="submit" size="lg" loading={form.pending} className="w-full">
                        <HugeiconsIcon icon={MailValidation01Icon} size={16} aria-hidden="true" />
                        Link anfordern
                    </Button>
                </form>
            )}
        </AuthShell>
    );
}
