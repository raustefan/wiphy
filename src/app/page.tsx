import { auth } from "@/auth";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import PhysicsHero from "@/components/PhysicsHero";
import QuantumOscillator from "@/components/QuantumOscillator";
import RandomWalkField from "@/components/RandomWalkField";
import UncertaintyPrinciple from "@/components/UncertaintyPrinciple";
import DoubleSlitExperiment from "@/components/DoubleSlitExperiment";
import EntropyDiffusion from "@/components/EntropyDiffusion";
import { getPublishedPosts } from "@/lib/server/services/blogService";
import { Calendar, User } from 'lucide-react';

const demoSims = [
  { title: "Quantenharmonischer Oszillator", component: QuantumOscillator },
  { title: "Brownsche Bewegung & Random Walk", component: RandomWalkField },
  { title: "Heisenbergsche Unschärferelation", component: UncertaintyPrinciple },
  { title: "Doppelspaltexperiment", component: DoubleSlitExperiment },
  // { title: "Gas im Kasten — Entropie", component: EntropyDiffusion },
];

const features = [
  {
    title: "Netzwerk fürs Leben",
    body: "Vom ersten Semester bis in die Forschung oder Führungsetage: Stammtische, Afterwork-Drinks und Exkursionen halten den Kontakt zwischen Studierenden, Absolvent:innen und Lehrenden lebendig.",
  },
  {
    title: "Physik trifft Praxis",
    body: "Sondervorlesungen und Gastvorträge aus Industrie, Forschung und Finanzwesen zeigen, wie sich physikalische Methoden – von statistischer Mechanik bis Modellbildung – auf reale Probleme übertragen lassen.",
  },
  {
    title: "Digitales Mitgliederportal",
    body: "Ein geschützter Bereich mit Mitgliedersuche, Profilen und internen Neuigkeiten hält das Netzwerk auch zwischen den Veranstaltungen zusammen.",
  },
];

const physicsFacts = [
  {
    k: "Statistische Physik",
    v: "Von der Brownschen Bewegung zur Modellierung von Finanzmärkten – Fluktuationen und Zufallsprozesse sind das gemeinsame Werkzeug.",
  },
  {
    k: "Ökonophysik",
    v: "Methoden aus Thermodynamik und Vielteilchenphysik werden auf ökonomische Systeme mit vielen wechselwirkenden Akteuren angewendet.",
  },
  {
    k: "Mathematische Modelle",
    v: "Differentialgleichungen, Wahrscheinlichkeitstheorie und numerische Simulation bilden das Rückgrat quantitativer Analyse.",
  },
];

