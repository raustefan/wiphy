/**
 * Der einzige Ort, an dem diese Anwendung E-Mails verschickt.
 *
 * Jede ausgehende Mail — Passwort-Reset, Kontaktformular, Rundmail aus dem
 * Dashboard — läuft durch `sendEmail()` und bekommt damit automatisch dasselbe
 * Briefpapier, dieselbe Signatur und eine aus demselben Inhalt erzeugte
 * Textfassung. Aufrufstellen beschreiben nur noch *was* drinsteht.
 */
import nodemailer, { type Transporter } from "nodemailer";
import { getSmtpConfig } from "@/lib/server/env";
import type { EmailMessage } from "@/lib/email/blocks";
import { renderEmailHtml, renderEmailText } from "./layout";

let cachedTransporter: Transporter | null = null;

/** Wiederverwendet die SMTP-Verbindung; `getSmtpConfig()` prüft die Konfiguration. */
export function getMailTransporter(): Transporter {
  cachedTransporter ??= nodemailer.createTransport(getSmtpConfig().transport);
  return cachedTransporter;
}

type Recipients = {
  to?: string | string[];
  /** Verteilerlisten gehören ins BCC, damit die Adressen nicht sichtbar werden. */
  bcc?: string | string[];
  /**
   * Antwortadresse. Nötig z. B. beim Kontaktformular: die Adresse des Besuchers
   * darf nicht als `From` dienen, das würde unser SPF/DKIM/DMARC brechen.
   */
  replyTo?: string;
};

function normalize(value: string | string[] | undefined): string | undefined {
  const list = (Array.isArray(value) ? value : value ? [value] : [])
    .map((address) => address.trim())
    .filter((address) => address.length > 0);
  return list.length > 0 ? [...new Set(list)].join(",") : undefined;
}

export async function sendEmail(input: Recipients & { message: EmailMessage }): Promise<void> {
  const to = normalize(input.to);
  const bcc = normalize(input.bcc);
  // Ohne Empfänger gibt es nichts zu tun — etwa wenn keine Admin-Adresse
  // hinterlegt ist. Das ist kein Fehler, der den Aufrufer scheitern lassen soll.
  if (!to && !bcc) return;

  const { from } = getSmtpConfig();

  await getMailTransporter().sendMail({
    from,
    to,
    bcc,
    replyTo: input.replyTo,
    subject: input.message.subject,
    text: renderEmailText(input.message),
    html: renderEmailHtml(input.message),
    encoding: "utf-8",
  });
}
