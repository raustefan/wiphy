import { createMailTransporter } from "@/lib/server/email/mailService";
import { getSmtpConfig } from "@/lib/server/env";
import { escapeHtml } from "@/lib/server/email/sanitizeHtml";

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

  // vorname/name/email are member-supplied at registration and must be escaped before landing in HTML.
  const vorname = escapeHtml(newUser.vorname);
  const name = escapeHtml(newUser.name);
  const email = escapeHtml(newUser.email);

  await transporter.sendMail({
    from,
    to: adminEmails.join(","),
    subject: "Neuer Benutzer registriert",
    text: `Hallo Admin,\n\nein neuer Benutzer hat sich registriert und wartet auf Bestätigung:\n\nName: ${newUser.vorname} ${newUser.name}\nE-Mail: ${newUser.email}\n\nBitte prüfen und bestätigen Sie die Registrierung online im Dashboard.\n\nViele Grüße,\nIhr WirtschaftsPhysik Alumni e.V. System`,
    html: `<p>Hallo Admin,</p><p>ein neuer Benutzer hat sich registriert und wartet auf Bestätigung:</p><p><strong>Name:</strong> ${vorname} ${name}<br><strong>E-Mail:</strong> ${email}</p><p>Bitte prüfen und bestätigen Sie die Registrierung online im Dashboard.</p><p>Viele Grüße,<br>Ihr WirtschaftsPhysik Alumni e.V. System</p>`,
    encoding: "utf-8",
  });
}

export async function sendUserRegistrationConfirmationEmail(email: string, verificationUrl: string, user: { vorname: string; name: string }) {
  const transporter = createMailTransporter();
  const { from } = getSmtpConfig();

  const vorname = escapeHtml(user.vorname);
  const name = escapeHtml(user.name);

  await transporter.sendMail({
    from,
    to: email,
    subject: "Registrierung erfolgreich - Bitte E-Mail bestätigen",
    text: `Hallo ${user.vorname} ${user.name},\n\nvielen Dank für deine Registrierung beim WirtschaftsPhysik Alumni e.V.!\n\nDeine Registrierung war erfolgreich. Bitte bestätige deine E-Mail-Adresse, indem du auf den folgenden Link klickst:\n\n${verificationUrl}\n\nDieser Link ist für 24 Stunden gültig.\n\nSobald ein Administrator dein Konto bestätigt hat und du deine E-Mail-Adresse verifiziert hast, erhältst du vollen Zugriff auf den Internbereich.\n\nViele Grüße,\nDein Vereinsteam des WirtschaftsPhysik Alumni e.V.`,
    html: `<p>Hallo ${vorname} ${name},</p><p>vielen Dank für deine Registrierung beim WirtschaftsPhysik Alumni e.V.!</p><p>Deine Registrierung war erfolgreich. Bitte bestätige deine E-Mail-Adresse, indem du auf den folgenden Link klickst:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p><p>Dieser Link ist für 24 Stunden gültig.</p><p>Sobald ein Administrator dein Konto bestätigt hat und du deine E-Mail-Adresse verifiziert hast, erhältst du vollen Zugriff auf den Internbereich.</p><p>Viele Grüße,<br>Dein Vereinsteam des WirtschaftsPhysik Alumni e.V.</p>`,
    encoding: "utf-8",
  });
}

export async function sendEmailChangeEmail(email: string, verificationUrl: string) {
  const transporter = createMailTransporter();
  const { from } = getSmtpConfig();

  await transporter.sendMail({
    from,
    to: email,
    subject: "E-Mail-Adresse ändern",
    text: `Hallo,\n\num deine E-Mail-Adresse zu bestätigen, klicke bitte auf den folgenden Link:\n\n${verificationUrl}\n\nDieser Link ist für 30 Minuten gültig.\n\nWenn du diese E-Mail nicht angefordert hast, kannst du sie ignorieren.\n\nViele Grüße,\nIhr Vorstand des WirtschaftsPhysik Alumni e.V.`,
    html: `<p>Hallo,</p><p>um deine E-Mail-Adresse zu bestätigen, klicke bitte auf den folgenden Link:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p><p>Dieser Link ist für 30 Minuten gültig.</p><p>Wenn du diese E-Mail nicht angefordert hast, kannst du sie ignorieren.</p><p>Viele Grüße,<br>Ihr Vorstand des WirtschaftsPhysik Alumni e.V.</p>`,
    encoding: "utf-8",
  });
}

