"use client";

import { useEffect } from "react";
import { Button, ButtonLink, Container, PageTitle } from "@/components/ui";

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
        <Container size="1" className="grid place-items-center py-24 sm:py-32">
            <div className="grid justify-items-center gap-4 text-center">
                <p className="font-mono text-sm font-semibold tracking-widest text-physics uppercase">
                    Fehler
                </p>
                <PageTitle>Da ist etwas schiefgelaufen</PageTitle>
                <p className="max-w-prose text-muted text-pretty">
                    Die Seite konnte nicht geladen werden. Bitte versuche es noch einmal — bleibt
                    es dabei, hilft eine kurze Nachricht über das Kontaktformular.
                </p>
                {error.digest && (
                    <p className="font-mono text-xs text-faint">Kennung: {error.digest}</p>
                )}
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                    <Button size="lg" onClick={reset}>
                        Erneut versuchen
                    </Button>
                    <ButtonLink href="/" size="lg" variant="soft" color="neutral">
                        Zur Startseite
                    </ButtonLink>
                </div>
            </div>
        </Container>
    );
}
