import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  EVENT_RETENTION_DAYS,
  PSEUDONYM_RETENTION_DAYS,
  type SecurityEventOutcome,
  type SecurityEventType,
} from "@/lib/server/securityLog";

/**
 * Auswertung des Sicherheitsprotokolls für das Admin-Dashboard.
 *
 * Alle Tagesgrenzen zieht Postgres, nicht JavaScript: `AT TIME ZONE
 * 'Europe/Berlin'` ist die einzige Stelle, an der die Zeitzone vorkommt. Mit
 * UTC-Buckets läge die Grenze im Sommer um 02:00 Uhr Ortszeit, und „heute“
 * wäre auf einer deutschen Vereinsseite regelmäßig falsch.
 */

/** Auswählbare Zeiträume. Mehr als 90 Tage kann es nicht geben — dann ist gelöscht. */
export const WINDOW_DAYS = [7, 30, 90] as const;
export type WindowDays = (typeof WINDOW_DAYS)[number];

export function parseWindowDays(value: string | undefined): WindowDays {
  const parsed = Number(value);
  return (WINDOW_DAYS as readonly number[]).includes(parsed) ? (parsed as WindowDays) : 30;
}

export type OutcomeCounts = {
  success: number;
  failure: number;
  blocked: number;
  total: number;
};

export type DayBucket = OutcomeCounts & {
  /** `YYYY-MM-DD` in Ortszeit. */
  day: string;
};

export type TypeStat = OutcomeCounts & {
  type: SecurityEventType;
  /** Tagesreihe für die kleinen Verlaufsgrafiken, in derselben Reihenfolge wie `days`. */
  series: number[];
};

export type ReasonStat = {
  reason: string;
  count: number;
};

export type RecentEvent = {
  id: string;
  type: SecurityEventType;
  outcome: SecurityEventOutcome;
  reason: string | null;
  createdAt: Date;
  /** Nur für Vorgänge mit Kontobezug — sonst bleibt es beim Pseudonym. */
  account: { id: string; name: string; email: string } | null;
  subjectHash: string | null;
  ipHash: string | null;
  userAgent: string | null;
};

export type SecurityOverview = {
  days: WindowDays;
  /** Tagesschlüssel des Zeitraums, lückenlos und aufsteigend. */
  dayKeys: string[];
  daily: DayBucket[];
  byType: TypeStat[];
  totals: OutcomeCounts;
  /** Gleich langer Zeitraum davor — Grundlage der Veränderungsangabe auf den Kacheln. */
  previous: OutcomeCounts;
  reasons: ReasonStat[];
  recent: RecentEvent[];
  storedTotal: number;
  oldestEvent: Date | null;
  retention: { event: number; pseudonym: number };
};

function emptyCounts(): OutcomeCounts {
  return { success: 0, failure: 0, blocked: 0, total: 0 };
}

function addOutcome(counts: OutcomeCounts, outcome: SecurityEventOutcome, amount: number) {
  if (outcome === "SUCCESS") counts.success += amount;
  else if (outcome === "FAILURE") counts.failure += amount;
  else counts.blocked += amount;
  counts.total += amount;
}

/**
 * Beginn des Tages, der `daysBack` Tage vor heute liegt — als Zeitpunkt in UTC.
 * Steht als Ausdruck rechts vom Vergleich, damit der Index auf `createdAt`
 * weiter greift (eine Funktion *auf* der Spalte würde ihn ausschließen).
 */
function windowStart(daysBack: number) {
  return Prisma.sql`(date_trunc('day', now() AT TIME ZONE 'Europe/Berlin') - make_interval(days => ${daysBack}::int)) AT TIME ZONE 'Europe/Berlin'`;
}

