"use client";

import { useState } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { controlClasses } from "@/components/ui";
import { evaluatePassword, type PasswordScore } from "@/lib/passwordStrength";

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
