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
import { formatDate, formatDateTime } from "@/lib/format";

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

/**
 * Hinweis nach jeder Passwortänderung. Der einfachste Weg, eine Kontoübernahme
 * zu bemerken: wer das nicht selbst war, erfährt es sofort.
 */
export function passwordChangedNoticeMessage(): EmailMessage {
  return {
    subject: "Dein Passwort wurde geändert",
    preheader: "Das Passwort deines Kontos wurde soeben neu gesetzt.",
    blocks: [
      { type: "text", content: "Hallo," },
      { type: "text", content: "das Passwort deines Kontos wurde soeben geändert. Alle bestehenden Anmeldungen wurden dabei beendet." },
      { type: "note", content: `Warst du das nicht? Dann setze dein Passwort sofort über „Passwort vergessen“ neu und melde dich bei uns unter ${VEREIN.email}.` },
    ],
  };
}

/**
 * Geht an die *alte* Adresse, sobald die neue bestätigt ist. Wer ein Konto
 * übernommen hat, kontrolliert die neue Adresse — die alte ist der einzige
 * Kanal, über den der eigentliche Inhaber noch davon erfährt.
 */
export function emailChangedNoticeMessage(newEmail: string): EmailMessage {
  return {
    subject: "Deine E-Mail-Adresse wurde geändert",
    preheader: "Dein Konto ist jetzt mit einer neuen E-Mail-Adresse verknüpft.",
    blocks: [
      { type: "text", content: "Hallo," },
      { type: "text", content: `dein Konto ist ab sofort mit der Adresse ${newEmail} verknüpft. An diese Adresse gehen keine weiteren Nachrichten zu deinem Konto.` },
      { type: "note", content: `Warst du das nicht? Dann melde dich bitte umgehend bei uns unter ${VEREIN.email}.` },
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
      { type: "note", content: "Der Link ist 24 Stunden gültig. Bleibt die Bestätigung aus, löschen wir das angelegte Konto danach automatisch wieder — du kannst dich dann jederzeit neu registrieren." },
    ],
  };
}

/**
 * Das Passwort steht hier im Klartext, weil der Admin es so will (Übernahme aus
 * dem alten System). SMTP ist kein vertraulicher Kanal — deshalb die
 * ausdrückliche Aufforderung, es sofort zu ändern.
 */
