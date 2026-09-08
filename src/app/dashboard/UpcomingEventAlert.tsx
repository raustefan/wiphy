import { CalendarPlus, MapPin } from "lucide-react";
import { Badge, ButtonLink, Card } from "@/components/ui";
import { EventDateCube } from "@/components/EventCard";
import {
    eventIcsPath,
    eventPath,
    formatCountdown,
    formatEventRange,
    UPCOMING_ALERT_MONTHS,
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
 * Steht ganz oben und ist die einzige Karte in Ruby statt Teal: Termine sind
 * das einzige hier, das ein Ablaufdatum hat — wer sie übersieht, kann sie nicht
 * nachholen.
 */
export function UpcomingEventAlert({ event }: { event: DashboardEvent }) {
    const countdown = formatCountdown(event);
    const place = [event.location, event.address].filter(Boolean)[0];

    return (
        <Card className="relative mb-6 overflow-hidden border-market/25 sm:mb-8">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(85% 130% at 6% 0%, color-mix(in srgb, var(--market) 12%, transparent), transparent 62%)",
                }}
            />
            <div className="relative grid gap-4 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="market">Demnächst</Badge>
                    {countdown && <Badge>{countdown}</Badge>}
                </div>

                <div className="flex gap-4">
                    <EventDateCube date={event.start} />
                    <div className="grid min-w-0 flex-1 content-start gap-1">
                        <h2 className="text-lg font-bold tracking-tight text-balance sm:text-xl">
                            {event.title}
                        </h2>
                        <p className="font-mono text-xs text-faint">{formatEventRange(event)}</p>
                        {place && (
                            <p className="flex items-center gap-1.5 text-xs text-faint">
                                <MapPin size={13} aria-hidden="true" className="shrink-0" />
                                <span className="truncate">{place}</span>
                            </p>
                        )}
                        {event.summary && (
                            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
                                {event.summary}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3 min-[420px]:flex-row">
                    <ButtonLink href={eventPath(event.id)} color="market">
                        Zum Termin
                    </ButtonLink>
                    <ButtonLink
                        href={eventIcsPath(event.id)}
                        variant="soft"
                        color="neutral"
                        prefetch={false}
                    >
                        <CalendarPlus size={16} aria-hidden="true" /> In meinen Kalender
                    </ButtonLink>
                </div>

            </div>
        </Card>
    );
}
