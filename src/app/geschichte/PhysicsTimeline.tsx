"use client";

import { useMemo, useState } from "react";
import { Badge, Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import {
  BackpackIcon,
  BarChartIcon,
  CheckCircledIcon,
  Component1Icon,
  LapTimerIcon,
  StarIcon,
} from "@radix-ui/react-icons";

type TimelineCategory = "physik" | "wirtschaftsphysik" | "alumni";

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
  { id: "physik", label: "Physik" },
  { id: "wirtschaftsphysik", label: "Wirtschaftsphysik" },
  { id: "alumni", label: "Alumni" },
];

const events: TimelineEvent[] = [
  {
    id: "uni-ulm",
    year: 1967,
    label: "1967",
    title: "Gründung der Universität Ulm",
    category: "physik",
    summary: "Die Universität Ulm entsteht als junge Forschungsuniversität.",
    details: [
      "Physik gehörte zu den frühen Fachrichtungen der Universität.",
      "Damit war der Boden für den späteren Ausbau naturwissenschaftlicher Studiengänge gelegt.",
    ],
  },
  {
    id: "physik",
    year: 1969,
    label: "~1969",
    title: "Start des Studiengangs Physik",
    category: "physik",
    summary: "Der Studiengang Physik wird an der Universität Ulm etabliert.",
    details: [
      "2024 wurde das 55-jährige Jubiläum der Physik an der Universität Ulm gefeiert.",
      "Physik prägt seit den frühen Jahren das naturwissenschaftliche Profil der Universität.",
    ],
  },
  {
    id: "wirtschaftsmathematik",
    year: 1977,
    label: "1977",
    title: "Ulmer Vorbild: Wirtschaftsmathematik",
    category: "wirtschaftsphysik",
    summary: "Wirtschaftsmathematik wird als Ulmer Eigenentwicklung eingeführt.",
    details: [
      "Der Studiengang wurde später von vielen deutschen Hochschulen kopiert.",
      "Dieses Erfolgsmodell diente als gedankliches Vorbild für Wirtschaftsphysik.",
    ],
  },
  {
    id: "konzeption",
    year: 1998,
    label: "1998",
    title: "Konzeption der Wirtschaftsphysik",
    category: "wirtschaftsphysik",
    summary: "Ein neuer integrierter Studiengang wird entworfen.",
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
    label: "2004",
    title: "Gründung des Alumni-Vereins",
    category: "alumni",
    summary: "Der Wirtschaftsphysik Alumni e. V. wird gegründet.",
    details: [
      "Der Verein verbindet Ehemalige, Studierende und die Studiengänge.",
      "2024 feierte der Alumni e. V. sein 20-jähriges Jubiläum.",
    ],
  },
  {
    id: "bologna",
    year: 2007,
    label: "2000er",
    title: "Bologna-Reform",
    category: "wirtschaftsphysik",
    summary: "Die Abschlüsse werden von Diplom auf Bachelor und Master umgestellt.",
    details: [
      "Bachelor of Science: 6 Semester.",
      "Master of Science: 4 Semester.",
      "Das Curriculum erhält Wahlpflichtbereiche wie Ökonophysik, Wirtschaftswissenschaften und Fachspezialisierung.",
    ],
  },
  {
    id: "fspo-2019",
    year: 2019,
    label: "2019",
    title: "Neue FSPO für den Master",
    category: "wirtschaftsphysik",
    summary: "Die Fachspezifische Studien- und Prüfungsordnung 2019 wird eingeführt.",
    details: [
      "Der Masterstudiengang erhält eine aktualisierte Studien- und Prüfungsordnung.",
      "Die Weiterentwicklung des Curriculums bleibt damit Teil der Studiengangsgeschichte.",
    ],
  },
  {
    id: "jubiläum-2024",
    year: 2024,
    label: "2024",
    title: "Dreifaches Jubiläum",
    category: "alumni",
    summary: "55 Jahre Physik, 25 Jahre Wirtschaftsphysik und 20 Jahre Alumni e. V.",
    details: [
      "Außerdem tritt die neue FSPO 2024 für den Master in Kraft.",
      "Wirtschaftsphysik bleibt NC-frei und startet jeweils zum Wintersemester.",
      "Eine aktuelle Herausforderung sind sinkende Studierendenzahlen.",
    ],
  },
];

function categoryLabel(category: TimelineCategory) {
  if (category === "physik") return "Physik";
  if (category === "alumni") return "Alumni";
  return "Wirtschaftsphysik";
}

function categoryIcon(category: TimelineCategory) {
  if (category === "physik") return <Component1Icon />;
  if (category === "alumni") return <StarIcon />;
  return <BarChartIcon />;
}

function eventProgress(year: number) {
  const min = 1967;
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
                <Heading size="6">Meilensteine seit 1967</Heading>
              </Box>

              <Flex gap="2" wrap="wrap">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    type="button"
                    size="2"
                    variant={filter === category.id ? "solid" : "soft"}
                    color={filter === category.id ? "teal" : "gray"}
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
                <Badge color="teal" variant="soft" size="2">
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
          <BackpackIcon className="history-fact-icon" />
          <Heading size="4" mb="2">NC-frei</Heading>
          <Text color="gray" size="2">
            Wirtschaftsphysik ist aktuell weiterhin ohne Numerus Clausus und startet jeweils zum Wintersemester.
          </Text>
        </Card>
        <Card size="3" className="history-fact">
          <BarChartIcon className="history-fact-icon" />
          <Heading size="4" mb="2">Ulmer Ursprung</Heading>
          <Text color="gray" size="2">
            Ulm gilt als Ursprung des Studiengangstyps Wirtschaftsphysik in Deutschland.
          </Text>
        </Card>
        <Card size="3" className="history-fact">
          <StarIcon className="history-fact-icon" />
          <Heading size="4" mb="2">Drei Jubiläen</Heading>
          <Text color="gray" size="2">
            2024 verband 55 Jahre Physik, 25 Jahre Wirtschaftsphysik und 20 Jahre Alumni e. V.
          </Text>
        </Card>
      </Grid>
    </Box>
  );
}
