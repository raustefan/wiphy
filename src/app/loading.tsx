import { Container, Spinner } from "@/components/ui";

/**
 * Wird gezeigt, solange eine Seite auf dem Server noch auf ihre Daten wartet.
 *
 * Ohne sie bleibt beim Wechsel auf eine datenlastige Seite die *alte* Seite
 * stehen, bis alles fertig ist — auf einer langsamen Verbindung sieht das aus,
 * als hätte der Klick nicht funktioniert. Einzelne Bereiche dürfen das hier mit
 * einem eigenen `loading.tsx` überschreiben.
 */
export default function Loading() {
    return (
        <Container size="1" className="grid place-items-center py-24 sm:py-32">
            <p
                role="status"
                className="flex items-center gap-3 text-sm font-semibold text-muted"
            >
                <Spinner className="size-5 text-physics" />
                Wird geladen …
            </p>
        </Container>
    );
}
