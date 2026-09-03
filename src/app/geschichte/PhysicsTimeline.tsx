"use client";

import { useMemo, useState } from "react";
import {
  Atom,
  Backpack,
  CheckCircle2,
  History,
  Home,
  Star,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

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

function categoryIcon(category: TimelineCategory, size = 13) {
  if (category === "uni") return <Home size={size} aria-hidden="true" />;
  if (category === "physik") return <Atom size={size} aria-hidden="true" />;
  if (category === "alumni") return <Star size={size} aria-hidden="true" />;
  return <TrendingUp size={size} aria-hidden="true" />;
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
    <div className="grid gap-5">
      <div className="grid items-start gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ---------- Chronologie ---------- */}
        <Card className="p-5 sm:p-7">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] text-physics uppercase">
                <History size={14} aria-hidden="true" />
                Chronologie
              </div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Meilensteine seit 1960
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={filter === category.id}
                  onClick={() => selectFilter(category.id)}
                  className={cn(
                    "min-h-9 cursor-pointer rounded-full border px-3.5 text-[13px] font-semibold transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
                    filter === category.id
                      ? "border-physics bg-physics text-on-physics"
                      : "border-line-strong bg-transparent text-muted hover:bg-raised hover:text-foreground",
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zeitleiste */}
          <div className="relative grid gap-1 py-1" aria-label="Zeitleiste">
            <div
              aria-hidden="true"
              className="absolute top-4 bottom-4 left-[15px] w-0.5 rounded-full bg-gradient-to-b from-physics/40 via-physics to-market/60"
            />
            {visibleEvents.map((event) => {
              const isActive = event.id === activeEvent.id;
              return (
                <button
                  key={event.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveId(event.id)}
                  className={cn(
                    "relative grid min-h-11 cursor-pointer grid-cols-1 gap-0 rounded-xl border py-2 pr-3 pl-10 text-left transition-colors sm:grid-cols-[88px_1fr] sm:items-center sm:gap-4",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
                    isActive
                      ? "border-physics/40 bg-physics/8"
                      : "border-transparent hover:bg-raised",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-1/2 left-2 size-3.5 -translate-y-1/2 rounded-full border-2 border-surface transition-shadow",
                      isActive
                        ? "bg-physics ring-4 ring-physics/25"
                        : "bg-line-strong",
                    )}
                  />
                  <span className="font-mono text-xs font-bold text-physics">
                    {event.label}
                  </span>
                  <span className="text-[15px] font-semibold">{event.title}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* ---------- Detail ---------- */}
        <Card className="p-5 sm:p-7 lg:sticky lg:top-24">
          <div className="mb-4 flex items-start justify-between gap-3">
            <Badge tone="physics">
              {categoryIcon(activeEvent.category)}
              {categoryLabel(activeEvent.category)}
            </Badge>
            <span className="font-mono text-2xl leading-none font-extrabold text-physics/60 sm:text-3xl">
              {activeEvent.label}
            </span>
          </div>

          <h2 className="mb-2 text-xl font-bold tracking-tight text-balance sm:text-3xl">
            {activeEvent.title}
          </h2>
          <p className="mb-5 leading-relaxed text-muted">{activeEvent.summary}</p>

          <ul className="grid gap-2.5">
            {activeEvent.details.map((detail) => (
              <li key={detail} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <CheckCircle2
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-physics"
                />
                {detail}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ---------- Fakten ---------- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-6">
          <Home size={26} aria-hidden="true" className="mb-4 text-physics" />
          <h3 className="mb-2 font-bold">Verein im Register</h3>
          <p className="text-sm leading-relaxed text-muted">
            Seit 2004 ist der Wirtschaftsphysik Alumni e.V. im Vereinsregister Ulm
            eingetragen.
          </p>
        </Card>
        <Card className="p-6">
          <Backpack size={26} aria-hidden="true" className="mb-4 text-physics" />
          <h3 className="mb-2 font-bold">NC-frei</h3>
          <p className="text-sm leading-relaxed text-muted">
            Wirtschaftsphysik ist aktuell weiterhin ohne Numerus Clausus und
            startet jeweils zum Wintersemester.
          </p>
        </Card>
        <Card className="p-6">
          <Star size={26} aria-hidden="true" className="mb-4 text-physics" />
          <h3 className="mb-2 font-bold">Drei Jubiläen</h3>
          <p className="text-sm leading-relaxed text-muted">
            2024 verband 55 Jahre Physik, 25 Jahre Wirtschaftsphysik und 20 Jahre
            Alumni e.V.
          </p>
        </Card>
      </div>
    </div>
  );
}