export default async function HomePage() {
  const session = await auth();
  const posts = await getPublishedPosts();
  const latestPost = posts.length > 0 ? posts[0] : null;

  return (
    <Box>
      {/* ---------- Hero ---------- */}
      <Box
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "var(--radius-5)",
          marginBottom: "48px",
          background:
            "radial-gradient(120% 120% at 50% 0%, var(--accent-4) 0%, var(--accent-3) 45%, var(--color-panel-solid) 100%)",
          border: "1px solid var(--accent-6)",
        }}
      >
        <PhysicsHero />

        <Box
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(70% 60% at 50% 45%, var(--color-background) 0%, transparent 75%)",
            opacity: 0.72,
            pointerEvents: "none",
          }}
        />

        <Container size="3" px="4" style={{ position: "relative" }}>
          <Flex
            direction="column"
            align="center"
            gap="5"
            py={{ initial: "8", sm: "9" }}
            style={{ textAlign: "center" }}
          >
            <Heading
              size={{ initial: "8", sm: "9" }}
              style={{ letterSpacing: "-0.02em", lineHeight: 1.08 }}
            >
              <span style={{ fontFamily: "var(--font-serif)" }}>
                WirtschaftsPhysik
                <br />
                Alumni e.V.
              </span>
            </Heading>

            <Text
              size={{ initial: "3", sm: "5" }}
              color="gray"
              style={{ maxWidth: "640px", lineHeight: 1.65 }}
            >
              Wir sind ein gemeinnütziger Verein für Physik- und
              Wirtschaftsphysik-Alumni sowie Studierende der Universität Ulm.
              Im Zentrum steht die Physik – ihre Methoden der statistischen
              Mechanik, Modellbildung und Datenanalyse, angewendet auf
              wirtschaftliche Systeme.
            </Text>

            <Flex
              gap="3"
              direction={{ initial: "column", xs: "row" }}
              width={{ initial: "100%", xs: "auto" }}
              justify="center"
            >
              <Button size="4" asChild style={{ width: "100%" }}>
                <Link href="/blog">Neuigkeiten &amp; Blog</Link>
              </Button>

              <Button
                size="4"
                variant="soft"
                color="gray"
                asChild
                style={{ width: "100%" }}
              >
                <Link href={session ? "/dashboard" : "/login"}>
                  {session ? "Zum Dashboard" : "Mitgliederbereich"}
                </Link>
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* ---------- Features ---------- */}
      <Container size="4" px="4" mb="9">
        <Flex direction="column" align="center" gap="2" mb="6">
          <Text size="2" color="blue" weight="medium">
            Was der Verein leistet
          </Text>
          <Heading size={{ initial: "6", sm: "7" }} align="center">
            Drei Säulen, ein Netzwerk
          </Heading>
        </Flex>

        <Grid columns={{ initial: "1", sm: "3" }} gap="4">
          {features.map((f) => (
            <Card key={f.title} size="3" className="feature-card">
              <Flex direction="column" gap="3" height="100%">
                <Heading size="4">{f.title}</Heading>
                <Text color="gray" size="2" style={{ lineHeight: 1.6 }}>
                  {f.body}
                </Text>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Container>

      {/* ---------- Physik im Fokus ---------- */}
      <Container size="4" px="4" mb="9">
        <Card size={{ initial: "3", sm: "4" }}>
          <Flex direction="column" gap="5">
            <Flex direction="column" gap="2">
              <Text size="2" color="blue" weight="medium">
                Warum Physik?
              </Text>
              <Heading size={{ initial: "5", sm: "6" }}>
                Physikalische Methoden für komplexe Systeme
              </Heading>
              <Text color="gray" size="3" style={{ maxWidth: "640px" }}>
                Wirtschaftliche Systeme bestehen aus vielen wechselwirkenden
                Akteuren – ganz ähnlich wie Teilchensysteme in der Physik.
                Die gleichen mathematischen Werkzeuge, die Diffusion,
                Phasenübergänge oder Vielteilchendynamik beschreiben, lassen
                sich auf Märkte, Netzwerke und Risiko übertragen.
              </Text>
            </Flex>

            <Grid columns={{ initial: "1", sm: "3" }} gap="4">
              {physicsFacts.map((row) => (
                <Flex key={row.k} direction="column" gap="2">
                  <Text
                    size="2"
                    weight="bold"
                    color="blue"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {row.k}
                  </Text>
                  <Text size="2" color="gray" style={{ lineHeight: 1.6 }}>
                    {row.v}
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Flex>
        </Card>
      </Container>

      {latestPost && (
        <Container size="4" px="4" mb="9">
          <Card
            size={{ initial: "3", sm: "4" }}
            className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Link
              href={`/blog/${latestPost.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Flex direction="column" gap="4">
                {/* Title, Author, Date in one line */}
                <Flex
                  direction={{ initial: "column", sm: "row" }}
                  justify="between"
                  align={{ initial: "start", sm: "center" }}
                  gap="3"
                >
                  <Heading size={{ initial: "4", sm: "5" }}>
                    {latestPost.title}
                  </Heading>

                  <Flex gap="4" align="center" className="flex-shrink-0">
                    <Flex gap="1" align="center">
                      <Calendar size={16} style={{ color: "var(--gray-10)" }} />
                      <Text color="gray" size="2">
                        {latestPost.publishedAt.toLocaleDateString("de-DE")}
                      </Text>
                    </Flex>

                    {latestPost.author && (
                      <Flex gap="1" align="center">
                        <User size={16} style={{ color: "var(--gray-10)" }} />
                        <Text color="gray" size="2">
                          {latestPost.author}
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                </Flex>

                <Text color="gray" size="3" style={{ lineHeight: 1.7 }} as="div">
                  {latestPost.preview}
                </Text>
              </Flex>
            </Link>

            <Flex gap="3" justify="end" mt="4">
              <Button size="3" variant="soft" asChild>
                <a href="/blog">Alle Beiträge</a>
              </Button>
            </Flex>
          </Card>
        </Container>
      )}




      {/* ---------- CTA ---------- */}
      <Container size="3" px="4" mb="9">
        <Card
          size="4"
          style={{
            background:
              "linear-gradient(135deg, var(--accent-3), var(--accent-4))",
            border: "1px solid var(--accent-6)",
          }}
        >
          <Flex
            direction="column"
            align="center"
            gap="4"
            py="4"
            style={{ textAlign: "center" }}
          >
            <Heading size={{ initial: "5", sm: "7" }}>
              Mitglied werden
            </Heading>
            <Text color="gray" size="3" style={{ maxWidth: "540px" }}>
              Als gemeinnütziger Verein unterstützen wir Physik- und
              Wirtschaftsphysik-Alumni sowie Studierende der Universität Ulm.
              Die Registrierung dauert nur wenige Minuten.
            </Text>
            <Flex
              gap="3"
              direction={{ initial: "column", xs: "row" }}
              width={{ initial: "100%", xs: "auto" }}
            >
              <Button size="3" asChild style={{ width: "100%" }}>
                <Link href="O/register">Jetzt registrieren</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Container>

      {/* ---------- Physik-Demos (nur zu Demonstrationszwecken) ---------- */}
      <Container size="4" px="4" mb="9">
        <Card
          size={{ initial: "3", sm: "4" }}
          style={{ border: "1px dashed var(--amber-7)", background: "var(--amber-2)" }}
        >
          <Flex direction="column" gap="1" mb="6">
            <Flex align="center" gap="2">
              <ExclamationTriangleIcon style={{ color: "var(--amber-9)" }} />
              <Text size="2" weight="bold" color="amber">
                Nur zu Testzwecken
              </Text>
            </Flex>
            
          </Flex>

          <Grid columns={{ initial: "1", lg: "2" }} gap="6">
            {demoSims.map(({ title, component: Sim }) => (
              <Flex key={title} direction="column" gap="2">
                <Heading size="3">{title}</Heading>
                <Sim />
              </Flex>
            ))}
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}