/**
 * Inhaltsbausteine für E-Mails.
 *
 * Jede Mail beschreibt ihren Inhalt als Liste von Blöcken statt als zwei
 * getrennt gepflegte Strings. Daraus entstehen HTML- *und* Textfassung aus
 * derselben Quelle: die beiden Varianten können nicht mehr auseinanderlaufen,
 * und weil nur die Renderer Markup erzeugen, kann eine Aufrufstelle das
 * Escaping nicht vergessen.
 *
 * Bewusst frei von Server-Abhängigkeiten, damit auch Client-Komponenten (z. B.
 * die Mail-Vorschau im Dashboard) die Textfassung rendern können.
 */
import { escapeHtml } from "./escapeHtml";
import { EMAIL_COLORS, EMAIL_FONT } from "./branding";

export type EmailBlock =
  /** Fließtext. Zeilenumbrüche bleiben erhalten. */
  | { type: "text"; content: string }
  /** Zwischenüberschrift. */
  | { type: "heading"; content: string }
  /** Hervorgehobener Button plus sichtbarer Link (viele Clients zeigen Buttons nicht). */
  | { type: "button"; label: string; url: string }
  /** Label-Wert-Paare, z. B. Absenderdaten einer Kontaktanfrage. */
  | { type: "facts"; items: { label: string; value: string; href?: string }[] }
  /** Wörtlich zitierter Fremdtext, abgesetzt dargestellt. */
  | { type: "quote"; content: string }
  /** Kleingedruckter Hinweis. */
  | { type: "note"; content: string }
  | { type: "divider" }
  /**
   * Bereits aufbereitetes Markup (z. B. der Rich-Text aus dem Mail-Composer).
   * Das HTML muss vom Aufrufer sanitisiert sein, der Text wird separat geliefert.
   */
  | { type: "html"; html: string; text: string };

export type EmailSignature = "board" | "system" | "none";

export type EmailMessage = {
  subject: string;
  /** Vorschautext in der Inbox-Liste. Ohne Angabe: erster Textblock. */
  preheader?: string;
  blocks: EmailBlock[];
  /** Default: Grußformel des Vorstands. */
  signature?: EmailSignature;
};

const P = `margin:0 0 16px;font-family:${EMAIL_FONT};font-size:16px;line-height:1.6;color:${EMAIL_COLORS.foreground};`;

function nl2br(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function blockHtml(block: EmailBlock): string {
  switch (block.type) {
    case "text":
      return `<p style="${P}">${nl2br(block.content)}</p>`;

    case "heading":
      return `<h2 style="margin:28px 0 12px;font-family:${EMAIL_FONT};font-size:18px;line-height:1.4;font-weight:600;color:${EMAIL_COLORS.foreground};">${escapeHtml(block.content)}</h2>`;

    case "button": {
      const url = escapeHtml(block.url);
      return [
        `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 12px;"><tr>`,
        `<td bgcolor="${EMAIL_COLORS.physics}" style="border-radius:8px;">`,
        `<a href="${url}" style="display:inline-block;padding:12px 22px;font-family:${EMAIL_FONT};font-size:15px;font-weight:600;line-height:1;color:${EMAIL_COLORS.onAccent};text-decoration:none;border-radius:8px;">${escapeHtml(block.label)}</a>`,
        `</td></tr></table>`,
        // Fallback für Clients, die den Button verschlucken oder Links nicht anzeigen.
        `<p style="margin:0 0 16px;font-family:${EMAIL_FONT};font-size:13px;line-height:1.5;color:${EMAIL_COLORS.faint};word-break:break-all;">Falls der Button nicht funktioniert: <a href="${url}" style="color:${EMAIL_COLORS.physics};">${url}</a></p>`,
      ].join("");
    }

    case "facts": {
      const rows = block.items
        .map((item) => {
          const value = item.href
            ? `<a href="${escapeHtml(item.href)}" style="color:${EMAIL_COLORS.physics};">${escapeHtml(item.value)}</a>`
            : nl2br(item.value);
          return `<tr><td style="padding:0 16px 6px 0;font-family:${EMAIL_FONT};font-size:14px;line-height:1.5;color:${EMAIL_COLORS.faint};white-space:nowrap;vertical-align:top;">${escapeHtml(item.label)}</td><td style="padding:0 0 6px;font-family:${EMAIL_FONT};font-size:15px;line-height:1.5;color:${EMAIL_COLORS.foreground};vertical-align:top;">${value}</td></tr>`;
        })
        .join("");
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px;width:100%;">${rows}</table>`;
    }

    case "quote":
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px;width:100%;"><tr><td bgcolor="${EMAIL_COLORS.quote}" style="border-left:3px solid ${EMAIL_COLORS.market};padding:14px 16px;font-family:${EMAIL_FONT};font-size:15px;line-height:1.6;color:${EMAIL_COLORS.foreground};">${nl2br(block.content)}</td></tr></table>`;

    case "note":
      return `<p style="margin:0 0 16px;font-family:${EMAIL_FONT};font-size:13px;line-height:1.5;color:${EMAIL_COLORS.faint};">${nl2br(block.content)}</p>`;

    case "divider":
      return `<div style="height:1px;line-height:1px;font-size:0;background:${EMAIL_COLORS.line};margin:24px 0;">&nbsp;</div>`;

    case "html":
      return `<div style="font-family:${EMAIL_FONT};font-size:16px;line-height:1.6;color:${EMAIL_COLORS.foreground};">${block.html}</div>`;
  }
}

function blockText(block: EmailBlock): string {
  switch (block.type) {
    case "text":
    case "note":
      return block.content;
    case "heading":
      return block.content.toUpperCase();
    case "button":
      return `${block.label}:\n${block.url}`;
    case "facts":
      return block.items.map((item) => `${item.label} ${item.value}`).join("\n");
    case "quote":
      return block.content
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
    case "divider":
      return "—";
    case "html":
      return block.text;
  }
}

export function renderBlocksHtml(blocks: EmailBlock[]): string {
  return blocks.map(blockHtml).join("");
}

export function renderBlocksText(blocks: EmailBlock[]): string {
  return blocks.map(blockText).filter((part) => part.length > 0).join("\n\n");
}

/** Erster Fließtext einer Nachricht — Fallback für den Inbox-Vorschautext. */
export function derivePreheader(message: EmailMessage): string {
  const first = message.blocks.find((block) => block.type === "text");
  return message.preheader ?? (first?.type === "text" ? first.content.replace(/\s+/g, " ").slice(0, 140) : "");
}

/**
 * Schlichtes semantisches HTML (nur <p>/<br>) für den Rich-Text-Editor im
 * Dashboard — dort stört das Inline-Styling der Versandfassung nur.
 */
export function renderBlocksEditorHtml(blocks: EmailBlock[]): string {
  return renderBlocksText(blocks)
    .split("\n\n")
    .map((paragraph) => `<p>${nl2br(paragraph)}</p>`)
    .join("");
}
