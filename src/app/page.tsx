import { auth } from "@/auth";
import Link from "next/link";
import InterferenceField from "@/components/InterferenceFieldLazy";
import MarketDiffusion from "@/components/MarketDiffusionLazy";
import { Cta, Frame } from "@/components/Site";
import { EventFeature } from "@/components/EventCard";
import { getPublishedPosts } from "@/lib/server/services/blogService";
import { getFeaturedEvent } from "@/lib/server/services/eventService";
import { formatCountdown } from "@/lib/events";
import { formatDate } from "@/lib/format";
import { blogImageSrcSet, blogImageUrl } from "@/lib/blogImages";
import { MEMBERSHIP_APPLICATION_PATH } from "@/lib/membership";
import { JOURNEY_STEPS } from "@/lib/membershipJourney";
import { blogPostPath } from "@/lib/slug";
import { events as milestones } from "@/app/geschichte/milestones";

/** Was der Verein tut — drei Stufen, versetzt übereinander. */
const levels = [
  {
    title: "Ein Netzwerk, das bleibt",
    body:
      "Stammtische, Afterwork und Exkursionen halten Studierende, Absolvent:innen und Lehrende in Kontakt — vom ersten Semester bis in Forschung, Beratung oder Vorstandsetage.",
  },
  {
    title: "Physik trifft Praxis",
    body:
      "Gastvorträge und Sondervorlesungen aus Industrie, Forschung und Finanzwelt zeigen, wie weit statistische Mechanik und Modellbildung tragen, wenn man sie auf echte Probleme anwendet.",
  },
  {
    title: "Ein Ort für Mitglieder",
    body:
      "Im geschützten Mitgliederbereich findest du andere Mitglieder, pflegst dein Profil und liest interne Neuigkeiten — auch zwischen den Treffen.",
  },
];

/** Studiengangsseiten der Uni Ulm. */
const STUDY_PROGRAMS = {
  physik: "https://www.uni-ulm.de/studium/studieren-an-der-uni-ulm/studiengaenge/studiengangsinfo/course/physik-bachelor/",
  wirtschaftsphysik:
    "https://www.uni-ulm.de/studium/studieren-an-der-uni-ulm/studiengaenge/studiengangsinfo/course/wirtschaftsphysik-bachelor/",
};

/** Auszug aus der Geschichte für den Zeitstrahl. */
const STRIP_IDS = ["uni-ulm", "physik", "start-wiphy", "alumni", "jubilaeum-2024"];
const STRIP_FROM = 1960;

/** Universität und Physik in Teal, Wirtschaftsphysik und Verein in Ruby. */
const tone = (category: string) =>
  category === "uni" || category === "physik"
    ? { bg: "bg-physics", text: "text-physics" }
    : { bg: "bg-market", text: "text-market" };

