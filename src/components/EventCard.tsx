import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar01Icon, Link02Icon, Location01Icon, NewsIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Cta, Frame } from "@/components/Site";
import { cn } from "@/lib/cn";
import {
  eventDateBadge,
  eventIcsPath,
  eventLinkLabel,
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
  linkUrl: string;
  linkLabel: string;
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
        "grid shrink-0 content-center justify-items-start gap-0.5 border-l-2 pl-3 leading-none",
        past ? "border-line-strong" : "border-physics",
        size === "lg" ? "w-20 sm:w-24" : "w-16 sm:w-[4.5rem]",
      )}
    >
      <span className="text-xs text-muted">{badge.weekday}</span>
      <span
        className={cn(
          "font-serif tabular-nums",
          past ? "text-muted" : "text-foreground",
          size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
        )}
      >
        {badge.day}
      </span>
      <span className={cn("text-xs font-semibold", past ? "text-muted" : "text-physics")}>
        {badge.month} {badge.year}
      </span>
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
        <dt className="mt-0.5 shrink-0 text-muted">
          <HugeiconsIcon icon={Calendar01Icon} size={17} aria-hidden="true" />
          <span className="sr-only">Wann</span>
        </dt>
        <dd className="min-w-0 text-sm font-semibold text-pretty sm:text-[0.95rem]">
          {formatEventRange(event)}
        </dd>
      </div>

      {place && (
        <div className="flex items-start gap-3">
          <dt className="mt-0.5 shrink-0 text-muted">
            <HugeiconsIcon icon={Location01Icon} size={17} aria-hidden="true" />
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

      {event.linkUrl && (
        <div className="flex items-start gap-3">
          <dt className="mt-0.5 shrink-0 text-muted">
            <HugeiconsIcon icon={Link02Icon} size={17} aria-hidden="true" />
            <span className="sr-only">Link</span>
          </dt>
          <dd className="min-w-0 text-sm break-all text-muted">
            <a
              href={event.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-physics underline-offset-4 hover:underline"
            >
              {eventLinkLabel(event)}
            </a>
          </dd>
        </div>
      )}
    </dl>
  );
}

/**
 * Eine Zeile der Terminliste, gesetzt wie ein Messprotokoll: links das
 * Datum, daneben Titel und Eckdaten, rechts der Abstand zu heute. Die ganze
 * Zeile ist der Link — auf dem Handy ist das die einzige Trefferfläche, die
 * verlässlich funktioniert.
 */
export function EventCard({
  event,
  past = false,
  postCount = 0,
  now,
}: {
  event: EventCardData;
  past?: boolean;
  /** Zahl der verknüpften Rückblicke — steuert nur den Hinweis. */
  postCount?: number;
  now?: Date;
}) {
  const countdown = past ? "" : formatCountdown(event, now);
  const place = [event.location, event.address].filter(Boolean)[0];
  const date = eventDateBadge(event.start);

  return (
    <Link
      href={eventPath(event)}
      className="group grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 border-b border-line py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:gap-x-8"
    >
      <span className={cn("row-span-2 grid content-start leading-none", past && "text-muted")}>
        <span className="font-serif text-4xl tabular-nums sm:text-5xl">{date.day}</span>
        <span className="mt-1.5 text-sm text-muted">
          {date.month} {date.year}
        </span>
      </span>

      <span className="grid min-w-0 content-start gap-1.5">
        <span className="headline text-xl transition-colors group-hover:text-physics sm:text-2xl">
          {event.title}
        </span>
        <span className="text-sm text-muted">
          {formatEventRange(event)}
          {place && (
            <span className="mt-0.5 flex items-center gap-1.5 text-muted">
              <HugeiconsIcon icon={Location01Icon} size={13} aria-hidden="true" className="shrink-0" />
              <span className="truncate">{place}</span>
            </span>
          )}
        </span>
        {event.summary && (
          <span className="mt-1 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted">
            {event.summary}
          </span>
        )}
      </span>

      {(countdown || postCount > 0) && (
        <span className="col-start-2 flex flex-wrap items-start gap-x-4 gap-y-1 pt-1 font-serif text-sm italic sm:col-start-3 sm:row-start-1 sm:justify-end sm:text-base">
          {countdown && <span className="text-physics">{countdown}</span>}
          {postCount > 0 && (
            <span className="inline-flex items-center gap-1.5 text-market">
              <HugeiconsIcon icon={NewsIcon} size={14} aria-hidden="true" />
              {postCount === 1 ? "mit Rückblick" : `${postCount} Rückblicke`}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}

/**
 * Ein Termin als breites Band über die ganze Seite: das Datum groß gesetzt
 * wie eine Messgröße, daneben Titel, Eckdaten und Aktionen. Startseite und
 * Terminübersicht zeigen damit den nächsten (oder letzten) Termin.
 */
export function EventFeature({
  event,
  past = false,
  heading,
  note,
}: {
  event: EventCardData;
  past?: boolean;
  /** Kleine Überschrift über dem Titel, z. B. „Nächster Termin, in 4 Wochen“. */
  heading: string;
  note?: React.ReactNode;
}) {
  const date = eventDateBadge(event.start);

  return (
    <section
      aria-labelledby={`event-${event.id}`}
      className="relative isolate border-y border-physics/30 bg-physics/[0.06]"
    >
      {/* Papier nur links hinter dem Datum — hinter dem Text bleibt die Fläche ruhig. */}
      <div
        aria-hidden="true"
        className="decor paper absolute inset-0 -z-10 [mask-image:linear-gradient(to_right,#000_0%,#000_12%,transparent_38%)]"
      />
      <Frame className="grid gap-8 py-14 sm:py-16 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-14">
        <div className="flex items-end gap-4">
          <span className="font-serif text-[clamp(5.5rem,14vw,9rem)] leading-[0.8] text-physics tabular-nums">
            {date.day}
          </span>
          <span className="grid pb-1 text-sm leading-snug text-muted">
            <span>{date.weekday}</span>
            <span className="font-semibold text-foreground">{date.month}</span>
            <span>{date.year}</span>
          </span>
        </div>

        <div className="min-w-0">
          <h2 id={`event-${event.id}`} className="font-serif text-lg text-physics italic">
            {heading}
          </h2>
          <h3 className="headline mt-2 text-3xl sm:text-4xl">
            <Link
              href={eventPath(event)}
              className="rounded-sm transition-colors hover:text-physics focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-physics"
            >
              {event.title}
            </Link>
          </h3>
          {event.summary && (
            <p className="mt-3 line-clamp-3 max-w-2xl leading-relaxed text-pretty">
              {event.summary}
            </p>
          )}
          <EventFacts event={event} className="mt-5" />
          {note}
        </div>

        <div className="flex flex-col gap-3 min-[420px]:flex-row lg:flex-col">
          <Cta href={eventPath(event)} arrow>
            Zum Termin
          </Cta>
          {!past && (
            <Cta href={eventIcsPath(event.id)} variant="line" prefetch={false}>
              In den Kalender
            </Cta>
          )}
        </div>
      </Frame>
    </section>
  );
}
