import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, CalendarAdd01Icon, MessageQuestionIcon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { Cta, Frame } from "@/components/Site";
import { EventFacts } from "@/components/EventCard";
import MarkdownViewer from "@/components/MarkdownViewer";
import ShareButton from "@/components/ShareButton";
import { EventJsonLd } from "@/components/JsonLd";
import { formatDate } from "@/lib/format";
import {
  eventContactPath,
  eventDateBadge,
  eventIcsPath,
  eventPath,
  formatCountdown,
  formatEventRange,
  isPastEvent,
} from "@/lib/events";
import { getPublicEvent } from "@/lib/server/services/eventService";
import { pageMetadata } from "@/lib/metadata";
import { blogPostPath, idFromSegment } from "@/lib/slug";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: segment } = await params;
  const event = await getPublicEvent(idFromSegment(segment));
  if (!event) return { title: "Termin nicht gefunden" };

  return pageMetadata({
    title: event.title,
    description:
      event.summary || `${formatEventRange(event)} — Termin des WirtschaftsPhysik Alumni e.V.`,
    path: eventPath(event),
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { id: segment } = await params;
  const now = new Date();
  const event = await getPublicEvent(idFromSegment(segment));

  if (!event) return notFound();

  // Alte Links (`/termine/<id>`) und veraltete Titelteile leiten auf die
  // aktuelle Adresse um — Mails und Kalendereinträge mit der alten Form
  // bleiben so gültig.
  const canonicalPath = eventPath(event);
  if (`/termine/${segment}` !== canonicalPath) permanentRedirect(canonicalPath);

  const past = isPastEvent(event, now);
  const countdown = past ? "" : formatCountdown(event, now);

  const date = eventDateBadge(event.start);

  return (
    <article>
      <EventJsonLd
        title={event.title}
        summary={event.summary}
        path={canonicalPath}
        start={event.start}
        end={event.end}
        allDay={event.allDay}
        location={event.location}
        address={event.address}
      />

      <header className="relative isolate">
        <div aria-hidden="true" className="decor paper paper-fade absolute inset-0 -z-10" />
        <Frame className="pt-8 pb-12 sm:pt-12 sm:pb-16">
          <Link
            href={past ? "/termine?zeige=vergangen" : "/termine"}
            className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-physics"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} aria-hidden="true" />
            {past ? "Vergangene Termine" : "Alle Termine"}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <div className="min-w-0">
              <p className="flex items-end gap-4">
                <span className="font-serif text-[clamp(4.5rem,12vw,7.5rem)] leading-[0.8] tabular-nums">
                  {date.day}
                </span>
                <span className="grid pb-1 text-sm leading-snug text-muted">
                  <span>{date.weekday}</span>
                  <span className="font-semibold text-foreground">{date.month}</span>
                  <span>{date.year}</span>
                </span>
              </p>
              <p className="mt-8 font-serif text-lg text-muted italic">
                {past ? "Dieser Termin liegt hinter uns" : countdown ? `Termin, ${countdown}` : "Termin"}
              </p>
              <h1 className="display mt-2 text-[clamp(2.5rem,7vw,4.75rem)]">{event.title}</h1>
              {event.summary && (
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">
                  {event.summary}
                </p>
              )}
            </div>

            <aside className="h-fit border-t border-foreground pt-6 lg:sticky lg:top-28">
              <EventFacts event={event} />
              <div className="mt-6 grid gap-3">
                {/* Der Download ist auch für vergangene Termine erreichbar: wer sie
                    im eigenen Kalender nachhalten will, soll das können. */}
                <Cta href={eventIcsPath(event.id)} prefetch={false} className="w-full">
                  <HugeiconsIcon icon={CalendarAdd01Icon} size={17} aria-hidden="true" /> In meinen Kalender
                </Cta>
                <Cta href={eventContactPath(event.title)} variant="line" className="w-full">
                  <HugeiconsIcon icon={MessageQuestionIcon} size={17} aria-hidden="true" /> Frage zum Termin
                </Cta>
                <ShareButton title={event.title} className="w-full" />
              </div>
              <p className="marginal mt-4">
                Die Kalenderdatei (.ics) öffnet sich in Apple Kalender, Google Kalender, Outlook
                und Thunderbird.
              </p>
            </aside>
          </div>
        </Frame>
      </header>

      <Frame className="pb-20 sm:pb-28">
        {event.description.trim() && (
          <div className="reading border-t border-line pt-6">
            <MarkdownViewer content={event.description} />
          </div>
        )}

        {event.posts.length > 0 && (
          <section aria-labelledby="posts-title" className="mt-16 grid gap-2 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-14">
            <h2 id="posts-title" className="headline text-3xl">
              {past ? "Rückblick" : "Aus dem Blog"}
            </h2>
            <ul className="border-t border-line">
              {event.posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={blogPostPath(post)}
                    className="group grid gap-1.5 border-b border-line py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                  >
                    <span className="text-sm text-muted">{formatDate(post.publishedAt)}</span>
                    <span className="headline text-2xl transition-colors group-hover:text-physics">
                      {post.title}
                    </span>
                    {post.preview && (
                      <span className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted">
                        {post.preview}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Frame>
    </article>
  );
}
