"use client";

import { useEffect } from "react";
import { Cta, Frame } from "@/components/Site";
import LorenzAttractor from "@/components/LorenzAttractorLazy";

/**
 * Auffangseite für unbehandelte Fehler auf dem Server oder beim Rendern.
 *
 * Ohne sie landet jede Ausnahme auf Nexts eigener Fehlerseite — außerhalb von
 * Kopf- und Fußzeile, auf Englisch und ohne Weg zurück. Hier bleibt das Layout
 * stehen und es gibt zwei Ausgänge: erneut versuchen (`reset()` rendert das
 * Segment neu, hilft bei einem kurzzeitigen Datenbankfehler) oder zur
 * Startseite.
 *
 * Bewusst *keine* Fehlermeldung im Klartext: die kann Pfade, SQL oder
 * Personendaten enthalten. Die `digest` ist die Kennung, unter der Next die
 * echte Meldung ins Serverlog schreibt — damit lässt sich ein gemeldeter
 * Vorfall dort wiederfinden.
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

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
                    <h1 className="display text-[clamp(2.75rem,8vw,4.5rem)]">Da ist etwas schiefgelaufen</h1>
                    <p className="text-lg leading-relaxed text-muted text-pretty">
                        Die Seite konnte nicht geladen werden. Versuch es noch einmal — bleibt es
                        dabei, hilft uns eine kurze Nachricht über das Kontaktformular.
                    </p>
                    {error.digest && (
                        <p className="font-serif text-sm text-faint italic">Kennung: {error.digest}</p>
                    )}
                    <div className="mt-3 flex flex-col gap-3 min-[420px]:flex-row">
                        <button type="button" onClick={reset} className="cta cta-solid">
                            Erneut versuchen
                        </button>
                        <Cta href="/" variant="line">
                            Zur Startseite
                        </Cta>
                    </div>
                </div>
            </Frame>
        </div>
    );
}
