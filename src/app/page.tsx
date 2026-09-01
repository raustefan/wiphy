import { auth } from "@/auth";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { ArrowRight, CalendarDays, PenLine } from "lucide-react";
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

/** Kleiner Kapitelkopf im Stil einer Laborheft-Seitenmarke. */
function SectionMarker({ index, label }: { index: string; label: string }) {
  return (
    <div className="section-marker">
      <span className="marker-index">{index}</span>
      <span>{label}</span>
    </div>
  );
}

export default async function HomePage() {
  const session = await auth();
  const posts = await getPublishedPosts();
  const latestPost = posts.length > 0 ? posts[0] : null;

  return (
    <Box>
      {/* ═══════════════════ Hero ═══════════════════ */}
      <Container size="4" px="0">
        <Box className="hero">
          <PhysicsHero />
          <div className="hero-veil" aria-hidden="true" />

          <Container size="3" px="4" style={{ position: "relative" }}>
            <Flex
              direction="column"
              align="center"
              gap={{ initial: "5", sm: "6" }}
              py={{ initial: "7", sm: "9" }}
              style={{ textAlign: "center" }}
            >
              <Text className="eyebrow" style={{ color: "rgb(var(--physics))" }}>
                Universität Ulm · Alumni &amp; Studierende
              </Text>

              <Heading
                as="h1"
                size={{ initial: "8", sm: "9" }}
                className="display-title"
              >
                Wirtschafts<span className="grad-text">Physik</span>
                <br />
                Alumni e.&nbsp;V.
              </Heading>

              <Text
                size={{ initial: "2", sm: "4" }}
                color="gray"
                style={{ maxWidth: 620, lineHeight: 1.75 }}
              >
                Ein gemeinnütziger Verein für Physik- und
                Wirtschaftsphysik-Alumni sowie Studierende. Im Zentrum steht die{" "}
                <span className="voice">Physik</span> — ihre Methoden der
                statistischen Mechanik, Modellbildung und Datenanalyse,
                angewendet auf wirtschaftliche Systeme.
              </Text>

              <Flex
                gap="3"
                direction={{ initial: "column", xs: "row" }}
                justify="center"
                width={{ initial: "100%", xs: "auto" }}
              >
                <Button size={{ initial: "3", sm: "4" }} radius="full" asChild>
                  <Link href="/blog">Neuigkeiten &amp; Blog</Link>
                </Button>
                <Button
                  size={{ initial: "3", sm: "4" }}
                  radius="full"
                  variant="soft"
                  color="gray"
                  highContrast
                  asChild
                >
                  <Link href={session ? "/dashboard" : "/login"}>
                    {session ? "Zum Dashboard" : "Mitgliederbereich"}
                  </Link>
                </Button>
              </Flex>

              <div className="hero-metrics">
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className="hero-metric">
                    <span className="hero-metric-value">{metric.value}</span>
                    <span className="hero-metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
            </Flex>
          </Container>
        </Box>
      </Container>

      {/* ═══════════════════ Der Verein ═══════════════════ */}
      <Container size="4" px="0">
        <section className="section reveal">
          <SectionMarker index="01" label="Der Verein" />

          <Flex direction="column" gap="3" mb="6" style={{ maxWidth: 720 }}>
            <Heading as="h2" size={{ initial: "6", sm: "8" }} className="display-title">
              Drei Säulen, ein Netzwerk
            </Heading>
            <Text size={{ initial: "2", sm: "3" }} color="gray" style={{ lineHeight: 1.75 }}>
              Was in Ulm im Hörsaal beginnt, hört dort nicht auf. Der Verein
              hält die Verbindung zwischen Studium, Forschung und Berufspraxis
              offen — in beide Richtungen.
            </Text>
          </Flex>

          <Grid columns={{ initial: "1", sm: "3" }} gap={{ initial: "3", sm: "4" }}>
            {pillars.map((pillar) => (
              <Card key={pillar.title} size={{ initial: "2", sm: "3" }} className="feature-card panel panel-ticks">
                <Flex direction="column" gap="3" height="100%" p="2">
                  <span className="card-index">{pillar.index}</span>
                  <Heading as="h3" size="4">
                    {pillar.title}
                  </Heading>
                  <Text color="gray" size="2" style={{ lineHeight: 1.7 }}>
                    {pillar.body}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Grid>
        </section>
      </Container>

      {/* ═══════════════════ Physik dahinter ═══════════════════ */}
      <Container size="4" px="0">
        <section className="section reveal">
          <SectionMarker index="02" label="Die Physik dahinter" />

          <Flex direction="column" gap="3" mb="6" style={{ maxWidth: 720 }}>
            <Heading as="h2" size={{ initial: "6", sm: "8" }} className="display-title">
              Eine Gleichung, <span className="voice">zwei Welten</span>
            </Heading>
            <Text size={{ initial: "2", sm: "3" }} color="gray" style={{ lineHeight: 1.75 }}>
              Wirtschaftliche Systeme bestehen aus vielen wechselwirkenden
              Akteuren — ganz ähnlich wie Teilchensysteme in der Physik. Das
              folgende Modell läuft live im Browser: vollständig durchgerechnet,
              nicht nachgezeichnet.
            </Text>
          </Flex>

          {/* ─── Geometrische Brownsche Bewegung ─── */}
          <Box className="lab-module is-market">
            <Grid columns={{ initial: "1", md: "1fr 1fr" }} gap={{ initial: "5", md: "6" }} p={{ initial: "3", sm: "5", md: "6" }}>
              <Box className="lab-figure">
                <MarketDiffusion />
              </Box>

              <Flex direction="column" gap="4" className="lab-copy">
                <Flex direction="column" gap="2">
                  <Text className="eyebrow" style={{ color: "rgb(var(--market))" }}>
                    Statistische Physik
                  </Text>
                  <Heading as="h3" size={{ initial: "5", sm: "6" }}>
                    Vom Pollenkorn zum Kurszettel
                  </Heading>
                </Flex>

                <Text size="2" color="gray" style={{ lineHeight: 1.8 }}>
                  Ein Pollenkorn im Wasser zittert, weil unzählige Moleküle
                  dagegenstoßen. Ein Kurs zittert aus demselben Grund — nur
                  heißen die Stöße hier Kauf und Verkauf. Bachelier schrieb die
                  Diffusionsgleichung 1900 für die Pariser Börse auf, fünf Jahre
                  bevor Einstein sie für die Brownsche Bewegung herleitete.
                </Text>

                <code className="formula-block is-market">
                  dS = μS dt + σS dW
                  <br />
                  S<sub>t</sub> = S<sub>0</sub> · e<sup>(μ−σ²/2)t + σW<sub>t</sub></sup>
                </code>

                <Text size="2" color="gray" style={{ lineHeight: 1.8 }}>
                  Der Term <span className="formula">−σ²/2</span> ist der
                  aufschlussreichste: Volatilität kostet Rendite. Und die Breite
                  der Verteilung wächst mit <span className="formula">σ√t</span>,
                  nicht linear. Deshalb ist eine ehrliche Prognose keine Linie,
                  sondern ein Kegel.
                </Text>

                <Text size="1" color="gray" className="formula-legend">
                  Handelstag Δt = 1/252, Drift μ = 7 % p. a. Die Bänder sind die
                  analytischen Quantile der Log-Normalverteilung.
                </Text>
              </Flex>
            </Grid>
          </Box>

          <Box mt={{ initial: "6", sm: "7" }}>
            <Separator size="4" mb={{ initial: "5", sm: "6" }} />
            <Grid columns={{ initial: "1", sm: "3" }} gap={{ initial: "5", sm: "6" }}>
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
                <Flex key={row.k} direction="column" gap="2">
                  <Text
                    size="2"
                    weight="bold"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "rgb(var(--physics))",
                    }}
                  >
                    {row.k}
                  </Text>
                  <Text size="2" color="gray" style={{ lineHeight: 1.7 }}>
                    {row.v}
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Box>
        </section>
      </Container>

      {/* ═══════════════════ Neuigkeiten ═══════════════════ */}
      {latestPost && (
        <Container size="4" px="0">
          <section className="section reveal">
            <SectionMarker index="03" label="Aus dem Verein" />

            <Card size={{ initial: "2", sm: "4" }} className="post-card panel">
              <Link
                href={`/blog/${latestPost.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Flex direction="column" gap="3" p={{ initial: "1", sm: "2" }}>
                  <Flex gap="4" align="center" wrap="wrap" className="post-meta">
                    <Flex gap="1" align="center">
                      <CalendarDays size={14} />
                      {latestPost.publishedAt.toLocaleDateString("de-DE")}
                    </Flex>
                    {latestPost.author && (
                      <Flex gap="1" align="center">
                        <PenLine size={14} />
                        {latestPost.author}
                      </Flex>
                    )}
                  </Flex>

                  <Heading as="h2" size={{ initial: "5", sm: "7" }} className="display-title">
                    {latestPost.title}
                  </Heading>

                  <Text color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.75 }} as="div">
                    {latestPost.preview}
                  </Text>
                </Flex>
              </Link>

              <Flex justify={{ initial: "start", sm: "end" }} mt="4">
                <Button size="3" variant="soft" radius="full" asChild>
                  <Link href="/blog">
                    Alle Beiträge <ArrowRight size={16} />
                  </Link>
                </Button>
              </Flex>
            </Card>
          </section>
        </Container>
      )}

      {/* ═══════════════════ Mitglied werden ═══════════════════ */}
      <Container size="4" px="0">
        <section className="section reveal" style={{ paddingBottom: 24 }}>
          <SectionMarker index="04" label="Mitmachen" />

          <Box
            className="panel"
            style={{
              background:
                "radial-gradient(120% 140% at 15% 0%, color-mix(in srgb, rgb(var(--physics)) 16%, transparent), transparent 60%), radial-gradient(120% 140% at 85% 100%, color-mix(in srgb, rgb(var(--market)) 14%, transparent), transparent 60%), var(--surface)",
            }}
          >
            <Flex
              direction={{ initial: "column", md: "row" }}
              align={{ initial: "start", md: "center" }}
              justify="between"
              gap="5"
              p={{ initial: "4", sm: "6", md: "8" }}
            >
              <Flex direction="column" gap="3" style={{ maxWidth: 560 }}>
                <Heading as="h2" size={{ initial: "6", sm: "8" }} className="display-title">
                  Mitglied werden
                </Heading>
                <Text size={{ initial: "2", sm: "3" }} color="gray" style={{ lineHeight: 1.75 }}>
                  Offen für Alumni und Studierende der Physik und
                  Wirtschaftsphysik an der Universität Ulm. Die Registrierung
                  dauert wenige Minuten — den Rest übernehmen wir.
                </Text>
              </Flex>

              <Flex
                direction={{ initial: "column", xs: "row" }}
                gap="3"
                width={{ initial: "100%", md: "auto" }}
              >
                <Button size={{ initial: "3", sm: "4" }} radius="full" asChild>
                  <Link href="/register">
                    Jetzt registrieren <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button size={{ initial: "3", sm: "4" }} radius="full" variant="soft" color="gray" highContrast asChild>
                  <Link href="/vorstand">Unser Vorstand </Link>
                </Button>
              </Flex>
            </Flex>
          </Box>
        </section>
      </Container>
    </Box>
  );
}
