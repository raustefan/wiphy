import { Card, Container } from "@/components/ui";

/**
 * Platzhalter im Zuschnitt der echten Übersicht — Aufmacher oben, darunter das
 * zweispaltige Raster. Dadurch springt beim Eintreffen der Beiträge nichts,
 * was ein zentrierter Ladekreis (`app/loading.tsx`) nicht leisten würde.
 */
export default function BlogLoading() {
    return (
        <Container size="4" className="py-8 sm:py-12">
            <div className="animate-pulse" role="status" aria-label="Beiträge werden geladen">
                <div className="mb-3 h-3 w-32 rounded-full bg-raised" />
                <div className="h-11 w-72 max-w-full rounded-lg bg-raised" />
                <div className="mt-4 h-4 w-96 max-w-full rounded-full bg-raised" />

                <div className="mt-8 h-11 w-full rounded-full bg-raised sm:mt-10" />

                <Card className="mt-6 overflow-hidden">
                    <div className="aspect-[16/7] w-full bg-raised" />
                    <div className="grid gap-3 p-5 sm:p-8">
                        <div className="h-8 w-3/4 rounded-lg bg-raised" />
                        <div className="h-3 w-1/2 rounded-full bg-raised" />
                        <div className="h-4 w-full rounded-full bg-raised" />
                    </div>
                </Card>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[0, 1, 2, 3].map((i) => (
                        <Card key={i} className="overflow-hidden">
                            <div className="aspect-[16/9] w-full bg-raised" />
                            <div className="grid gap-2 p-5 sm:p-6">
                                <div className="h-3 w-2/3 rounded-full bg-raised" />
                                <div className="h-5 w-4/5 rounded-lg bg-raised" />
                                <div className="h-3 w-full rounded-full bg-raised" />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Container>
    );
}
