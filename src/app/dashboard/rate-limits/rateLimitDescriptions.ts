/**
 * Erklärtexte je Bucket, von Hand gepflegt anhand der `consumeRateLimit`-Aufrufe
 * im Code (Grenzwert, Zeitfenster, worauf der Schlüssel lautet). Es gibt keine
 * Möglichkeit, das automatisch aus der DB abzuleiten — der Bucket-Name ist nur
 * ein String-Präfix ohne Metadaten. Frei von Server-Imports, damit die Tabelle
 * (Client-Komponente) sie direkt nutzen kann.
 */
const RATE_LIMIT_DESCRIPTIONS: Record<string, string> = {
    "login-ip":
        "Login-Versuche pro IP-Adresse, über alle E-Mail-Adressen hinweg. Grenze: 20 Versuche pro 10 Minuten, danach 10 Minuten gesperrt.",
    login: "Login-Versuche für eine bestimmte Kombination aus IP-Adresse und E-Mail. Grenze: 5 Versuche pro 10 Minuten, danach 10 Minuten gesperrt.",
    "contact-ip":
        "Kontaktformular-Anfragen pro IP-Adresse. Grenze: 3 pro Stunde, danach 6 Stunden gesperrt.",
    "contact-email":
        "Kontaktformular-Anfragen für dieselbe E-Mail-Adresse. Grenze: 3 pro Tag, danach 24 Stunden gesperrt.",
    "contact-global":
        "Kontaktformular-Anfragen insgesamt, unabhängig von IP oder E-Mail — schützt vor Überlastung des Postfachs. Grenze: 5 pro Stunde.",
    "membership-application":
        "Eingereichte Mitgliedsanträge pro Nutzerkonto. Grenze: 5 pro Tag, danach 24 Stunden gesperrt.",
    "reset-password-ip":
        "Aufrufe der Passwort-zurücksetzen-Seite pro IP-Adresse. Grenze: 20 pro 15 Minuten.",
    "register-ip": "Registrierungsversuche pro IP-Adresse. Grenze: 10 pro Stunde.",
    register:
        "Registrierungsversuche für eine bestimmte Kombination aus IP-Adresse und E-Mail. Grenze: 3 pro Stunde.",
    "forgot-password-ip":
        "Anfragen zum Zurücksetzen des Passworts pro IP-Adresse. Grenze: 20 pro 15 Minuten.",
    "forgot-password":
        "Anfragen zum Zurücksetzen des Passworts für eine bestimmte Kombination aus IP-Adresse und E-Mail. Grenze: 5 pro 15 Minuten.",
    "resend-verification-ip":
        "Erneutes Senden der Verifizierungs-Mail pro IP-Adresse. Grenze: 10 pro Stunde.",
    "resend-verification":
        "Erneutes Senden der Verifizierungs-Mail für eine bestimmte Kombination aus IP-Adresse und E-Mail. Grenze: 3 pro Stunde.",
    "admin-mail": "Von Admins versendete E-Mails, z. B. Rundmails. Grenze: 250 pro 10 Minuten.",
};

const DEFAULT_RATE_LIMIT_DESCRIPTION = "Keine Beschreibung für dieses Rate Limit hinterlegt.";

export function getRateLimitDescription(bucket: string): string {
    return RATE_LIMIT_DESCRIPTIONS[bucket] ?? DEFAULT_RATE_LIMIT_DESCRIPTION;
}
