import { auth } from "@/auth";
import Link from "next/link";
import { ArrowRight, CalendarDays, PenLine } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import PhysicsHero from "@/components/PhysicsHero";
import MarketDiffusion from "@/components/MarketDiffusion";
import { getPublishedPosts } from "@/lib/server/services/blogService";

const pillars = [
  {
    index: "01",
    title: "Netzwerk fürs Leben",
    body:
      "Vom ersten Semester bis in die Forschung oder Führungsetage: Stammtische, Afterwork-Drinks und Exkursionen halten den Kontakt zwischen Studierenden, Absolvent:innen und Lehrenden lebendig.",
  },
  {
    index: "02",
    title: "Physik trifft Praxis",
    body:
      "Sondervorlesungen und Gastvorträge aus Industrie, Forschung und Finanzwesen zeigen, wie sich physikalische Methoden — von statistischer Mechanik bis Modellbildung — auf reale Probleme übertragen lassen.",
  },
  {
    index: "03",
    title: "Digitales Mitgliederportal",
    body:
      "Ein geschützter Bereich mit Mitgliedersuche, Profilen und internen Neuigkeiten hält das Netzwerk auch zwischen den Veranstaltungen zusammen.",
  },
];

const heroMetrics = [
  { value: "1967", label: "Universität Ulm" },
  { value: "2004", label: "Verein gegründet" },
  { value: "e. V.", label: "gemeinnützig" },
];

/** Kleiner Kapitelkopf: Mono-Nummer + Label + Haarlinie. */
function SectionMarker({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.16em] text-faint uppercase">
      <span className="font-bold text-physics">{index}</span>
      <span>{label}</span>
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
    </div>
  );
}

