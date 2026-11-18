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
import type { SendMailOptions } from "nodemailer";
import type { EmailBlock, EmailMessage } from "@/lib/email/blocks";
import { MAIL_TARGET_FILTERS, type GroupTarget, type MailTarget } from "@/lib/mailTargets";
import { blogImageUrl } from "@/lib/blogImages";
import { blogPostPath } from "@/lib/slug";
import { formatDate, formatEuro } from "@/lib/format";
import { eventContactPath, eventLinkLabel, eventPath, formatEventRange } from "@/lib/events";
import { siteUrl } from "@/lib/server/siteUrl";
import { buildEventIcs, icsFileName, type IcsEvent } from "@/lib/server/ics";
import { sanitizeEmailHtml } from "./sanitizeHtml";
import { htmlToText } from "./htmlToText";
import { sendEmail } from "./mailer";
import { renderEmailHtml } from "./layout";
import { getSignatureBoardLine } from "@/lib/server/services/boardService";
import { logSentMail } from "./mailHistory";
import { describeSendError, sendEach, type MailSendReport } from "./sendReport";
import { newsletterUnsubscribeUrls } from "@/lib/server/newsletterToken";

export type Recipient = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  newsletter: boolean;
};

const RECIPIENT_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  newsletter: true,
} as const;

export async function resolveUsersByIds(userIds: string[]) {
  const uniqueIds = [...new Set(userIds)];
  if (uniqueIds.length === 0) {
    throw new AppError("VALIDATION_ERROR", "Bitte mindestens einen Empfänger auswählen.");
  }

  const found = await prisma.user.findMany({
    where: { id: { in: uniqueIds } },
    select: RECIPIENT_SELECT,
  });

  if (found.length !== uniqueIds.length) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Ein oder mehrere ausgewählte Nutzer existieren nicht.",
    );
  }

  return found;
}

/** Dieselben Filter, mit denen das Formular vorzählt (`mailTargets.ts`). */
export async function resolveUsersByTarget(target: GroupTarget): Promise<Recipient[]> {
  const users = await prisma.user.findMany({
    select: { ...RECIPIENT_SELECT, status: true, directDebit: true },
  });
  return users
    .filter(MAIL_TARGET_FILTERS[target])
    .map(({ id, email, firstName, lastName, newsletter }) => ({ id, email, firstName, lastName, newsletter }));
}

