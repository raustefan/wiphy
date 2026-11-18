"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Alert01Icon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { useState, useEffect } from "react";
import { MailForm, type MailFormSetup, type MailUserOption } from "./MailForm";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { ButtonLink, Card, Container, Table, TableWrap, Td, Th } from "@/components/ui";
import { MailSendNotice } from "@/components/MailSendNotice";
import type { MailSendReport } from "@/lib/server/email/sendReport";

/** Eine Zeile des Versandprotokolls, serverseitig fertig formatiert. */
export type MailHistoryEntry = {
    id: string;
    subject: string;
    sentAt: string;
    /** Adresse bei einer einzelnen Person, sonst Gruppe bzw. „Auswahl“. */
    recipients: string;
    count: number;
};

function MailHistory({ entries }: { entries: MailHistoryEntry[] }) {
    return (
        <Card className="mt-5 grid gap-3 p-5 sm:p-6">
            <div className="grid gap-1">
                <h2 className="text-lg font-semibold">Versandprotokoll</h2>
                <p className="text-sm text-muted">
                    Die letzten 50 Mails. Einträge werden nach einem Jahr gelöscht.
                </p>
            </div>
            {entries.length === 0 ? (
                <p className="text-sm text-muted">Noch keine Mails verschickt.</p>
            ) : (
                <TableWrap>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Datum</Th>
                                <Th>Betreff</Th>
                                <Th>Empfänger</Th>
                                <Th className="text-right">Anzahl</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry) => (
                                <tr key={entry.id}>
                                    <Td className="font-mono whitespace-nowrap">{entry.sentAt}</Td>
                                    <Td>{entry.subject}</Td>
                                    <Td>{entry.recipients}</Td>
                                    <Td className="text-right font-mono">{entry.count}</Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableWrap>
            )}
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
                            className="h-9 animate-pulse rounded-[3px] bg-raised"
                            style={{ width: w }}
                        />
                    ))}
                </div>
            </div>
            <div className="h-28 animate-pulse rounded-[3px] bg-raised" />
            <div className="grid gap-2">
                <div className="h-4 w-20 animate-pulse rounded bg-raised" />
                <div className="h-11 animate-pulse rounded-[3px] bg-raised" />
            </div>
            <div className="grid gap-2">
                <div className="h-4 w-24 animate-pulse rounded bg-raised" />
                <div className="h-56 animate-pulse rounded-[3px] bg-raised" />
            </div>
            <div className="h-11 w-full animate-pulse rounded-[3px] bg-raised sm:w-48" />
        </div>
    );
}

export function MailDashboard({
    history,
    ...setup
}: MailFormSetup & { history: MailHistoryEntry[] }) {
    const [report, setReport] = useState<MailSendReport | null>(null);
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

    if (report) {
        const partial = report.failed.length > 0;
        return (
            <Container size="2" className="py-8 sm:py-12">
                <Card className="grid justify-items-center gap-3 p-6 text-center sm:p-8">
                    <HugeiconsIcon
                        icon={partial ? Alert01Icon : CheckmarkCircle01Icon}
                        size={48}
                        className={partial ? "text-warning" : "text-positive"}
                        aria-hidden="true"
                    />
                    <h1 className="text-2xl font-bold tracking-tight">
                        {partial ? "E-Mail teilweise gesendet" : "E-Mail gesendet"}
                    </h1>
                    <p className="text-sm text-muted">
                        Die Nachricht wurde an {report.sent}{" "}
                        {partial ? `von ${report.sent + report.failed.length} ` : ""}Empfänger
                        versendet.
                    </p>
                    <MailSendNotice report={report} />
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
                description="Schritt für Schritt: jede Einstellung wird einzeln gewählt, gesendet wird erst nach geprüfter Vorschau."
                backHref="/dashboard"
            />

            {loading ? (
                <Card className="p-5 sm:p-6">
                    <span className="sr-only" role="status">
                        Empfängerliste wird geladen …
                    </span>
                    <MailFormSkeleton />
                </Card>
            ) : (
                <MailForm users={users} {...setup} onSuccess={setReport} />
            )}

            <MailHistory entries={history} />
        </Container>
    );
}
