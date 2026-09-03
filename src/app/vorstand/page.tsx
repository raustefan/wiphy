import { Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

const vorstand = [
  {
    name: "Nikolas Tomek",
    role: "1. Vorstandsvorsitzender",
    linkedin: "https://www.linkedin.com/in/nikolas-tomek/",
  },
  {
    name: "Jannes Weghake",
    role: "2. Vorstandsvorsitzender",
    linkedin: "https://www.linkedin.com/in/jannes-weghake-317b95274/",
  },
  {
    name: "Carsten Schäfer-Siebert",
    role: "Finanzen",
    linkedin: "https://www.linkedin.com/in/carsten-sch%C3%A4fer-siebert/",
  },
  {
    name: "Stefan Rau",
    role: "Medien & IT",
    linkedin: "https://www.linkedin.com/in/stefan-rau-91243721a/",
  },
  {
    name: "Andreas Dietrich",
    role: "Schriftführer",
    linkedin: "https://www.linkedin.com/in/andreas-dietrich-3934282a6/",
  },
  { name: "André Knoll", role: "Fachschaftsbotschafter" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function VorstandPage() {
  return (
    <Container size="3" className="py-10 sm:py-14">
      <div className="mb-8 flex flex-col items-center gap-2 text-center sm:mb-10">
        <p className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.16em] text-physics uppercase">
          <Users size={14} aria-hidden="true" />
          Der Verein
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Vorstand</h1>
        <p className="max-w-md text-base text-muted">
          Aktuelle Besetzung des Vorstands
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {vorstand.map((entry) => (
          <Card
            key={entry.name}
            className="flex flex-col items-center gap-3 p-5 text-center transition-shadow hover:shadow-md sm:p-7"
          >
            <div
              aria-hidden="true"
              className="grid size-14 place-items-center rounded-full border border-line-strong bg-gradient-to-br from-physics/20 to-market/15 text-base font-bold tracking-wide sm:size-16 sm:text-lg"
            >
              {getInitials(entry.name)}
            </div>
            <div>
              <p className="text-sm font-bold sm:text-base">{entry.name}</p>
              <p className="mt-1 text-sm text-muted">{entry.role}</p>
            </div>
            {entry.linkedin && (
              <a
                href={entry.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${entry.name} auf LinkedIn`}
                className="grid size-10 cursor-pointer place-items-center rounded-full text-physics transition-colors hover:bg-physics/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
              >
                <LinkedInGlyph />
              </a>
            )}
          </Card>
        ))}
      </div>
    </Container>
  );
}

/**
 * lucide-react führt seit v1 keine Marken-Icons mehr — das LinkedIn-Zeichen
 * liegt deshalb als schlankes Inline-SVG hier.
 */
function LinkedInGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.25 8.4h3.5V21h-3.5V8.4Zm6.06 0h3.35v1.72h.05c.47-.85 1.6-1.75 3.3-1.75 3.53 0 4.19 2.2 4.19 5.07V21h-3.5v-6.16c0-1.47-.03-3.36-2.09-3.36-2.09 0-2.41 1.6-2.41 3.25V21h-3.5V8.4Z" />
    </svg>
  );
}
