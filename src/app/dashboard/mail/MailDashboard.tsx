"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { MailForm, type MailUserOption } from "./MailForm";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { ButtonLink, Card, Container } from "@/components/ui";

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

export function MailDashboard() {
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
                        users={users}
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
