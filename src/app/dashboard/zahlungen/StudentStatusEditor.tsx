"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useActionForm } from "@/lib/client/useActionForm";
import {
    changedStudentYears,
    currentStudentEndYear,
    formatYearRanges,
    MEMBER_STUDENT_LOOKAHEAD,
    studentEndYearOptions,
    withStudentEndYear,
} from "@/lib/membership";
import { setStudentEndYearAction } from "../actions";

/** Wie viele vergangene Jahre die Zeitleiste zeigt — der Rest steht in der Zusammenfassung. */
const PAST_YEARS_SHOWN = 3;

/**
 * Zeitleiste der Beitragsjahre mit Sonderstatus und darunter die eine Frage,
 * die das Mitglied beantworten kann: bis wann es noch studiert. Vergangenes und
 * das laufende Jahr sind fest (§ 5 Abs. 3: fällig am 1. Januar), ebenso bereits
 * bezahlte Jahre. Die Zeitleiste zeigt die Auswahl schon vor dem Speichern.
 */
export function StudentStatusEditor({
    currentYear,
    studentYears,
    joinYear,
    paidYears,
}: {
    currentYear: number;
    studentYears: number[];
    joinYear: number | null;
    paidYears: number[];
}) {
    const savedEnd = currentStudentEndYear(studentYears, currentYear);
    const [endYear, setEndYear] = useState(savedEnd);
    const [saved, setSaved] = useState(false);
    const form = useActionForm(setStudentEndYearAction, { onSuccess: () => setSaved(true) });

    const options = studentEndYearOptions(studentYears, currentYear);
    const draft = withStudentEndYear(studentYears, endYear, currentYear);
    const dirty = changedStudentYears(studentYears, draft).length > 0;
    const touchesPaid = (end: number) =>
        changedStudentYears(studentYears, withStudentEndYear(studentYears, end, currentYear)).some((y) =>
            paidYears.includes(y),
        );

    const firstShown = Math.max(joinYear ?? currentYear, currentYear - PAST_YEARS_SHOWN);
    const timeline = Array.from(
        { length: options[options.length - 1] - firstShown + 1 },
        (_, i) => firstShown + i,
    );

    return (
        <div className="grid gap-5">
            <ol className="grid grid-cols-[repeat(auto-fill,minmax(4.75rem,1fr))] gap-2" aria-label="Beitragsjahre">
                {timeline.map((year) => {
                    const student = draft.includes(year);
                    return (
                        <li
                            key={year}
                            className={cn(
                                "grid gap-0.5 rounded-[3px] border px-3 py-2.5 transition-colors motion-reduce:transition-none",
                                student ? "border-info/40 bg-info/10" : "border-line bg-raised/50",
                                year === currentYear && "ring-2 ring-physics/50 ring-offset-1 ring-offset-surface",
                                year < currentYear && "opacity-70",
                            )}
                        >
                            <span className="font-serif text-lg leading-none font-medium tabular-nums">{year}</span>
                            <span className={cn("text-xs font-medium", student ? "text-info" : "text-muted")}>
                                {student ? "ermäßigt" : "regulär"}
                            </span>
                        </li>
                    );
                })}
            </ol>

            <p className="text-sm text-muted text-pretty">
                {draft.length > 0 ? (
                    <>
                        Ermäßigt insgesamt:{" "}
                        <span className="font-medium text-foreground">{formatYearRanges(draft)}</span>.
                    </>
                ) : (
                    "Bisher kein Jahr mit ermäßigtem Beitrag."
                )}{" "}
                Vergangene Jahre und {currentYear} stehen fest.
            </p>

            <fieldset className="grid gap-2.5">
                <legend className="mb-2.5 text-sm font-semibold">Bis wann studierst du voraussichtlich?</legend>
                <div className="flex flex-wrap gap-2">
                    {options.map((year) => {
                        const disabled = year !== savedEnd && touchesPaid(year);
                        const checked = year === endYear;
                        return (
                            <label
                                key={year}
                                title={disabled ? "Betrifft ein bereits bezahltes Jahr — bitte an den Vorstand wenden." : undefined}
                                className={cn(
                                    "flex cursor-pointer items-center gap-2 rounded-[3px] border px-3.5 py-2 text-sm font-medium transition-colors motion-reduce:transition-none",
                                    "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-physics",
                                    checked
                                        ? "border-physics bg-physics text-on-physics"
                                        : "border-line-strong bg-surface hover:border-physics",
                                    disabled && "cursor-not-allowed opacity-50 hover:border-line-strong",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="endYear"
                                    value={year}
                                    checked={checked}
                                    disabled={disabled}
                                    onChange={() => {
                                        setEndYear(year);
                                        setSaved(false);
                                    }}
                                    className="sr-only"
                                />
                                {year === currentYear ? `Ab ${currentYear + 1} nicht mehr` : `bis ${year}`}
                            </label>
                        );
                    })}
                </div>
                <p className="text-xs text-muted text-pretty">
                    Verlängern geht bis {currentYear + MEMBER_STUDENT_LOOKAHEAD}. Endet dein Studium früher, trag es hier ein —
                    die Satzung verlangt die Meldung innerhalb von sechs Wochen (§ 5 Abs. 10).
                </p>
            </fieldset>

            <div className="flex flex-wrap items-center gap-3">
                <Button
                    loading={form.pending}
                    disabled={!dirty}
                    onClick={() => void form.run({ endYear: String(endYear) })}
                >
                    Speichern
                </Button>
                {saved && !dirty && (
                    <span role="status" className="flex items-center gap-1.5 text-sm font-medium text-positive">
                        <HugeiconsIcon icon={Tick01Icon} size={15} aria-hidden="true" />
                        Gespeichert
                    </span>
                )}
            </div>
            {form.feedback}
        </div>
    );
}
