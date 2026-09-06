"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { registerUser } from "./actions";
import { useActionForm } from "@/lib/client/useActionForm";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { Button, Field, Input } from "@/components/ui";

/** Altcha-Widget an die Design-Tokens angleichen. */
const ALTCHA_STYLE = {
    display: "block",
    width: "100%",
    "--altcha-max-width": "100%",
    "--altcha-border-radius": "0.75rem",
    "--altcha-border-color": "var(--line-strong)",
    "--altcha-color-base": "var(--surface)",
    "--altcha-color-base-content": "var(--foreground)",
    "--altcha-color-primary": "var(--physics)",
} as CSSProperties;

export function RegisterForm({ challengeJson }: { challengeJson: string }) {
    const form = useActionForm(registerUser, { featureLabel: "Registrierung" });
    // Beim Mount gesetzt, nicht auf dem Server: gemessen wird, wie lange das
    // Formular sichtbar war — nicht, wann die Seite gerendert wurde.
    const renderedAt = useRef<number>(0);

    useEffect(() => {
        renderedAt.current = Date.now();
        import("altcha");
    }, []);

    function handleAction(formData: FormData) {
        formData.set("renderedAt", String(renderedAt.current));
        return form.submit(formData);
    }

    return (
        <>
            <AuthShell
                title="Neues Konto erstellen"
                description="Ein Nutzerkonto bestätigt noch nicht die Mitgliedschaft im WirtschaftsPhysik Alumni e.V."
                footer={
                    <>
                        Du hast schon ein Konto? <AuthLink href="/login">Hier anmelden</AuthLink>
                    </>
                }
            >
                <form action={handleAction} className="grid gap-4">
                    {form.feedback}

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Vorname" htmlFor="register-vorname">
                            <Input
                                id="register-vorname"
                                name="vorname"
                                autoComplete="given-name"
                                required
                                placeholder="Dein Vorname"
                            />
                        </Field>
                        <Field label="Nachname" htmlFor="register-name">
                            <Input
                                id="register-name"
                                name="name"
                                autoComplete="family-name"
                                required
                                placeholder="Dein Nachname"
                            />
                        </Field>
                    </div>

                    <Field label="E-Mail-Adresse" htmlFor="register-email">
                        <Input
                            id="register-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="mail@beispiel.de"
                        />
                    </Field>

                    <Field
                        label="Passwort"
                        htmlFor="register-password"
                        hint="Verwende eine starke Kombination aus Buchstaben, Zahlen und Sonderzeichen."
                    >
                        <Input
                            id="register-password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            minLength={8}
                            placeholder="Mindestens 8 Zeichen"
                        />
                    </Field>

                    {/*
                      Honeypot. Nicht per `display: none` versteckt, sondern
                      off-canvas — darauf prüfen die sorgfältigeren Bots.
                    */}
                    <div aria-hidden="true" className="form-honeypot">
                        <label htmlFor="register-website">
                            Website (bitte freilassen)
                            <input
                                id="register-website"
                                type="text"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </label>
                    </div>

                    <div className="grid gap-3">
                        <span className="text-sm font-semibold text-foreground">
                            Sicherheitsüberprüfung
                        </span>
                        <Field
                            label="In welcher Stadt befindet sich die Universität, an der unser Verein zu Hause ist?"
                            htmlFor="register-security-answer"
                            
                        >
                            <Input
                                id="register-security-answer"
                                name="securityAnswer"
                                required
                                autoComplete="off"
                                maxLength={100}
                                placeholder="Name der Stadt"
                            />
                        </Field>
                        <altcha-widget
                            challenge={challengeJson}
                            name="altcha"
                            style={ALTCHA_STYLE}
                        />
                    </div>

                    <Button type="submit" size="lg" loading={form.pending} className="w-full">
                        Konto erstellen
                    </Button>
                </form>
            </AuthShell>
        </>
    );
}
