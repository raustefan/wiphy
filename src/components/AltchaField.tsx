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
 * Deutsche Texte für das Widget. Altcha bringt zwar eine deutsche Übersetzung
 * mit, die siezt aber — die Formulare hier duzen. Das Widget wählt die
 * Sprache über `<html lang="de">`; ohne Eintrag für „de“ fiele es auf
 * Englisch zurück („I'm not a robot“).
 */
const ALTCHA_STRINGS_DE = {
    ariaLinkLabel: "Altcha (offizielle Website)",
    enterCode: "Code eingeben",
    enterCodeAria:
        "Gib den Code ein, den du hörst. Mit der Leertaste spielst du die Audiodatei ab.",
    enterCodeFromImage: "Gib zum Fortfahren den Code aus dem Bild unten ein.",
    error: "Überprüfung fehlgeschlagen. Bitte versuch es später noch einmal.",
    expired: "Überprüfung abgelaufen. Bitte versuch es noch einmal.",
    footer: 'Geschützt durch <a href="https://altcha.org/" tabindex="-1" target="_blank" aria-label="Altcha (offizielle Website)">ALTCHA</a>',
    getAudioChallenge: "Audio-Aufgabe anfordern",
    label: "Ich bin kein Roboter",
    loading: "Lädt …",
    reload: "Neu laden",
    verify: "Überprüfen",
    verificationRequired: "Bitte bestätige zuerst, dass du kein Roboter bist.",
    verified: "Überprüft",
    verifying: "Wird überprüft …",
    waitAlert: "Überprüfung läuft … bitte kurz warten.",
    cancel: "Abbrechen",
};

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
        import("altcha").then(() => {
            const altcha = (globalThis as { $altcha?: { i18n: { set(code: string, strings: object): void } } }).$altcha;
            altcha?.i18n.set("de", ALTCHA_STRINGS_DE);
        });
    }, []);

    return (
        <div className="grid gap-1.5">
            <span className="text-sm font-semibold text-foreground">{label}</span>
            <altcha-widget challenge={challengeJson} name="altcha" style={ALTCHA_STYLE} />
        </div>
    );
}
