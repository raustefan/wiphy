import type { SecurityEventOutcome, SecurityEventType } from "@/lib/server/securityLog";
import type { BadgeTone } from "@/components/ui";

/**
 * Deutsche Beschriftungen für die Codes aus dem Sicherheitsprotokoll.
 *
 * Frei von Server-Imports (nur Typen, die beim Kompilieren verschwinden), damit
 * auch Client-Komponenten sie nutzen können — nach demselben Muster wie
 * `rateLimitDescriptions`.
 */

type TypeLabel = {
  label: string;
  /** Was in diesem Typ als „Versuch“ zählt — steht als Hilfstext an der Grafik. */
  hint: string;
};

const TYPE_LABELS: Record<SecurityEventType, TypeLabel> = {
  LOGIN: {
    label: "Anmeldung",
    hint: "Jeder Anmeldeversuch am Login-Formular.",
  },
  REGISTRATION: {
    label: "Registrierung",
    hint: "Nur das öffentliche Formular — im Dashboard angelegte Konten zählen nicht.",
  },
  CONTACT_REQUEST: {
    label: "Kontaktanfrage",
    hint: "Absenden des öffentlichen Kontaktformulars.",
  },
  PASSWORD_RESET_REQUEST: {
    label: "Passwort vergessen",
    hint: "Anforderung des Links. Erfolg heißt: die Mail ist raus.",
  },
  PASSWORD_RESET_COMPLETE: {
    label: "Passwort neu gesetzt",
    hint: "Klick auf den Link und Vergabe eines neuen Passworts.",
  },
  EMAIL_VERIFICATION: {
    label: "E-Mail bestätigt",
    hint: "Klick auf den Bestätigungslink aus Registrierung oder Adressänderung.",
  },
  EMAIL_CHANGE: {
    label: "E-Mail-Änderung",
    hint: "Angeforderte Adressänderung. Der Klick darauf zählt als Bestätigung.",
  },
};

export function typeLabel(type: SecurityEventType): string {
  return TYPE_LABELS[type]?.label ?? type;
}

export function typeHint(type: SecurityEventType): string {
  return TYPE_LABELS[type]?.hint ?? "";
}

/** Anzeigereihenfolge der Typen: der Reihenfolge im Nutzungsablauf nach. */
export const TYPE_ORDER: SecurityEventType[] = [
  "LOGIN",
  "REGISTRATION",
  "EMAIL_VERIFICATION",
  "CONTACT_REQUEST",
  "PASSWORD_RESET_REQUEST",
  "PASSWORD_RESET_COMPLETE",
  "EMAIL_CHANGE",
];

export const OUTCOME_LABELS: Record<SecurityEventOutcome, string> = {
  SUCCESS: "Erfolgreich",
  FAILURE: "Fehlgeschlagen",
  BLOCKED: "Abgewehrt",
};

export const OUTCOME_TONES: Record<SecurityEventOutcome, BadgeTone> = {
  SUCCESS: "positive",
  FAILURE: "negative",
  BLOCKED: "info",
};

const REASON_LABELS: Record<string, string> = {
  invalid_credentials: "Falsche Zugangsdaten",
  email_not_verified: "E-Mail nicht bestätigt",
  captcha_failed: "Captcha nicht bestanden",
  rate_limited: "Rate Limit erreicht",
  feature_disabled: "Funktion abgeschaltet",
  honeypot: "Honeypot ausgelöst (Bot)",
  too_fast: "Formular zu schnell gesendet (Bot)",
  security_question: "Sicherheitsfrage falsch",
  email_taken: "Adresse bereits vergeben",
  unknown_email: "Adresse ohne Konto",
  invalid_token: "Link ungültig oder abgelaufen",
  spam_filtered: "Als Spam einsortiert, nicht gemailt",
  mail_failed: "Mailversand fehlgeschlagen",
  email_change: "Adressänderung bestätigt",
};

export function reasonLabel(reason: string | null): string {
  if (!reason) return "—";
  return REASON_LABELS[reason] ?? reason;
}
