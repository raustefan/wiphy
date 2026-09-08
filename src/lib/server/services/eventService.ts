import type { Event } from "@prisma/client";
import {
  createEvent,
  deleteEventById,
  findAllEvents,
  findEventById,
  findEventOptions,
  findLatestPastEvent,
  findNextUpcomingEvent,
  findPastEvents,
  findPublishedEventById,
  findUpcomingEvents,
  updateEvent,
  type EventWriteData,
} from "@/lib/server/repositories/eventRepository";
import { UPCOMING_ALERT_MONTHS } from "@/lib/events";
import { AppError } from "@/lib/server/errors";
import type { AnnouncedEvent } from "@/lib/server/email/mailService";

export type LinkedPost = {
  id: string;
  title: string;
  preview: string;
  publishedAt: Date;
};

/** Ein Termin, wie ihn die öffentlichen Seiten brauchen. */
export type PublicEvent = Event & { posts: LinkedPost[] };

export function getUpcomingEvents(now: Date = new Date(), take?: number): Promise<PublicEvent[]> {
  return findUpcomingEvents(now, take);
}

export function getPastEvents(now: Date = new Date(), take?: number): Promise<PublicEvent[]> {
  return findPastEvents(now, take);
}

export function getPublicEvent(id: string, now: Date = new Date()): Promise<PublicEvent | null> {
  return findPublishedEventById(id, now);
}

/**
 * Der Termin für die Startseite: der nächste kommende — und wenn keiner
 * ansteht, der zuletzt vergangene, damit der Abschnitt nicht leer bleibt.
 */
export async function getFeaturedEvent(
  now: Date = new Date(),
): Promise<{ event: PublicEvent; isPast: boolean } | null> {
  const [upcoming] = await findUpcomingEvents(now, 1);
  if (upcoming) return { event: upcoming, isPast: false };

  const past = await findLatestPastEvent(now);
  return past ? { event: past, isPast: true } : null;
}

/**
 * Der Hinweis im Mitgliederbereich: der nächste Termin, sofern er innerhalb der
 * nächsten drei Monate liegt. Alles darüber hinaus ist keine Neuigkeit mehr,
 * sondern Dauerzustand — und ein Hinweis, den man ein Vierteljahr lang sieht,
 * wird nicht mehr gelesen.
 */
export function getDashboardEvent(now: Date = new Date()): Promise<Event | null> {
  const until = new Date(now);
  until.setMonth(until.getMonth() + UPCOMING_ALERT_MONTHS);
  return findNextUpcomingEvent(now, until);
}

/**
 * Termin für eine Ankündigungsmail.
 *
 * Nur veröffentlichte: der Knopf in der Mail führt auf die Terminseite, und ein
 * Entwurf ist dort nicht zu sehen. Hunderte Empfänger auf eine 404-Seite zu
 * schicken, lässt sich nicht zurücknehmen — die Prüfung gehört deshalb vor den
 * Versand und nicht in die Sorgfalt des Absenders.
 */
export async function getAnnouncedEvent(id: string): Promise<AnnouncedEvent> {
  const event = await findPublishedEventById(id, new Date());
  if (!event) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Der Termin ist nicht veröffentlicht. Veröffentliche ihn zuerst, sonst führt der Knopf in der Mail ins Leere.",
    );
  }
  return event;
}

// ─────────────────────────── Verwaltung ───────────────────────────

export type AdminEvent = Event & { _count: { posts: number } };

export function getAdminEvents(): Promise<AdminEvent[]> {
  return findAllEvents();
}

export function getEventForEdit(id: string): Promise<AdminEvent | null> {
  return findEventById(id);
}

export function getEventOptions() {
  return findEventOptions();
}

/**
 * Legt einen leeren Entwurf an und liefert seine ID — dieselbe Mechanik wie
 * beim Blog: erst mit einer ID lässt sich der Termin verknüpfen, ankündigen und
 * verlinken. Der Starttermin steht vorläufig auf der nächsten vollen Stunde.
 */
export async function createDraftEvent(now: Date = new Date()): Promise<string> {
  const start = new Date(now);
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() + 1);

  const event = await createEvent({
    title: "Unbenannter Termin",
    summary: "",
    description: "",
    start,
    end: null,
    allDay: false,
    location: "",
    address: "",
    onlineUrl: "",
    published: false,
  });
  return event.id;
}

export function saveEvent(id: string, data: EventWriteData) {
  return updateEvent(id, data);
}

export function removeEvent(id: string) {
  return deleteEventById(id);
}
