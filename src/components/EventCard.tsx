/**
 * Die Bausteine, aus denen Terminliste, Startseite und Detailseite bestehen.
 *
 * Alle drei zeigen denselben Termin in unterschiedlicher Größe — der
 * Datumswürfel, die Eckdaten und die Beschriftung stehen deshalb einmal hier
 * und nicht dreimal fast gleich im Markup.
 */
import Link from "next/link";
import { CalendarClock, Link2, MapPin, Newspaper } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  eventDateBadge,
  eventMapUrl,
  eventPath,
  formatCountdown,
  formatEventRange,
  type EventTiming,
} from "@/lib/events";

export type EventCardData = EventTiming & {
  id: string;
  title: string;
  summary: string;
  location: string;
  address: string;
  onlineUrl: string;
};

/** Der Datumswürfel: Wochentag, Tag, Monat, Jahr. */
export function EventDateCube({
  date,
  past = false,
  size = "md",
}: {
  date: Date;
  past?: boolean;
  size?: "md" | "lg";
}) {
  const badge = eventDateBadge(date);

  return (
    <div
      className={cn(
        "grid shrink-0 content-center justify-items-center gap-0.5 rounded-xl border text-center",
        past ? "border-line bg-raised/50" : "border-physics/25 bg-physics/8",
        size === "lg" ? "w-20 p-3 sm:w-24" : "w-16 p-2 sm:w-[4.5rem]",
      )}
    >
      <span className="font-mono text-[0.6rem] tracking-[0.12em] text-faint uppercase">
        {badge.weekday}
      </span>
      <span
        className={cn(
          "font-bold tracking-tight tabular-nums",
          past ? "text-muted" : "text-foreground",
          size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl",
        )}
      >
        {badge.day}
      </span>
      <span
        className={cn(
          "font-mono text-[0.65rem] font-semibold tracking-[0.12em] uppercase",
          past ? "text-faint" : "text-physics",
        )}
      >
        {badge.month}
      </span>
      <span className="font-mono text-[0.58rem] tracking-[0.1em] text-faint">{badge.year}</span>
    </div>
  );
}

/** Wann, wo, online — als Definitionsliste für Detailseite und Startseite. */
export function EventFacts({
  event,
  className,
}: {
  event: EventCardData;
  className?: string;
}) {
  const place = [event.location, event.address].filter(Boolean).join(" · ");

  return (
    <dl className={cn("grid gap-3", className)}>
      <div className="flex items-start gap-3">
        <dt className="mt-0.5 shrink-0 text-faint">
          <CalendarClock size={17} aria-hidden="true" />
          <span className="sr-only">Wann</span>
        </dt>
        <dd className="min-w-0 text-sm font-semibold text-pretty sm:text-[0.95rem]">
          {formatEventRange(event)}
        </dd>
      </div>

      {place && (
        <div className="flex items-start gap-3">
          <dt className="mt-0.5 shrink-0 text-faint">
            <MapPin size={17} aria-hidden="true" />
            <span className="sr-only">Wo</span>
          </dt>
          <dd className="min-w-0 text-sm text-muted text-pretty">
            {event.location && <span className="font-semibold text-foreground">{event.location}</span>}
            {event.location && event.address && <br />}
            {event.address && (
              <a
                href={eventMapUrl(event.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-foreground hover:underline"
              >
                {event.address}
              </a>
            )}
          </dd>
        </div>
      )}

      {event.onlineUrl && (
        <div className="flex items-start gap-3">
          <dt className="mt-0.5 shrink-0 text-faint">
            <Link2 size={17} aria-hidden="true" />
            <span className="sr-only">Online</span>
          </dt>
          <dd className="min-w-0 text-sm break-all text-muted">
            <a
              href={event.onlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-physics underline-offset-4 hover:underline"
            >
              Online teilnehmen
            </a>
          </dd>
        </div>
      )}
    </dl>
  );
}

/**
 * Eine Zeile der Terminliste. Die ganze Karte ist der Link — auf dem Handy ist
 * das die einzige Trefferfläche, die verlässlich funktioniert.
 */
export function EventCard({
  event,
  past = false,
  postCount = 0,
  now,
}: {
  event: EventCardData;
  past?: boolean;
  /** Zahl der verknüpften Rückblicke — steuert nur das Abzeichen. */
  postCount?: number;
  now?: Date;
}) {
  const countdown = past ? "" : formatCountdown(event, now);
  const place = [event.location, event.address].filter(Boolean)[0];

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <Link
        href={eventPath(event.id)}
        className="flex gap-4 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics sm:gap-5 sm:p-6"
      >
        <EventDateCube date={event.start} past={past} />

        <div className="grid min-w-0 flex-1 content-start gap-1.5">
          {(countdown || postCount > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              {countdown && <Badge tone="physics">{countdown}</Badge>}
              {postCount > 0 && (
                <Badge tone="market">
                  <Newspaper size={12} aria-hidden="true" />
                  {postCount === 1 ? "Rückblick" : `${postCount} Rückblicke`}
                </Badge>
              )}
            </div>
          )}

          <h3 className="text-lg font-bold tracking-tight text-balance sm:text-xl">
            {event.title}
          </h3>

          <p className="font-mono text-xs text-faint">{formatEventRange(event)}</p>

          {place && (
            <p className="flex items-center gap-1.5 text-xs text-faint">
              <MapPin size={13} aria-hidden="true" className="shrink-0" />
              <span className="truncate">{place}</span>
            </p>
          )}

          {event.summary && (
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{event.summary}</p>
          )}

          <span className="mt-1 text-sm font-bold text-physics">Details →</span>
        </div>
      </Link>
    </Card>
  );
}
