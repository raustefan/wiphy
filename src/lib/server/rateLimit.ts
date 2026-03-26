import { createHash } from "crypto";
import { headers } from "next/headers";
import { AppError } from "@/lib/server/errors";

type RateLimitRecord = {
  count: number;
  resetAt: number;
  blockedUntil: number;
};

type HeaderBag = Pick<Headers, "get">;

type RateLimitOptions = {
  bucket: string;
  keyParts: Array<string | null | undefined>;
  limit: number;
  windowMs: number;
  blockMs?: number;
  message: string;
};

const rateLimitStore = new Map<string, RateLimitRecord>();

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

function cleanupExpiredEntries(currentTime: number) {
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= currentTime && value.blockedUntil <= currentTime) {
      rateLimitStore.delete(key);
    }
  }
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

export function consumeRateLimit({
  bucket,
  keyParts,
  limit,
  windowMs,
  blockMs = windowMs,
  message,
}: RateLimitOptions) {
  const currentTime = now();
  cleanupExpiredEntries(currentTime);

  const storeKey = makeStoreKey(bucket, keyParts);
  const existing = rateLimitStore.get(storeKey);

  if (existing?.blockedUntil && existing.blockedUntil > currentTime) {
    throw new AppError("TOO_MANY_REQUESTS", message);
  }

  if (!existing || existing.resetAt <= currentTime) {
    rateLimitStore.set(storeKey, {
      count: 1,
      resetAt: currentTime + windowMs,
      blockedUntil: 0,
    });
    return;
  }

  existing.count += 1;
  if (existing.count > limit) {
    existing.blockedUntil = currentTime + blockMs;
    throw new AppError("TOO_MANY_REQUESTS", message);
  }
}

export function resetRateLimit(bucket: string, keyParts: Array<string | null | undefined>) {
  rateLimitStore.delete(makeStoreKey(bucket, keyParts));
}
