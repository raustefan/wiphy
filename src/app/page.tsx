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
import PhysicsHero from "@/components/PhysicsHero";
import QuantumOscillator from "@/components/QuantumOscillator";
import RandomWalkField from "@/components/RandomWalkField";

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
                Wirtschaftsphysik<br />
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

      {/* ---------- Quantenharmonischer Oszillator ---------- */}
      <Container size="4" px="4" mb="9">
        <Card size={{ initial: "3", sm: "4" }}>
          <Grid columns={{ initial: "1", md: "2" }} gap="6" align="center">
            <Flex direction="column" gap="3">
              <Text size="2" color="blue" weight="medium">
                Ein Blick in die Theorie
              </Text>
              <Heading size={{ initial: "5", sm: "6" }}>
                Der{" "}
                <span style={{ fontFamily: "var(--font-mono)" }}>
                  quantenharmonische Oszillator
                </span>
              </Heading>
              <Text color="gray" size="3" style={{ lineHeight: 1.7 }}>
Ein Teilchen im parabolischen Potential – wie eine Kugel in einer Schüssel – kann quantenmechanisch 
nur diskrete Energieniveaus einnehmen. Überlagert man mehrere dieser Zustände, 
entsteht ein Wellenpaket, das im Potentialtopf hin- und herschwingt: 
der fließende Übergang von Quanten- zu klassischer Mechanik, 
live berechnet mit Hermite-Polynomen.
              </Text>
              <Text size="2" color="gray">
                Klicke auf n, um mehr Energieniveaus zur Superposition hinzuzufügen – je mehr Zustände beteiligt sind, desto klassischer wirkt die Bewegung.
              </Text>
            </Flex>

            <QuantumOscillator />
          </Grid>
        </Card>
      </Container>

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


{/* ---------- Random Walk / Brownsche Bewegung ---------- */}
<Container size="4" px="4" mb="9">
  <Card size={{ initial: "3", sm: "4" }}>
    <Grid columns={{ initial: "1", md: "2" }} gap="6" align="center">
      <RandomWalkField />
      <Flex direction="column" gap="3">
        <Text size="2" color="blue" weight="medium">
          Vom Teilchen zum Kurs
        </Text>
        <Heading size={{ initial: "5", sm: "6" }}>
          Brownsche Bewegung &amp;{" "}
          <span style={{ fontFamily: "var(--font-mono)" }}>
            Random Walk
          </span>
        </Heading>
        <Text color="gray" size="3" style={{ lineHeight: 1.7 }}>
          Der Wiener-Prozess beschreibt sowohl die zufällige Bewegung von
          Teilchen in einer Flüssigkeit als auch – als geometrische
          Brownsche Bewegung – die Grundlage der Black-Scholes-Modelle in
          der Finanzmathematik. Zufällige Schocks, gedämpft durch
          Mean-Reversion, erzeugen Pfade, die realen Kursverläufen
          erstaunlich ähnlich sehen.
        </Text>
        <Text size="2" color="gray">
          Bewege den Mauszeiger oder tippe auf die Fläche, um die
          Volatilität lokal zu erhöhen.
        </Text>
      </Flex>

    </Grid>
  </Card>
</Container>

{/* ---------- Physik im Fokus ---------- */}
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
                Akteuren – ganz ähnlich wie Teilchensysteme in der Physik. Die
                gleichen mathematischen Werkzeuge, die Diffusion, Phasenübergänge
                oder Vielteilchendynamik beschreiben, lassen sich auf Märkte,
                Netzwerke und Risiko übertragen.
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
                <Link href="/register">Jetzt registrieren</Link>
              </Button>
              
            </Flex>
          </Flex>
        </Card>
      </Container>
    </Box>
  );
}