"use client";

import { useState } from "react";
import { Input } from "@/components/ui";
import { formatIban, normalizeIban } from "@/lib/iban";

/**
 * IBAN-Feld, das beim Tippen in Viererblöcke gliedert — die Schreibweise, in
 * der IBANs auf Kontoauszügen und Rechnungen stehen. 22 Zeichen am Stück liest
 * niemand gegen, in Blöcken fällt ein Zahlendreher sofort auf.
 *
 * Der Wert wird zusätzlich in Großbuchstaben gewandelt und von Bindestrichen
 * befreit; die Prüfung der Prüfziffer bleibt beim Absenden, denn eine
 * halbfertige IBAN ist während des Tippens immer ungültig und dürfte deshalb
 * noch nichts anmeckern.
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

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target;
        const caret = input.selectionStart ?? input.value.length;
        // Wie viele echte Zeichen stehen links vom Cursor? Diese Zahl überlebt
        // das Umformatieren, die Zeichenposition nicht.
        const charsBeforeCaret = normalizeIban(input.value.slice(0, caret)).length;

        const formatted = formatIban(input.value);
        setValue(formatted);

        // Position neu bestimmen: je vier echte Zeichen kommt ein Leerzeichen
        // dazu. Nach dem Rendern setzen, sonst überschreibt React sie wieder.
        const spaces = Math.max(0, Math.floor((charsBeforeCaret - 1) / 4));
        const nextCaret = charsBeforeCaret + spaces;
        requestAnimationFrame(() => input.setSelectionRange(nextCaret, nextCaret));
    }

    return (
        <Input
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            required={required}
            placeholder="DE00 0000 0000 0000 0000 00"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            className="font-mono"
        />
    );
}
