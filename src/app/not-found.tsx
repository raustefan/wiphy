import type { Metadata } from "next";
import { Cta, Frame } from "@/components/Site";
import LorenzAttractor from "@/components/LorenzAttractorLazy";

export const metadata: Metadata = { title: "Seite nicht gefunden" };

export default function NotFound() {
    return (
        <div className="relative isolate overflow-hidden">
            <LorenzAttractor />
            {/* Weiches Zentrum, damit der Text über den Bahnen lesbar bleibt. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(34% 30% at 50% 50%, color-mix(in srgb, var(--background) 85%, transparent) 0%, transparent 100%)",
                }}
            />
            <Frame className="relative grid place-items-center py-24 sm:py-32">
                <div className="grid max-w-xl justify-items-center gap-5 text-center">
                    <p aria-hidden="true" className="display text-[clamp(6rem,20vw,11rem)] text-physics italic">
                        404
                    </p>
                    <h1 className="headline text-3xl sm:text-4xl">Seite nicht gefunden</h1>
                    <p className="text-lg leading-relaxed text-muted text-pretty">
                        Diese Adresse führt ins Leere — die Seite wurde verschoben oder es hat sich ein
                        Tippfehler eingeschlichen. Wie die Bahnen dahinter: nie zweimal dieselbe, aber
                        immer in der Nähe des Ziels.
                    </p>
                    <div className="mt-3 flex flex-col gap-3 min-[420px]:flex-row">
                        <Cta href="/" arrow>
                            Zur Startseite
                        </Cta>
                        <Cta href="/kontakt" variant="line">
                            Fehler melden
                        </Cta>
                    </div>
                </div>
            </Frame>
        </div>
    );
}
