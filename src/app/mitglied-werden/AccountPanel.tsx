"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LogIn, ShieldCheck, Sparkles } from "lucide-react";
import { registerUser } from "./registerAction";
import { useActionForm } from "@/lib/client/useActionForm";
import { AltchaField } from "@/components/AltchaField";
import { NewPasswordFields, validateNewPassword } from "@/components/PasswordField";
import { Button, Field, Input } from "@/components/ui";
import { MEMBERSHIP_LOGIN_PATH } from "@/lib/membership";

/** Reicht für die Rückmeldung im Browser; verbindlich prüft der Server. */
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** In Anzeigereihenfolge — der Fokus springt auf das erste fehlerhafte Feld. */
const FIRST_HALF_FIELDS = ["vorname", "name", "email"] as const;
type FirstHalfField = (typeof FIRST_HALF_FIELDS)[number];

/**
 * Erste Station: das Konto.
 *
 * Vorher standen Name, Passwort und Botprüfung als neun Felder untereinander
 * auf einer eigenen Seite — auf dem Telefon gut zwei Bildschirme, bevor der
 * Knopf zum Absenden in Sicht kam. Jetzt sind es zwei Hälften: erst wer du
 * bist, dann womit du dich anmeldest. Die Werte der ersten Hälfte liegen im
 * Zustand und nicht im ausgeblendeten Formular — ein `required`-Feld, das
 * beim Absenden nicht sichtbar ist, blockiert im Browser das Abschicken.
 */
export function AccountPanel({ challengeJson }: { challengeJson: string }) {
    const form = useActionForm(registerUser, { featureLabel: "Registrierung" });
    // Beim Mount gesetzt, nicht auf dem Server: gemessen wird, wie lange das
    // Formular sichtbar war — nicht, wann die Seite gerendert wurde.
    const renderedAt = useRef<number>(0);
    const headingRef = useRef<HTMLParagraphElement>(null);

    const [half, setHalf] = useState<0 | 1>(0);
    const [vorname, setVorname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<FirstHalfField, string>>>({});

    useEffect(() => {
        renderedAt.current = Date.now();
    }, []);

    function goToSecondHalf() {
        // Alle Felder auf einmal prüfen und die Meldung ans jeweilige Feld
        // hängen — vorher stand nur der erste Fehler als Banner über dem
        // Formular, und die Felder selbst blieben unmarkiert.
        const errors: Partial<Record<FirstHalfField, string>> = {};
        if (!vorname.trim()) errors.vorname = "Bitte gib deinen Vornamen an.";
        if (!name.trim()) errors.name = "Bitte gib deinen Nachnamen an.";
        if (!email.trim()) errors.email = "Bitte gib deine E-Mail-Adresse an.";
        else if (!EMAIL_PATTERN.test(email.trim())) {
            errors.email = "Diese E-Mail-Adresse sieht nicht vollständig aus.";
        }
        setFieldErrors(errors);

        const firstInvalid = FIRST_HALF_FIELDS.find((field) => errors[field]);
        if (firstInvalid) {
            document.getElementById(`register-${firstInvalid}`)?.focus();
            return;
        }
        form.setError("");
        setHalf(1);
        // Der Fokus bleibt sonst am „Weiter“-Knopf, der gerade verschwunden
        // ist: Screenreader lesen den ausgetauschten Inhalt dann nicht vor.
        headingRef.current?.focus();
    }

    function clearFieldError(field: FirstHalfField) {
        setFieldErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
    }

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
        <form onSubmit={handleSubmit} className="grid gap-5">
            {form.feedback}

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <p
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-sm font-semibold text-foreground outline-none"
                >
                    <span className="mr-2 font-mono text-xs tracking-wide text-faint">
                        {half + 1}/2
                    </span>
                    {half === 0 ? "Name und E-Mail" : "Passwort und Sicherheitsprüfung"}
                </p>
                {half === 0 && (
                    <Link
                        href={MEMBERSHIP_LOGIN_PATH}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-physics underline-offset-4 hover:underline"
                    >
                        <LogIn size={15} aria-hidden="true" />
                        Ich habe schon ein Konto
                    </Link>
                )}
            </div>

            {half === 0 ? (
                <div className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                            label="Vorname"
                            htmlFor="register-vorname"
                            required
                            error={fieldErrors.vorname}
                        >
                            <Input
                                id="register-vorname"
                                name="vorname"
                                autoComplete="given-name"
                                value={vorname}
                                onChange={(event) => {
                                    setVorname(event.target.value);
                                    clearFieldError("vorname");
                                }}
                                placeholder="Marie"
                            />
                        </Field>
                        <Field
                            label="Nachname"
                            htmlFor="register-name"
                            required
                            error={fieldErrors.name}
                        >
                            <Input
                                id="register-name"
                                name="name"
                                autoComplete="family-name"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                    clearFieldError("name");
                                }}
                                placeholder="Musterfrau"
                            />
                        </Field>
                    </div>

                    <Field
                        label="E-Mail-Adresse"
                        htmlFor="register-email"
                        required
                        hint="An diese Adresse geht der Bestätigungslink."
                        error={fieldErrors.email}
                    >
                        <Input
                            id="register-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                clearFieldError("email");
                            }}
                            placeholder="deine@email.de"
                        />
                    </Field>
                </div>
            ) : (
                <div className="grid gap-4">
                    {/* Die Angaben der ersten Hälfte reisen als versteckte
                        Felder mit — sie stehen sonst nur im Zustand und
                        fehlten in der FormData. */}
                    <input type="hidden" name="vorname" value={vorname} />
                    <input type="hidden" name="name" value={name} />
                    <input type="hidden" name="email" value={email} />

                    <NewPasswordFields
                        idPrefix="register"
                        password={password}
                        onPasswordChange={setPassword}
                        confirmPassword={confirmPassword}
                        onConfirmPasswordChange={setConfirmPassword}
                    />

                    <Field
                        label="In welcher Stadt ist die Universität, an der unser Verein zu Hause ist?"
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
                </div>
            )}

            {/*
              Honeypot. Nicht per `display: none` versteckt, sondern
              off-canvas — darauf prüfen die sorgfältigeren Bots. Steht
              außerhalb der Hälften, damit er in jedem Fall mitgeschickt wird.
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

            {half === 0 ? (
                <Button type="button" size="lg" onClick={goToSecondHalf} className="w-full">
                    Weiter
                    <ArrowRight size={16} aria-hidden="true" />
                </Button>
            ) : (
                <div className="grid gap-3">
                    <Button type="submit" size="lg" loading={form.pending} className="w-full">
                        <Sparkles size={16} aria-hidden="true" />
                        Konto erstellen
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        color="neutral"
                        onClick={() => setHalf(0)}
                        disabled={form.pending}
                        className="justify-self-center"
                    >
                        <ArrowLeft size={16} aria-hidden="true" />
                        Zurück zu Name und E-Mail
                    </Button>
                </div>
            )}

            <p className="flex items-start gap-2 text-xs leading-relaxed text-faint">
                <ShieldCheck size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                <span>
                    Wir speichern nur, was für dein Konto nötig ist. Details in unserer{" "}
                    <Link
                        href="/datenschutz"
                        className="font-semibold text-physics underline-offset-4 hover:underline"
                    >
                        Datenschutzerklärung
                    </Link>
                    .
                </span>
            </p>
        </form>
    );
}
