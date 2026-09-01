import { createHash } from "crypto";

/**
 * Pure spam-scoring helpers for the public contact form. Deliberately free of
 * Prisma and request context so the heuristics can be unit-tested directly.
 */

type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const SPAM_KEYWORDS = [
  "seo",
  "backlink",
  "crypto",
  "bitcoin",
  "casino",
  "viagra",
  "loan",
  "investment opportunity",
  "click here",
  "make money",
];

/** Non-Latin blocks that have no business in a German alumni association's inbox. */
const NON_LATIN = /[Ѐ-ӿ一-鿿぀-ヿ؀-ۿ]/;

/**
 * Cheap additive heuristic. Deliberately not a hard reject: each signal on its
 * own has false positives, so only the sum decides whether a mail goes out.
 */
export function scoreSpam(input: ContactInput): number {
  const haystack = `${input.subject}\n${input.message}`;
  const lower = haystack.toLowerCase();
  let score = 0;

  const linkCount = (haystack.match(/https?:\/\//gi) ?? []).length;
  if (linkCount >= 2) score += 2;
  if (linkCount >= 4) score += 2;

  if (NON_LATIN.test(haystack)) score += 3;

  const keywordHits = SPAM_KEYWORDS.filter((word) => lower.includes(word)).length;
  score += keywordHits * 2;

  // BBCode/anchor markup is a hallmark of link-spam templates.
  if (/\[url=|<a\s+href=/i.test(haystack)) score += 3;

  // Shouting in the subject.
  if (input.subject.length > 12 && input.subject === input.subject.toUpperCase()) score += 1;

  return score;
}

/** IPs are only ever stored hashed — enough to correlate abuse, not to identify a person. */
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}
