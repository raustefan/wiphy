import { createHash } from "crypto";
import { headers } from "next/headers";
import { AppError } from "@/lib/server/errors";
import { prisma } from "@/lib/prisma";

// Weiterhin von hier aus zu importieren: die Aufrufer holen sich Adresse und
// Limit in einem Zug. Die Funktion selbst liegt in einer eigenen Datei, damit
// sie ohne `next/headers` und Datenbank testbar bleibt.
export { extractClientIp } from "@/lib/server/clientIp";

type RateLimitOptions = {
  bucket: string;
  keyParts: Array<string | null | undefined>;
  limit: number;
  windowMs: number;
  blockMs?: number;
  message: string;
};

function normalizeKeyPart(value: string | null | undefined) {
  return (value ?? "")
    .trim()
    .toLowerCase();
}

function hashKey(parts: Array<string | null | undefined>) {
  const normalized = parts.map(normalizeKeyPart).join("|");
  return createHash("sha256").update(normalized).digest("hex");
}

function now() {
  return Date.now();
}

function makeStoreKey(bucket: string, keyParts: Array<string | null | undefined>) {
  return `${bucket}:${hashKey(keyParts)}`;
}

export async function getRequestHeaders() {
  return headers();
}

export async function consumeRateLimit({
  bucket,
  keyParts,
  limit,
  windowMs,
  blockMs = windowMs,
  message,
}: RateLimitOptions) {
  const currentTime = new Date(now());
  const resetAt = new Date(currentTime.getTime() + windowMs);

  const storeKey = makeStoreKey(bucket, keyParts);

  await prisma.rateLimitEntry.deleteMany({
    where: {
      resetAt: { lte: currentTime },
      OR: [{ blockedUntil: null }, { blockedUntil: { lte: currentTime } }],
    },
  });

  // Abgelaufene Fenster sind oben schon gelöscht; was noch da ist, läuft oder
  // ist gesperrt. Das Zählen selbst ist ein einziges INSERT … ON CONFLICT, und
  // entschieden wird am *zurückgegebenen* Stand. Vorher wurde erst gelesen und
  // dann geschrieben — parallel abgeschickte Versuche sahen alle denselben alten
  // Zähler, und von 30 gleichzeitigen kamen 21 durch (Limit 5).
  const record = await prisma.rateLimitEntry.upsert({
    where: { key: storeKey },
    create: { key: storeKey, count: 1, resetAt },
    update: { count: { increment: 1 } },
  });

  if (record.blockedUntil && record.blockedUntil > currentTime) {
    throw new AppError("TOO_MANY_REQUESTS", message);
  }

  if (record.count > limit) {
    await prisma.rateLimitEntry.update({
      where: { key: storeKey },
      data: { blockedUntil: new Date(currentTime.getTime() + blockMs) },
    });
    throw new AppError("TOO_MANY_REQUESTS", message);
  }
}

export async function resetRateLimit(bucket: string, keyParts: Array<string | null | undefined>) {
  await prisma.rateLimitEntry.delete({ where: { key: makeStoreKey(bucket, keyParts) } }).catch(() => {
    // Missing records are harmless: a successful login may be the first attempt in the window.
  });
}
