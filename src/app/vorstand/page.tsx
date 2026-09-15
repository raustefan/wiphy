import type { Metadata } from "next";
import { Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/metadata";
import { getPublicMembers } from "@/lib/server/services/boardService";
import { boardPhotoUrl } from "@/lib/boardImages";

const TITLE = "Vorstand";
const DESCRIPTION =
  "Der gewählte Vorstand des WirtschaftsPhysik Alumni e.V. — Vorsitz, Finanzen, Schriftführung sowie Medien & IT, mit Kontaktmöglichkeit über den Verein.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/vorstand",
});

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function VorstandPage() {
  const vorstand = await getPublicMembers();

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

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
        {vorstand.map((entry) => (
          <li key={entry.id}>
            <Card className="flex h-full flex-col items-center gap-3 p-4 text-center transition-shadow hover:shadow-lg sm:gap-4 sm:p-7">
              {/* Der Farbring greift die beiden Akzente des Logos auf und hebt
                  das Foto von der ruhigen Kartenfläche ab. */}
              <div className="rounded-full bg-gradient-to-br from-physics/35 to-market/25 p-[3px]">
                {entry.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={boardPhotoUrl(entry.photo.id)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-20 rounded-full border-2 border-surface object-cover sm:size-28"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="grid size-20 place-items-center rounded-full border-2 border-surface bg-gradient-to-br from-physics/15 to-market/10 text-xl font-bold tracking-wide sm:size-28 sm:text-3xl"
                  >
                    {getInitials(entry.name)}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <p className="text-sm font-bold tracking-tight text-balance sm:text-lg">
                  {entry.name}
                </p>
                <Badge tone="physics" className="whitespace-normal">
                  {entry.role}
                </Badge>
              </div>

              {entry.linkedin && (
                <a
                  href={entry.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${entry.name} auf LinkedIn`}
                  className="mt-auto grid size-10 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors hover:border-physics/40 hover:bg-physics/10 hover:text-physics focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                >
                  <LinkedInGlyph />
                </a>
              )}
            </Card>
          </li>
        ))}
      </ul>

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
