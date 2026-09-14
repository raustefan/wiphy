"use client";

import { useEffect, type CSSProperties } from "react";

/**
 * Altcha-Widget an die Design-Tokens angeglichen.
 *
 * Die Werte standen wörtlich in Login-, Registrierungs- und Kontaktformular.
 * Dreimal dieselbe Konstante heißt: eine Anpassung am Farbschema traf zwei der
 * drei Formulare und das dritte fiel auf die Altcha-Voreinstellung zurück.
 */
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
 * Beschriftete Botprüfung. Das Widget löst die Aufgabe lokal im Browser; das
 * Ergebnis landet als Feld `altcha` in der FormData des umgebenden Formulars.
 *
 * Eine gelöste Aufgabe ist serverseitig einmalig gültig. Nach einem
 * fehlgeschlagenen Versuch muss der Aufrufer deshalb eine neue anfordern und
 * das Widget über ein wechselndes `key` neu einhängen — sonst schickt das
 * Formular beim zweiten Versuch dieselbe, bereits verbrauchte Lösung.
 */
export function AltchaField({
    challengeJson,
    label = "Sicherheitsüberprüfung",
}: {
    challengeJson: string;
    label?: string;
}) {
    useEffect(() => {
        import("altcha");
    }, []);

    return (
        <div className="grid gap-1.5">
            <span className="text-sm font-semibold text-foreground">{label}</span>
            <altcha-widget challenge={challengeJson} name="altcha" style={ALTCHA_STYLE} />
        </div>
    );
}
