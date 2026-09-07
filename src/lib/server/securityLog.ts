import { createHmac } from "crypto";
import { prisma } from "@/lib/prisma";
import { getSecurityLogPepper } from "@/lib/server/env";
import { normalizeEmail } from "@/lib/server/normalizeEmail";

/**
 * Sicherheitsprotokoll für Login, Registrierung, Kontaktformular und
 * Passwort-Reset.
 *
 * Datenschutz ist hier eine Eigenschaft *dieser Datei*, nicht der Aufrufer: die
 * Aufrufer übergeben Klartext (E-Mail, IP), gespeichert wird ausschließlich das
 * Ergebnis von `pseudonymize()`. Damit kann kein späterer Aufrufer versehentlich
 * Klardaten in die Tabelle schreiben — und es gibt nur eine Stelle zu prüfen,
 * wenn jemand fragt, was das Protokoll eigentlich enthält.
 *
 * Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (Sicherheit der Verarbeitung,
 * Art. 32) — dokumentiert im Abschnitt „Sicherheitsprotokoll“ der
 * Datenschutzerklärung.
 */

export type SecurityEventType =
  | "LOGIN"
  | "REGISTRATION"
  | "CONTACT_REQUEST"
  | "PASSWORD_RESET_REQUEST"
  | "PASSWORD_RESET_COMPLETE"
  | "EMAIL_VERIFICATION"
  | "EMAIL_CHANGE"
  | "REGISTRATION_EXPIRED";

export type SecurityEventOutcome = "SUCCESS" | "FAILURE" | "BLOCKED";

/**
 * Erlaubte Gründe, als geschlossene Menge. Ein `string` würde früher oder
 * später Nutzereingaben oder eine Fehlermeldung mit Klardaten aufnehmen; so
 * kann in `reason` nur stehen, was hier steht.
 */
export type SecurityEventReason =
  | "invalid_credentials"
  | "email_not_verified"
  | "captcha_failed"
  | "rate_limited"
  | "feature_disabled"
  | "honeypot"
  | "too_fast"
  | "security_question"
  | "email_taken"
  | "unknown_email"
  | "invalid_token"
  | "email_change"
  | "spam_filtered"
  | "mail_failed"
  | "unverified_expired";

type SecurityEventInput = {
  type: SecurityEventType;
  outcome: SecurityEventOutcome;
  reason?: SecurityEventReason;
  /** Konto-ID, sofern der Vorgang einem Konto zuzuordnen ist. */
  userId?: string | null;
  /** Klartext — wird gehasht und nie gespeichert. */
  email?: string | null;
  /** Klartext — wird gehasht und nie gespeichert. */
  ip?: string | null;
  userAgent?: string | null;
};

/** Nach dieser Frist werden IP-Hash und User-Agent genullt (Zusage: 7 Tage). */
export const PSEUDONYM_RETENTION_DAYS = 7;

/**
 * Nach dieser Frist verschwindet die Zeile ganz. 90 Tage sind der übliche
 * Rahmen, in dem ein Angriffsmuster (langsames Passwort-Spraying über Wochen)
 * überhaupt noch erkennbar ist; alles darüber ließe sich für den Zweck
 * „Sicherheit“ nicht mehr rechtfertigen.
 */
export const EVENT_RETENTION_DAYS = 90;

const DAY_MS = 24 * 60 * 60 * 1000;

/** Höchstens einmal pro Stunde aufräumen — der Rest wäre reine DB-Last. */
const PRUNE_INTERVAL_MS = 60 * 60 * 1000;

let lastPruneAt = 0;

/**
 * HMAC statt blankem SHA-256: der Suchraum einer IP-Adresse oder einer E-Mail
 * ist klein genug, um einen ungesalzenen Hash per Wörterbuch zurückzurechnen.
 */
function pseudonymize(value: string) {
  return createHmac("sha256", getSecurityLogPepper()).update(value).digest("hex");
}

/**
 * Protokolliert einen Vorgang. Schlägt das fehl, wird es geloggt und
 * verschluckt: ein defektes Protokoll darf niemanden am Anmelden hindern.
 */
export async function logSecurityEvent(input: SecurityEventInput) {
  try {
    const email = input.email ? normalizeEmail(input.email) : "";
    const ip = input.ip?.trim();

    await prisma.securityEvent.create({
      data: {
        type: input.type,
        outcome: input.outcome,
        reason: input.reason ?? null,
        userId: input.userId ?? null,
        // Nur wenn kein Konto bekannt ist: bei bekanntem Konto wäre der Hash
        // derselben Adresse ein zweiter Personenbezug ohne zusätzlichen Nutzen.
        subjectHash: !input.userId && email ? pseudonymize(email) : null,
        ipHash: ip && ip !== "unknown" ? pseudonymize(ip) : null,
        userAgent: input.userAgent?.slice(0, 200) ?? null,
      },
    });

    await pruneSecurityEvents();
  } catch (error) {
    console.error("Failed to write security event:", error);
  }
}

/**
 * Setzt die Speicherbegrenzung (Art. 5 Abs. 1 lit. e DSGVO) um — in zwei
 * Stufen, weil die Felder unterschiedlich sensibel sind: IP und User-Agent
 * identifizieren ein Gerät und fallen nach 7 Tagen weg, die Zeile selbst hält
 * 90 Tage. Läuft huckepack auf den Schreibvorgängen, damit die Fristen auch
 * ohne Cron-Job eingehalten werden.
 */
export async function pruneSecurityEvents(force = false) {
  const now = Date.now();
  if (!force && now - lastPruneAt < PRUNE_INTERVAL_MS) {
    return;
  }
  lastPruneAt = now;

  await prisma.securityEvent.deleteMany({
    where: { createdAt: { lt: new Date(now - EVENT_RETENTION_DAYS * DAY_MS) } },
  });

  await prisma.securityEvent.updateMany({
    where: {
      createdAt: { lt: new Date(now - PSEUDONYM_RETENTION_DAYS * DAY_MS) },
      OR: [{ ipHash: { not: null } }, { userAgent: { not: null } }],
    },
    data: { ipHash: null, userAgent: null },
  });
}

/**
 * Löst den Personenbezug aller Protokollzeilen eines Kontos, wenn das Konto
 * gelöscht wird (Art. 17 DSGVO).
 *
 * Die Zeilen bleiben bewusst als anonyme Zähler stehen: sie belegen, wie oft
 * eine Funktion angegriffen wurde, und das ist ohne Konto-ID genauso wahr.
 * Der Fremdschlüssel würde `userId` ohnehin auf NULL setzen — `subjectHash`,
 * `ipHash` und User-Agent müssen aber ausdrücklich mitgelöscht werden, sonst
 * bliebe über die E-Mail-Adresse ein Rückschluss möglich.
 */
export async function anonymizeSecurityEventsForUser(userId: string, email?: string | null) {
  const subjectHash = email ? pseudonymize(normalizeEmail(email)) : null;

  await prisma.securityEvent.updateMany({
    where: subjectHash ? { OR: [{ userId }, { subjectHash }] } : { userId },
    data: { userId: null, subjectHash: null, ipHash: null, userAgent: null },
  });
}
