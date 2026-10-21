import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon } from "@hugeicons/core-free-icons";
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
        <div className="grid gap-3">
            {/* Eine Achse mit vier Stationen: gefüllt = erledigt, Ring = aktuell. */}
            <ol className="relative grid grid-cols-4">
                <span aria-hidden="true" className="absolute top-[5px] right-1/4 left-0 h-px bg-line-strong" />
                <span
                    aria-hidden="true"
                    className="absolute top-[5px] left-0 h-px bg-physics"
                    style={{ width: `${(Math.min(currentIndex, JOURNEY_STEPS.length - 1) / JOURNEY_STEPS.length) * 100}%` }}
                />
                {JOURNEY_STEPS.map((step, index) => {
                    const isDone = index < currentIndex;
                    const isCurrent = index === currentIndex;
                    return (
                        <li
                            key={step.id}
                            aria-current={isCurrent ? "step" : undefined}
                            className="relative grid justify-items-start gap-2 pr-2"
                        >
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "grid size-[11px] place-items-center rounded-full border",
                                    isDone
                                        ? "border-physics bg-physics"
                                        : isCurrent
                                          ? "border-physics bg-background ring-4 ring-physics/20"
                                          : "border-line-strong bg-background",
                                )}
                            />
                            <span
                                className={cn(
                                    "hidden items-center gap-1.5 text-sm sm:flex",
                                    isCurrent
                                        ? "font-semibold text-foreground"
                                        : isDone
                                          ? "text-muted"
                                          : "text-faint",
                                )}
                            >
                                {isDone ? (
                                    <HugeiconsIcon icon={Tick01Icon} size={14} aria-hidden="true" className="shrink-0 text-physics" />
                                ) : (
                                    <span aria-hidden="true" className="font-serif text-base italic tabular-nums">
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

            {/* Ab `sm` stehen dieselben Angaben schon an der Achse. */}
            <p className="text-sm text-muted sm:hidden">
                {current ? (
                    <>
                        <span className="font-serif text-faint italic">
                            Schritt {currentIndex + 1} von {JOURNEY_STEPS.length}:
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
