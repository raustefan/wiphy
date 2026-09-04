/**
 * Das Briefpapier: verwandelt eine `EmailMessage` in die fertige HTML- und
 * Textfassung — Kopf mit Logo, Inhalt, Vorstands-Signatur, Footer.
 *
 * Aufgebaut aus verschachtelten Tabellen mit Inline-Styles. Das sieht nach 2005
 * aus, ist aber die einzige Struktur, die Outlook, Gmail und Apple Mail
 * gleichermaßen zuverlässig rendern: <style>-Blöcke, Flexbox, Grid und externe
 * Stylesheets werden von mindestens einem der drei ignoriert oder entfernt.
 */
import { escapeHtml } from "@/lib/email/escapeHtml";
import {
  EMAIL_COLORS as C,
  EMAIL_FONT as FONT,
  FOOTER_LINKS,
  VEREIN,
} from "@/lib/email/branding";
import {
  derivePreheader,
  renderBlocksHtml,
  renderBlocksText,
  type EmailMessage,
  type EmailSignature,
} from "@/lib/email/blocks";
import { siteUrl } from "@/lib/server/siteUrl";

const BOARD_LINE = VEREIN.board.map((member) => `${member.name} (${member.role})`).join(" · ");

function signatureHtml(signature: EmailSignature): string {
  if (signature === "none") return "";

  if (signature === "system") {
    return [
      `<div style="height:1px;line-height:1px;font-size:0;background:${C.line};margin:28px 0 16px;">&nbsp;</div>`,
      `<p style="margin:0;font-family:${FONT};font-size:13px;line-height:1.5;color:${C.faint};">Diese Nachricht wurde automatisch vom System des ${escapeHtml(VEREIN.name)} erzeugt.</p>`,
    ].join("");
  }

  return [
    `<div style="height:1px;line-height:1px;font-size:0;background:${C.line};margin:28px 0 16px;">&nbsp;</div>`,
    `<p style="margin:0 0 4px;font-family:${FONT};font-size:16px;line-height:1.6;color:${C.foreground};">Viele Grüße</p>`,
    `<p style="margin:0 0 8px;font-family:${FONT};font-size:16px;line-height:1.6;font-weight:600;color:${C.foreground};">Dein Vorstand des ${escapeHtml(VEREIN.name)}</p>`,
    `<p style="margin:0;font-family:${FONT};font-size:13px;line-height:1.5;color:${C.faint};">${escapeHtml(BOARD_LINE)}</p>`,
  ].join("");
}

function signatureText(signature: EmailSignature): string {
  if (signature === "none") return "";
  if (signature === "system") {
    return `--\nDiese Nachricht wurde automatisch vom System des ${VEREIN.name} erzeugt.`;
  }
  return `Viele Grüße\nDein Vorstand des ${VEREIN.name}\n${BOARD_LINE}`;
}

function headerHtml(): string {
  return [
    // Zweifarbiger Akzentstreifen: Teal (Physik) und Ruby (Ökonomie) wie auf der Website.
    `<tr><td style="padding:0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;"><tr>`,
    `<td bgcolor="${C.physics}" width="62%" height="4" style="height:4px;line-height:4px;font-size:0;">&nbsp;</td>`,
    `<td bgcolor="${C.market}" width="38%" height="4" style="height:4px;line-height:4px;font-size:0;">&nbsp;</td>`,
    `</tr></table></td></tr>`,
    `<tr><td style="padding:26px 32px 6px;">`,
    `<a href="${siteUrl("/")}" style="text-decoration:none;">`,
    `<img src="${siteUrl("/logo-plain.png")}" width="64" height="34" alt="${escapeHtml(VEREIN.name)}" style="display:block;border:0;outline:none;max-width:64px;height:auto;">`,
    `</a>`,
    `<p style="margin:12px 0 0;font-family:${FONT};font-size:17px;font-weight:700;line-height:1.3;color:${C.foreground};">${escapeHtml(VEREIN.name)}</p>`,
    `<p style="margin:2px 0 0;font-family:${FONT};font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${C.faint};">${escapeHtml(VEREIN.tagline)}</p>`,
    `</td></tr>`,
  ].join("");
}

function footerHtml(): string {
  const links = FOOTER_LINKS.map(
    (link) =>
      `<a href="${siteUrl(link.path)}" style="color:${C.muted};text-decoration:none;white-space:nowrap;">${escapeHtml(link.label)}</a>`,
  ).join(`<span style="color:${C.line};"> · </span>`);

  return [
    `<tr><td bgcolor="${C.footer}" style="padding:20px 32px 24px;border-top:1px solid ${C.line};">`,
    `<p style="margin:0 0 10px;font-family:${FONT};font-size:13px;line-height:2;color:${C.muted};">${links}</p>`,
    `<p style="margin:0 0 6px;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.faint};">${VEREIN.address.map(escapeHtml).join("<br>")}</p>`,
    `<p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.faint};">${escapeHtml(VEREIN.register)} · <a href="mailto:${VEREIN.email}" style="color:${C.faint};">${escapeHtml(VEREIN.email)}</a><br>© ${new Date().getFullYear()} ${escapeHtml(VEREIN.name)}</p>`,
    `</td></tr>`,
  ].join("");
}

/** Vollständiges HTML-Dokument der Mail. */
export function renderEmailHtml(message: EmailMessage): string {
  const signature = message.signature ?? "board";
  const preheader = derivePreheader(message);

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="de" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(message.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:${C.page};">${escapeHtml(preheader)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;background:${C.page};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:${C.surface};border:1px solid ${C.line};border-radius:12px;overflow:hidden;">
${headerHtml()}
<tr><td style="padding:14px 32px 28px;">
${renderBlocksHtml(message.blocks)}
${signatureHtml(signature)}
</td></tr>
${footerHtml()}
</table>
</td></tr>
</table>
</body>
</html>`;
}

/** Textfassung derselben Mail — identischer Inhalt, ohne Markup. */
export function renderEmailText(message: EmailMessage): string {
  const signature = signatureText(message.signature ?? "board");
  const footer = [VEREIN.name, ...VEREIN.address, VEREIN.email, siteUrl("/")].join("\n");

  return [renderBlocksText(message.blocks), signature, `--\n${footer}`]
    .filter((part) => part.length > 0)
    .join("\n\n");
}