export function adminCreatedUserMessage(
  user: Person & { email: string },
  loginUrl: string,
  password: string,
): EmailMessage {
  return {
    subject: `Dein Account beim ${VEREIN.name} wurde erstellt`,
    preheader: "Deine Zugangsdaten für den Internbereich.",
    blocks: [
      greeting(user),
      { type: "text", content: `dein Account beim ${VEREIN.name} wurde von einem Vorstandsmitglied erstellt (vermutlich wegen des Umzugs auf unsere neue Website).` },
      { type: "text", content: "Du kannst dich ab sofort mit diesen Zugangsdaten anmelden:" },
      {
        type: "facts",
        items: [
          { label: "E-Mail", value: user.email },
          { label: "Passwort", value: password },
        ],
      },
      { type: "button", label: "Zur Anmeldung", url: loginUrl },
      { type: "text", content: "Wir empfehlen dringend, das Passwort nach der ersten Anmeldung im Internbereich zu ändern — diese E-Mail ist kein sicherer Aufbewahrungsort dafür." },
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
    preheader: `${newUser.vorname} ${newUser.name} wartet auf Freischaltung.`,
    signature: "system",
    blocks: [
      { type: "text", content: "Hallo Admin," },
      { type: "text", content: "ein neuer Benutzer hat sich registriert und seine E-Mail-Adresse soeben bestätigt:" },
      {
        type: "facts",
        items: [
          { label: "Name", value: `${newUser.vorname} ${newUser.name}` },
          { label: "E-Mail", value: newUser.email },
        ],
      },
      { type: "text", content: "Damit ist der Nutzer noch kein Mitglied im Verein. Hierzu muss der Nutzer selbstständig einen Antrag auf Mitgliedschaft in seinem Dashboard stellen." },
      { type: "note", content: "Die Mail Adresse des Nutzers wurde bereits bestätigt." },
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
      { type: "text", content: "Deine Beiträge findest du ab sofort in deinem Mitgliederbereich." },
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

/**
 * Eingangsbestätigung der Austrittserklärung. Dokumentiert den Zugang, auf den
 * es für die Frist ankommt — und ist zugleich der Hinweis, falls jemand anderes
 * die Kündigung abgeschickt hat.
 */
export function terminationReceivedMessage(params: Person & {
  submittedAt: Date;
  effectiveAt: Date;
  keepAccount: boolean;
}): EmailMessage {
  return {
    subject: "Deine Kündigung ist eingegangen",
    preheader: `Austritt zum ${formatDate(params.effectiveAt)}.`,
    blocks: [
      greeting(params),
      { type: "text", content: `deine Austrittserklärung aus dem ${VEREIN.name} ist bei uns eingegangen.` },
      {
        type: "facts",
        items: [
          { label: "Eingegangen am", value: formatDateTime(params.submittedAt) },
          { label: "Mitglied bis einschließlich", value: formatDate(params.effectiveAt) },
          { label: "Konto danach", value: params.keepAccount ? "bleibt ohne Mitgliedschaft bestehen" : "Login wird gesperrt" },
        ],
      },
      { type: "text", content: "Der Vorstand bestätigt den Austritt in Kürze. Bis zum Austrittsdatum bleibst du Mitglied mit allen Rechten und Pflichten." },
      { type: "note", content: `Hast du nicht gekündigt? Dann melde dich bitte umgehend bei uns unter ${VEREIN.email}.` },
    ],
  };
}

export function terminationNoticeMessage(params: {
  vorname: string;
  name: string;
  email: string;
  mitgliedId: number | null;
  submittedAt: Date;
  effectiveAt: Date;
  dashboardUrl: string;
}): EmailMessage {
  return {
    subject: `Austrittserklärung: ${params.vorname} ${params.name}`,
    preheader: "Ein Mitglied hat die Mitgliedschaft gekündigt.",
    blocks: [
      { type: "text", content: "Hallo," },
      { type: "text", content: "ein Mitglied hat den Austritt aus dem Verein erklärt:" },
      {
        type: "facts",
        items: [
          { label: "Name", value: `${params.vorname} ${params.name}` },
          { label: "E-Mail", value: params.email },
          { label: "Mitgliedsnummer", value: params.mitgliedId != null ? String(params.mitgliedId) : "—" },
          { label: "Eingegangen am", value: formatDateTime(params.submittedAt) },
          { label: "Austritt zum", value: formatDate(params.effectiveAt) },
        ],
      },
      { type: "text", content: "Bitte bestätige den Austritt im Dashboard:" },
      { type: "button", label: "Austritte im Dashboard öffnen", url: params.dashboardUrl },
    ],
  };
}

export function terminationConfirmedMessage(params: Person & {
  effectiveAt: Date;
  keepAccount: boolean;
}): EmailMessage {
  return {
    subject: "Bestätigung deines Austritts",
    preheader: `Deine Mitgliedschaft endet mit Ablauf des ${formatDate(params.effectiveAt)}.`,
    blocks: [
      greeting(params),
      { type: "text", content: `hiermit bestätigen wir deinen Austritt aus dem ${VEREIN.name}. Deine Mitgliedschaft endet mit Ablauf des ${formatDate(params.effectiveAt)}.` },
      {
        type: "text",
        content: params.keepAccount
          ? "Dein Konto bleibt danach als Konto ohne Mitgliedschaft bestehen. Du kannst es jederzeit selbst vollständig löschen."
          : "Danach wird dein Login gesperrt. Deine Daten bewahren wir nur so lange auf, wie es für die Abwicklung offener Beiträge und gesetzliche Aufbewahrungspflichten nötig ist.",
      },
      { type: "text", content: "Danke, dass du dabei warst!" },
    ],
  };
}

export function loginDisabledMessage(params: Person): EmailMessage {
  return {
    subject: "Dein Zugang wurde deaktiviert",
    preheader: "Deine Mitgliedschaft besteht weiter.",
    blocks: [
      greeting(params),
      { type: "text", content: "wie gewünscht haben wir deinen Zugang zum Mitgliederbereich deaktiviert. Alle Anmeldungen wurden beendet." },
      { type: "text", content: "Deine Mitgliedschaft besteht unverändert weiter; der Vorstand erreicht dich wie bisher per E-Mail oder Post. Möchtest du den Zugang wieder nutzen, genügt eine Nachricht an den Vorstand." },
      { type: "note", content: `Warst du das nicht? Dann melde dich bitte umgehend bei uns unter ${VEREIN.email}.` },
    ],
  };
}

export function accountDeletedMessage(params: Person): EmailMessage {
  return {
    subject: "Dein Konto wurde gelöscht",
    preheader: "Dein Konto und alle zugehörigen Daten wurden entfernt.",
    blocks: [
      greeting(params),
      { type: "text", content: `dein Konto beim ${VEREIN.name} wurde samt allen zugehörigen Daten gelöscht. Nur eventuelle Beitragsbuchungen bewahren wir wegen der steuerlichen Aufbewahrungspflicht gesperrt auf. Diese E-Mail ist die letzte, die du von uns zu diesem Konto erhältst.` },
      { type: "note", content: `Warst du das nicht? Dann melde dich bitte bei uns unter ${VEREIN.email}.` },
    ],
  };
}
