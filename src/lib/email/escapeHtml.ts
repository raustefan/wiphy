/**
 * Escapes user-controlled text (e.g. a member's name) before it is interpolated
 * into email HTML.
 *
 * Lives in its own module so that client components can import the email block
 * renderers without dragging `sanitize-html` into the browser bundle.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
