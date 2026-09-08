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
import { eventContactPath, eventPath, formatEventRange, type EventTiming } from "@/lib/events";
import { siteUrl } from "@/lib/server/siteUrl";
import { sanitizeEmailHtml } from "./sanitizeHtml";
import { htmlToText } from "./htmlToText";
import { sendEmail } from "./mailer";

type StatusTarget = "EHRENMITGLIED" | "ORDENTLICHES_MITGLIED" | "KEIN_MITGLIED";
export type MailTarget = "ALL" | StatusTarget | "SELECTED";

type Recipient = { email: string; vorname: string | null; name: string | null };

export async function resolveUsersByIds(userIds: string[]) {
  const uniqueIds = [...new Set(userIds)];
  if (uniqueIds.length === 0) {
    throw new AppError("VALIDATION_ERROR", "Bitte mindestens einen Empfänger auswählen.");
  }

  const found = await prisma.user.findMany({
    where: { id: { in: uniqueIds } },
    select: { id: true, email: true, vorname: true, name: true },
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
    return prisma.user.findMany({ select: { email: true, vorname: true, name: true } });
  }
  return prisma.user.findMany({
    where: { status: target },
    select: { email: true, vorname: true, name: true },
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
function greeting(user: { vorname: string | null; name: string | null }): string {
  const full = `${user.vorname || ""} ${user.name || ""}`.trim();
  return full ? `Guten Tag ${full}` : "Guten Tag";
}

/**
 * Ersetzt $Anrede/$Vorname/$Nachname/$Name durch die Daten des Empfängers.
 * `escape: true` maskiert die Werte vorher — zwingend, sobald das Ergebnis als
 * HTML verschickt wird, da Namen beliebige Nutzereingaben sind.
 */
function replacePlaceholders(
  template: string,
  user: { vorname: string | null; name: string | null },
  options: { escape?: boolean } = {},
): string {
  const wrap = options.escape ? escapeHtml : (v: string) => v;
  const vorname = wrap(user.vorname || "");
  const nachname = wrap(user.name || "");
  const full = wrap(`${user.vorname || ""} ${user.name || ""}`.trim());
  const anrede = wrap(greeting(user));

  return template
    .replace(/\$Anrede/g, anrede)
    .replace(/\$Vorname/g, vorname)
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
export type AnnouncedEvent = EventTiming & {
  id: string;
  title: string;
  summary: string;
  location: string;
  address: string;
  onlineUrl: string;
};

function eventBlocks(event: AnnouncedEvent): EmailBlock[] {
  const place = [event.location.trim(), event.address.trim()].filter(Boolean).join(", ");
  const facts: { label: string; value: string; href?: string }[] = [
    { label: "Wann", value: formatEventRange(event) },
  ];
  if (place) facts.push({ label: "Wo", value: place });
  if (event.onlineUrl.trim()) {
    facts.push({ label: "Online", value: event.onlineUrl.trim(), href: event.onlineUrl.trim() });
  }

  return [
    { type: "divider" },
    { type: "heading", content: event.title },
    ...(event.summary.trim() ? ([{ type: "text", content: event.summary.trim() }] as EmailBlock[]) : []),
    { type: "facts", items: facts },
    {
      type: "button",
      label: "Termin ansehen & in den Kalender eintragen",
      url: siteUrl(eventPath(event.id)),
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
}) {
  // Einmal zentral sanitisieren: entfernt Skripte, Event-Handler und unsichere
  // Link-Schemata, unabhängig davon, was der Editor clientseitig zugelassen hat.
  const template = sanitizeEmailHtml(input.html);

  if (input.users.length === 0) {
    throw new AppError("NOT_FOUND", "Keine Empfänger gefunden.");
  }

  // Einzelversand statt BCC, damit die Anrede pro Empfänger stimmt.
  for (const user of input.users) {
    await sendEmail({
      to: user.email,
      message: composeMessage(
        replacePlaceholders(input.subject, user),
        replacePlaceholders(template, user, { escape: true }),
        input.event,
      ),
    });
  }

  if (input.bccToSelf) {
    const selfEmail = input.adminEmail?.trim();
    if (!selfEmail) {
      throw new AppError(
        "VALIDATION_ERROR",
        "Keine E-Mail in der Session. Bitte neu einloggen oder 'Kopie an mich' deaktivieren.",
      );
    }
    await sendEmail({
      to: selfEmail,
      message: composeMessage(`${input.subject} (Kopie)`, template, input.event),
    });
  }
}

export async function sendMailForTarget(input: {
  target: MailTarget;
  selectedUserIds: string[];
  subject: string;
  html: string;
  bccToSelf: boolean;
  adminEmail?: string | null;
  event?: AnnouncedEvent;
}) {
  const users = await resolveRecipientEmails({
    target: input.target,
    selectedUserIds: input.selectedUserIds,
  });
  await sendMailToUsers({
    subject: input.subject,
    html: input.html,
    bccToSelf: input.bccToSelf,
    adminEmail: input.adminEmail,
    users,
    event: input.event,
  });
}
