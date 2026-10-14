import { Frame } from "@/components/Site";

/**
 * Platzhalter im Zuschnitt der echten Übersicht — Kopf, Suchzeile, Aufmacher
 * und Inhaltsverzeichnis. Dadurch springt beim Eintreffen der Beiträge
 * nichts, was ein zentrierter Ladekreis (`app/loading.tsx`) nicht leisten würde.
 */
export default function BlogLoading() {
    return (
        <Frame className="animate-pulse pt-12 pb-20 sm:pt-20" role="status" aria-label="Beiträge werden geladen">
            <div className="h-20 w-56 max-w-full rounded-[3px] bg-raised" />
            <div className="mt-6 h-5 w-[32rem] max-w-full rounded-[3px] bg-raised" />
            <div className="mt-14 h-12 w-full border-b border-line-strong" />
            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
                <div className="aspect-[3/2] w-full rounded-[3px] bg-raised" />
                <div className="grid content-center gap-4">
                    <div className="h-12 w-4/5 rounded-[3px] bg-raised" />
                    <div className="h-4 w-1/2 rounded-[3px] bg-raised" />
                    <div className="h-4 w-full rounded-[3px] bg-raised" />
                </div>
            </div>
            <div className="mt-16 grid gap-0 border-t border-line lg:ml-[25%]">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="grid gap-2 border-b border-line py-8">
                        <div className="h-3 w-48 rounded-[3px] bg-raised" />
                        <div className="h-7 w-3/4 rounded-[3px] bg-raised" />
                    </div>
                ))}
            </div>
        </Frame>
    );
}
