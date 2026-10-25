/**
 * Abmeldelink für Newsletter-Mails: `<userId>.<HMAC>`.
 *
 * Zustandslos — nichts in der Datenbank, nichts läuft ab. Fälschen lässt er
 * sich ohne das Server-Secret nicht, und er taugt zu genau einer Sache: den
 * Newsletter dieses einen Kontos ab- oder wieder anzuschalten. Ein eigener,
 * aus dem Auth-Secret abgeleiteter Schlüssel sorgt dafür, dass eine Signatur
 * von hier nirgends sonst als gültig durchgeht.
 *
 * Ohne Server-Imports, damit der Test ihn direkt laden kann.
 */
import { createHmac, timingSafeEqual } from "crypto";
import { siteUrl } from "@/lib/server/siteUrl";

export const NEWSLETTER_UNSUBSCRIBE_PATH = "/newsletter/abmelden";

const USER_ID = /^[a-z0-9]{1,64}$/i;

function key(): Buffer {
  const secret = process.env.NEXTAUTH_SECRET?.trim() || process.env.AUTH_SECRET?.trim();
  if (!secret) throw new Error("Missing required environment variable: NEXTAUTH_SECRET");
  return createHmac("sha256", secret).update("wiphy newsletter token v1").digest();
}

function sign(userId: string): Buffer {
  return createHmac("sha256", key()).update(userId).digest();
}

export function createNewsletterToken(userId: string): string {
  if (!USER_ID.test(userId)) throw new Error("Ungültige Benutzer-ID für den Newsletter-Token.");
  return `${userId}.${sign(userId).toString("base64url")}`;
}

/** Die Benutzer-ID, wenn der Token echt ist — sonst `null`. */
export function verifyNewsletterToken(token: unknown): string | null {
  if (typeof token !== "string" || token.length > 200) return null;
  const [userId, signature, ...rest] = token.split(".");
  if (rest.length > 0 || !userId || !signature || !USER_ID.test(userId)) return null;
  // Als Zeichenkette vergleichen: base64url-Dekodieren überliest fremde Zeichen.
  const given = Buffer.from(signature);
  const expected = Buffer.from(sign(userId).toString("base64url"));
  return given.length === expected.length && timingSafeEqual(given, expected) ? userId : null;
}

/**
 * `page` steht als Link in der Mail. `oneClick` kommt in den Kopf
 * `List-Unsubscribe`: Gmail und Apple Mail zeigen dafür einen eigenen
 * „Abbestellen“-Knopf und schicken ein POST dorthin (RFC 8058).
 */
export function newsletterUnsubscribeUrls(userId: string) {
  const token = createNewsletterToken(userId);
  return {
    page: siteUrl(`${NEWSLETTER_UNSUBSCRIBE_PATH}?t=${token}`),
    oneClick: siteUrl(`/api/newsletter/abmelden?t=${token}`),
  };
}
