/**
 * Rundmails aus dem Dashboard: Empfänger auflösen, Platzhalter ersetzen,
 * versenden.
 *
 * Der eigentliche Versand läuft — wie bei jeder anderen Mail — über
 * `sendEmail()`; der im Editor verfasste Text wird dafür als `html`-Block in
 * dasselbe Briefpapier gesetzt.
 */
import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/server/errors";
import { escapeHtml } from "@/lib/email/escapeHtml";
import type { EmailBlock, EmailMessage } from "@/lib/email/blocks";
import { eventContactPath, eventLinkLabel, eventPath, formatEventRange } from "@/lib/events";
import { siteUrl } from "@/lib/server/siteUrl";
import { buildEventIcs, icsFileName, type IcsEvent } from "@/lib/server/ics";
import { sanitizeEmailHtml } from "./sanitizeHtml";
import { htmlToText } from "./htmlToText";
import { sendEmail } from "./mailer";
import { logSentMail } from "./mailHistory";
import { describeSendError, sendEach, type MailSendReport } from "./sendReport";

type StatusTarget = "HONORARY_MEMBER" | "REGULAR_MEMBER" | "NON_MEMBER";
export type MailTarget = "ALL" | StatusTarget | "SELECTED";

type Recipient = { email: string; firstName: string | null; lastName: string | null };

export async function resolveUsersByIds(userIds: string[]) {
  const uniqueIds = [...new Set(userIds)];
  if (uniqueIds.length === 0) {
    throw new AppError("VALIDATION_ERROR", "Bitte mindestens einen Empfänger auswählen.");
  }

  const found = await prisma.user.findMany({
    where: { id: { in: uniqueIds } },
    select: { id: true, email: true, firstName: true, lastName: true },
  });

  if (found.length !== uniqueIds.length) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Ein oder mehrere ausgewählte Nutzer existieren nicht.",
    );
  }

  return found;
}

export async function resolveUsersByTarget(target: "ALL" | StatusTarget) {
  if (target === "ALL") {
    return prisma.user.findMany({ select: { email: true, firstName: true, lastName: true } });
  }
  return prisma.user.findMany({
    where: { status: target },
    select: { email: true, firstName: true, lastName: true },
  });
}

export async function resolveRecipientEmails(input: {
  target: MailTarget;
  selectedUserIds: string[];
}) {
  if (input.target === "SELECTED") {
    return resolveUsersByIds(input.selectedUserIds);
  }
  return resolveUsersByTarget(input.target);
}

/**
 * Persönliche Anrede eines Empfängers.
 *
 * Bewusst geschlechtsneutral: der Verein speichert keine Geschlechtsangabe, und
 * eine neue personenbezogene Angabe nur für die Briefformel wäre die falsche
 * Reihenfolge. Ohne hinterlegten Namen bleibt es beim schlichten „Guten Tag“ —
 * besser als eine Anrede mit einer Leerstelle darin.
 */
function greeting(user: { firstName: string | null; lastName: string | null }): string {
  const full = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  return full ? `Guten Tag ${full}` : "Guten Tag";
}

/**
 * Ersetzt $Anrede/$Vorname/$Nachname/$Name durch die Daten des Empfängers.
 * `escape: true` maskiert die Werte vorher — zwingend, sobald das Ergebnis als
 * HTML verschickt wird, da Namen beliebige Nutzereingaben sind.
 */
function replacePlaceholders(
  template: string,
  user: { firstName: string | null; lastName: string | null },
  options: { escape?: boolean } = {},
): string {
  const wrap = options.escape ? escapeHtml : (v: string) => v;
  const firstName = wrap(user.firstName || "");
  const nachname = wrap(user.lastName || "");
  const full = wrap(`${user.firstName || ""} ${user.lastName || ""}`.trim());
  const anrede = wrap(greeting(user));

  return template
    .replace(/\$Anrede/g, anrede)
    .replace(/\$Vorname/g, firstName)
    .replace(/\$Nachname/g, nachname)
    .replace(/\$Name/g, full);
}

/**
 * Der Termin, den eine Ankündigung anhängt.
 *
 * Der Block entsteht hier und nicht im Editor: als Bausteine gerendert bekommt
 * er denselben Knopf, dieselbe Faktenliste und dieselbe Textfassung wie jede
 * andere Systemmail — und der Absender kann ihn nicht versehentlich
 * zerschreiben.
 */
export type AnnouncedEvent = IcsEvent;

/** Dieselbe Datei, die `/termine/<id>/kalender.ics` öffentlich ausliefert. */
function icsAttachment(event: AnnouncedEvent) {
  return {
    filename: icsFileName(event.title),
    content: buildEventIcs(event),
    contentType: "text/calendar; charset=utf-8",
  };
}

