import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { startOfBerlinDay } from "@/lib/berlinTime";

/**
 * Verknüpfte Blogbeiträge — Titel und Vorschau, nie Inhalt oder Bilder.
 * Auf der Terminseite steht davon nur eine Karte; den ganzen Beitrag mitzuladen
 * hieße, jeden Rückblick doppelt aus der Datenbank zu holen.
 */
const linkedPostSelect = {
  id: true,
  title: true,
  preview: true,
  publishedAt: true,
} as const;

/**
 * „Kommend“ oder „vergangen“ steht nirgends als Spalte — es ergibt sich aus
 * `end ?? Ende des Starttags` (siehe `eventEnd()` in `lib/events.ts`). Diese
 * Bedingung bildet genau das in SQL nach; beide Stellen müssen dieselbe Grenze
 * ziehen, sonst zeigt die Liste einen Termin, den die Detailseite für vorbei
 * hält.
 */
function upcomingConditions(now: Date): Prisma.EventWhereInput[] {
  const today = startOfBerlinDay(now);
  return [
    // Ohne Ende zählt der ganze Starttag.
    { end: null, start: { gte: today } },
    // Ganztägig: `end` ist der letzte Tag, zählt also vollständig mit.
    { allDay: true, end: { gte: today } },
    // Mit Uhrzeit: das Ende ist der Moment, ab dem der Termin vorbei ist.
    { allDay: false, end: { gte: now } },
  ];
}

/**
 * Das Gegenstück — ausformuliert und nicht als `NOT` über `upcomingConditions`.
 *
 * SQL kennt drei Wahrheitswerte: `end >= …` ist für eine Zeile ohne Ende weder
 * wahr noch falsch, sondern NULL, und `NOT NULL` bleibt NULL. Ein Termin ohne
 * Ende fiele damit aus *beiden* Listen heraus — genau das ist passiert, bis die
 * Bedingungen hier positiv dastanden.
 */
function pastConditions(now: Date): Prisma.EventWhereInput[] {
  const today = startOfBerlinDay(now);
  return [
    { end: null, start: { lt: today } },
    { allDay: true, end: { lt: today } },
    { allDay: false, end: { lt: now } },
  ];
}

function upcomingWhere(now: Date): Prisma.EventWhereInput {
  return { published: true, OR: upcomingConditions(now) };
}

function pastWhere(now: Date): Prisma.EventWhereInput {
  return { published: true, OR: pastConditions(now) };
}

const withPostCount = { _count: { select: { posts: true } } } as const;

/** Nur veröffentlichte Rückblicke — Entwürfe gehören nicht auf die Terminseite. */
function withPublishedPosts(now: Date) {
  return {
    posts: {
      where: { published: true, publishedAt: { lte: now } },
      orderBy: { publishedAt: "desc" },
      select: linkedPostSelect,
    },
  } satisfies Prisma.EventInclude;
}

export function findUpcomingEvents(now: Date, take?: number) {
  return prisma.event.findMany({
    where: upcomingWhere(now),
    orderBy: { start: "asc" },
    take,
    include: withPublishedPosts(now),
  });
}

export function findPastEvents(now: Date, take?: number) {
  return prisma.event.findMany({
    where: pastWhere(now),
    orderBy: { start: "desc" },
    take,
    include: withPublishedPosts(now),
  });
}

export function findPublishedEventById(id: string, now: Date) {
  return prisma.event.findFirst({
    where: { id, published: true },
    include: withPublishedPosts(now),
  });
}

/** Der nächste Termin, optional nur bis zu einem Stichtag (Dashboard-Hinweis). */
export function findNextUpcomingEvent(now: Date, until?: Date) {
  return prisma.event.findFirst({
    where: until
      ? { AND: [upcomingWhere(now), { start: { lte: until } }] }
      : upcomingWhere(now),
    orderBy: { start: "asc" },
  });
}

/** Der zuletzt vergangene Termin — der Lückenfüller auf der Startseite. */
export function findLatestPastEvent(now: Date) {
  return prisma.event.findFirst({
    where: pastWhere(now),
    orderBy: { start: "desc" },
    include: withPublishedPosts(now),
  });
}

// ─────────────────────────── Verwaltung ───────────────────────────

export function findAllEvents() {
  return prisma.event.findMany({ orderBy: { start: "desc" }, include: withPostCount });
}

export function findEventById(id: string) {
  return prisma.event.findUnique({ where: { id }, include: withPostCount });
}

/** Auswahlliste „Gehört zu Termin“ im Blog-Formular und in der Mail-Vorlage. */
export function findEventOptions() {
  return prisma.event.findMany({
    orderBy: { start: "desc" },
    select: { id: true, title: true, start: true, end: true, allDay: true, published: true },
  });
}

export type EventWriteData = {
  title: string;
  summary: string;
  description: string;
  start: Date;
  end: Date | null;
  allDay: boolean;
  location: string;
  address: string;
  onlineUrl: string;
  published: boolean;
};

export function createEvent(data: EventWriteData) {
  return prisma.event.create({ data });
}

export function updateEvent(id: string, data: EventWriteData) {
  return prisma.event.update({ where: { id }, data });
}

export function deleteEventById(id: string) {
  return prisma.event.delete({ where: { id } });
}