export default async function HomePage() {
  // Der nächste Termin — und wenn keiner ansteht, der zuletzt vergangene.
  const [session, [latestPost = null], featured] = await Promise.all([
    auth(),
    getPublishedPosts(1),
    getFeaturedEvent(),
  ]);

  const stripTo = new Date().getFullYear();
  const strip = STRIP_IDS.flatMap((id) => milestones.filter((m) => m.id === id));
  const decades = Array.from(
    { length: Math.floor((stripTo - STRIP_FROM) / 10) + 1 },
    (_, i) => STRIP_FROM + i * 10,
  );
  const pos = (year: number) => `${((year - STRIP_FROM) / (stripTo - STRIP_FROM)) * 100}%`;

  return (
    <>
      {/* ═══════════════════ Hero: Text und Abb. 1 ═══════════════════ */}
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="decor paper paper-fade absolute inset-0 -z-10" />
        <Frame className="grid items-end gap-10 pt-10 pb-14 sm:pt-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-14 lg:pt-20 lg:pb-20">
          <div data-observer className="@container min-w-0">
            {/* Unter lg passt die Größe „WirtschaftsPhysik“ genau in eine Zeile
                (Wortbreite ≈ 7,65 × Schriftgröße, plus Luft) — die Wortmarke
                bricht dort nicht mehr als „Wirtschafts-/Physik“. Das &shy;
                bleibt als Netz für breitere Ersatzschriften. */}
            <h1 id="hero-title" className="display text-[clamp(3.25rem,7.6vw,6.5rem)] hyphens-manual max-lg:text-[min(12.6cqi,6.5rem)]">
              <span className="block">Wirtschafts&shy;Physik</span>
              <span className="block">Alumni</span>
            </h1>
            <p className="mt-4 font-serif text-xl text-physics italic sm:text-2xl">
              e. V. an der Universität Ulm, seit&nbsp;2004
            </p>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-pretty">
              Wir verbinden Studierende, Absolvent:innen und Lehrende der{" "}
              <a href={STUDY_PROGRAMS.physik} className="link">Physik</a> und{" "}
              <a href={STUDY_PROGRAMS.wirtschaftsphysik} className="link">Wirtschaftsphysik</a>{"\u00a0"}— mit Stammtischen, Vorträgen und Exkursionen.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              {session ? (
                <Cta href="/dashboard" arrow>
                  Zum Mitgliederbereich
                </Cta>
              ) : (
                <Cta href={MEMBERSHIP_APPLICATION_PATH} arrow>
                  Mitglied werden
                </Cta>
              )}
              <Cta href="/termine" variant="line">
                Nächste Termine
              </Cta>
            </div>
          </div>

          <figure className="decor min-w-0">
            <div className="relative grid grid-cols-[11px_minmax(0,1fr)] grid-rows-[minmax(0,1fr)_11px]">
              <div className="ruler-y border-r border-line-strong" />
              <div className="relative aspect-[5/4] sm:aspect-[3/2] lg:aspect-[1/1]">
                <InterferenceField readoutId="hero-readout" />
              </div>
              <span />
              <div className="ruler border-t border-line-strong" />
              <span className="math absolute -top-1 left-4 text-sm text-muted">y</span>
              <span className="math absolute right-0 -bottom-6 text-sm text-muted">x</span>
            </div>
            <figcaption className="mt-8 grid gap-1 text-sm text-muted sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-x-4">
              <span className="font-serif text-foreground italic">Abb. 1</span>
              <span className="max-w-lg text-pretty">
                Zwei Kreiswellen gleicher Frequenz. Wo Berg auf Tal trifft, löschen sie sich aus.
                Mit dem Zeiger verschiebst du S₂ — und solange du links liest, steht die Welle
                still.
                <span id="hero-readout" className="math mt-1 block text-muted" aria-hidden="true" />
              </span>
            </figcaption>
          </figure>
        </Frame>
      </section>

      {/* ═══════════════════ Zeitstrahl ═══════════════════ */}
      <section aria-labelledby="strip-title" className="border-y border-line bg-surface">
        <Frame className="py-10 sm:py-12">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 id="strip-title" className="headline text-2xl sm:text-3xl">
              Von {STRIP_FROM} bis heute
            </h2>
            <Link href="/geschichte" className="link text-sm font-medium">
              Die ganze Geschichte
            </Link>
          </div>

          {/* Telefon: senkrechte Liste. */}
          <ol className="mt-8 grid gap-5 border-l border-line-strong pl-5 md:hidden">
            {strip.map((m) => (
              <li key={m.id} className="relative">
                <span aria-hidden="true" className={`absolute top-2 -left-[24.5px] size-2 rounded-full ${tone(m.category).bg}`} />
                <Link href={`/geschichte#${m.id}`} className="grid rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-physics">
                  <span className={`font-serif text-lg italic ${tone(m.category).text}`}>{m.year}</span>
                  <span className="text-sm text-muted">{m.title}</span>
                </Link>
              </li>
            ))}
          </ol>

          {/* Ab md: maßstäblicher Zeitstrahl, Beschriftung abwechselnd oben und unten. */}
          <div className="relative mt-10 hidden h-48 md:block">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 h-2 -translate-y-full border-b border-line-strong"
              style={{
                backgroundImage: "linear-gradient(90deg, var(--line-strong) 1px, transparent 1px)",
                backgroundSize: `calc(100% / ${stripTo - STRIP_FROM}) 100%`,
              }}
            />
            {decades.map((year) => (
              <span
                key={year}
                aria-hidden="true"
                className="absolute top-1/2 -translate-x-1/2 pt-2 text-xs text-muted tabular-nums"
                style={{ left: pos(year) }}
              >
                <span className="absolute -top-4 left-1/2 h-4 w-px bg-line-strong" />
                {year}
              </span>
            ))}
            <ol>
              {strip.map((m, i) => {
                const above = i % 2 === 0;
                const right = m.year - STRIP_FROM > (stripTo - STRIP_FROM) * 0.82;
                return (
                  <li key={m.id} className="absolute top-1/2" style={{ left: pos(m.year) }}>
                    <span aria-hidden="true" className={`absolute -top-1.5 -left-1.5 size-3 rounded-full ring-4 ring-surface ${tone(m.category).bg}`} />
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 w-px ${tone(m.category).bg} ${above ? "-top-14 h-12" : "top-3 h-10"}`}
                    />
                    <Link
                      href={`/geschichte#${m.id}`}
                      className={`group absolute grid w-44 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-physics ${
                        above ? "bottom-14" : "top-14"
                      } ${right ? "right-0 justify-items-end text-right" : "-left-px border-l border-transparent pl-2"}`}
                    >
                      <span className={`font-serif text-xl leading-tight italic ${tone(m.category).text}`}>
                        {m.year}
                      </span>
                      <span className="text-sm leading-snug text-foreground group-hover:underline">{m.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </Frame>
      </section>

      {/* ═══════════════════ Was der Verein tut ═══════════════════ */}
      <section aria-labelledby="levels-title">
        <Frame className="grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="levels-title" className="headline text-4xl sm:text-5xl">
              Was im Hörsaal beginnt, hört dort nicht auf.
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted text-pretty">
              Der Verein hält die Verbindung zwischen Studium, Forschung und Beruf offen — in
              beide Richtungen.
            </p>
          </div>

          <div className="relative">
            <ul className="grid gap-14 sm:gap-16">
              {levels.map((level, i) => (
                <li
                  key={level.title}
                  className={`relative border-t-2 pt-5 ${i % 2 ? "border-market" : "border-physics"}`}
                  style={{ marginLeft: `calc(${i} * min(12%, 6rem))` }}
                >
                  <h3 className="headline text-2xl sm:text-3xl">{level.title}</h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-muted text-pretty">{level.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Frame>
      </section>

      {/* ═══════════════════ Nächster Termin ═══════════════════ */}
      {featured && (
        <EventFeature
          event={featured.event}
          past={featured.isPast}
          heading={
            featured.isPast
              ? "Zuletzt im Verein"
              : `Nächster Termin, ${formatCountdown(featured.event) || "bald"}`
          }
          note={
            <p className="mt-5 max-w-xl text-sm text-muted text-pretty">
              {featured.isPast &&
                "Gerade ist nichts terminiert. Der nächste Termin kommt bestimmt — Mitglieder erfahren als Erste davon. "}
              <Link href="/termine" className="link font-medium">
                Alle Termine
              </Link>
            </p>
          }
        />
      )}

      {/* ═══════════════════ Die Physik dahinter ═══════════════════ */}
      {/* Monte-Carlo-Simulation vorerst ausgeblendet — zum Reaktivieren `false &&` entfernen. */}
      {false && (
      <section aria-labelledby="physics-title" className="overflow-hidden">
        <Frame className="py-20 sm:py-28">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-14">
            <h2 id="physics-title" className="headline text-4xl sm:text-5xl">
              Vom Pollenkorn zum Kurszettel
            </h2>
            {/* Die Gleichung als Bildelement: groß, mit Gleichungsnummer. */}
            <p
              aria-label="Geometrische Brownsche Bewegung: dS gleich mu S dt plus sigma S dW"
              className="flex items-baseline justify-between gap-4 border-b border-line pb-3 text-[clamp(1.6rem,5.5vw,3.5rem)] leading-none"
            >
              <span aria-hidden="true" className="math text-market">
                <span className="up">d</span>S = μS <span className="up">d</span>t + σS{" "}
                <span className="up">d</span>W
              </span>
              <span aria-hidden="true" className="font-serif text-base text-muted">
                (1)
              </span>
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
            <div className="min-w-0">
              <MarketDiffusion />
            </div>
            <div className="grid content-start gap-5 font-serif text-lg leading-relaxed">
              <p className="text-pretty">
                Ein Pollenkorn im Wasser zittert, weil unzählige Moleküle dagegenstoßen. Ein
                Aktienkurs zittert aus demselben Grund — nur heißen die Stöße hier Kauf und
                Verkauf. Louis Bachelier schrieb die Diffusionsgleichung 1900 für die Pariser
                Börse auf, fünf Jahre bevor Einstein sie für die Brownsche Bewegung herleitete.
              </p>
              <p className="text-pretty text-muted">
                Gleichung (1) hat eine geschlossene Lösung,{" "}
                <span className="math text-foreground">
                  S<sub>t</sub> = S<sub>0</sub> e<sup>(μ−σ²/2)t + σW<sub>t</sub></sup>
                </span>
                , und ihr aufschlussreichster Term ist <span className="math text-foreground">−σ²/2</span>:
                Volatilität kostet Rendite. Die Breite der Verteilung wächst mit{" "}
                <span className="math text-foreground">σ√t</span>. Eine ehrliche Prognose ist
                deshalb keine Linie, sondern ein Kegel — stell σ links auf 90 % und sieh selbst.
              </p>
            </div>
          </div>

        </Frame>
      </section>
      )}

      {/* ═══════════════════ Aus dem Blog ═══════════════════ */}
      {latestPost && (
        <section aria-labelledby="blog-title" className="border-t border-line bg-surface">
          <Frame
            className={`grid gap-10 py-20 sm:py-24 lg:gap-16 ${
              latestPost.cover
                ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center"
                : "lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
            }`}
          >
            {latestPost.cover ? (
              <div className="relative">
                {/* Versetztes Millimeterpapier hinter dem Bild. */}
                <div aria-hidden="true" className="decor paper absolute inset-0 translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={blogImageUrl(latestPost.cover.id)}
                  srcSet={blogImageSrcSet(latestPost.cover.id)}
                  sizes="(min-width: 1024px) 720px, 100vw"
                  alt={latestPost.cover.alt}
                  loading="lazy"
                  decoding="async"
                  className="relative aspect-[3/2] w-full rounded-[3px] object-cover"
                />
              </div>
            ) : (
              <h2 id="blog-title" className="headline text-4xl sm:text-5xl">
                Zuletzt im Blog
              </h2>
            )}

            <div className="min-w-0">
              {latestPost.cover && (
                <h2 id="blog-title" className="font-serif text-lg text-muted italic">
                  Zuletzt im Blog
                </h2>
              )}
              <p className={`text-sm text-muted ${latestPost.cover ? "mt-2" : ""}`}>
                <time dateTime={latestPost.publishedAt.toISOString()}>{formatDate(latestPost.publishedAt)}</time>
                {latestPost.author && <>, von {latestPost.author}</>}
              </p>
              <h3 className="headline mt-4 text-3xl sm:text-4xl">
                <Link
                  href={blogPostPath(latestPost)}
                  className="rounded-sm transition-colors hover:text-physics focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-physics"
                >
                  {latestPost.title}
                </Link>
              </h3>
              {latestPost.preview && (
                <p className="mt-4 line-clamp-4 max-w-2xl leading-relaxed text-muted text-pretty">{latestPost.preview}</p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Cta href={blogPostPath(latestPost)} arrow>
                  Weiterlesen
                </Cta>
                <Cta href="/blog" variant="line">
                  Alle Beiträge
                </Cta>
              </div>
            </div>
          </Frame>
        </section>
      )}

      {/* ═══════════════════ Mitglied werden ═══════════════════ */}
      <section aria-labelledby="join-title" className="blueprint paper">
        <Frame className="py-20 sm:py-28">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-14">
            <h2 id="join-title" className="display text-[clamp(2.75rem,8vw,5.5rem)]">
              Mitglied werden
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-pretty">
              Offen für Studierende und Alumni der Physik und Wirtschaftsphysik in Ulm. Der Weg
              dorthin hat vier Stationen und dauert ein paar Minuten — über die Aufnahme
              entscheidet dann der Vorstand.
            </p>
          </div>

          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {JOURNEY_STEPS.map((step, i) => (
              <li key={step.id} className="relative border-t border-on-physics pt-5 lg:pr-8">
                <span aria-hidden="true" className="absolute -top-[5px] left-0 size-[9px] rounded-full border border-on-physics bg-physics" />
                <span className="font-serif text-4xl tabular-nums italic">{i + 1}</span>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty opacity-90">{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-col gap-3 min-[420px]:flex-row">
            <Cta href={MEMBERSHIP_APPLICATION_PATH} variant="invert" arrow className="focus-visible:outline-on-physics">
              Jetzt beginnen
            </Cta>
            <Cta href="/satzung" variant="invert-line" className="focus-visible:outline-on-physics">
              Satzung und Beiträge
            </Cta>
          </div>
        </Frame>
      </section>
    </>
  );
}
