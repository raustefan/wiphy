"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { registerUser } from "./actions";
import { useActionForm } from "@/lib/client/useActionForm";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { AltchaField } from "@/components/AltchaField";
import { NewPasswordFields, validateNewPassword } from "@/components/PasswordField";
import { Button, Field, Input } from "@/components/ui";

/**
 * Abschnitt des Formulars mit Nummer und Trennlinie.
 *
 * Das Formular fragt drei sehr verschiedene Dinge ab — Name, Passwort,
 * Botprüfung. Ohne Gliederung wirkte das wie eine Liste aus neun Feldern; die
 * Nummerierung macht daraus drei überschaubare Schritte auf einer Seite.
 */
function Step({
    number,
    title,
    children,
}: {
    number: number;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="grid gap-3">
            <div className="flex items-center gap-2.5">
                <span
                    aria-hidden="true"
                    className="grid size-6 shrink-0 place-items-center rounded-full bg-physics/12 text-[11px] font-bold text-physics"
                >
                    {number}
                </span>
                <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>
            <div className="grid gap-4">{children}</div>
        </section>
    );
}

export function RegisterForm({ challengeJson }: { challengeJson: string }) {
    const form = useActionForm(registerUser, { featureLabel: "Registrierung" });
    // Beim Mount gesetzt, nicht auf dem Server: gemessen wird, wie lange das
    // Formular sichtbar war — nicht, wann die Seite gerendert wurde.
    const renderedAt = useRef<number>(0);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        renderedAt.current = Date.now();
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        // Das Bestätigungsfeld ist reine Tippfehler-Kontrolle im Browser; der
        // Server sieht es nie und soll es auch nicht sehen.
        formData.delete("confirmPassword");

        const problem = validateNewPassword(password, confirmPassword);
        if (problem) {
            form.setError(problem);
            return;
        }

        formData.set("renderedAt", String(renderedAt.current));
        void form.submit(formData);
    }

    return (
        <AuthShell
            size="lg"
            icon={<UserPlus size={22} aria-hidden="true" />}
            title="Schön, dass du dabei bist"
            description="Leg dir in einer Minute ein Konto an. Ein Nutzerkonto ist noch keine Mitgliedschaft im WirtschaftsPhysik Alumni e.V. — du findest einen separaten Antrag auf Mitgliedschaft in deinem Mitgliederbereich, sobald du einen Account hast."
            footer={
                <>
                    Du hast schon ein Konto? <AuthLink href="/login">Hier anmelden</AuthLink>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="grid gap-6">
                {form.feedback}

                <Step number={1} title="Dein Name und deine E-Mail-Adresse">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Vorname" htmlFor="register-vorname" required>
                            <Input
                                id="register-vorname"
                                name="vorname"
                                autoComplete="given-name"
                                required
                                placeholder="Marie"
                            />
                        </Field>
                        <Field label="Nachname" htmlFor="register-name" required>
                            <Input
                                id="register-name"
                                name="name"
                                autoComplete="family-name"
                                required
                                placeholder="Musterfrau"
                            />
                        </Field>
                    </div>

                    <Field
                        label="E-Mail-Adresse"
                        htmlFor="register-email"
                        required
                        hint="An diese Adresse schicken wir dir den Bestätigungslink."
                    >
                        <Input
                            id="register-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="deine@email.de"
                        />
                    </Field>
                </Step>

                <Step number={2} title="Passwort festlegen">
                    <NewPasswordFields
                        idPrefix="register"
                        password={password}
                        onPasswordChange={setPassword}
                        confirmPassword={confirmPassword}
                        onConfirmPasswordChange={setConfirmPassword}
                    />
                </Step>

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

                <Step number={3} title="Kurze Sicherheitsprüfung">
                    <Field
                        label="In welcher Stadt befindet sich die Universität, an der unser Verein zu Hause ist?"
                        htmlFor="register-security-answer"
                        required
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
                    <AltchaField challengeJson={challengeJson} />
                </Step>

                <div className="grid gap-3">
                    <Button type="submit" size="lg" loading={form.pending} className="w-full">
                        <Sparkles size={16} aria-hidden="true" />
                        Konto erstellen
                    </Button>
                    <p className="flex items-start gap-2 text-xs leading-relaxed text-faint">
                        <ShieldCheck size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                        <span>
                            Wir speichern nur, was für dein Konto nötig ist. Details in unserer{" "}
                            <AuthLink href="/datenschutz">Datenschutzerklärung</AuthLink>.
                        </span>
                    </p>
                </div>
            </form>
        </AuthShell>
    );
}
