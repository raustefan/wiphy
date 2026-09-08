import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CalendarPlus, MessageCircleQuestion, Newspaper } from "lucide-react";
import {
  Badge,
  ButtonLink,
  Card,
  Container,
  Lead,
  SectionTitle,
} from "@/components/ui";
import { EventDateCube, EventFacts } from "@/components/EventCard";
import MarkdownViewer from "@/components/MarkdownViewer";
import { formatDate } from "@/lib/format";
import {
  eventContactPath,
  eventIcsPath,
  formatCountdown,
  formatEventRange,
  isPastEvent,
} from "@/lib/events";
import { getPublicEvent } from "@/lib/server/services/eventService";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getPublicEvent(id);
  if (!event) return { title: "Termin nicht gefunden" };

  return {
    title: event.title,
    description: event.summary || `${formatEventRange(event)} — Termin des WirtschaftsPhysik Alumni e.V.`,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const now = new Date();
  const event = await getPublicEvent(id, now);

  if (!event) return notFound();

  const past = isPastEvent(event, now);
  const countdown = past ? "" : formatCountdown(event, now);

  return (
    <Container size="3" className="py-8 sm:py-12">
      <Link
        href={past ? "/termine?zeige=vergangen" : "/termine"}
        className="mb-6 inline-flex h-9 items-center rounded-full bg-raised px-4 text-sm font-semibold text-foreground transition-colors hover:bg-line"
      >
        ← Zurück zu den Terminen
      </Link>

      <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <p className="font-mono text-xs font-semibold tracking-[0.16em] text-physics uppercase">
              Termin
            </p>
            {past ? <Badge>Vergangen</Badge> : countdown && <Badge tone="physics">{countdown}</Badge>}
          </div>

          <div className="flex gap-4 sm:gap-6">
            <div className="hidden sm:block">
              <EventDateCube date={event.start} past={past} size="lg" />
            </div>
            <h1 className="min-w-0 text-3xl font-bold tracking-tight text-balance sm:text-5xl">
              {event.title}
            </h1>
          </div>

          {event.summary && (
            <Lead className="mt-4 max-w-2xl">{event.summary}</Lead>
          )}
        </div>

        <Card className="h-fit p-5 lg:sticky lg:top-24">
          <EventFacts event={event} />

          <div className="mt-5 grid gap-2 border-t border-line pt-5">
            {/* Der Download ist auch für vergangene Termine erreichbar: wer sie
                im eigenen Kalender nachhalten will, soll das können. */}
            <ButtonLink href={eventIcsPath(event.id)} prefetch={false} className="w-full">
              <CalendarPlus size={16} aria-hidden="true" /> In meinen Kalender
            </ButtonLink>
            <ButtonLink
              href={eventContactPath(event.title)}
              variant="soft"
              color="neutral"
              className="w-full"
            >
              <MessageCircleQuestion size={16} aria-hidden="true" /> Frage zum Termin
            </ButtonLink>
            <p className="mt-1 text-xs leading-relaxed text-faint">
              Die Kalenderdatei (.ics) öffnet sich in Apple Kalender, Google Kalender, Outlook
              und Thunderbird.
            </p>
          </div>
        </Card>
      </header>

      {event.description.trim() && (
        <>
          <div className="my-8 h-px bg-line sm:my-10" aria-hidden="true" />
          <article className="max-w-[70ch] text-[1.05rem]">
            <MarkdownViewer content={event.description} />
          </article>
        </>
      )}

      {event.posts.length > 0 && (
        <section className="mt-10 grid gap-4 sm:mt-12">
          <div className="flex items-center gap-3">
            <SectionTitle className="flex items-center gap-2">
              <Newspaper size={18} aria-hidden="true" className="text-market" />
              {past ? "Rückblick" : "Aus dem Blog"}
            </SectionTitle>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {event.posts.map((post) => (
              <Card key={post.id} className="group transition-shadow hover:shadow-lg">
                <Link
                  href={`/blog/${post.id}`}
                  className="grid h-full gap-2 p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                >
                  <span className="font-mono text-xs text-faint">
                    {formatDate(post.publishedAt)}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-balance">{post.title}</h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted">{post.preview}</p>
                  <span className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-bold text-physics">
                    Weiterlesen <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