export async function getSecurityOverview(days: WindowDays): Promise<SecurityOverview> {
  const [dayRows, gridRows, previousRows, reasonRows, recentRows, storedTotal, oldest] =
    await Promise.all([
      prisma.$queryRaw<Array<{ day: string }>>`
        SELECT to_char(d, 'YYYY-MM-DD') AS day
        FROM generate_series(
          date_trunc('day', now() AT TIME ZONE 'Europe/Berlin') - make_interval(days => ${days - 1}::int),
          date_trunc('day', now() AT TIME ZONE 'Europe/Berlin'),
          interval '1 day'
        ) AS d
        ORDER BY d
      `,
      prisma.$queryRaw<
        Array<{ day: string; type: SecurityEventType; outcome: SecurityEventOutcome; count: number }>
      >`
        SELECT to_char(("createdAt" AT TIME ZONE 'Europe/Berlin')::date, 'YYYY-MM-DD') AS day,
               "type", "outcome", count(*)::int AS count
        FROM "SecurityEvent"
        WHERE "createdAt" >= ${windowStart(days - 1)}
        GROUP BY 1, 2, 3
      `,
      prisma.$queryRaw<Array<{ outcome: SecurityEventOutcome; count: number }>>`
        SELECT "outcome", count(*)::int AS count
        FROM "SecurityEvent"
        WHERE "createdAt" >= ${windowStart(2 * days - 1)}
          AND "createdAt" < ${windowStart(days - 1)}
        GROUP BY 1
      `,
      prisma.$queryRaw<Array<{ reason: string; count: number }>>`
        SELECT "reason", count(*)::int AS count
        FROM "SecurityEvent"
        WHERE "createdAt" >= ${windowStart(days - 1)}
          AND "reason" IS NOT NULL
          AND "outcome" <> 'SUCCESS'
        GROUP BY 1
        ORDER BY 2 DESC
        LIMIT 8
      `,
      prisma.securityEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: 60,
        include: {
          user: { select: { id: true, vorname: true, name: true, email: true } },
        },
      }),
      prisma.securityEvent.count(),
      prisma.securityEvent.findFirst({
        orderBy: { createdAt: "asc" },
        select: { createdAt: true },
      }),
    ]);

  const dayKeys = dayRows.map((row) => row.day);
  const dayIndex = new Map(dayKeys.map((day, index) => [day, index]));

  const daily: DayBucket[] = dayKeys.map((day) => ({ day, ...emptyCounts() }));
  const totals = emptyCounts();
  const byType = new Map<SecurityEventType, TypeStat>();

  for (const row of gridRows) {
    const index = dayIndex.get(row.day);
    if (index === undefined) continue;

    addOutcome(daily[index], row.outcome, row.count);
    addOutcome(totals, row.outcome, row.count);

    const stat =
      byType.get(row.type) ??
      ({ type: row.type, ...emptyCounts(), series: new Array(dayKeys.length).fill(0) } as TypeStat);
    addOutcome(stat, row.outcome, row.count);
    stat.series[index] += row.count;
    byType.set(row.type, stat);
  }

  const previous = emptyCounts();
  for (const row of previousRows) {
    addOutcome(previous, row.outcome, row.count);
  }

  return {
    days,
    dayKeys,
    daily,
    byType: Array.from(byType.values()).sort((a, b) => b.total - a.total),
    totals,
    previous,
    reasons: reasonRows,
    recent: recentRows.map((event) => ({
      id: event.id,
      type: event.type,
      outcome: event.outcome,
      reason: event.reason,
      createdAt: event.createdAt,
      account: event.user
        ? {
            id: event.user.id,
            name: `${event.user.vorname} ${event.user.name}`.trim(),
            email: event.user.email,
          }
        : null,
      subjectHash: event.subjectHash,
      ipHash: event.ipHash,
      userAgent: event.userAgent,
    })),
    storedTotal,
    oldestEvent: oldest?.createdAt ?? null,
    retention: { event: EVENT_RETENTION_DAYS, pseudonym: PSEUDONYM_RETENTION_DAYS },
  };
}
