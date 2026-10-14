import type { Metadata } from "next";
import Link from "next/link";
import { EventCard, EventFeature } from "@/components/EventCard";
import { Cta, Frame, PageHead } from "@/components/Site";
import { cn } from "@/lib/cn";
import { CALENDAR_ICS_PATH, formatCountdown } from "@/lib/events";
import { getPastEvents, getUpcomingEvents } from "@/lib/server/services/eventService";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Termine",
  description:
    "Stammtische, Exkursionen, Vorträge und Mitgliederversammlungen des WirtschaftsPhysik Alumni e.V. — mit Kalenderdatei zum Eintragen in den eigenen Kalender.",
  path: "/termine",
});

/** Ob ein Termin vorbei ist, hängt an der aktuellen Uhrzeit — nie vorrendern. */
export const dynamic = "force-dynamic";

type SearchParams = { zeige?: string };

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
    { href: "/termine", label: "Kommende", count: upcomingCount, active: !showPast },
    { href: "/termine?zeige=vergangen", label: "Vergangene", count: pastCount, active: showPast },
  ];

  return (
    // Links statt Knöpfen: der Zustand steht damit in der Adresse, ist
    // teilbar, überlebt den Zurück-Knopf und braucht kein JavaScript.
    <nav aria-label="Zeitraum" className="flex gap-8 border-b border-line-strong">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab.active ? "page" : undefined}
          scroll={false}
          className={cn(
            // Der aktive Reiter sitzt auf der Grundlinie wie ein Zeiger auf der Skala.
            "-mb-px inline-flex min-h-12 items-center gap-2 border-b-2 font-serif text-xl transition-colors",
            "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-physics",
            tab.active
              ? "border-physics text-foreground"
              : "border-transparent text-muted hover:text-foreground",
          )}
        >
          {tab.label}
          <span className="text-sm text-muted tabular-nums">{tab.count}</span>
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
    <>
      <PageHead
        title="Termine"
        note={
          upcoming.length > 0 ? (
            <>
              Jeder Termin lässt sich einzeln in den Kalender übernehmen.{" "}
              <a href={CALENDAR_ICS_PATH} className="link">
                Alle als Kalenderdatei
              </a>{" "}
              (.ics) — öffnet sich in Apple Kalender, Google Kalender, Outlook und Thunderbird.
            </>
          ) : undefined
        }
      >
        Stammtische, Exkursionen, Gastvorträge und Mitgliederversammlungen. Mitglieder bekommen
        jede Einladung zusätzlich per E-Mail.
      </PageHead>

      <Frame>
        <ViewSwitch showPast={showPast} upcomingCount={upcoming.length} pastCount={past.length} />
      </Frame>

      {!showPast && next && (
        <div className="mt-12">
          <EventFeature
            event={next}
            heading={`Nächster Termin, ${formatCountdown(next, now) || "bald"}`}
          />
        </div>
      )}

      <Frame className="pb-20 sm:pb-28">
        {list.length > 0 && (
          <section aria-labelledby="list-title" className="mt-14 grid gap-2 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-14">
            <h2 id="list-title" className="headline text-3xl lg:sticky lg:top-28 lg:self-start">
              {showPast ? "Was war" : "Danach"}
            </h2>
            <div className="border-t border-line">
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
          <section className="mt-14 max-w-2xl">
            <h2 className="headline text-3xl">Gerade ist nichts geplant</h2>
            <p className="mt-4 leading-relaxed text-muted text-pretty">
              Sobald der nächste Stammtisch oder die nächste Exkursion feststeht, steht sie
              hier — und geht als Einladung an alle Mitglieder. Du hast eine Idee für einen
              Termin? Schreib uns.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <Cta href="/kontakt?betreff=Terminvorschlag" arrow>
                Termin vorschlagen
              </Cta>
              {past.length > 0 && (
                <Cta href="/termine?zeige=vergangen" variant="line">
                  Vergangene ansehen
                </Cta>
              )}
            </div>
          </section>
        )}

        {showPast && past.length === 0 && (
          <p className="mt-14 max-w-2xl leading-relaxed text-muted">
            Hier sammeln sich die Termine, die schon stattgefunden haben — bisher ist noch keiner
            dabei.
          </p>
        )}
      </Frame>
    </>
  );
}
