"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { MembershipTerminationStatus } from "@prisma/client";
import {
    Badge,
    Button,
    Card,
    Dialog,
    DialogFooter,
    Field,
    Input,
    TextArea,
} from "@/components/ui";
import { formatDate, formatDateTime } from "@/lib/format";
import { confirmMembershipTermination } from "./actions";

export type TerminationItem = {
    id: string;
    status: MembershipTerminationStatus;
    submittedAt: string;
    effectiveAt: string;
    keepAccount: boolean;
    decisionNote: string | null;
    completedAt: string | null;
    /** Austrittstag vorbei, aber noch nicht bestätigt — Status wird erst nach Bestätigung umgestellt. */
    overdue: boolean;
    member: {
        id: string;
        email: string;
        vorname: string;
        name: string;
        mitgliedId: number | null;
        loginDisabled: boolean;
    };
};

function statusMeta(item: TerminationItem): {
    label: string;
    tone: "warning" | "positive" | "neutral";
} {
    if (item.completedAt) return { label: "Ausgetreten", tone: "neutral" };
    if (item.status === "EINGEREICHT") return { label: "Offen", tone: "warning" };
    if (item.status === "BESTAETIGT") return { label: "Bestätigt", tone: "positive" };
    return { label: "Zurückgenommen", tone: "neutral" };
}

export function TerminationList({
    terminations,
    mailEnabled,
}: {
    terminations: TerminationItem[];
    /** Feature-Flag MEMBERSHIP_TERMINATION_CONFIRMATION_MAIL. */
    mailEnabled: boolean;
}) {
    const [confirming, setConfirming] = useState<TerminationItem | null>(null);
    const [effectiveAt, setEffectiveAt] = useState("");
    const [note, setNote] = useState("");
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    function openConfirm(item: TerminationItem) {
        setEffectiveAt(item.effectiveAt.slice(0, 10));
        setNote("");
        setError("");
        setConfirming(item);
    }

    function confirm() {
        if (!confirming) return;
        const fd = new FormData();
        fd.set("id", confirming.id);
        fd.set("effectiveAt", effectiveAt);
        fd.set("note", note);
        startTransition(async () => {
            const result = await confirmMembershipTermination(fd);
            if (!result.ok) {
                setError(result.message);
                return;
            }
            setConfirming(null);
        });
    }

    return (
        <div className="grid gap-3">
            {terminations.map((item) => {
                const meta = statusMeta(item);
                return (
                    <Card key={item.id} className="grid gap-2 p-5">
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                            <div className="grid min-w-0 gap-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Link
                                        href={`/dashboard/users/${item.member.id}`}
                                        className="font-semibold underline-offset-2 hover:underline"
                                    >
                                        {item.member.vorname} {item.member.name}
                                    </Link>
                                    {item.member.mitgliedId != null && (
                                        <span className="text-sm text-muted">
                                            Nr. {item.member.mitgliedId}
                                        </span>
                                    )}
                                    <Badge tone={meta.tone}>{meta.label}</Badge>
                                    {item.overdue && <Badge tone="negative">Austrittstag vorbei</Badge>}
                                    {item.member.loginDisabled && <Badge>Login gesperrt</Badge>}
                                </div>
                                <p className="text-sm break-words text-muted">
                                    {item.member.email} · eingegangen am{" "}
                                    {formatDateTime(item.submittedAt)}
                                </p>
                                <p className="text-sm text-muted">
                                    Austritt zum{" "}
                                    <span className="font-semibold text-foreground">
                                        {formatDate(item.effectiveAt)}
                                    </span>{" "}
                                    · Konto danach:{" "}
                                    {item.keepAccount ? "behalten" : "Login sperren"}
                                    {item.decisionNote ? ` · ${item.decisionNote}` : ""}
                                </p>
                                {item.completedAt && (
                                    <p className="text-sm text-muted text-pretty">
                                        Status am {formatDate(item.completedAt)} auf „Kein
                                        Mitglied“ gesetzt. Sind die Beiträge geklärt, kann das
                                        Konto im Profil endgültig gelöscht werden.
                                    </p>
                                )}
                            </div>
                            {item.status === "EINGEREICHT" && (
                                <Button
                                    size="sm"
                                    disabled={isPending}
                                    onClick={() => openConfirm(item)}
                                >
                                    Austritt bestätigen
                                </Button>
                            )}
                        </div>
                    </Card>
                );
            })}

            <Dialog
                open={confirming != null}
                onClose={() => setConfirming(null)}
                title="Austritt bestätigen"
                description={
                    mailEnabled
                        ? "Der Austritt wirkt mit dem Eingang der Erklärung und kann nicht abgelehnt werden. Hier wird er bestätigt und das Mitglied per Mail informiert."
                        : "Der Austritt wirkt mit dem Eingang der Erklärung und kann nicht abgelehnt werden. Der Mailversand ist deaktiviert — bitte das Mitglied anderweitig schriftlich informieren."
                }
            >
                <div className="grid gap-4">
                    <Field
                        label="Letzter Tag der Mitgliedschaft"
                        hint="Aus dem Eingangsdatum nach § 6 der Satzung berechnet. Nur bei abweichender Vereinbarung ändern."
                    >
                        <Input
                            type="date"
                            value={effectiveAt}
                            onChange={(event) => setEffectiveAt(event.target.value)}
                        />
                    </Field>
                    <Field label="Vermerk (optional)" hint="Nur intern sichtbar.">
                        <TextArea value={note} onChange={(event) => setNote(event.target.value)} />
                    </Field>
                    {error && (
                        <p role="alert" className="text-sm text-negative">
                            {error}
                        </p>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        size="sm"
                        variant="soft"
                        color="neutral"
                        onClick={() => setConfirming(null)}
                        disabled={isPending}
                    >
                        Abbrechen
                    </Button>
                    <Button size="sm" onClick={confirm} loading={isPending}>
                        {mailEnabled ? "Bestätigen und Mail senden" : "Bestätigen"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
