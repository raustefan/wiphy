import { createHash } from "crypto";
import { headers } from "next/headers";
import { AppError } from "@/lib/server/errors";
import { prisma } from "@/lib/prisma";

type HeaderBag = Pick<Headers, "get">;

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

export function extractClientIp(headerBag: HeaderBag) {
  const forwardedFor = headerBag.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  const realIp = headerBag.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return "unknown";
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

  const record = await prisma.$transaction(async (tx) => {
    const existing = await tx.rateLimitEntry.findUnique({ where: { key: storeKey } });

    if (!existing || existing.resetAt <= currentTime) {
      return tx.rateLimitEntry.upsert({
        where: { key: storeKey },
        update: {
          count: 1,
          resetAt,
          blockedUntil: null,
        },
        create: {
          key: storeKey,
          count: 1,
          resetAt,
          blockedUntil: null,
        },
      });
    }

    if (existing.blockedUntil && existing.blockedUntil > currentTime) {
      return existing;
    }

    return tx.rateLimitEntry.update({
      where: { key: storeKey },
      data: {
        count: { increment: 1 },
        blockedUntil:
          existing.count + 1 > limit
            ? new Date(currentTime.getTime() + blockMs)
            : existing.blockedUntil,
      },
    });
  });

  if (record.blockedUntil && record.blockedUntil > currentTime) {
    throw new AppError("TOO_MANY_REQUESTS", message);
  }
}

export async function resetRateLimit(bucket: string, keyParts: Array<string | null | undefined>) {
  await prisma.rateLimitEntry.delete({ where: { key: makeStoreKey(bucket, keyParts) } }).catch(() => {
    // Missing records are harmless: a successful login may be the first attempt in the window.
  });
}
