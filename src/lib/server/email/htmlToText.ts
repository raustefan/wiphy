import sanitizeHtml from "sanitize-html";

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

/**
 * Textfassung von im Editor verfasstem HTML.
 *
 * Bisher wanderte das rohe Markup in den `text`-Teil der Mail — wer sie im
 * Nur-Text-Modus las, bekam `<p>`-Tags zu sehen.
 */
export function htmlToText(html: string): string {
  const withBreaks = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<\/(p|div|li|ul|ol|h[1-6]|blockquote)>/gi, "\n");

  return sanitizeHtml(withBreaks, { allowedTags: [], allowedAttributes: {} })
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity.toLowerCase()] ?? entity)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
