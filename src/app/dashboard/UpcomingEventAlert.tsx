import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { EventDateCube } from "@/components/EventCard";
import {
    eventPath,
    formatCountdown,
    formatEventClock,
    formatEventDay,
    type EventTiming,
} from "@/lib/events";

export type DashboardEvent = EventTiming & {
    id: string;
    title: string;
    summary: string;
    location: string;
    address: string;
};

/**
 * Der Hinweis auf den nächsten Termin im Mitgliederbereich.
 *
 * Die einzige Karte in Ruby statt Teal: Termine sind das einzige hier, das ein
 * Ablaufdatum hat — wer sie übersieht, kann sie nicht nachholen. Den Abstand
 * nach unten setzt das Raster der Seite, nicht die Karte selbst.
 *
 * Sie steht in der schmalen Seitenspalte, deshalb ist alles darauf ausgelegt,
 * mit rund 290 Nutzbreite auszukommen:
 *
 *   · Neben dem Datumswürfel steht nur noch die Uhrzeit. Der volle Zeitraum
 *     („Mittwoch, 11. November 2026, 19:00–21:00 Uhr“) wiederholte das Datum,
 *     das im Würfel daneben schon steht, und lief dabei über drei Zeilen.
 *   · Der Anrisstext sitzt unter dem Würfel statt rechts daneben und hat damit
 *     die volle Kartenbreite.
 *   · Statt zweier Knöpfe ein Pfeil-Link wie auf den Einstiegskacheln. Die
 *     Kalenderdatei gibt es weiterhin auf der Terminseite selbst — hier kostete
 *     der zweite Knopf eine ganze Zeile für den selteneren Weg.
 */
export function UpcomingEventAlert({ event }: { event: DashboardEvent }) {
    const countdown = formatCountdown(event);
    const place = [event.location, event.address].filter(Boolean)[0];

    return (
        <Card className="relative overflow-hidden border-market/25">
            {/* Farbschleier, rein dekorativ. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(85% 130% at 6% 0%, color-mix(in srgb, var(--market) 12%, transparent), transparent 62%)",
                }}
            />
            <div className="relative grid gap-3 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="market">Demnächst</Badge>
                    {countdown && <Badge>{countdown}</Badge>}
                </div>

                <div className="flex items-start gap-3">
                    <EventDateCube date={event.start} />
                    <div className="grid min-w-0 flex-1 content-start gap-1">
                        <h2 className="text-lg font-bold tracking-tight text-balance">
                            {event.title}
                        </h2>
                        <p className="font-mono text-xs text-faint">{formatEventClock(event)}</p>
                        {place && (
                            <p className="flex items-center gap-1.5 text-xs text-faint">
                                <MapPin size={13} aria-hidden="true" className="shrink-0" />
                                <span className="truncate">{place}</span>
                            </p>
                        )}
                    </div>
                </div>

                {event.summary && (
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                        {event.summary}
                    </p>
                )}

                {/* Das volle Datum steht im Würfel nur abgekürzt — für
                    Screenreader gehört es einmal ausgeschrieben an den Link,
                    sonst hieße die einzige Aktion der Karte bloß „Zum Termin“. */}
                <Link
                    href={eventPath(event.id)}
                    className="group inline-flex w-fit items-center gap-2 rounded-lg text-sm font-semibold text-market transition-colors hover:text-market/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-market"
                >
                    Zum Termin
                    <span className="sr-only">
                        {" "}
                        am {formatEventDay(event.start)}: {event.title}
                    </span>
                    <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                </Link>
            </div>
        </Card>
    );
}