function eventBlocks(event: AnnouncedEvent): EmailBlock[] {
  const place = [event.location.trim(), event.address.trim()].filter(Boolean).join(", ");
  const facts: { label: string; value: string; href?: string }[] = [
    { label: "Wann", value: formatEventRange(event) },
  ];
  if (place) facts.push({ label: "Wo", value: place });
  if (event.linkUrl.trim()) {
    facts.push({ label: "Link", value: eventLinkLabel(event), href: event.linkUrl.trim() });
  }

  return [
    { type: "divider" },
    { type: "heading", content: event.title },
    ...(event.summary.trim() ? ([{ type: "text", content: event.summary.trim() }] as EmailBlock[]) : []),
    { type: "facts", items: facts },
    {
      type: "button",
      label: "Termin ansehen & in den Kalender eintragen",
      url: siteUrl(eventPath(event)),
    },
    {
      type: "note",
      content: `Fragen zum Termin? Schreib uns über das Kontaktformular: ${siteUrl(eventContactPath(event.title))}`,
    },
  ];
}

/** Baut aus dem sanitisierten Editor-HTML eine versandfertige Nachricht. */
function composeMessage(subject: string, html: string, event?: AnnouncedEvent): EmailMessage {
  return {
    subject,
    blocks: [
      { type: "html", html, text: htmlToText(html) },
      ...(event ? eventBlocks(event) : []),
    ],
  };
}

export async function sendMailToUsers(input: {
  subject: string;
  /** Rich-Text aus dem Composer. */
  html: string;
  bccToSelf: boolean;
  adminEmail?: string | null;
  users: Recipient[];
  /** Gesetzt bei einer Terminankündigung — hängt den Terminblock an. */
  event?: AnnouncedEvent;
  /** Nur mit `event`: die Kalenderdatei des Termins als Anhang. */
  attachIcs?: boolean;
  /** Empfängergruppe fürs Versandprotokoll; weggelassen bei ausgewählten Empfängern. */
  recipientGroup?: string | null;
}) {
  // Einmal zentral sanitisieren: entfernt Skripte, Event-Handler und unsichere
  // Link-Schemata, unabhängig davon, was der Editor clientseitig zugelassen hat.
  const template = sanitizeEmailHtml(input.html);

  if (input.users.length === 0) {
    throw new AppError("NOT_FOUND", "Keine Empfänger gefunden.");
  }

  // Vor dem Versand prüfen: ein Fehler danach sähe aus wie ein gescheiterter
  // Versand und lüde dazu ein, alles noch einmal zu schicken.
  const selfEmail = input.adminEmail?.trim();
  if (input.bccToSelf && !selfEmail) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Keine E-Mail in der Session. Bitte neu einloggen oder 'Kopie an mich' deaktivieren.",
    );
  }

  // Einzelversand statt BCC, damit die Anrede pro Empfänger stimmt.
  // Protokolliert wird, was tatsächlich rausging — auch wenn der Versand
  // mittendrin abbricht.
  const attachments = input.event && input.attachIcs ? [icsAttachment(input.event)] : undefined;
  const { sent, failed, error } = await sendEach(input.users, (user) =>
    sendEmail({
      to: user.email,
      message: composeMessage(
        replacePlaceholders(input.subject, user),
        replacePlaceholders(template, user, { escape: true }),
        input.event,
      ),
      attachments,
    }),
  );

  if (sent.length === 0) {
    // Ein abgeschaltetes Feature behält seinen Code, damit der Client den Dialog zeigt.
    if (error instanceof AppError) throw error;
    throw new AppError("INTERNAL_ERROR", `Es wurde keine E-Mail verschickt. ${describeSendError(error)}`);
  }

  await logSentMail({
    subject: input.subject,
    recipientGroup: input.recipientGroup ?? null,
    recipients: sent,
  });

  const report: MailSendReport = {
    sent: sent.length,
    failed: failed.map((user) => ({
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: user.email,
    })),
    reason: failed.length > 0 ? describeSendError(error) : undefined,
  };

  if (input.bccToSelf && selfEmail) {
    try {
      await sendEmail({
        to: selfEmail,
        message: composeMessage(`${input.subject} (Kopie)`, template, input.event),
        attachments,
      });
    } catch (copyError) {
      console.error(copyError);
      report.copyFailed = true;
    }
  }

  return report;
}

export async function sendMailForTarget(input: {
  target: MailTarget;
  selectedUserIds: string[];
  subject: string;
  html: string;
  bccToSelf: boolean;
  adminEmail?: string | null;
  event?: AnnouncedEvent;
  attachIcs?: boolean;
}) {
  const users = await resolveRecipientEmails({
    target: input.target,
    selectedUserIds: input.selectedUserIds,
  });
  return sendMailToUsers({
    subject: input.subject,
    html: input.html,
    bccToSelf: input.bccToSelf,
    adminEmail: input.adminEmail,
    users,
    event: input.event,
    attachIcs: input.attachIcs,
    recipientGroup: input.target === "SELECTED" ? null : input.target,
  });
}
