/**
 * Inhalt aller wiederkehrenden Mails — und *nur* der Inhalt.
 *
 * Anrede-Block, Grußformel, Logo, Footer und Rechtliches steuert das Layout in
 * `server/email/layout.ts` bei; hier steht deshalb bewusst kein "Viele Grüße"
 * mehr. Reine Funktionen ohne Server-Abhängigkeiten, damit das Dashboard
 * dieselben Texte für die Vorschau rendern kann.
 */
import type { EmailBlock, EmailMessage } from "./blocks";
import { VEREIN } from "./branding";

type Person = { vorname?: string | null; name?: string | null };

/** Persönliche Anrede, mit neutralem Fallback wenn kein Name bekannt ist. */
function greeting(person: Person | undefined, fallback = "Mitglied"): EmailBlock {
  const full = `${person?.vorname?.trim() ?? ""} ${person?.name?.trim() ?? ""}`.trim();
  return { type: "text", content: `Hallo ${full || fallback},` };
}

const LINK_EXPIRY = (duration: string): EmailBlock => ({
  type: "note",
  content: `Der Link ist ${duration} gültig. Wenn du diese E-Mail nicht angefordert hast, kannst du sie einfach ignorieren.`,
});

export function passwordResetMessage(resetUrl: string): EmailMessage {
  return {
    subject: "Passwort zurücksetzen",
    preheader: "Setze dein Passwort über den Link in dieser E-Mail neu.",
    blocks: [
      { type: "text", content: "Hallo," },
      { type: "text", content: "du hast angefordert, dein Passwort zurückzusetzen. Über den folgenden Link vergibst du ein neues:" },
      { type: "button", label: "Neues Passwort vergeben", url: resetUrl },
      LINK_EXPIRY("30 Minuten"),
    ],
  };
}

export function emailChangeMessage(verificationUrl: string): EmailMessage {
  return {
    subject: "E-Mail-Adresse ändern",
    preheader: "Bestätige deine neue E-Mail-Adresse.",
    blocks: [
      { type: "text", content: "Hallo," },
      { type: "text", content: "um deine neue E-Mail-Adresse zu bestätigen, klicke bitte auf den folgenden Link:" },
      { type: "button", label: "E-Mail-Adresse bestätigen", url: verificationUrl },
      LINK_EXPIRY("30 Minuten"),
    ],
  };
}

export function registrationConfirmationMessage(user: Person, verificationUrl: string): EmailMessage {
  return {
    subject: "Registrierung erfolgreich — bitte E-Mail bestätigen",
    preheader: "Nur noch ein Klick: bestätige deine E-Mail-Adresse.",
    blocks: [
      greeting(user),
      { type: "text", content: `vielen Dank für deine Registrierung beim ${VEREIN.name}! Bitte bestätige zuerst deine E-Mail-Adresse:` },
      { type: "button", label: "E-Mail-Adresse bestätigen", url: verificationUrl },
      { type: "text", content: "Sobald deine Adresse verifiziert und dein Konto von einem Administrator freigeschaltet ist, hast du vollen Zugriff auf den Internbereich." },
      { type: "note", content: "Der Link ist 24 Stunden gültig." },
    ],
  };
}

export function adminCreatedUserMessage(user: Person, verificationUrl: string): EmailMessage {
  return {
    subject: `Dein Account beim ${VEREIN.name} wurde erstellt`,
    preheader: "Bestätige deine E-Mail-Adresse, um dich anmelden zu können.",
    blocks: [
      greeting(user),
      { type: "text", content: `dein Account beim ${VEREIN.name} wurde von einem Vorstandsmitglied erstellt (vermutlich wegen des Umzugs auf unsere neue Website).` },
      { type: "text", content: "Bitte bestätige deine E-Mail-Adresse:" },
      { type: "button", label: "E-Mail-Adresse bestätigen", url: verificationUrl },
      { type: "text", content: "Danach kannst du dich mit deiner E-Mail-Adresse anmelden. Wir empfehlen dringend, anschließend im Portal ein eigenes Passwort zu setzen." },
      { type: "note", content: "Falls du die Frist versäumst, kann auch ein Administrator dein Konto aktivieren." },
    ],
  };
}

export function contactRequestMessage(request: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): EmailMessage {
  return {
    subject: `[Kontakt] ${request.subject}`,
    preheader: `Neue Anfrage von ${request.name}`,
    signature: "system",
    blocks: [
      { type: "text", content: "Neue Anfrage über das Kontaktformular:" },
      {
        type: "facts",
        items: [
          { label: "Name", value: request.name },
          { label: "E-Mail", value: request.email, href: `mailto:${request.email}` },
          { label: "Betreff", value: request.subject },
        ],
      },
      { type: "quote", content: request.message },
      { type: "note", content: "„Antworten“ geht direkt an den Absender (Reply-To)." },
    ],
  };
}

