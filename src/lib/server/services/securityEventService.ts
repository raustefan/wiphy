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

/* ------------------------------------------------------------------ *
 * Wochenraster                                                        *
 * ------------------------------------------------------------------ */

export type HeatCell = {
  /** 0 = Montag … 6 = Sonntag. */
  weekday: number;
  /** 0…23, Ortszeit. */
  hour: number;
  total: number;
  success: number;
  blocked: number;
  failure: number;
};

export type ActivityHeatmap = {
  /** Sieben Zeilen à 24 Zellen, lückenlos — auch die leeren Stunden. */
  rows: HeatCell[][];
  max: number;
  total: number;
};

const WEEKDAY_COUNT = 7;
const HOUR_COUNT = 24;

/**
 * Vorgänge nach Wochentag und Stunde.
 *
 * Der Nutzen liegt im Muster, nicht in den Einzelwerten: Menschen registrieren
 * sich abends und am Wochenende, ein Skript läuft gleichmäßig durch die Nacht.
 * Ein Raster zeigt diesen Unterschied auf einen Blick, eine Tagesreihe nicht.
 *
 * `isodow` beginnt bei 1 = Montag; die deutsche Woche fängt nicht am Sonntag an.
 */
export async function getActivityHeatmap(days: WindowDays): Promise<ActivityHeatmap> {
  const rows = await prisma.$queryRaw<
    Array<{ weekday: number; hour: number; outcome: SecurityEventOutcome; count: number }>
  >`
    SELECT extract(isodow from ("createdAt" AT TIME ZONE 'Europe/Berlin'))::int AS weekday,
           extract(hour   from ("createdAt" AT TIME ZONE 'Europe/Berlin'))::int AS hour,
           "outcome", count(*)::int AS count
    FROM "SecurityEvent"
    WHERE "createdAt" >= ${windowStart(days - 1)}
    GROUP BY 1, 2, 3
  `;

  const grid: HeatCell[][] = Array.from({ length: WEEKDAY_COUNT }, (_, weekday) =>
    Array.from({ length: HOUR_COUNT }, (_, hour) => ({
      weekday,
      hour,
      ...emptyCounts(),
    })),
  );

  let max = 0;
  let total = 0;

  for (const row of rows) {
    const cell = grid[row.weekday - 1]?.[row.hour];
    if (!cell) continue;

    addOutcome(cell, row.outcome, row.count);
    total += row.count;
    if (cell.total > max) max = cell.total;
  }

  return { rows: grid, max, total };
}

/* ------------------------------------------------------------------ *
 * Trichter                                                            *
 * ------------------------------------------------------------------ */

export type RegistrationFunnel = {
  /** Abgeschlossene Registrierungen über das öffentliche Formular. */
  registered: number;
  /** Davon getrennt gezählt: bestätigte Adressen (ohne Adressänderungen). */
  verified: number;
  /** Eingereichte Aufnahmeanträge. */
  applied: number;
  /** Angenommene Aufnahmeanträge. */
  accepted: number;
  /** Unbestätigt verfallene und automatisch gelöschte Registrierungen. */
  expired: number;
};

/**
 * Der Weg vom Formular bis zur Mitgliedschaft, Stufe für Stufe.
 *
 * **Kein Kohortenschnitt.** Gezählt wird, was *im Zeitraum* passiert ist, nicht
 * was aus den Registrierungen dieses Zeitraums geworden ist: wer sich im Mai
 * anmeldet und im Juli den Antrag stellt, erscheint in zwei verschiedenen
 * Zeiträumen je einmal. Für „läuft der Ablauf rund?“ ist das die richtige
 * Frage; für „was wurde aus diesen 20 Leuten?“ wäre es die falsche, und deshalb
 * steht der Hinweis auch an der Grafik.
 */
export async function getRegistrationFunnel(days: WindowDays): Promise<RegistrationFunnel> {
  const [events, applications] = await Promise.all([
    prisma.$queryRaw<Array<{ registered: number; verified: number; expired: number }>>`
      SELECT
        count(*) FILTER (WHERE "type" = 'REGISTRATION' AND "outcome" = 'SUCCESS')::int
          AS registered,
        -- Adressänderungen laufen über denselben Bestätigungslink, gehören hier
        -- aber nicht dazu: sie stammen von Konten, die es längst gibt.
        count(*) FILTER (
          WHERE "type" = 'EMAIL_VERIFICATION' AND "outcome" = 'SUCCESS'
            AND ("reason" IS NULL OR "reason" <> 'email_change')
        )::int AS verified,
        count(*) FILTER (WHERE "type" = 'REGISTRATION_EXPIRED')::int AS expired
      FROM "SecurityEvent"
      WHERE "createdAt" >= ${windowStart(days - 1)}
    `,
    prisma.$queryRaw<Array<{ applied: number; accepted: number }>>`
      SELECT
        count(*) FILTER (WHERE "submittedAt" >= ${windowStart(days - 1)})::int AS applied,
        count(*) FILTER (
          WHERE "decidedAt" >= ${windowStart(days - 1)} AND "status" = 'ANGENOMMEN'
        )::int AS accepted
      FROM "MembershipApplication"
    `,
  ]);

  return {
    registered: events[0]?.registered ?? 0,
    verified: events[0]?.verified ?? 0,
    applied: applications[0]?.applied ?? 0,
    accepted: applications[0]?.accepted ?? 0,
    expired: events[0]?.expired ?? 0,
  };
}
