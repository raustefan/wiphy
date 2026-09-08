"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, CalendarDays, CheckCircle2, Megaphone, X } from "lucide-react";
import { MailForm, type MailUserOption } from "./MailForm";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { ButtonLink, Callout, Card, Container } from "@/components/ui";

/** Ein Termin, dessen Ankündigung gerade vorbereitet wird. */
export type MailAnnouncement = {
    id: string;
    title: string;
    when: string;
    published: boolean;
    subject: string;
    html: string;
};

/** Kommender Termin in der Auswahl „Termin ankündigen“. */
export type MailEventOption = {
    id: string;
    title: string;
    when: string;
};

/**
 * Die Terminauswahl über dem Formular.
 *
 * Ein Klick lädt dieselbe Seite mit `?termin=<id>` — der Server baut die
 * Vorlage, statt sie im Browser zusammenzusetzen. Damit steht die Vorlage
 * einmal an einer Stelle, und der Link ist teilbar.
 */
function AnnouncePicker({ events }: { events: MailEventOption[] }) {
    if (events.length === 0) return null;

    return (
        <Card className="mb-5 grid gap-3 p-4 sm:p-5">
            <div className="flex items-center gap-2">
                <Megaphone size={16} aria-hidden="true" className="text-market" />
                <p className="text-sm font-semibold">Termin ankündigen</p>
            </div>
            <p className="text-sm text-muted">
                Vorlage laden: Betreff, Anrede und Einladungstext werden vorgeschrieben, die
                Eckdaten und ein Knopf zur Terminseite hängen automatisch an der Mail.
            </p>
            <div className="flex flex-wrap gap-2">
                {events.map((event) => (
                    <Link
                        key={event.id}
                        href={`/dashboard/mail?termin=${event.id}`}
                        className="grid gap-0.5 rounded-xl border border-line bg-raised/40 px-3.5 py-2.5 text-left transition-colors hover:border-market/40 hover:bg-market/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                    >
                        <span className="text-sm font-semibold">{event.title}</span>
                        <span className="font-mono text-xs text-faint">{event.when}</span>
                    </Link>
                ))}
            </div>
        </Card>
    );
}

/** Platzhalter in Formularform, solange die Empfängerliste noch lädt. */
function MailFormSkeleton() {
    return (
        <div className="grid gap-5" aria-hidden="true">
            <div className="grid gap-2">
                <div className="h-4 w-32 animate-pulse rounded bg-raised" />
                <div className="flex flex-wrap gap-2">
                    {[112, 96, 128, 88].map((w, i) => (
                        <div
                            key={i}
                            className="h-9 animate-pulse rounded-full bg-raised"
                            style={{ width: w }}
                        />
                    ))}
                </div>
            </div>
            <div className="h-28 animate-pulse rounded-xl bg-raised" />
            <div className="grid gap-2">
                <div className="h-4 w-20 animate-pulse rounded bg-raised" />
                <div className="h-11 animate-pulse rounded-xl bg-raised" />
            </div>
            <div className="grid gap-2">
                <div className="h-4 w-24 animate-pulse rounded bg-raised" />
                <div className="h-56 animate-pulse rounded-xl bg-raised" />
            </div>
            <div className="h-11 w-full animate-pulse rounded-full bg-raised sm:w-48" />
        </div>
    );
}

export function MailDashboard({
    announcement,
    upcomingEvents,
}: {
    announcement: MailAnnouncement | null;
    upcomingEvents: MailEventOption[];
}) {
    const [success, setSuccess] = useState(false);
    const [sentCount, setSentCount] = useState(0);
    const [users, setUsers] = useState<MailUserOption[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("/api/users");
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (success) {
        return (
            <Container size="2" className="py-8 sm:py-12">
                <Card className="grid justify-items-center gap-3 p-6 text-center sm:p-8">
                    <CheckCircle2 size={48} className="text-positive" aria-hidden="true" />
                    <h1 className="text-2xl font-bold tracking-tight">E-Mail gesendet</h1>
                    <p className="text-sm text-muted">
                        Die Nachricht wurde an {sentCount}{" "}
                        {sentCount === 1 ? "Empfänger" : "Empfänger"} versendet.
                    </p>
                    <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                        <ButtonLink href="/dashboard/mail" size="lg">
                            Weitere E-Mail senden
                        </ButtonLink>
                        <ButtonLink href="/dashboard" size="lg" variant="soft" color="neutral">
                            Zum Dashboard
                        </ButtonLink>
                    </div>
                </Card>
            </Container>
        );
    }

    return (
        <Container size="3" className="py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Internbereich"
                title="Rundmail verschicken"
                description="Wähle eine Empfängergruppe nach Mitgliedsstatus oder einzelne Nutzer aus."
                backHref="/dashboard"
            />

            <AnnouncePicker events={upcomingEvents} />

            {announcement && (
                <div className="mb-5 grid gap-3">
                    {announcement.published ? (
                        <Callout tone="info" icon={<CalendarDays size={16} />} title="Vorlage geladen">
                            <span className="grid gap-1">
                                <span>
                                    Die Mail kündigt{" "}
                                    <span className="font-semibold text-foreground">
                                        {announcement.title}
                                    </span>{" "}
                                    an ({announcement.when}). Eckdaten und Knopf zur Terminseite
                                    werden angehängt.
                                </span>
                                <Link
                                    href="/dashboard/mail"
                                    className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-physics underline-offset-4 hover:underline"
                                >
                                    <X size={14} aria-hidden="true" /> Vorlage entfernen
                                </Link>
                            </span>
                        </Callout>
                    ) : (
                        <Callout
                            tone="warning"
                            icon={<AlertTriangle size={16} />}
                            title="Termin ist noch ein Entwurf"
                        >
                            <span className="grid gap-1">
                                <span>
                                    „{announcement.title}“ ist nicht veröffentlicht — der Knopf in
                                    der Mail führte auf eine Seite, die es öffentlich nicht gibt.
                                    Der Versand lehnt die Ankündigung deshalb ab.
                                </span>
                                <Link
                                    href={`/dashboard/termine/${announcement.id}`}
                                    className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-physics underline-offset-4 hover:underline"
                                >
                                    Termin veröffentlichen
                                </Link>
                            </span>
                        </Callout>
                    )}
                </div>
            )}

            <Card className="p-5 sm:p-6">
                {loading ? (
                    <>
                        <span className="sr-only" role="status">
                            Empfängerliste wird geladen …
                        </span>
                        <MailFormSkeleton />
                    </>
                ) : (
                    <MailForm
                        // Neu aufbauen, sobald eine andere Vorlage geladen wird:
                        // der Editor übernimmt seinen Inhalt nur beim Einhängen.
                        key={announcement?.id ?? "leer"}
                        users={users}
                        announcement={announcement}
                        onSuccess={(count) => {
                            setSentCount(count);
                            setSuccess(true);
                        }}
                    />
                )}
            </Card>
        </Container>
    );
}