export function adminRegistrationNoticeMessage(newUser: {
  vorname: string;
  name: string;
  email: string;
}): EmailMessage {
  return {
    subject: "Neuer Benutzer registriert",
    preheader: `${newUser.vorname} ${newUser.name} wartet auf Bestätigung.`,
    signature: "system",
    blocks: [
      { type: "text", content: "Hallo Admin," },
      { type: "text", content: "ein neuer Benutzer hat sich registriert und wartet auf Bestätigung:" },
      {
        type: "facts",
        items: [
          { label: "Name", value: `${newUser.vorname} ${newUser.name}` },
          { label: "E-Mail", value: newUser.email },
        ],
      },
      { type: "text", content: "Bitte prüfe und bestätige die Registrierung im Dashboard." },
    ],
  };
}

/**
 * Enthält bewusst **keine** Bank- oder Adressdaten: SMTP ist kein vertraulicher
 * Kanal, und die vollständigen Antragsdaten stehen ohnehin hinter dem Login.
 */
export function membershipApplicationNoticeMessage(application: {
  vorname: string;
  name: string;
  email: string;
  dashboardUrl: string;
}): EmailMessage {
  return {
    subject: "Neuer Antrag auf Vereinsmitgliedschaft",
    preheader: `${application.vorname} ${application.name} möchte Mitglied werden.`,
    signature: "system",
    blocks: [
      { type: "text", content: "Hallo Admin," },
      { type: "text", content: "es liegt ein neuer Antrag auf Vereinsmitgliedschaft vor:" },
      {
        type: "facts",
        items: [
          { label: "Name", value: `${application.vorname} ${application.name}` },
          { label: "E-Mail", value: application.email },
        ],
      },
      { type: "text", content: "Die vollständigen Antragsdaten inklusive Bankverbindung findest du im Dashboard:" },
      { type: "button", label: "Antrag im Dashboard öffnen", url: application.dashboardUrl },
    ],
  };
}

export function membershipReceivedMessage(applicant: Person): EmailMessage {
  return {
    subject: "Dein Antrag auf Vereinsmitgliedschaft ist eingegangen",
    preheader: "Wir haben deinen Aufnahmeantrag erhalten.",
    blocks: [
      greeting(applicant),
      { type: "text", content: `vielen Dank für deinen Antrag auf Mitgliedschaft im ${VEREIN.name}.` },
      { type: "text", content: "Über die Aufnahme entscheidet der Vorstand. Sobald darüber entschieden wurde, melden wir uns bei dir. Bis dahin ist noch keine Mitgliedschaft und damit auch keine Beitragspflicht entstanden." },
      { type: "text", content: "Den Status deines Antrags kannst du jederzeit in deinem Mitgliederbereich einsehen." },
    ],
  };
}

export function membershipApprovedMessage(params: Person & {
  aufnahmedatum: Date;
  mitgliedId: number;
}): EmailMessage {
  const datum = params.aufnahmedatum.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    subject: `Willkommen im ${VEREIN.name}`,
    preheader: "Dein Aufnahmeantrag wurde angenommen.",
    blocks: [
      greeting(params),
      { type: "text", content: `der Vorstand hat deinen Aufnahmeantrag angenommen — herzlich willkommen im ${VEREIN.name}!` },
      {
        type: "facts",
        items: [
          { label: "Aufnahmedatum", value: datum },
          { label: "Mitgliedsnummer", value: String(params.mitgliedId) },
        ],
      },
      { type: "text", content: "Deine Beiträge findest du ab sofort in deinem Mitgliederbereich. Der Einzug erfolgt per SEPA-Lastschrift von dem von dir angegebenen Konto." },
    ],
  };
}

export function membershipRejectedMessage(params: Person & { note?: string | null }): EmailMessage {
  const reason = params.note?.trim();

  return {
    subject: "Entscheidung über deinen Antrag auf Vereinsmitgliedschaft",
    preheader: "Der Vorstand hat über deinen Aufnahmeantrag entschieden.",
    blocks: [
      greeting(params),
      { type: "text", content: "der Vorstand hat deinen Aufnahmeantrag geprüft und ihm leider nicht entsprochen." },
      ...(reason
        ? ([
            { type: "heading", content: "Begründung" },
            { type: "quote", content: reason },
          ] satisfies EmailBlock[])
        : []),
      { type: "text", content: "Bei Rückfragen kannst du dich jederzeit an den Vorstand wenden. Die von dir angegebene Bankverbindung wird nicht für einen Einzug verwendet." },
    ],
  };
}

export function feeReminderMessage(params: Person & { year: number }): EmailMessage {
  return {
    subject: `Erinnerung: Mitgliedsbeitrag ${params.year}`,
    preheader: `Dein Mitgliedsbeitrag ${params.year} ist bei uns noch offen.`,
    blocks: [
      greeting(params),
      { type: "text", content: `wir möchten dich freundlich daran erinnern, dass der Mitgliedsbeitrag für das Jahr ${params.year} bei uns noch als offen geführt wird.` },
      { type: "text", content: "Bitte überweise den Beitrag zeitnah. Bei Fragen oder wenn du den Beitrag bereits gezahlt hast, melde dich gerne bei uns." },
    ],
  };
}