export async function sendAdminCreatedUserEmail(email: string, verificationUrl: string, user: { vorname: string; name: string }) {
  const transporter = createMailTransporter();
  const { from } = getSmtpConfig();

  const vorname = escapeHtml(user.vorname);
  const name = escapeHtml(user.name);

  await transporter.sendMail({
    from,
    to: email,
    subject: "Dein Account beim WirtschaftsPhysik Alumni e.V. wurde erstellt",
    text: `Hallo ${user.vorname} ${user.name},\n\ndein Account beim WirtschaftsPhysik Alumni e.V. wurde von einem Vorstandsmitglied erstellt (vermutlich wegen des Umzugs auf unsere neue Website).\n\nBitte bestätige deine E-Mail-Adresse, indem du auf den folgenden Link klickst:\n\n${verificationUrl}\n\nDanach kannst du dich mit deiner E-Mail-Adresse anmelden. Es empfiehlt sich dringend, dich danach anzumelden und dein Passwort über das Portal zu ändern.\n\nViele Grüße,\nDein Vereinsteam des WirtschaftsPhysik Alumni e.V. \nPS: Falls du die Frist versäumst, kann auch ein Administrator dein Konto aktivieren.`,
    html: `<p>Hallo ${vorname} ${name},</p><p>dein Account beim WirtschaftsPhysik Alumni e.V. wurde von einem Vorstandsmitglied erstellt (vermutlich wegen des Umzugs auf unsere neue Website).</p><p>Bitte bestätige deine E-Mail-Adresse, indem du auf den folgenden Link klickst:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p><p>Danach kannst du dich mit deiner E-Mail-Adresse anmelden. Es empfiehlt sich dringend, dich danach anzumelden und dein Passwort über das Portal zurückzusetzen/zu ändern.</p><p>Viele Grüße,<br>Dein Vereinsteam des WirtschaftsPhysik Alumni e.V.</p></p><p>PS: Falls du die Frist versäumst, kann auch ein Administrator dein Konto aktivieren.</p>`,
    encoding: "utf-8",
  });
}

/**
 * Notification for a public contact-form submission.
 *
 * The visitor's address is deliberately *not* used as `From` — that would fail
 * our own SPF/DKIM/DMARC and land the mail in spam. It goes into `Reply-To`
 * instead, so "Antworten" in the admin's client still reaches the sender.
 */
export async function sendContactRequestEmail(
  adminEmails: string[],
  request: { name: string; email: string; subject: string; message: string },
) {
  if (adminEmails.length === 0) return;

  const transporter = createMailTransporter();
  const { from } = getSmtpConfig();

  const name = escapeHtml(request.name);
  const email = escapeHtml(request.email);
  const subject = escapeHtml(request.subject);
  // Preserve the visitor's line breaks without letting their text become markup.
  const message = escapeHtml(request.message).replace(/\n/g, "<br>");

  await transporter.sendMail({
    from,
    // BCC keeps the admin distribution list out of the visible headers.
    bcc: adminEmails.join(","),
    replyTo: `${request.name} <${request.email}>`,
    subject: `[Kontakt] ${request.subject}`,
    text: `Neue Anfrage über das Kontaktformular:\n\nName: ${request.name}\nE-Mail: ${request.email}\nBetreff: ${request.subject}\n\n${request.message}\n\n---\nAntworten geht direkt an den Absender (Reply-To).`,
    html: `<p>Neue Anfrage über das Kontaktformular:</p><p><strong>Name:</strong> ${name}<br><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a><br><strong>Betreff:</strong> ${subject}</p><hr><p>${message}</p><hr><p style="color:#666;font-size:12px">Antworten geht direkt an den Absender (Reply-To).</p>`,
    encoding: "utf-8",
  });
}

/**
 * Benachrichtigung über einen neuen Aufnahmeantrag.
 *
 * Enthält bewusst **keine** Bank- oder Adressdaten: SMTP ist kein
 * vertraulicher Kanal, und die vollständigen Antragsdaten stehen ohnehin
 * hinter dem Login im Dashboard.
 */
export async function sendMembershipApplicationEmail(
  adminEmails: string[],
  application: { vorname: string; name: string; email: string; dashboardUrl: string },
) {
  if (adminEmails.length === 0) return;

  const transporter = createMailTransporter();
  const { from } = getSmtpConfig();

  const vorname = escapeHtml(application.vorname);
  const name = escapeHtml(application.name);
  const email = escapeHtml(application.email);
  const url = escapeHtml(application.dashboardUrl);

  await transporter.sendMail({
    from,
    // BCC hält die Admin-Verteilerliste aus den sichtbaren Headern heraus.
    bcc: adminEmails.join(","),
    subject: "Neuer Antrag auf Vereinsmitgliedschaft",
    text: `Hallo Admin,\n\nes liegt ein neuer Antrag auf Vereinsmitgliedschaft vor:\n\nName: ${application.vorname} ${application.name}\nE-Mail: ${application.email}\n\nDie vollständigen Antragsdaten inklusive Bankverbindung findest du im Dashboard:\n${application.dashboardUrl}\n\nViele Grüße,\nDein WirtschaftsPhysik Alumni e.V. System`,
    html: `<p>Hallo Admin,</p><p>es liegt ein neuer Antrag auf Vereinsmitgliedschaft vor:</p><p><strong>Name:</strong> ${vorname} ${name}<br><strong>E-Mail:</strong> ${email}</p><p>Die vollständigen Antragsdaten inklusive Bankverbindung findest du im Dashboard:</p><p><a href="${url}">${url}</a></p><p>Viele Grüße,<br>Dein WirtschaftsPhysik Alumni e.V. System</p>`,
    encoding: "utf-8",
  });
}

/** Eingangsbestätigung, Annahme oder Ablehnung an den Antragsteller. */
export async function sendMembershipStatusEmail(
  email: string,
  content: { subject: string; text: string },
) {
  const transporter = createMailTransporter();
  const { from } = getSmtpConfig();

  await transporter.sendMail({
    from,
    to: email,
    subject: content.subject,
    text: content.text,
    html: content.text
      .split("\n\n")
      .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
      .join(""),
    encoding: "utf-8",
  });
}
