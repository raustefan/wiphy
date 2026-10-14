import type { Metadata } from "next";
import { Frame, PageHead } from "@/components/Site";
import { PhysicsTimeline } from "./PhysicsTimeline";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Geschichte der Physik und Wirtschaftsphysik in Ulm",
  description: "Zeitleiste zur Physik und Wirtschaftsphysik an der Universität Ulm und zum Alumni-Verein.",
  path: "/geschichte",
});

const facts = [
  {
    term: "Eingetragener Verein",
    body: "Seit 2004 steht der Wirtschaftsphysik Alumni e. V. im Vereinsregister Ulm.",
  },
  {
    term: "Ohne Numerus clausus",
    body: "Wirtschaftsphysik ist weiterhin zulassungsfrei und beginnt jeweils zum Wintersemester.",
  },
  {
    term: "Drei Jubiläen",
    body: "2024 fielen 55 Jahre Physik, 25 Jahre Wirtschaftsphysik und 20 Jahre Alumni-Verein zusammen.",
  },
];

export default function GeschichtePage() {
  return (
    <>
      <PageHead
        title="Geschichte"
        note="Ulm gilt als Ursprung des Studiengangs Wirtschaftsphysik in Deutschland — 1998 war er hier eine Neuheit."
      >
        Von einem Arbeitskreis, der 1960 eine Universität für Ulm forderte, bis zum dreifachen
        Jubiläum 2024: wie Physik und Wirtschaftsphysik in Ulm gewachsen sind und wie daraus
        unser Verein wurde.
      </PageHead>

      <Frame className="pb-20 sm:pb-28">
        <PhysicsTimeline />

        <section aria-labelledby="facts-title" className="mt-20 grid gap-2 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <h2 id="facts-title" className="headline text-3xl">
            Heute
          </h2>
          <dl className="border-t border-line">
            {facts.map((fact) => (
              <div key={fact.term} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8">
                <dt className="font-serif text-xl italic">{fact.term}</dt>
                <dd className="leading-relaxed text-muted text-pretty">{fact.body}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Frame>
    </>
  );
}
