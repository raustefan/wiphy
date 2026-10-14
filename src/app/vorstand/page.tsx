import type { Metadata } from "next";
import Link from "next/link";
import { Frame, LinkedInGlyph, PageHead } from "@/components/Site";
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
    <>
      <PageHead
        title="Vorstand"
        note={
          <>
            Gewählt von der Mitgliederversammlung. Fragen an den Vorstand gehen am schnellsten
            über das{" "}
            <Link href="/kontakt" className="link">
              Kontaktformular
            </Link>
            .
          </>
        }
      >
        Diese Menschen halten den Verein am Laufen: Sie planen Termine, betreuen Mitglieder und
        Finanzen und entscheiden über Aufnahmeanträge.
      </PageHead>

      <Frame className="pb-24 sm:pb-36">
        {/* Zwei versetzte Spalten: die rechte sitzt eine halbe Zeile tiefer. */}
        <ul className="grid gap-x-16 gap-y-12 border-t border-line pt-12 md:grid-cols-2 md:pb-28">
          {vorstand.map((entry) => (
            <li
              key={entry.id}
              className="grid grid-cols-[6rem_minmax(0,1fr)] items-end gap-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-7 md:even:translate-y-28"
            >
              {entry.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={boardPhotoUrl(entry.photo.id)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full rounded-[3px] object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="paper grid aspect-[4/5] w-full place-items-center rounded-[3px] border border-line font-serif text-4xl text-muted italic sm:text-5xl"
                >
                  {getInitials(entry.name)}
                </div>
              )}

              <div className="min-w-0 border-b border-foreground pb-4">
                <p className="font-serif text-lg text-physics italic">{entry.role}</p>
                <h2 className="headline mt-1 text-2xl sm:text-3xl">{entry.name}</h2>
                {entry.linkedin && (
                  <a
                    href={entry.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-sm text-sm font-medium text-muted transition-colors hover:text-physics focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                  >
                    <LinkedInGlyph size={16} />
                    LinkedIn
                    <span className="sr-only"> von {entry.name}</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Frame>
    </>
  );
}
