"use client";

import { useState } from "react";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { Button, Callout, Field, Input } from "@/components/ui";
import { useActionForm } from "@/lib/client/useActionForm";
import { postJson } from "@/lib/client/postJson";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const form = useActionForm(
        (formData) =>
            postJson(
                "/api/auth/forgot-password",
                { email: formData.get("email") },
                "Es gab ein Problem beim Senden der E-Mail.",
            ),
        { featureLabel: "Passwort zurücksetzen", onSuccess: () => setSent(true) },
    );

    return (
        <AuthShell
            title="Passwort vergessen"
            description={
                sent
                    ? undefined
                    : "Gib deine E-Mail-Adresse ein. Wir senden dir einen Link, um dein Passwort zurückzusetzen."
            }
            footer={<AuthLink href="/login">Zurück zum Login</AuthLink>}
        >
            {sent ? (
                <Callout tone="success">
                    Falls ein Konto mit dieser E-Mail-Adresse existiert, haben wir dir einen
                    Link zum Zurücksetzen geschickt.
                </Callout>
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

                    <Button type="submit" size="lg" loading={form.pending} className="w-full">
                        Link anfordern
                    </Button>
                </form>
            )}
        </AuthShell>
    );
}
