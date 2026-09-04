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
import type { EmailMessage } from "@/lib/email/blocks";
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
 * Ersetzt $Vorname/$Nachname/$Name durch die Daten des Empfängers.
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

  return template
    .replace(/\$Vorname/g, vorname)
    .replace(/\$Nachname/g, nachname)
    .replace(/\$Name/g, full);
}

/** Baut aus dem sanitisierten Editor-HTML eine versandfertige Nachricht. */
function composeMessage(subject: string, html: string): EmailMessage {
  return {
    subject,
    blocks: [{ type: "html", html, text: htmlToText(html) }],
  };
}

export async function sendMailToUsers(input: {
  subject: string;
  /** Rich-Text aus dem Composer. */
  html: string;
  bccToSelf: boolean;
  adminEmail?: string | null;
  users: Recipient[];
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
      message: composeMessage(`${input.subject} (Kopie)`, template),
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
  });
}
