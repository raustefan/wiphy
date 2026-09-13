"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { registerUser } from "./actions";
import { useActionForm } from "@/lib/client/useActionForm";
import { AuthShell, AuthLink } from "@/components/AuthShell";
import { PasswordInput, PasswordStrengthMeter } from "@/components/PasswordField";
import { PASSWORD_MIN_LENGTH } from "@/lib/passwordStrength";
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
        import("altcha");
    }, []);

    // Erst melden, wenn im zweiten Feld überhaupt etwas steht — sonst stünde
    // schon beim ersten Tastendruck im ersten Feld „stimmen nicht überein“.
    const mismatch = confirmPassword.length > 0 && password !== confirmPassword;
    const matches = confirmPassword.length > 0 && password === confirmPassword;

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        // Das Bestätigungsfeld ist reine Tippfehler-Kontrolle im Browser; der
        // Server sieht es nie und soll es auch nicht sehen.
        formData.delete("confirmPassword");

        if (password !== confirmPassword) {
            form.setError("Die Passwörter stimmen nicht überein.");
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
            description="Leg dir in einer Minute ein Konto an. Ein Nutzerkonto ist noch keine Mitgliedschaft im WirtschaftsPhysik Alumni e.V. — darüber entscheidet der Vorstand separat."
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
                    <div className="grid gap-2">
                        <Field label="Passwort" htmlFor="register-password" required>
                            <PasswordInput
                                id="register-password"
                                name="password"
                                autoComplete="new-password"
                                required
                                minLength={PASSWORD_MIN_LENGTH}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                aria-describedby="register-password-strength"
                                placeholder={`Mindestens ${PASSWORD_MIN_LENGTH} Zeichen`}
                            />
                        </Field>
                        <PasswordStrengthMeter
                            id="register-password-strength"
                            password={password}
                        />
                    </div>

                    <Field
                        label="Passwort wiederholen"
                        htmlFor="register-password-confirm"
                        required
                        error={mismatch ? "Die Passwörter stimmen nicht überein." : undefined}
                    >
                        <PasswordInput
                            id="register-password-confirm"
                            name="confirmPassword"
                            autoComplete="new-password"
                            required
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            aria-invalid={mismatch || undefined}
                            placeholder="Zur Sicherheit noch einmal"
                        />
                    </Field>
                    {/* `aria-live`, damit der Screenreader die Bestätigung
                        mitbekommt — sichtbar ist sie ohnehin nur kurz. */}
                    {matches && (
                        <p
                            aria-live="polite"
                            className="-mt-2 flex items-center gap-1.5 text-xs font-medium text-positive"
                        >
                            <Check size={13} aria-hidden="true" />
                            Die Passwörter stimmen überein.
                        </p>
                    )}
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
                    <altcha-widget
                        challenge={challengeJson}
                        name="altcha"
                        style={ALTCHA_STYLE}
                    />
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
