/**
 * Einzelversand einer Rundmail mit Bericht: wer sie bekommen hat, wer nicht,
 * und warum.
 *
 * Ohne Datenbank- oder SMTP-Abhängigkeit, damit sich die Abbruchregel testen
 * lässt — der eigentliche Versand kommt als Funktion herein.
 */
import { AppError } from "@/lib/server/errors";

/** Was beim Absender ankommt, wenn mindestens eine Mail rausging. */
export type MailSendReport = {
  sent: number;
  /** Nicht erreichte Empfänger — nach einem Abbruch auch alle, die noch ausstanden. */
  failed: { name: string; email: string }[];
  /** Warum es (zuletzt) nicht geklappt hat; nur gesetzt, wenn `failed` nicht leer ist. */
  reason?: string;
  /** Die Kopie an den Absender ließ sich nicht verschicken. */
  copyFailed?: boolean;
};

type SmtpError = { code?: string; responseCode?: number; response?: string };

/** Übersetzt einen nodemailer-Fehler in einen Satz, mit dem der Vorstand etwas anfangen kann. */
export function describeSendError(error: unknown): string {
  if (error instanceof AppError) return error.message;
  const { code, responseCode, response = "" } = (error ?? {}) as SmtpError;
  if (code === "EAUTH" && responseCode === 454) {
    return "Der Mailserver blockiert gerade wegen zu vieler Anmeldeversuche. Bitte in etwa einer Stunde erneut versuchen.";
  }
  if (code === "EAUTH") return "Die Anmeldung beim Mailserver ist fehlgeschlagen.";
  if (code === "EENVELOPE") return "Der Mailserver hat die Empfängeradresse abgelehnt.";
  if (/limit/i.test(response)) return "Das Versandlimit des Mailkontos ist erreicht. Bitte morgen erneut versuchen.";
  if (code === "ECONNECTION" || code === "ETIMEDOUT" || code === "ESOCKET" || code === "EDNS") {
    return "Der Mailserver ist nicht erreichbar.";
  }
  if (responseCode) return `Der Mailserver hat den Versand abgelehnt (Code ${responseCode}).`;
  return "Unbekannter Fehler beim Versand.";
}

/**
 * Schickt nacheinander an jeden Empfänger. Eine abgelehnte Adresse betrifft
 * nur diesen einen — Anmeldung, Verbindung oder Versandlimit scheitern bei
 * allen weiteren genauso, also wird dann abgebrochen, statt den Mailserver
 * noch hundertmal anzuklopfen.
 */
export async function sendEach<T>(
  users: T[],
  send: (user: T) => Promise<void>,
): Promise<{ sent: T[]; failed: T[]; error?: unknown }> {
  const sent: T[] = [];
  const failed: T[] = [];
  let error: unknown;
  for (const [index, user] of users.entries()) {
    try {
      await send(user);
      sent.push(user);
    } catch (thrown) {
      console.error(thrown);
      error = thrown;
      if ((thrown as SmtpError | null)?.code === "EENVELOPE") {
        failed.push(user);
        continue;
      }
      failed.push(...users.slice(index));
      break;
    }
  }
  return { sent, failed, error };
}
