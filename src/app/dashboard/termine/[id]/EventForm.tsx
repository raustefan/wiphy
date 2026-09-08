"use client";

import { useState } from "react";
import { Check, Eye, Megaphone, X } from "lucide-react";
import MarkdownEditor from "@/components/MarkdownEditor";
import { useActionForm } from "@/lib/client/useActionForm";
import { parseBerlinLocalInput, toBerlinDateInput, toBerlinLocalInput } from "@/lib/berlinTime";
import { formatEventRange } from "@/lib/events";
import {
    Button,
    ButtonLink,
    Callout,
    Card,
    Checkbox,
    Field,
    Input,
    Separator,
    TextArea,
} from "@/components/ui";
import { saveEventAction } from "../actions";

export type EventFormData = {
    id: string;
    title: string;
    summary: string;
    description: string;
    start: Date;
    end: Date | null;
    allDay: boolean;
    location: string;
    address: string;
    onlineUrl: string;
    published: boolean;
};

/** Wechselt zwischen `2026-03-14T19:00` und `2026-03-14`, ohne die Eingabe zu verlieren. */
function toDayValue(value: string): string {
    return value.slice(0, 10);
}

function toDateTimeValue(value: string, fallbackTime: string): string {
    if (value === "") return "";
    return value.length <= 10 ? `${value}T${fallbackTime}` : value;
}

