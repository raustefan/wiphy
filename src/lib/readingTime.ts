/** Lesedauer in Minuten, geschätzt aus dem Markdown-Rohtext.
 *  200 Wörter/Minute ist der übliche Richtwert für deutschsprachige Fließtexte. */
export function readingTimeMinutes(content: string): number {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|-]+/g, " ");

  const words = plain.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
