/**
 * Absolute URLs der eigenen Website.
 *
 * E-Mails und Metadaten brauchen absolute Adressen; die Basis stand bisher an
 * fünf Stellen als kopierter `process.env.NEXTAUTH_URL || "http://localhost:3000"`.
 */
export function siteUrl(path = "/"): string {
  const base = (process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}
