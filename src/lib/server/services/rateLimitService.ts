import { prisma } from "@/lib/prisma";

export type RateLimitEntryItem = {
  key: string;
  bucket: string;
  count: number;
  resetAt: Date;
  blockedUntil: Date | null;
  updatedAt: Date;
};

export type RateLimitBucketSummary = {
  bucket: string;
  entryCount: number;
  totalHits: number;
  blockedCount: number;
};

function bucketFromKey(key: string) {
  const separatorIndex = key.indexOf(":");
  return separatorIndex === -1 ? key : key.slice(0, separatorIndex);
}

export async function getRateLimitEntries(): Promise<RateLimitEntryItem[]> {
  const entries = await prisma.rateLimitEntry.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return entries.map((entry) => ({
    key: entry.key,
    bucket: bucketFromKey(entry.key),
    count: entry.count,
    resetAt: entry.resetAt,
    blockedUntil: entry.blockedUntil,
    updatedAt: entry.updatedAt,
  }));
}

/**
 * Aggregiert die aktuell gespeicherten Einträge pro Bucket. Abgelaufene
 * Einträge werden von consumeRateLimit() laufend gelöscht — die Zahlen
 * spiegeln daher nur den aktiven Stand wider, keine historische Gesamtzahl.
 */
export function summarizeByBucket(entries: RateLimitEntryItem[]): RateLimitBucketSummary[] {
  const now = new Date();
  const byBucket = new Map<string, RateLimitBucketSummary>();

  for (const entry of entries) {
    const summary = byBucket.get(entry.bucket) ?? {
      bucket: entry.bucket,
      entryCount: 0,
      totalHits: 0,
      blockedCount: 0,
    };
    summary.entryCount += 1;
    summary.totalHits += entry.count;
    if (entry.blockedUntil && entry.blockedUntil > now) {
      summary.blockedCount += 1;
    }
    byBucket.set(entry.bucket, summary);
  }

  return Array.from(byBucket.values()).sort((a, b) => b.totalHits - a.totalHits);
}

export async function deleteRateLimitEntry(key: string) {
  await prisma.rateLimitEntry.delete({ where: { key } }).catch(() => {
    // Bereits abgelaufen/gelöscht — nichts zu tun.
  });
}
