import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, CalendarPlus, Download, History } from "lucide-react";
import {
  Badge,
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  Lead,
  PageTitle,
} from "@/components/ui";
import { EventCard, EventDateCube, EventFacts } from "@/components/EventCard";
import { cn } from "@/lib/cn";
import { CALENDAR_ICS_PATH, eventIcsPath, eventPath, formatCountdown } from "@/lib/events";
import { getPastEvents, getUpcomingEvents, type PublicEvent } from "@/lib/server/services/eventService";

export const metadata: Metadata = {
  title: "Termine",
  description:
    "Stammtische, Exkursionen, Vorträge und Mitgliederversammlungen des WirtschaftsPhysik Alumni e.V. — mit Kalenderdatei zum Eintragen in den eigenen Kalender.",
};

/** Ob ein Termin vorbei ist, hängt an der aktuellen Uhrzeit — nie vorrendern. */
export const dynamic = "force-dynamic";

type SearchParams = { zeige?: string };

/**
 * Der erste kommende Termin, groß. Bewusst kein `EventCard`: hier stehen
 * Knöpfe drin, und ein Knopf innerhalb einer verlinkten Karte wäre sowohl
 * ungültiges Markup als auch mit der Tastatur nicht mehr auseinanderzuhalten.
 */
function NextEventCard({ event }: { event: PublicEvent }) {
  const countdown = formatCountdown(event);

  return (
    <Card className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 120% at 8% 0%, color-mix(in srgb, var(--physics) 12%, transparent), transparent 60%)",
        }}
      />
      <div className="relative grid gap-5 p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="physics">Nächster Termin</Badge>
          {countdown && <Badge>{countdown}</Badge>}
        </div>

        <div className="flex gap-4 sm:gap-6">
          <EventDateCube date={event.start} size="lg" />
          <div className="grid min-w-0 flex-1 content-start gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              <Link
                href={eventPath(event.id)}
                className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-physics hover:text-physics"
              >
                {event.title}
              </Link>
            </h2>
            <EventFacts event={event} />
          </div>
        </div>

        {event.summary && (
          <p className="max-w-2xl text-sm leading-relaxed text-muted text-pretty sm:text-base">
            {event.summary}
          </p>
        )}

        <div className="flex flex-col gap-3 min-[420px]:flex-row">
          <ButtonLink href={eventPath(event.id)} size="lg">
            Zum Termin
          </ButtonLink>
          <ButtonLink
            href={eventIcsPath(event.id)}
            size="lg"
            variant="soft"
            color="neutral"
            prefetch={false}
          >
            <CalendarPlus size={16} aria-hidden="true" /> In meinen Kalender
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}

/** Umschalter zwischen kommenden und vergangenen Terminen. */
function ViewSwitch({
  showPast,
  upcomingCount,
  pastCount,
}: {
  showPast: boolean;
  upcomingCount: number;
  pastCount: number;
}) {
  const tabs = [
    { href: "/termine", label: "Kommende", count: upcomingCount, active: !showPast, icon: CalendarDays },
    {
      href: "/termine?zeige=vergangen",
      label: "Vergangenes",
      count: pastCount,
      active: showPast,
      icon: History,
    },
  ];

  return (
    // Links statt Knöpfen: der Zustand steht damit in der Adresse, ist
    // teilbar, überlebt den Zurück-Knopf und braucht kein JavaScript.
    <nav aria-label="Zeitraum" className="flex gap-1 rounded-full border border-line bg-surface p-1">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab.active ? "page" : undefined}
          scroll={false}
          className={cn(
            "inline-flex min-h-9 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
            tab.active
              ? "bg-physics text-on-physics"
              : "text-muted hover:bg-raised hover:text-foreground",
          )}
        >
          <tab.icon size={15} aria-hidden="true" />
          {tab.label}
          <span className="font-mono text-xs opacity-70 tabular-nums">{tab.count}</span>
        </Link>
      ))}
    </nav>
  );
}

export default async function TerminePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { zeige } = await searchParams;
  const showPast = zeige === "vergangen";

  const now = new Date();
  const [upcoming, past] = await Promise.all([getUpcomingEvents(now), getPastEvents(now)]);

  const [next, ...rest] = upcoming;
  const list = showPast ? past : rest;

  return (
    <Container size="3" className="grid gap-8 py-8 sm:gap-10 sm:py-12">
      <header className="grid gap-4">
        <div className="grid gap-3">
          <Eyebrow>
            <CalendarDays size={16} aria-hidden="true" />
            Der Verein
          </Eyebrow>
          <PageTitle>Termine</PageTitle>
          <Lead className="max-w-2xl">
            Stammtische, Exkursionen, Gastvorträge und Mitgliederversammlungen. Jeder Termin
            lässt sich mit einem Klick in den eigenen Kalender übernehmen — auf dem Handy wie
            am Rechner.
          </Lead>
        </div>

        {upcoming.length > 0 && (
          <div>
            <ButtonLink
              href={CALENDAR_ICS_PATH}
              variant="soft"
              color="neutral"
              size="sm"
              prefetch={false}
              className="w-full min-[420px]:w-auto"
            >
              <Download size={15} aria-hidden="true" /> Alle Termine als Kalenderdatei
            </ButtonLink>
          </div>
        )}
      </header>

      <ViewSwitch showPast={showPast} upcomingCount={upcoming.length} pastCount={past.length} />

      {!showPast && next && <NextEventCard event={next} />}

      {list.length > 0 && (
        <section className="grid gap-4">
          {!showPast && next && (
            <h2 className="font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-faint uppercase">
              Weitere Termine
            </h2>
          )}
          {showPast && (
            <h2 className="font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-faint uppercase">
              Vergangene Termine
            </h2>
          )}
          <div className="grid gap-3">
            {list.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                past={showPast}
                postCount={event.posts.length}
                now={now}
              />
            ))}
          </div>
        </section>
      )}

      {/* Leerzustände: getrennt formuliert, weil „noch nichts geplant“ und
          „noch nichts gewesen“ zwei verschiedene Aussagen sind. */}
      {!showPast && upcoming.length === 0 && (
        <Card className="grid gap-3 p-6 sm:p-8">
          <h2 className="text-lg font-bold tracking-tight">Aktuell ist nichts geplant</h2>
          <p className="max-w-prose text-sm leading-relaxed text-muted">
            Sobald der nächste Stammtisch oder die nächste Exkursion feststeht, steht er hier —
            und geht als Einladung an alle Mitglieder.
          </p>
          <div className="flex flex-col gap-3 min-[420px]:flex-row">
            {past.length > 0 && (
              <ButtonLink href="/termine?zeige=vergangen" variant="soft" color="neutral">
                <History size={16} aria-hidden="true" /> Vergangene Termine ansehen
              </ButtonLink>
            )}
            <ButtonLink href="/kontakt" variant="soft" color="neutral">
              Termin vorschlagen
            </ButtonLink>
          </div>
        </Card>
      )}

      {showPast && past.length === 0 && (
        <Card className="p-6 text-muted sm:p-8">
          Hier sammeln sich die Termine, die schon stattgefunden haben — bisher ist noch keiner
          dabei.
        </Card>
      )}
    </Container>
  );
}
