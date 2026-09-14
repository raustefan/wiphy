"use client";

import { useState } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { controlClasses, Field } from "@/components/ui";
import {
    evaluatePassword,
    PASSWORD_MIN_LENGTH,
    type PasswordScore,
} from "@/lib/passwordStrength";

/**
 * Passwortfeld mit Sichtbarkeitsschalter.
 *
 * Der Schalter sitzt *im* Feld, deshalb der zusätzliche rechte Innenabstand:
 * ohne ihn liefe ein langes Passwort unter das Auge-Symbol.
 */
export function PasswordInput({
    className,
    ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <input
                type={visible ? "text" : "password"}
                className={cn(controlClasses, "pr-11", className)}
                {...props}
            />
            <button
                type="button"
                // Kein Tabstopp: wer sich mit der Tastatur durchs Formular
                // bewegt, will von „Passwort“ zu „Passwort wiederholen“ und
                // nicht über zwei Anzeige-Schalter dazwischen.
                tabIndex={-1}
                onClick={() => setVisible((current) => !current)}
                aria-label={visible ? "Passwort verbergen" : "Passwort anzeigen"}
                aria-pressed={visible}
                className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-faint transition-colors hover:bg-raised hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
            >
                {visible ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
            </button>
        </div>
    );
}

/** Anteil der Leiste je Stufe. Stufe 0 bleibt sichtbar kurz statt leer. */
const FILL_PERCENT: Record<PasswordScore, number> = {
    0: 12,
    1: 32,
    2: 56,
    3: 80,
    4: 100,
};

/**
 * Balken von Rot nach Grün samt Klartext-Urteil und Kriterienliste.
 *
 * Bewusst kein reines Ampel-Rechteck: die Farbe allein wäre für rot-grün-blinde
 * Nutzer:innen keine Information. Das Urteil daneben und die abgehakten
 * Kriterien darunter sagen dasselbe noch einmal in Worten.
 */
export function PasswordStrengthMeter({
    password,
    id,
}: {
    password: string;
    id?: string;
}) {
    const { score, label, criteria } = evaluatePassword(password);
    const color = `var(--strength-${score})`;

    return (
        <div id={id} className="grid gap-2">
            <div className="flex items-center gap-3">
                {/* Der Balken ist die grafische Wiederholung des Urteils
                    daneben. Als `progressbar` ausgezeichnet läse der
                    Screenreader „Schwach“ zweimal hintereinander vor. */}
                <div
                    aria-hidden="true"
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
                >
                    <div
                        className="h-full rounded-full transition-all duration-300 motion-reduce:transition-none"
                        style={{
                            width: password ? `${FILL_PERCENT[score]}%` : "0%",
                            backgroundColor: color,
                        }}
                    />
                </div>
                <span
                    className="w-24 shrink-0 text-right text-xs font-semibold sm:w-[7.5rem]"
                    style={{ color: password ? color : "var(--faint)" }}
                >
                    {password ? label : "Passwortstärke"}
                </span>
            </div>

            <ul className="grid gap-1 sm:grid-cols-2">
                {criteria.map((criterion) => (
                    <li
                        key={criterion.id}
                        className={cn(
                            "flex items-center gap-1.5 text-xs transition-colors",
                            criterion.met ? "text-positive" : "text-faint",
                        )}
                    >
                        {criterion.met ? (
                            <Check size={13} aria-hidden="true" className="shrink-0" />
                        ) : (
                            <X size={13} aria-hidden="true" className="shrink-0" />
                        )}
                        <span>{criterion.label}</span>
                        <span className="sr-only">{criterion.met ? " — erfüllt" : " — offen"}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Passwort und Wiederholung als ein Baustein — samt Stärkeanzeige und
 * Live-Abgleich der beiden Felder.
 *
 * Die Registrierung hatte das alles, das Zurücksetzen des Passworts nichts
 * davon: dort waren beide Felder nackte `type="password"`-Eingaben ohne
 * Sichtbarkeitsschalter, ohne Stärkeanzeige und mit einer Mindestlänge, die als
 * `8` im Formular stand statt aus `PASSWORD_MIN_LENGTH` zu kommen. Wer sein
 * Passwort zurücksetzte, bekam also weniger Hilfe beim Wählen als bei der
 * Registrierung — und das ist genau der Moment, in dem jemand sich ein neues
 * ausdenkt.
 *
 * Bewusst gesteuert („controlled“): beide Aufrufer prüfen beim Absenden selbst
 * und brauchen die Werte ohnehin.
 */
export function NewPasswordFields({
    idPrefix,
    label = "Passwort",
    confirmLabel = "Passwort wiederholen",
    name = "password",
    confirmName = "confirmPassword",
    password,
    onPasswordChange,
    confirmPassword,
    onConfirmPasswordChange,
}: {
    /** Basis für die Feld-ids — muss je Formular eindeutig sein. */
    idPrefix: string;
    label?: string;
    confirmLabel?: string;
    name?: string;
    confirmName?: string;
    password: string;
    onPasswordChange: (value: string) => void;
    confirmPassword: string;
    onConfirmPasswordChange: (value: string) => void;
}) {
    // Erst melden, wenn im zweiten Feld überhaupt etwas steht — sonst stünde
    // schon beim ersten Tastendruck im ersten Feld „stimmen nicht überein“.
    const mismatch = confirmPassword.length > 0 && password !== confirmPassword;
    const matches = confirmPassword.length > 0 && password === confirmPassword;

    return (
        <>
            <div className="grid gap-2">
                <Field label={label} htmlFor={`${idPrefix}-password`} required>
                    <PasswordInput
                        id={`${idPrefix}-password`}
                        name={name}
                        autoComplete="new-password"
                        required
                        minLength={PASSWORD_MIN_LENGTH}
                        value={password}
                        onChange={(event) => onPasswordChange(event.target.value)}
                        aria-describedby={`${idPrefix}-strength`}
                        placeholder={`Mindestens ${PASSWORD_MIN_LENGTH} Zeichen`}
                    />
                </Field>
                <PasswordStrengthMeter id={`${idPrefix}-strength`} password={password} />
            </div>

            <Field
                label={confirmLabel}
                htmlFor={`${idPrefix}-confirm`}
                required
                error={mismatch ? "Die Passwörter stimmen nicht überein." : undefined}
            >
                <PasswordInput
                    id={`${idPrefix}-confirm`}
                    name={confirmName}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(event) => onConfirmPasswordChange(event.target.value)}
                    aria-invalid={mismatch || undefined}
                    placeholder="Zur Sicherheit noch einmal"
                />
            </Field>

            {/* `aria-live`, damit der Screenreader die Bestätigung mitbekommt —
                sichtbar ist sie ohnehin nur kurz. */}
            {matches && (
                <p
                    aria-live="polite"
                    className="-mt-2 flex items-center gap-1.5 text-xs font-medium text-positive"
                >
                    <Check size={13} aria-hidden="true" />
                    Die Passwörter stimmen überein.
                </p>
            )}
        </>
    );
}

/**
 * Die beiden Prüfungen, die nur der Browser machen kann: der Server sieht das
 * Bestätigungsfeld nie. Gibt die Meldung zurück oder `null`, wenn alles passt.
 */
export function validateNewPassword(
    password: string,
    confirmPassword: string,
): string | null {
    if (password.length < PASSWORD_MIN_LENGTH) {
        return `Das Passwort muss mindestens ${PASSWORD_MIN_LENGTH} Zeichen lang sein.`;
    }
    if (password !== confirmPassword) {
        return "Die Passwörter stimmen nicht überein.";
    }
    return null;
}
