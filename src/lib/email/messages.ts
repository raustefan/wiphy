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
import { formatEuro } from "@/lib/format";

type Person = { firstName?: string | null; lastName?: string | null };

/** Persönliche Anrede, mit neutralem Fallback wenn kein Name bekannt ist. */
function greeting(person: Person | undefined, fallback = "Mitglied"): EmailBlock {
  const full = `${person?.firstName?.trim() ?? ""} ${person?.lastName?.trim() ?? ""}`.trim();
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

export function backupLinkMessage(url: string, minutes: number): EmailMessage {
  return {
    subject: "Dein Datenbank-Backup",
    preheader: "Einmal-Link zum Herunterladen des kompletten Backups.",
    blocks: [
      { type: "text", content: "Hallo," },
      {
        type: "text",
        content:
          "du hast im Server-Dashboard ein komplettes Datenbank-Backup angefordert. Der Link funktioniert nur einmal und nur, solange du mit deinem Konto angemeldet bist:",
      },
      { type: "button", label: "Backup herunterladen", url },
      {
        type: "text",
        content:
          "Die Datei enthält alle personenbezogenen Daten des Vereins. Bewahre sie nur verschlüsselt auf, gib sie nicht weiter und lösche sie spätestens nach 14 Tagen (DSGVO).",
      },
      {
        type: "text",
        content: `Der Link ist ${minutes} Minuten gültig. Warst du das nicht? Dann kennt jemand dein Passwort — ändere es sofort.`,
      },
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
      { type: "text", content: `dein neuer Account beim ${VEREIN.name} wurde von einem Vorstandsmitglied erstellt. Dies erfolgte vermutlich wegen des Umzugs auf unsere neue Website, die seit kurzem im Betrieb ist. Diese ist grundlegend neu gestaltet und bietet dir insbesondere eine verbesserte Mitgliederselbstverwaltung.` },
      { type: "text", content: "Du kannst dich ab sofort mit diesen Zugangsdaten anmelden:" },
      {
        type: "facts",
        items: [
          { label: "E-Mail", value: user.email },
          { label: "Passwort", value: password },
        ],
      },
      { type: "button", label: "Zur Anmeldung", url: loginUrl },
      { type: "text", content: "Wir empfehlen dringend, das Passwort zu ändern — diese E-Mail ist kein sicherer Aufbewahrungsort dafür." },
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
  firstName: string;
  lastName: string;
  email: string;
}): EmailMessage {
  return {
    subject: "Neuer Benutzer registriert",
    preheader: `${newUser.firstName} ${newUser.lastName} wartet auf Freischaltung.`,
    signature: "system",
    blocks: [
      { type: "text", content: "Hallo Admin," },
      { type: "text", content: "ein neuer Benutzer hat sich registriert und seine E-Mail-Adresse soeben bestätigt:" },
      {
        type: "facts",
        items: [
          { label: "Name", value: `${newUser.firstName} ${newUser.lastName}` },
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
  firstName: string;
  lastName: string;
  email: string;
  dashboardUrl: string;
}): EmailMessage {
  return {
    subject: "Neuer Antrag auf Vereinsmitgliedschaft",
    preheader: `${application.firstName} ${application.lastName} möchte Mitglied werden.`,
    signature: "system",
    blocks: [
      { type: "text", content: "Hallo Admin," },
      { type: "text", content: "es liegt ein neuer Antrag auf Vereinsmitgliedschaft vor:" },
      {
        type: "facts",
        items: [
          { label: "Name", value: `${application.firstName} ${application.lastName}` },
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
  joinedAt: Date;
  memberNumber: number;
}): EmailMessage {
  const datum = params.joinedAt.toLocaleDateString("de-DE", {
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
          { label: "Mitgliedsnummer", value: String(params.memberNumber) },
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

type OpenFee = { year: number; amount: number };

const openFeeFacts = (openFees: OpenFee[]): EmailBlock => ({
  type: "facts",
  items: openFees.map((fee) => ({ label: `Beitrag ${fee.year}`, value: formatEuro(fee.amount) })),
});

/**
 * Bestätigung des sofortigen Austritts an das Mitglied — zugleich der Hinweis,
 * falls jemand anderes ihn abgeschickt hat.
 */
export function exitMessage(params: Person & { openFees: OpenFee[] }): EmailMessage {
  const settled = params.openFees.length === 0;
  return {
    subject: "Bestätigung deines Austritts",
    preheader: "Deine Mitgliedschaft endet mit sofortiger Wirkung.",
    blocks: [
      greeting(params),
      { type: "text", content: `hiermit bestätigen wir deinen Austritt aus dem ${VEREIN.name}. Deine Mitgliedschaft endet mit sofortiger Wirkung.` },
      ...(settled
        ? [{ type: "text", content: "Dein Konto haben wir samt allen zugehörigen Daten gelöscht. Diese E-Mail ist die letzte, die du von uns erhältst." } as const]
        : [
            { type: "text", content: "Folgende Beiträge sind bei uns noch offen:" } as const,
            openFeeFacts(params.openFees),
            { type: "text", content: "Die Zahlungspflicht für diese Beiträge besteht trotz des Austritts weiter. Deshalb bleiben dein Konto und deine Zahlungsdaten bestehen, bis sie beglichen sind. Danach löschen wir dein Konto automatisch und vollständig." } as const,
          ]),
      { type: "text", content: "Danke, dass du dabei warst!" },
      { type: "note", content: `Bist du nicht ausgetreten? Dann melde dich bitte umgehend bei uns unter ${VEREIN.email}.` },
    ],
  };
}

/** Benachrichtigung des Vorstands über einen Austritt oder die Löschung danach. */
export function exitNoticeMessage(params: {
  firstName: string;
  lastName: string;
  email: string;
  openFees: OpenFee[];
  /** Offene Beiträge sind bezahlt, das Konto wurde gerade gelöscht. */
  settled: boolean;
}): EmailMessage {
  const name = `${params.firstName} ${params.lastName}`.trim();
  const pending = params.openFees.length > 0;
  return {
    subject: params.settled ? `Konto nach Austritt gelöscht: ${name}` : `Austritt: ${name}`,
    preheader: params.settled
      ? "Die offenen Beiträge sind bezahlt, das Konto ist gelöscht."
      : "Ein Mitglied ist mit sofortiger Wirkung ausgetreten.",
    blocks: [
      { type: "text", content: "Hallo," },
      {
        type: "text",
        content: params.settled
          ? "die offenen Beiträge eines ausgetretenen Mitglieds sind bezahlt. Das Konto wurde samt allen Daten gelöscht:"
          : "ein Mitglied ist mit sofortiger Wirkung ausgetreten:",
      },
      {
        type: "facts",
        items: [
          { label: "Name", value: name },
          { label: "Letzte E-Mail", value: params.email },
        ],
      },
      ...(pending
        ? [
            { type: "text", content: "Folgende Beiträge sind noch offen und bleiben geschuldet:" } as const,
            openFeeFacts(params.openFees),
            { type: "text", content: "Das Konto bleibt bis dahin ohne Mitgliedschaft bestehen. Sobald die Beiträge in der Benutzerverwaltung als bezahlt markiert sind, wird es automatisch gelöscht." } as const,
          ]
        : params.settled
          ? []
          : [{ type: "text", content: "Es waren keine Beiträge offen. Das Konto wurde samt allen Daten sofort gelöscht." } as const]),
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
      { type: "text", content: `dein Konto beim ${VEREIN.name} wurde samt allen zugehörigen Daten gelöscht. Diese E-Mail ist die letzte, die du von uns zu diesem Konto erhältst.` },
      { type: "note", content: `Warst du das nicht? Dann melde dich bitte bei uns unter ${VEREIN.email}.` },
    ],
  };
}
