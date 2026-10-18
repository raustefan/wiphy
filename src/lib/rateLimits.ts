/**
 * Alle Rate Limits an einem Ort: Grenze, Zeitfenster, Sperrdauer, die Meldung
 * an den Nutzer und der Erklärtext fürs Sicherheits-Dashboard. Der Satz
 * „Grenze: …“ im Dashboard wird aus den Zahlen erzeugt und kann deshalb nicht
 * mehr hinter dem Code zurückbleiben.
 *
 * Frei von Server-Imports, damit die Rate-Limit-Tabelle (Client-Komponente)
 * die Beschreibungen direkt nutzen kann.
 */

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

type RateLimitRule = {
  limit: number;
  windowMs: number;
  blockMs: number;
  message: string;
  description: string;
};

export const RATE_LIMITS = {
  "login-ip": {
    limit: 20,
    windowMs: 10 * MINUTE,
    blockMs: 10 * MINUTE,
    message: "Zu viele Login-Versuche von dieser Adresse. Bitte versuche es in 10 Minuten erneut.",
    description: "Login-Versuche pro IP-Adresse, über alle E-Mail-Adressen hinweg.",
  },
  login: {
    limit: 5,
    windowMs: 10 * MINUTE,
    blockMs: 10 * MINUTE,
    message: "Zu viele Login-Versuche. Bitte versuche es in 10 Minuten erneut.",
    description: "Login-Versuche für eine bestimmte Kombination aus IP-Adresse und E-Mail.",
  },
  "login-account": {
    limit: 50,
    windowMs: HOUR,
    blockMs: 15 * MINUTE,
    message: "Zu viele Login-Versuche für dieses Konto. Bitte versuche es in 15 Minuten erneut.",
    description:
      "Login-Versuche für eine E-Mail-Adresse, egal von welcher IP — gegen verteiltes Raten eines Passworts. Zählt erst nach gelöstem Captcha.",
  },
  "contact-ip": {
    limit: 3,
    windowMs: HOUR,
    blockMs: 6 * HOUR,
    message: "Zu viele Anfragen von dieser Verbindung. Bitte versuche es später erneut.",
    description: "Kontaktformular-Anfragen pro IP-Adresse.",
  },
  "contact-email": {
    limit: 3,
    windowMs: DAY,
    blockMs: DAY,
    message: "Für diese E-Mail-Adresse liegen bereits mehrere Anfragen vor. Bitte warte unsere Antwort ab.",
    description: "Kontaktformular-Anfragen für dieselbe E-Mail-Adresse.",
  },
  "contact-global": {
    limit: 5,
    windowMs: HOUR,
    blockMs: HOUR,
    message: "Das Kontaktformular ist momentan überlastet. Bitte versuche es später erneut.",
    description:
      "Kontaktformular-Anfragen insgesamt, unabhängig von IP oder E-Mail — schützt vor Überlastung des Postfachs.",
  },
  "membership-application": {
    limit: 5,
    windowMs: DAY,
    blockMs: DAY,
    message: "Zu viele Versuche. Bitte versuche es morgen erneut oder wende dich an den Vorstand.",
    description: "Eingereichte Mitgliedsanträge pro Nutzerkonto.",
  },
  "register-ip": {
    limit: 10,
    windowMs: HOUR,
    blockMs: HOUR,
    message: "Zu viele Registrierungsversuche. Bitte versuche es in einer Stunde erneut.",
    description: "Registrierungsversuche pro IP-Adresse.",
  },
  register: {
    limit: 3,
    windowMs: HOUR,
    blockMs: HOUR,
    message: "Zu viele Registrierungsversuche. Bitte versuche es in einer Stunde erneut.",
    description: "Registrierungsversuche für eine bestimmte Kombination aus IP-Adresse und E-Mail.",
  },
  "password-change": {
    limit: 3,
    windowMs: 15 * MINUTE,
    blockMs: 15 * MINUTE,
    message: "Zu viele Anfragen. Bitte versuche es in 15 Minuten erneut.",
    description: "Angeforderte Links zur Passwortänderung aus dem eigenen Konto, pro Konto.",
  },
  "reset-password-ip": {
    limit: 20,
    windowMs: 15 * MINUTE,
    blockMs: 15 * MINUTE,
    message: "Zu viele Anfragen. Bitte versuche es später erneut.",
    description: "Aufrufe der Passwort-zurücksetzen-Seite pro IP-Adresse.",
  },
  "forgot-password-ip": {
    limit: 20,
    windowMs: 15 * MINUTE,
    blockMs: 15 * MINUTE,
    message: "Zu viele Anfragen. Bitte versuche es später erneut.",
    description: "Anfragen zum Zurücksetzen des Passworts pro IP-Adresse.",
  },
  "forgot-password": {
    limit: 5,
    windowMs: 15 * MINUTE,
    blockMs: 15 * MINUTE,
    message: "Zu viele Anfragen für diese E-Mail-Adresse. Bitte versuche es später erneut.",
    description: "Anfragen zum Zurücksetzen des Passworts für eine bestimmte Kombination aus IP-Adresse und E-Mail.",
  },
  "resend-verification-ip": {
    limit: 10,
    windowMs: HOUR,
    blockMs: HOUR,
    message: "Zu viele Anfragen. Bitte versuche es in einer Stunde erneut.",
    description: "Erneutes Senden der Verifizierungs-Mail pro IP-Adresse.",
  },
  "resend-verification": {
    limit: 3,
    windowMs: HOUR,
    blockMs: HOUR,
    message: "Zu viele Anfragen. Bitte versuche es in einer Stunde erneut.",
    description: "Erneutes Senden der Verifizierungs-Mail für eine bestimmte Kombination aus IP-Adresse und E-Mail.",
  },
  "email-change": {
    limit: 5,
    windowMs: HOUR,
    blockMs: HOUR,
    message: "Zu viele Versuche, die E-Mail-Adresse zu ändern.",
    description: "Versuche, die eigene E-Mail-Adresse zu ändern, pro Konto (inklusive falscher Passworteingaben).",
  },
  "account-action": {
    limit: 5,
    windowMs: 15 * MINUTE,
    blockMs: 15 * MINUTE,
    message: "Zu viele Versuche. Bitte versuche es in 15 Minuten erneut.",
    description:
      "Passwortbestätigungen für Kündigung, Zugangssperre und Kontolöschung pro Konto (inklusive falscher Eingaben).",
  },
  "admin-mail": {
    limit: 250,
    windowMs: 10 * MINUTE,
    blockMs: 10 * MINUTE,
    message: "Zu viele E-Mails in kurzer Zeit. Bitte warte 10 Minuten und versuche es erneut.",
    description: "Von Admins versendete E-Mails, z. B. Rundmails.",
  },
} as const satisfies Record<string, RateLimitRule>;

export type RateLimitBucket = keyof typeof RATE_LIMITS;

/** 1 Stunde → „Stunde“, 6 Stunden → „6 Stunden“; `bare` lässt die 1 weg („pro Stunde“). */
function duration(ms: number, bare = false): string {
  const [n, one, many] =
    ms % DAY === 0 ? [ms / DAY, "Tag", "Tage"]
    : ms % HOUR === 0 ? [ms / HOUR, "Stunde", "Stunden"]
    : [ms / MINUTE, "Minute", "Minuten"];
  if (n === 1) return bare ? one : `1 ${one}`;
  return `${n} ${many}`;
}

export function describeRateLimit(bucket: string): string {
  if (!Object.hasOwn(RATE_LIMITS, bucket)) return "Keine Beschreibung für dieses Rate Limit hinterlegt.";
  const rule: RateLimitRule = RATE_LIMITS[bucket as RateLimitBucket];
  return `${rule.description} Grenze: ${rule.limit} pro ${duration(rule.windowMs, true)}, danach ${duration(rule.blockMs)} gesperrt.`;
}
