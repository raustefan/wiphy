import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow, PageTitle } from "@/components/ui";
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
            <Container size="1" className="relative grid place-items-center py-24 sm:py-32">
                <div className="grid justify-items-center gap-4 text-center">
                    <Eyebrow className="justify-center">Fehler 404</Eyebrow>
                    <PageTitle>
                        Seite nicht gefunden
                    </PageTitle>
                    <p className="max-w-prose text-muted text-pretty">
                        Die aufgerufene Seite existiert nicht oder wurde verschoben.
                    </p>
                    <ButtonLink href="/" size="lg" className="mt-2">
                        Zurück zur Startseite
                    </ButtonLink>
                </div>
            </Container>
        </div>
    );
}
