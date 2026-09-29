/**
 * Versandprotokoll der Dashboard-Mails.
 *
 * Beantwortet „ist die Einladung schon raus?“, ohne Inhalte zu speichern:
 * Betreff, Zeitpunkt und Empfänger. Eine Adresse steht nur bei Mails an genau
 * eine ausgewählte Person drin — bei Rundmails genügen Gruppe und Anzahl.
 */
import { prisma } from "@/lib/prisma";
import { sentMailRecord, type SentMailInput } from "@/lib/email/sentMailRecord";

/** Nach einem Jahr verschwindet der Eintrag (Art. 5 Abs. 1 lit. e DSGVO). */
export const SENT_MAIL_RETENTION_DAYS = 365;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Schreibt einen Eintrag und räumt dabei abgelaufene weg. Fehler werden
 * geloggt und verschluckt: die Mails sind zu diesem Zeitpunkt schon raus, der
 * Admin soll deshalb keinen Fehlschlag gemeldet bekommen.
 */
export async function logSentMail(input: SentMailInput) {
  try {
    await prisma.sentMail.create({ data: sentMailRecord(input) });
    await prisma.sentMail.deleteMany({
      where: { createdAt: { lt: new Date(Date.now() - SENT_MAIL_RETENTION_DAYS * DAY_MS) } },
    });
  } catch (error) {
    console.error("Failed to write mail history:", error);
  }
}

export function getSentMails(limit = 50) {
  return prisma.sentMail.findMany({ orderBy: { createdAt: "desc" }, take: limit });
}
