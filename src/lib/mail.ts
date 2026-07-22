import { createMailTransporter } from "@/lib/server/email/mailService";
import { getSmtpConfig } from "@/lib/server/env";

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const transporter = createMailTransporter();
  const { from } = getSmtpConfig();

  await transporter.sendMail({
    from,
    to: email,
    subject: "Passwort zurücksetzen",
    text: `Hallo,\n\num Ihr Passwort zurückzusetzen, klicken Sie bitte auf den folgenden Link:\n\n${resetUrl}\n\nDieser Link ist für 30 Minuten gültig.\n\nWenn Sie diese E-Mail nicht angefordert haben, können Sie sie ignorieren.\n\nViele Grüße,\nIhr Vorstand des WirtschaftsPhysik Alumni e.V.`,
    html: `<p>Hallo,</p><p>um Ihr Passwort zurückzusetzen, klicken Sie bitte auf den folgenden Link:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>Dieser Link ist für 30 Minuten gültig.</p><p>Wenn Sie diese E-Mail nicht angefordert haben, können Sie sie ignorieren.</p><p>Viele Grüße,<br>Ihr Vorstand des WirtschaftsPhysik Alumni e.V.</p>`,
    encoding: "utf-8",
  });
}