export function EventForm({ event }: { event: EventFormData }) {
    const [allDay, setAllDay] = useState(event.allDay);
    const [start, setStart] = useState(
        event.allDay ? toBerlinDateInput(event.start) : toBerlinLocalInput(event.start),
    );
    const [end, setEnd] = useState(
        event.end ? (event.allDay ? toBerlinDateInput(event.end) : toBerlinLocalInput(event.end)) : "",
    );

    const form = useActionForm(saveEventAction, { featureLabel: "Termin-Verwaltung" });

    function toggleAllDay(next: boolean) {
        setAllDay(next);
        if (next) {
            setStart(toDayValue(start));
            setEnd(toDayValue(end));
        } else {
            setStart(toDateTimeValue(start, "19:00"));
            setEnd(toDateTimeValue(end, "22:00"));
        }
    }

    // Dieselbe Beschriftung wie später auf der Terminseite — so ist vor dem
    // Speichern sichtbar, was die Besucher lesen werden.
    const parsedStart = parseBerlinLocalInput(start);
    const parsedEnd = end ? parseBerlinLocalInput(end) : null;
    const preview =
        parsedStart && (!end || parsedEnd)
            ? formatEventRange({ start: parsedStart, end: parsedEnd, allDay })
            : null;
    const endBeforeStart =
        parsedStart && parsedEnd ? parsedEnd.getTime() < parsedStart.getTime() : false;

    return (
        <Card className="p-5 sm:p-6">
            <form action={form.submit} className="grid gap-4">
                <input type="hidden" name="id" value={event.id} />

                {form.feedback}

                <Field label="Titel" htmlFor="event-title">
                    <Input
                        id="event-title"
                        name="title"
                        defaultValue={event.title}
                        required
                        maxLength={200}
                        placeholder="Sommerstammtisch im Biergarten"
                    />
                </Field>

                <Field
                    label="Kurzbeschreibung"
                    htmlFor="event-summary"
                    hint="Ein bis zwei Sätze. Erscheint in der Terminliste, auf der Startseite und in der Ankündigungsmail."
                >
                    <TextArea
                        id="event-summary"
                        name="summary"
                        defaultValue={event.summary}
                        maxLength={500}
                        rows={3}
                        placeholder="Worum geht es, und für wen ist der Termin gedacht?"
                    />
                </Field>

                <Separator />

                <div className="flex items-center gap-2">
                    <Checkbox
                        id="event-all-day"
                        name="allDay"
                        checked={allDay}
                        onChange={(e) => toggleAllDay(e.currentTarget.checked)}
                    />
                    <label htmlFor="event-all-day" className="cursor-pointer text-sm">
                        Ganztägig (ohne Uhrzeit)
                    </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Beginn" htmlFor="event-start">
                        <Input
                            id="event-start"
                            name="start"
                            type={allDay ? "date" : "datetime-local"}
                            value={start}
                            onChange={(e) => setStart(e.currentTarget.value)}
                            required
                        />
                    </Field>

                    <Field
                        label="Ende"
                        htmlFor="event-end"
                        hint={
                            allDay
                                ? "Letzter Tag. Leer lassen, wenn der Termin nur einen Tag dauert."
                                : "Optional. Ohne Ende gilt der Termin bis zum Ende des Tages als kommend."
                        }
                        error={endBeforeStart ? "Das Ende darf nicht vor dem Beginn liegen." : undefined}
                    >
                        <Input
                            id="event-end"
                            name="end"
                            type={allDay ? "date" : "datetime-local"}
                            value={end}
                            onChange={(e) => setEnd(e.currentTarget.value)}
                            invalid={endBeforeStart}
                        />
                    </Field>
                </div>

                {preview && (
                    <Callout tone="info">
                        So steht der Zeitraum später auf der Seite:{" "}
                        <span className="font-semibold text-foreground">{preview}</span>
                    </Callout>
                )}

                <Separator />

                <Field label="Ort" htmlFor="event-location" hint="Name des Orts, z. B. „Universität Ulm, Hörsaal H3“.">
                    <Input
                        id="event-location"
                        name="location"
                        defaultValue={event.location}
                        maxLength={200}
                        placeholder="Universität Ulm, Hörsaal H3"
                    />
                </Field>

                <Field
                    label="Anschrift"
                    htmlFor="event-address"
                    hint="Wird auf der Terminseite als Kartenlink angeboten und in die Kalenderdatei geschrieben."
                >
                    <Input
                        id="event-address"
                        name="address"
                        defaultValue={event.address}
                        maxLength={300}
                        placeholder="Albert-Einstein-Allee 11, 89081 Ulm"
                    />
                </Field>

                <Field
                    label="Online-Link"
                    htmlFor="event-online"
                    hint="Für hybride Termine — Videokonferenz oder Stream."
                >
                    <Input
                        id="event-online"
                        name="onlineUrl"
                        type="url"
                        defaultValue={event.onlineUrl}
                        maxLength={500}
                        placeholder="https://…"
                    />
                </Field>

                <div className="grid gap-2">
                    <span className="text-sm font-semibold text-foreground">
                        Ausführliche Beschreibung (Markdown)
                    </span>
                    <MarkdownEditor name="description" initialValue={event.description} />
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox
                        id="event-published"
                        name="published"
                        defaultChecked={event.published}
                    />
                    <label htmlFor="event-published" className="cursor-pointer text-sm">
                        Termin veröffentlichen (sichtbar für alle)
                    </label>
                </div>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button size="lg" type="submit" loading={form.pending}>
                        <Check size={16} aria-hidden="true" />{" "}
                        {form.pending ? "Wird gespeichert…" : "Speichern"}
                    </Button>
                    <ButtonLink
                        href="/dashboard/termine"
                        size="lg"
                        variant="soft"
                        color="neutral"
                    >
                        <X size={16} aria-hidden="true" /> Abbrechen
                    </ButtonLink>

                    {event.published && (
                        <>
                            <ButtonLink
                                href={`/dashboard/mail?termin=${event.id}`}
                                size="lg"
                                variant="soft"
                                color="market"
                            >
                                <Megaphone size={16} aria-hidden="true" /> Termin ankündigen
                            </ButtonLink>
                            <ButtonLink
                                href={`/termine/${event.id}`}
                                size="lg"
                                variant="ghost"
                                color="neutral"
                                target="_blank"
                            >
                                <Eye size={16} aria-hidden="true" /> Öffentliche Seite
                            </ButtonLink>
                        </>
                    )}
                </div>

                {!event.published && (
                    <p className="text-sm text-faint">
                        Ankündigen per Rundmail ist erst möglich, wenn der Termin veröffentlicht
                        und gespeichert ist — sonst führt der Knopf in der Mail ins Leere.
                    </p>
                )}
            </form>
        </Card>
    );
}
