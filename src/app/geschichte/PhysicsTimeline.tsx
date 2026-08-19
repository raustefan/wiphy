"use client";

import { useMemo, useState } from "react";
import { Badge, Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import {
  BackpackIcon,
  BarChartIcon,
  CheckCircledIcon,
  Component1Icon,
  HomeIcon,
  LapTimerIcon,
  StarIcon,
} from "@radix-ui/react-icons";

type TimelineCategory = "uni" | "physik" | "wirtschaftsphysik" | "alumni";

type TimelineEvent = {
  id: string;
  year: number;
  label: string;
  title: string;
  category: TimelineCategory;
  summary: string;
  details: string[];
};

const categories: Array<{ id: "alle" | TimelineCategory; label: string }> = [
  { id: "alle", label: "Alle" },
  { id: "uni", label: "Universität Ulm" },
  { id: "physik", label: "Physik" },
  { id: "wirtschaftsphysik", label: "Wirtschaftsphysik" },
  { id: "alumni", label: "Alumni" },
];

const events: TimelineEvent[] = [
  {
    id: "arbeitskreis",
    year: 1960,
    label: "1960",
    title: "Arbeitskreis Universität Ulm",
    category: "uni",
    summary: "Erste Bestrebungen für eine Universität in Ulm nehmen Gestalt an.",
    details: [
      "Ein Arbeitskreis engagiert sich für die Gründung einer Universität in Ulm.",
      "Diese Initiative legt den Grundstein für die Universitätsgründung sieben Jahre später.",
    ],
  },
  {
    id: "uni-ulm",
    year: 1967,
    label: "1967",
    title: "Gründung der Universität Ulm",
    category: "uni",
    summary: "Offizielle Gründungsfeier und Verleihung des Universitätsstatus.",
    details: [
      "25. Februar 1967: Offizielle Gründungsfeier der Medizinisch-Naturwissenschaftlichen Hochschule Ulm.",
      "4. Juli 1967: Der Universität-Status wird verliehen.",
      "Physik gehörte von Anfang an zu den frühen Fachrichtungen der jungen Universität.",
    ],
  },
  {
    id: "eselsberg",
    year: 1969,
    label: "14.7.1969",
    title: "Grundstein auf dem Eselsberg",
    category: "uni",
    summary: "Grundsteinlegung für die Neubauten auf dem Oberen Eselsberg.",
    details: [
      "Am 14. Juli 1969 wird der Grundstein für die Neubauten auf dem Oberen Eselsberg gelegt.",
      "1969/70 nimmt der Lehrbetrieb in Physik und der vorklinischen Medizin seine Arbeit auf.",
    ],
  },
  {
    id: "physik",
    year: 1969,
    label: "1969",
    title: "Start des Studiengangs Physik",
    category: "physik",
    summary: "Physik wird eines der ersten Fächer an der jungen Universität Ulm.",
    details: [
      "Das Physikstudium beginnt als eines der ersten Fächer der Universität Ulm.",
      "2024 wurde das 55-jährige Jubiläum der Physik an der Universität Ulm gefeiert.",
    ],
  },
  {
    id: "wirtschaftsmathematik",
    year: 1977,
    label: "1977",
    title: "Ulmer Vorbild: Wirtschaftsmathematik",
    category: "physik",
    summary: "Ein innovatives Lehrkonzept wird an der Universität Ulm entwickelt.",
    details: [
      "Wirtschaftsmathematik wird als Ulmer Eigenentwicklung eingeführt.",
      "Der Studiengang wurde später von vielen deutschen Hochschulen kopiert und diente als gedankliches Vorbild für Wirtschaftsphysik.",
    ],
  },
  {
    id: "konzeption",
    year: 1998,
    label: "1998",
    title: "Konzeption der Wirtschaftsphysik",
    category: "wirtschaftsphysik",
    summary: "Prof. Wolfgang Hüttners visionäre Idee, Physik und Wirtschaft zu verbinden.",
    details: [
      "Maßgebliche Initiative: Prof. Dr. Wolfgang Hüttner, damaliger Studiendekan Physik.",
      "Das Konzept verbindet Physik, Mathematik, Wirtschaftswissenschaften und Informatik.",
    ],
  },
  {
    id: "start-wiphy",
    year: 1998,
    label: "WS 1998/99",
    title: "Start der Wirtschaftsphysik",
    category: "wirtschaftsphysik",
    summary: "Wirtschaftsphysik startet als Novität in der deutschen Hochschullandschaft.",
    details: [
      "Ursprünglicher Abschluss: Diplom-Wirtschaftsphysiker.",
      "Regelstudienzeit: 9 Semester.",
      "Ulm gilt als Ursprung dieses Studiengangstyps in Deutschland.",
    ],
  },
  {
    id: "curriculum",
    year: 1999,
    label: "Konzept",
    title: "Integriertes Curriculum",
    category: "wirtschaftsphysik",
    summary: "Das Studium verbindet harte Naturwissenschaft mit Wirtschaft und Informatik.",
    details: [
      "Physik und Mathematik machten ungefähr zwei Drittel des Studiums aus.",
      "Wirtschaftswissenschaften lagen bei etwa 20 Prozent, Informatik bei etwa 13 Prozent.",
    ],
  },
  {
    id: "alumni",
    year: 2004,
    label: "6.7.2004",
    title: "Gründung des Alumni-Vereins",
    category: "alumni",
    summary: "Der Wirtschaftsphysik Alumni e.V. wird gegründet.",
    details: [
      "Am 6. Juli 2004 wird der Ehemaligenverein Wirtschaftsphysik Alumni e.V. gegründet.",
      "Ziel: die Studiengänge Physik und Wirtschaftsphysik unterstützen und eine Vernetzung zwischen Studierenden, Alumni, Professoren und der Industrie schaffen.",
      "Der Verein ist seit 2004 im Vereinsregister Ulm eingetragen.",
    ],
  },
  {
    id: "bologna",
    year: 2007,
    label: "2000er",
    title: "Bologna-Reform",
    category: "wirtschaftsphysik",
    summary: "Im Zuge der europaweiten Bologna-Reform werden die Abschlüsse umgestellt.",
    details: [
      "Die Bologna-Reform stellt die Abschlüsse von Diplom auf Bachelor und Master um.",
      "Bachelor of Science: 6 Semester. Master of Science: 4 Semester.",
      "Das Curriculum erhält Wahlpflichtbereiche wie Ökonophysik, Wirtschaftswissenschaften und Fachspezialisierung.",
    ],
  },
  {
    id: "20-jahre-wiphy",
    year: 2018,
    label: "24.11.2018",
    title: "20 Jahre Wirtschaftsphysik",
    category: "alumni",
    summary: "Der Alumni e.V. feiert 20 Jahre Wirtschaftsphysik.",
    details: [
      "Am 24. November 2018 wird das 20-jährige Bestehen des Studiengangs Wirtschaftsphysik gefeiert.",
      "Der Verein hat sich zu einem zentralen Netzwerk für Studierende, Alumni, Professoren und die Industrie entwickelt.",
    ],
  },
  {
    id: "jubiläum-2024",
    year: 2024,
    label: "21.9.2024",
    title: "Dreifaches Jubiläum",
    category: "alumni",
    summary: "55 Jahre Physik, 25 Jahre Wirtschaftsphysik und 20 Jahre Alumni e.V.",
    details: [
      "Am 21. September 2024 wird das dreifache Jubiläum gefeiert: 55 Jahre Physik, 25 Jahre Wirtschaftsphysik, 20 Jahre Alumni e.V.",
      "Außerdem tritt die neue FSPO 2024 für den Master in Kraft.",
      "Wirtschaftsphysik bleibt NC-frei und startet jeweils zum Wintersemester.",
      "Eine aktuelle Herausforderung sind sinkende Studierendenzahlen.",
    ],
  },
];

function categoryLabel(category: TimelineCategory) {
  if (category === "uni") return "Universität Ulm";
  if (category === "physik") return "Physik";
  if (category === "alumni") return "Alumni";
  return "Wirtschaftsphysik";
}

function categoryIcon(category: TimelineCategory) {
  if (category === "uni") return <HomeIcon />;
  if (category === "physik") return <Component1Icon />;
  if (category === "alumni") return <StarIcon />;
  return <BarChartIcon />;
}

function eventProgress(year: number) {
  const min = 1960;
  const max = 2024;
  return ((year - min) / (max - min)) * 100;
}

export function PhysicsTimeline() {
  const [filter, setFilter] = useState<"alle" | TimelineCategory>("alle");
  const [activeId, setActiveId] = useState("jubiläum-2024");

  const visibleEvents = useMemo(
    () => events.filter((event) => filter === "alle" || event.category === filter),
    [filter],
  );

  const activeEvent = visibleEvents.find((event) => event.id === activeId) ?? visibleEvents[0];

  function selectFilter(nextFilter: "alle" | TimelineCategory) {
    setFilter(nextFilter);
    const nextEvent = events.find((event) => nextFilter === "alle" || event.category === nextFilter);
    if (nextEvent) setActiveId(nextEvent.id);
  }

  return (
    <Box className="history-shell">
      <Grid columns={{ initial: "1", lg: "1.1fr 0.9fr" }} gap="5" align="start">
        <Card size="4" className="history-panel">
          <Flex direction="column" gap="4">
            <Flex justify="between" gap="3" align={{ initial: "start", sm: "center" }} wrap="wrap">
              <Box>
                <Flex align="center" gap="2" mb="1">
                  <LapTimerIcon className="history-icon" />
                  <Text size="2" weight="bold" className="history-kicker">
                    Chronologie
                  </Text>
                </Flex>
                <Heading size="6">Meilensteine seit 1960</Heading>
              </Box>

              <Flex gap="2" wrap="wrap">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    type="button"
                    size="2"
                    variant={filter === category.id ? "solid" : "soft"}
                    color={filter === category.id ? undefined : "gray"}
                    onClick={() => selectFilter(category.id)}
                  >
                    {category.label}
                  </Button>
                ))}
              </Flex>
            </Flex>

            <Box className="history-track" aria-label="Zeitleiste">
              {visibleEvents.map((event) => {
                const isActive = event.id === activeEvent.id;
                return (
                  <button
                    key={event.id}
                    type="button"
                    className={`history-event ${isActive ? "history-event-active" : ""}`}
                    style={{ "--event-progress": `${eventProgress(event.year)}%` } as React.CSSProperties}
                    onClick={() => setActiveId(event.id)}
                  >
                    <span className="history-event-dot" />
                    <span className="history-event-year">{event.label}</span>
                    <span className="history-event-title">{event.title}</span>
                  </button>
                );
              })}
            </Box>
          </Flex>
        </Card>

        <Card size="4" className="history-detail">
          <Flex direction="column" gap="4">
            <Flex justify="between" align="start" gap="3">
              <Box>
                <Badge color="blue" variant="soft" size="2">
                  {categoryIcon(activeEvent.category)}
                  {categoryLabel(activeEvent.category)}
                </Badge>
                <Heading size="7" mt="3" mb="2">
                  {activeEvent.title}
                </Heading>
                <Text size="5" color="gray" className="history-summary">
                  {activeEvent.summary}
                </Text>
              </Box>
              <Text className="history-year">{activeEvent.label}</Text>
            </Flex>

            <Flex direction="column" gap="3">
              {activeEvent.details.map((detail) => (
                <Flex key={detail} gap="2" align="start">
                  <CheckCircledIcon className="history-check" />
                  <Text size="3">{detail}</Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Card>
      </Grid>

      <Grid columns={{ initial: "1", md: "3" }} gap="4" mt="5">
        <Card size="3" className="history-fact">
          <HomeIcon className="history-fact-icon" />
          <Heading size="4" mb="2">Verein im Register</Heading>
          <Text color="gray" size="2">
            Seit 2004 ist der Wirtschaftsphysik Alumni e.V. im Vereinsregister Ulm eingetragen.
          </Text>
        </Card>
        <Card size="3" className="history-fact">
          <BackpackIcon className="history-fact-icon" />
          <Heading size="4" mb="2">NC-frei</Heading>
          <Text color="gray" size="2">
            Wirtschaftsphysik ist aktuell weiterhin ohne Numerus Clausus und startet jeweils zum Wintersemester.
          </Text>
        </Card>
        <Card size="3" className="history-fact">
          <StarIcon className="history-fact-icon" />
          <Heading size="4" mb="2">Drei Jubiläen</Heading>
          <Text color="gray" size="2">
            2024 verband 55 Jahre Physik, 25 Jahre Wirtschaftsphysik und 20 Jahre Alumni e.V.
          </Text>
        </Card>
      </Grid>
    </Box>
  );
}
