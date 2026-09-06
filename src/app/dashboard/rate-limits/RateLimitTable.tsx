"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";
import { removeRateLimitEntry } from "./actions";
import { getRateLimitDescription } from "./rateLimitDescriptions";
import { InfoTooltip } from "./InfoTooltip";
import { formatDate } from "@/lib/format";
import {
    Badge,
    Button,
    Card,
    Dialog,
    DialogFooter,
    IconButton,
    SectionTitle,
    Table,
    TableWrap,
    Td,
    Th,
} from "@/components/ui";
import type { RateLimitBucketSummary, RateLimitEntryItem } from "@/lib/server/services/rateLimitService";

type RateLimitTableProps = {
    summary: RateLimitBucketSummary[];
    entries: RateLimitEntryItem[];
};

export function RateLimitTable({ summary, entries }: RateLimitTableProps) {
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();
    const [pendingDelete, setPendingDelete] = useState<RateLimitEntryItem | null>(null);
    const [activeInfo, setActiveInfo] = useState<{ bucket: string; text: string } | null>(null);
    const now = new Date();

    function showInfo(bucket: string) {
        setActiveInfo({ bucket, text: getRateLimitDescription(bucket) });
    }

    function hideInfo() {
        setActiveInfo(null);
    }

    function confirmDelete() {
        if (!pendingDelete) return;
        const key = pendingDelete.key;
        setPendingDelete(null);
        setError("");
        startTransition(async () => {
            const fd = new FormData();
            fd.set("key", key);
            const result = await removeRateLimitEntry(fd);
            if (!result.ok) setError(result.message ?? "Löschen fehlgeschlagen.");
        });
    }

    return (
        <div className="grid gap-6">
            {activeInfo && (
                <div className="pointer-events-none fixed inset-x-0 top-16 z-50 flex justify-center px-4">
                    <div
                        onMouseEnter={() => showInfo(activeInfo.bucket)}
                        onMouseLeave={hideInfo}
                        className="pointer-events-auto mt-3 w-full max-w-md rounded-xl border border-line bg-raised p-4 text-sm shadow-lg"
                    >
                        <div className="mb-1 flex items-center justify-between gap-3">
                            <span className="font-mono text-xs font-semibold">{activeInfo.bucket}</span>
                            <IconButton
                                size="sm"
                                variant="ghost"
                                color="neutral"
                                aria-label="Schließen"
                                title=""
                                onClick={hideInfo}
                            >
                                <X size={14} aria-hidden="true" />
                            </IconButton>
                        </div>
                        <p className="leading-relaxed text-muted">{activeInfo.text}</p>
                    </div>
                </div>
            )}

            {error && <p role="alert" className="text-sm text-negative">{error}</p>}

            <Card className="p-5 sm:p-6">
                <SectionTitle>Zusammenfassung je Rate Limit</SectionTitle>
                <TableWrap className="mt-4">
                    <Table>
                        <thead>
                            <tr className="bg-raised/60">
                                <Th>Rate Limit</Th>
                                <Th className="text-right">Aktive Einträge</Th>
                                <Th className="text-right">Versuche gesamt</Th>
                                <Th className="text-right">Aktuell blockiert</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {summary.map((bucket) => (
                                <tr key={bucket.bucket}>
                                    <Td className="font-mono font-medium">
                                        <span className="inline-flex items-center gap-1">
                                            {bucket.bucket}
                                            <InfoTooltip
                                                active={activeInfo?.bucket === bucket.bucket}
                                                onShow={() => showInfo(bucket.bucket)}
                                                onHide={hideInfo}
                                            />
                                        </span>
                                    </Td>
                                    <Td className="text-right tabular-nums">{bucket.entryCount}</Td>
                                    <Td className="text-right tabular-nums">{bucket.totalHits}</Td>
                                    <Td className="text-right">
                                        {bucket.blockedCount > 0 ? (
                                            <Badge tone="negative">{bucket.blockedCount}</Badge>
                                        ) : (
                                            <span className="tabular-nums text-muted">0</span>
                                        )}
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableWrap>
            </Card>

            <Card className="p-5 sm:p-6">
                <SectionTitle>Einzelne Einträge</SectionTitle>
                <TableWrap className="mt-4">
                    <Table className="min-w-[720px]">
                        <thead>
                            <tr className="bg-raised/60">
                                <Th>Rate Limit</Th>
                                <Th className="text-right">Versuche</Th>
                                <Th>Zurücksetzen</Th>
                                <Th>Status</Th>
                                <Th className="w-10" />
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry) => {
                                const blocked = entry.blockedUntil != null && entry.blockedUntil > now;
                                return (
                                    <tr key={entry.key}>
                                        <Td className="font-mono font-medium" title={entry.key}>
                                            <span className="inline-flex items-center gap-1">
                                                {entry.bucket}
                                                <InfoTooltip
                                                    active={activeInfo?.bucket === entry.bucket}
                                                    onShow={() => showInfo(entry.bucket)}
                                                    onHide={hideInfo}
                                                />
                                            </span>
                                        </Td>
                                        <Td className="text-right tabular-nums">{entry.count}</Td>
                                        <Td>{formatDate(entry.resetAt)}</Td>
                                        <Td>
                                            {blocked ? (
                                                <Badge tone="negative">
                                                    Blockiert bis {formatDate(entry.blockedUntil)}
                                                </Badge>
                                            ) : (
                                                <Badge tone="neutral">Aktiv</Badge>
                                            )}
                                        </Td>
                                        <Td>
                                            <Button
                                                size="sm"
                                                variant="soft"
                                                color="danger"
                                                disabled={isPending}
                                                onClick={() => setPendingDelete(entry)}
                                            >
                                                Löschen
                                            </Button>
                                        </Td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </TableWrap>
            </Card>

            <Dialog
                open={pendingDelete != null}
                onClose={() => setPendingDelete(null)}
                title="Eintrag löschen?"
                size="sm"
            >
                <p className="text-sm leading-relaxed text-muted">
                    Der Rate-Limit-Eintrag für „{pendingDelete?.bucket}“ wird endgültig gelöscht.
                    Damit wird eine eventuell laufende Blockierung sofort aufgehoben.
                </p>
                <DialogFooter>
                    <Button size="sm" variant="soft" color="neutral" onClick={() => setPendingDelete(null)}>
                        Abbrechen
                    </Button>
                    <Button size="sm" color="danger" onClick={confirmDelete}>
                        Endgültig löschen
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