export async function resolveRecipients(input: { target: MailTarget; selectedUserIds: string[] }) {
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
export function icsAttachment(event: AnnouncedEvent) {
  return {
    filename: icsFileName(event.title),
    content: buildEventIcs(event),
    contentType: "text/calendar; charset=utf-8",
  };
}

export function eventBlocks(event: AnnouncedEvent): EmailBlock[] {
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

/** Ein angekündigter Blogbeitrag: Titelbild, Vorschautext, Knopf zum Beitrag. */
export function postBlocks(post: {
  id: string;
  title: string;
  preview: string;
  cover: { id: string; alt: string } | null;
}): EmailBlock[] {
  const url = siteUrl(blogPostPath(post));
  return [
    { type: "divider" },
    { type: "heading", content: post.title },
    ...(post.cover
      ? ([{ type: "image", src: siteUrl(blogImageUrl(post.cover.id)), alt: post.cover.alt, href: url }] as EmailBlock[])
      : []),
    ...(post.preview.trim() ? ([{ type: "text", content: post.preview.trim() }] as EmailBlock[]) : []),
    { type: "button", label: "Beitrag lesen", url },
  ];
}

/** Was eine SEPA-Vorabankündigung pro Person nennt. */
export type SepaDebitInfo = { amount: number; mandateReference: string; iban: string | null };

/**
 * Die Vorabankündigung (Pre-Notification) einer Lastschrift: Betrag, Datum,
 * Mandatsreferenz und Gläubiger-ID. `info` fehlt in Vorschau und Kopie — dort
 * steht statt der persönlichen Angaben ein Hinweis.
 */
export function sepaBlocks(input: {
  info: SepaDebitInfo | null;
  /** YYYY-MM-DD */
  collectionDate: string;
  creditorId: string;
}): EmailBlock[] {
  const personal = "wird pro Person eingesetzt";
  const iban = input.info?.iban;
  const facts: { label: string; value: string }[] = [
    { label: "Betrag", value: input.info ? formatEuro(input.info.amount) : personal },
    // Mittags, damit die Zeitzone den Tag nicht verschiebt.
    { label: "Einzug am", value: formatDate(new Date(`${input.collectionDate}T12:00:00`)) },
    { label: "Mandatsreferenz", value: input.info?.mandateReference || personal },
    ...(input.creditorId ? [{ label: "Gläubiger-ID", value: input.creditorId }] : []),
    ...(input.info
      ? iban
        ? [{ label: "Konto", value: `IBAN endet auf ${iban.slice(-4)}` }]
        : []
      : [{ label: "Konto", value: personal }]),
  ];
  return [
    { type: "divider" },
    { type: "heading", content: "Dein Lastschrifteinzug" },
    { type: "facts", items: facts },
    { type: "button", label: "Bankverbindung prüfen", url: siteUrl("/dashboard/zahlungen") },
  ];
}

/** Was eine Rundmail über den Text hinaus mitbringt. */
export type MailExtras = {
  /** Anrede „Guten Tag Anna Müller,“ über dem Text. */
  salutation?: boolean;
  /** Infoblock unter dem Text (Termin, Beitrag) — für alle gleich. */
  blocks?: EmailBlock[];
  /** Persönlicher Infoblock, z. B. der SEPA-Betrag. `null` für Vorschau und Kopie. */
  personalBlocks?: (user: Recipient | null) => EmailBlock[];
  attachments?: SendMailOptions["attachments"];
};

/**
 * Die Anrede steht als Platzhalter vor dem Text: so ersetzt sie der Versand
 * wie jeden anderen pro Empfänger, und Vorschau und Kopie zeigen `$Anrede`.
 */
function withSalutation(html: string, extras: MailExtras): string {
  return extras.salutation ? `<p>$Anrede,</p>${html}` : html;
}

/** Baut aus dem sanitisierten Editor-HTML eine versandfertige Nachricht. */
function composeMessage(
  subject: string,
  html: string,
  extras: MailExtras,
  user: Recipient | null,
): EmailMessage {
  return {
    subject,
    blocks: [
      { type: "html", html, text: htmlToText(html) },
      ...(extras.blocks ?? []),
      ...(extras.personalBlocks?.(user) ?? []),
    ],
  };
}

/**
 * Die Mail, wie sie beim Empfänger ankommt — dasselbe Briefpapier, derselbe
 * Infoblock wie beim Versand. Platzhalter bleiben stehen: die Vorschau gilt
 * für alle Empfänger.
 */
export async function renderMailPreview(input: {
  subject: string;
  html: string;
  extras?: MailExtras;
  newsletter?: boolean;
}): Promise<string> {
  const extras = input.extras ?? {};
  return renderEmailHtml(
    composeMessage(input.subject, withSalutation(sanitizeEmailHtml(input.html), extras), extras, null),
    await getSignatureBoardLine(),
    // Der echte Abmeldelink ist persönlich; hier zählt nur, dass die Zeile da ist.
    input.newsletter ? "#" : undefined,
  );
}

/** Ein Newsletter erreicht nur Abonnenten; alle anderen Mails jeden. */
export function deliverableUsers<T extends { newsletter: boolean }>(users: T[], newsletter?: boolean): T[] {
  return newsletter ? users.filter((user) => user.newsletter) : users;
}

export async function sendMailToUsers(input: {
  subject: string;
  /** Rich-Text aus dem Composer. */
  html: string;
  bccToSelf: boolean;
  adminEmail?: string | null;
  users: Recipient[];
  extras?: MailExtras;
  /** Empfängergruppe fürs Versandprotokoll; weggelassen bei ausgewählten Empfängern. */
  recipientGroup?: string | null;
  /**
   * Als Newsletter gekennzeichnet: geht nur an Abonnenten, jede Mail trägt den
   * persönlichen Abmeldelink. Alle anderen Mails erreichen jeden — das
   * Abbestellen betrifft nur Newsletter.
   */
  newsletter?: boolean;
}) {
  const extras = input.extras ?? {};
  // Einmal zentral sanitisieren: entfernt Skripte, Event-Handler und unsichere
  // Link-Schemata, unabhängig davon, was der Editor clientseitig zugelassen hat.
  const template = withSalutation(sanitizeEmailHtml(input.html), extras);

  const users = deliverableUsers(input.users, input.newsletter);
  if (users.length === 0) {
    throw new AppError(
      "NOT_FOUND",
      input.users.length > 0
        ? "Alle ausgewählten Empfänger haben den Newsletter abbestellt."
        : "Keine Empfänger gefunden.",
    );
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
  const { sent, failed, error } = await sendEach(users, (user) =>
    sendEmail({
      to: user.email,
      message: composeMessage(
        replacePlaceholders(input.subject, user),
        replacePlaceholders(template, user, { escape: true }),
        extras,
        user,
      ),
      attachments: extras.attachments,
      unsubscribe: input.newsletter ? newsletterUnsubscribeUrls(user.id) : undefined,
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
        message: composeMessage(`${input.subject} (Kopie)`, template, extras, null),
        attachments: extras.attachments,
      });
    } catch (copyError) {
      console.error(copyError);
      report.copyFailed = true;
    }
  }

  return report;
}

/**
 * Testmail an den Absender selbst — mit seinen eigenen Daten eingesetzt, ohne
 * Eintrag im Versandprotokoll. Ein Newsletter bekommt den Abmeldelink, damit
 * auch der Fuß so aussieht wie beim Versand.
 */
export async function sendTestMail(input: {
  subject: string;
  html: string;
  extras?: MailExtras;
  newsletter?: boolean;
  to: Recipient;
}) {
  const extras = input.extras ?? {};
  const template = withSalutation(sanitizeEmailHtml(input.html), extras);
  await sendEmail({
    to: input.to.email,
    message: composeMessage(
      `[Test] ${replacePlaceholders(input.subject, input.to)}`,
      replacePlaceholders(template, input.to, { escape: true }),
      extras,
      input.to,
    ),
    attachments: extras.attachments,
    unsubscribe: input.newsletter ? newsletterUnsubscribeUrls(input.to.id) : undefined,
  });
}
