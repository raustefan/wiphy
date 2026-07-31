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

export async function sendAdminRegistrationNotificationEmail(adminEmails: string[], newUser: { vorname: string; name: string; email: string }) {
  if (adminEmails.length === 0) return;
  const transporter = createMailTransporter();
  const { from } = getSmtpConfig();

  await transporter.sendMail({
    from,
    to: adminEmails.join(","),
    subject: "Neuer Benutzer registriert",
    text: `Hallo Admin,\n\nein neuer Benutzer hat sich registriert und wartet auf Bestätigung:\n\nName: ${newUser.vorname} ${newUser.name}\nE-Mail: ${newUser.email}\n\nBitte prüfen und bestätigen Sie die Registrierung online im Dashboard.\n\nViele Grüße,\nIhr WirtschaftsPhysik Alumni e.V. System`,
    html: `<p>Hallo Admin,</p><p>ein neuer Benutzer hat sich registriert und wartet auf Bestätigung:</p><p><strong>Name:</strong> ${newUser.vorname} ${newUser.name}<br><strong>E-Mail:</strong> ${newUser.email}</p><p>Bitte prüfen und bestätigen Sie die Registrierung online im Dashboard.</p><p>Viele Grüße,<br>Ihr WirtschaftsPhysik Alumni e.V. System</p>`,
    encoding: "utf-8",
  });
}

export async function sendUserRegistrationConfirmationEmail(email: string, user: { vorname: string; name: string }) {
  const transporter = createMailTransporter();
  const { from } = getSmtpConfig();

  await transporter.sendMail({
    from,
    to: email,
    subject: "Registrierung erfolgreich",
    text: `Hallo ${user.vorname} ${user.name},\n\nvielen Dank für deine Registrierung beim WirtschaftsPhysik Alumni e.V.!\n\nDeine Registrierung war erfolgreich. Sobald ein Administrator dein Konto bestätigt hat, erhältst du vollen Zugriff auf den Internbereich.\n\nViele Grüße,\nDein Vereinsteam des WirtschaftsPhysik Alumni e.V.`,
    html: `<p>Hallo ${user.vorname} ${user.name},</p><p>vielen Dank für deine Registrierung beim WirtschaftsPhysik Alumni e.V.!</p><p>Deine Registrierung war erfolgreich. Sobald ein Administrator dein Konto bestätigt hat, erhältst du vollen Zugriff auf den Internbereich.</p><p>Viele Grüße,<br>Dein Vereinsteam des WirtschaftsPhysik Alumni e.V.</p>`,
    encoding: "utf-8",
  });
}