export default async function HomePage() {
  const session = await auth();
  const posts = await getPublishedPosts();
  const latestPost = posts.length > 0 ? posts[0] : null;

  return (
    <div className="grid gap-14 py-8 sm:gap-20 sm:py-12">
      {/* ═══════════════════ Hero ═══════════════════ */}
      <Container size="4">
        <section className="relative overflow-hidden rounded-3xl border border-line bg-surface">
          <PhysicsHero />
          {/* Weiches Zentrum, damit die Typo über dem Partikelfeld lesbar bleibt. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(62% 58% at 50% 46%, var(--background) 0%, color-mix(in srgb, var(--background) 55%, transparent) 45%, transparent 78%)",
            }}
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-14 text-center sm:gap-6 sm:py-20">
            <p className="font-mono text-xs font-semibold tracking-[0.16em] text-physics uppercase">
              Universität Ulm · Alumni &amp; Studierende
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-balance [overflow-wrap:break-word] sm:text-6xl">
              Wirtschafts<span className="text-physics">Physik</span> Alumni
              e.&nbsp;V.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Ein gemeinnütziger Verein für Physik- und
              Wirtschaftsphysik-Alumni sowie Studierende. Im Zentrum steht die
              Physik — ihre Methoden der statistischen Mechanik, Modellbildung
              und Datenanalyse, angewendet auf wirtschaftliche Systeme.
            </p>

            <div className="flex w-full flex-col justify-center gap-3 min-[420px]:w-auto min-[420px]:flex-row">
              <ButtonLink href="/blog" size="lg">
                Neuigkeiten &amp; Blog
              </ButtonLink>
              <ButtonLink href={session ? "/dashboard" : "/login"} size="lg" variant="soft" color="neutral">
                {session ? "Zum Dashboard" : "Mitgliederbereich"}
              </ButtonLink>
            </div>

            <dl className="mt-2 grid w-full max-w-md grid-cols-3">
              {heroMetrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className={`grid gap-1 px-2 text-center sm:px-4 ${i > 0 ? "border-l border-line" : ""}`}
                >
                  <dd className="font-mono text-base font-bold tracking-tight sm:text-xl">
                    {metric.value}
                  </dd>
                  <dt className="font-mono text-[0.58rem] tracking-[0.12em] text-faint uppercase sm:text-[0.65rem]">
                    {metric.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </Container>

      {/* ═══════════════════ Der Verein ═══════════════════ */}
      <Container size="4">
        <section>
          <SectionMarker index="01" label="Der Verein" />

          <div className="mb-8 grid max-w-2xl gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Drei Säulen, ein Netzwerk
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Was in Ulm im Hörsaal beginnt, hört dort nicht auf. Der Verein
              hält die Verbindung zwischen Studium, Forschung und Berufspraxis
              offen — in beide Richtungen.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="flex flex-col gap-3 p-6 sm:p-7">
                <span className="font-mono text-xs font-bold tracking-[0.16em] text-physics">
                  {pillar.index}
                </span>
                <h3 className="text-lg font-bold tracking-tight">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{pillar.body}</p>
              </Card>
            ))}
          </div>
        </section>
      </Container>

      {/* ═══════════════════ Physik dahinter ═══════════════════ */}
      <Container size="4">
        <section>
          <SectionMarker index="02" label="Die Physik dahinter" />

          <div className="mb-8 grid max-w-2xl gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Eine Gleichung, zwei Welten
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Wirtschaftliche Systeme bestehen aus vielen wechselwirkenden
              Akteuren — ganz ähnlich wie Teilchensysteme in der Physik. Das
              folgende Modell läuft live im Browser: vollständig durchgerechnet,
              nicht nachgezeichnet.
            </p>
          </div>

          {/* ─── Geometrische Brownsche Bewegung ─── */}
          <Card className="overflow-hidden p-5 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="order-2 min-w-0 lg:order-1">
                <MarketDiffusion />
              </div>

              <div className="order-1 flex flex-col gap-4 lg:order-2">
                <div className="grid gap-2">
                  <p className="font-mono text-xs font-semibold tracking-[0.16em] text-market uppercase">
                    Statistische Physik
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Vom Pollenkorn zum Kurszettel
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  Ein Pollenkorn im Wasser zittert, weil unzählige Moleküle
                  dagegenstoßen. Ein Kurs zittert aus demselben Grund — nur
                  heißen die Stöße hier Kauf und Verkauf. Bachelier schrieb die
                  Diffusionsgleichung 1900 für die Pariser Börse auf, fünf Jahre
                  bevor Einstein sie für die Brownsche Bewegung herleitete.
                </p>

                <code className="formula-block is-market">
                  dS = μS dt + σS dW
                  <br />
                  S<sub>t</sub> = S<sub>0</sub> · e<sup>(μ−σ²/2)t + σW<sub>t</sub></sup>
                </code>

                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  Der Term <span className="formula">−σ²/2</span> ist der
                  aufschlussreichste: Volatilität kostet Rendite. Und die Breite
                  der Verteilung wächst mit <span className="formula">σ√t</span>,
                  nicht linear. Deshalb ist eine ehrliche Prognose keine Linie,
                  sondern ein Kegel.
                </p>

                <p className="formula-legend">
                  Handelstag Δt = 1/252, Drift μ = 7 % p. a. Die Bänder sind die
                  analytischen Quantile der Log-Normalverteilung.
                </p>
              </div>
            </div>
          </Card>

          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-3 sm:gap-10">
            {[
              {
                k: "Ökonophysik",
                v: "Methoden aus Thermodynamik und Vielteilchenphysik, angewendet auf Systeme mit vielen wechselwirkenden Akteuren: Märkte, Netzwerke, Verkehr.",
              },
              {
                k: "Skalengesetze",
                v: "Fette Verteilungsränder, Volatilitäts-Cluster und Potenzgesetze tauchen an der Börse genauso auf wie in der Nähe eines Phasenübergangs.",
              },
              {
                k: "Modellbildung",
                v: "Stochastische Differentialgleichungen, Monte-Carlo-Simulation und numerische Analysis bilden das gemeinsame Handwerkszeug beider Welten.",
              },
            ].map((row) => (
              <div key={row.k} className="grid gap-2">
                <span className="font-mono text-sm font-bold text-physics">{row.k}</span>
                <p className="text-sm leading-relaxed text-muted">{row.v}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>

      {/* ═══════════════════ Neuigkeiten ═══════════════════ */}
      {latestPost && (
        <Container size="4">
          <section>
            <SectionMarker index="03" label="Aus dem Verein" />

            <Card className="p-5 sm:p-8 lg:p-10">
              <Link
                href={`/blog/${latestPost.id}`}
                className="grid gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-physics"
              >
                <Badge tone="market" className="w-fit">
                  Neuigkeiten
                </Badge>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <div className="grid min-w-0 flex-1 gap-3">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-faint">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={13} aria-hidden="true" />
                        {latestPost.publishedAt.toLocaleDateString("de-DE")}
                      </span>
                      {latestPost.author && (
                        <span className="inline-flex items-center gap-1.5">
                          <PenLine size={13} aria-hidden="true" />
                          {latestPost.author}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-4xl">
                      {latestPost.title}
                    </h2>

                    <p className="text-base leading-relaxed text-muted sm:text-lg">
                      {latestPost.preview}
                    </p>
                  </div>

                  {latestPost.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={latestPost.imageUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-24 shrink-0 rounded-xl border border-line object-cover sm:size-32"
                    />
                  )}
                </div>
              </Link>

              <div className="mt-6 flex justify-start sm:justify-end">
                <ButtonLink href="/blog" variant="soft" color="neutral">
                  Alle Beiträge <ArrowRight size={16} aria-hidden="true" />
                </ButtonLink>
              </div>
            </Card>
          </section>
        </Container>
      )}

      {/* ═══════════════════ Mitglied werden ═══════════════════ */}
      <Container size="4">
        <section className="pb-4">
          <SectionMarker index="04" label="Mitmachen" />

          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 120% at 12% 0%, color-mix(in srgb, var(--physics) 10%, transparent), transparent 55%), radial-gradient(90% 120% at 88% 100%, color-mix(in srgb, var(--market) 9%, transparent), transparent 55%)",
              }}
            />
            <div className="relative flex flex-col items-start justify-between gap-6 p-6 sm:p-10 md:flex-row md:items-center lg:p-14">
              <div className="grid max-w-xl gap-3">
                <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                  Mitglied werden
                </h2>
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  Offen für Alumni und Studierende der Physik und
                  Wirtschaftsphysik an der Universität Ulm. Die Registrierung
                  dauert wenige Minuten — den Rest übernehmen wir.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 md:w-auto min-[420px]:flex-row">
                <ButtonLink href="/register" size="lg">
                  Jetzt registrieren <ArrowRight size={16} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/vorstand" size="lg" variant="soft" color="neutral">
                  Unser Vorstand
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
