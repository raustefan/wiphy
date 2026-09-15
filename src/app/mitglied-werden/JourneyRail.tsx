import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import {
    JOURNEY_STEPS,
    journeyStepIndex,
    type JourneyStage,
} from "@/lib/membershipJourney";

/**
 * Die vier Stationen als Fortschrittsleiste.
 *
 * Auf dem Telefon sind es vier Balken und eine Zeile Text — zusammen knapp
 * zwei Zeilen hoch. Die früheren Schrittkacheln des Assistenten fielen dort
 * untereinander und kosteten sechs Zeilen, bevor auch nur ein Eingabefeld zu
 * sehen war. Die Beschriftungen kommen erst ab `sm` dazu, wo sie nebeneinander
 * passen; darunter trägt die Textzeile dieselbe Information.
 */
export function JourneyRail({ stage }: { stage: JourneyStage }) {
    const currentIndex = journeyStepIndex(stage);
    const current = JOURNEY_STEPS[currentIndex];

    return (
        <div className="grid gap-2.5">
            <ol className="grid grid-cols-4 gap-1.5 sm:gap-3">
                {JOURNEY_STEPS.map((step, index) => {
                    const isDone = index < currentIndex;
                    const isCurrent = index === currentIndex;
                    return (
                        <li
                            key={step.id}
                            aria-current={isCurrent ? "step" : undefined}
                            className="grid gap-2"
                        >
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "h-1.5 rounded-full transition-colors",
                                    isDone
                                        ? "bg-physics"
                                        : isCurrent
                                          ? "bg-physics/45"
                                          : "bg-line",
                                )}
                            />
                            <span
                                className={cn(
                                    "hidden items-center gap-1.5 text-xs font-semibold sm:flex",
                                    isCurrent
                                        ? "text-physics"
                                        : isDone
                                          ? "text-foreground"
                                          : "text-faint",
                                )}
                            >
                                {isDone ? (
                                    <Check size={13} aria-hidden="true" className="shrink-0" />
                                ) : (
                                    <span
                                        aria-hidden="true"
                                        className="font-mono tabular-nums"
                                    >
                                        {index + 1}
                                    </span>
                                )}
                                <span className="min-w-0 truncate">{step.short}</span>
                            </span>
                            <span className="sr-only">
                                Schritt {index + 1}: {step.title}
                                {isDone ? " (erledigt)" : isCurrent ? " (aktuell)" : ""}
                            </span>
                        </li>
                    );
                })}
            </ol>

            {/* Ab `sm` stehen dieselben Angaben schon an den Balken. */}
            <p className="text-sm text-muted sm:hidden">
                {current ? (
                    <>
                        <span className="font-mono text-xs tracking-wide text-faint">
                            Schritt {currentIndex + 1}/{JOURNEY_STEPS.length}
                        </span>{" "}
                        <span className="font-semibold text-foreground">{current.title}</span>
                    </>
                ) : (
                    <span className="font-semibold text-foreground">Alle Schritte erledigt</span>
                )}
            </p>
        </div>
    );
}
