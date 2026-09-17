import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Lead } from "@/components/ui";
import PhysicsHero from "@/components/PhysicsHeroLazy";
import { PhysicsTimeline } from "./PhysicsTimeline";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Geschichte der Physik und Wirtschaftsphysik in Ulm",
  description: "Interaktive Zeitleiste zur Physik und Wirtschaftsphysik an der Universität Ulm.",
  path: "/geschichte",
});

export default function GeschichtePage() {
  return (
    <div className="grid gap-10 py-8 sm:gap-12 sm:py-12">
      {/* ---------- Hero ---------- */}
      <Container size="4">
        <section className="relative overflow-hidden rounded-3xl border border-line bg-surface">
          <PhysicsHero />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(62% 58% at 50% 46%, var(--background) 0%, color-mix(in srgb, var(--background) 55%, transparent) 45%, transparent 78%)",
            }}
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-14 text-center sm:py-20">
            <Eyebrow className="justify-center">
              Seit 1960 gewachsen, seit 2004 organisiert
            </Eyebrow>

            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Unsere Geschichte
            </h1>

            <Lead className="max-w-xl">
              Von den ersten Bestrebungen für eine Universität in Ulm bis zum
              dreifachen Jubiläum 2024: eine interaktive Zeitleiste über die
              Universität Ulm, die Physik, die Wirtschaftsphysik und den
              Alumni-Verein.
            </Lead>
          </div>
        </section>
      </Container>

      {/* ---------- Timeline ---------- */}
      <Container size="4" className="pb-4">
        <PhysicsTimeline />
      </Container>
    </div>
  );
}
