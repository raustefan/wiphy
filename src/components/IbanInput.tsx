"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui";
import { formatIban, isValidIban, normalizeIban } from "@/lib/iban";

const INVALID_MESSAGE = "Diese IBAN ist ungültig — bitte auf Tippfehler prüfen.";

function ibanError(value: string): string {
    const iban = normalizeIban(value);
    return iban === "" || isValidIban(iban) ? "" : INVALID_MESSAGE;
}

/**
 * IBAN-Feld, das beim Tippen in Viererblöcke gliedert — die Schreibweise, in
 * der IBANs auf Kontoauszügen und Rechnungen stehen. 22 Zeichen am Stück liest
 * niemand gegen, in Blöcken fällt ein Zahlendreher sofort auf.
 *
 * Der Wert wird zusätzlich in Großbuchstaben gewandelt und von Bindestrichen
 * befreit. Die Prüfziffer wird beim Verlassen des Feldes geprüft, nicht schon
 * beim Tippen: eine halbfertige IBAN ist immer ungültig und dürfte deshalb noch
 * nichts anmeckern. Steht der Fehler einmal da, verschwindet er aber sofort,
 * sobald die Eingabe stimmt. `setCustomValidity` hält zusätzlich das Absenden
 * auf — die Serverprüfung bleibt trotzdem maßgeblich.
 *
 * Der Schreibcursor ist der Grund für die Rechnerei unten: Ohne Korrektur
 * springt er bei jedem eingefügten Leerzeichen ans Ende, sodass eine
 * Berichtigung in der Mitte der Nummer unmöglich wird.
 */
export function IbanInput({
    name = "IBAN",
    defaultValue = "",
    id,
    required,
}: {
    name?: string;
    defaultValue?: string;
    id?: string;
    required?: boolean;
}) {
    const [value, setValue] = useState(() => formatIban(defaultValue));
    const [error, setError] = useState("");
    const errorId = useId();

    function check(input: HTMLInputElement, next: string) {
        const message = ibanError(next);
        setError(message);
        input.setCustomValidity(message);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target;
        const caret = input.selectionStart ?? input.value.length;
        // Wie viele echte Zeichen stehen links vom Cursor? Diese Zahl überlebt
        // das Umformatieren, die Zeichenposition nicht.
        const charsBeforeCaret = normalizeIban(input.value.slice(0, caret)).length;

        const formatted = formatIban(input.value);
        setValue(formatted);
        if (error) check(input, formatted);

        // Position neu bestimmen: je vier echte Zeichen kommt ein Leerzeichen
        // dazu. Nach dem Rendern setzen, sonst überschreibt React sie wieder.
        const spaces = Math.max(0, Math.floor((charsBeforeCaret - 1) / 4));
        const nextCaret = charsBeforeCaret + spaces;
        requestAnimationFrame(() => input.setSelectionRange(nextCaret, nextCaret));
    }

    return (
        <>
            <Input
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={(event) => check(event.target, event.target.value)}
                required={required}
                invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                placeholder="DE00 0000 0000 0000 0000 00"
                inputMode="text"
                autoComplete="off"
                spellCheck={false}
                className="font-mono"
            />
            {error && (
                <span id={errorId} className="text-sm font-normal text-negative">
                    {error}
                </span>
            )}
        </>
    );
}
