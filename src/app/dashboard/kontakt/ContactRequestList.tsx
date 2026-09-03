"use client";

import { useState, useTransition } from "react";
import { markContactRequestHandled, removeContactRequest } from "./actions";
import { SPAM_SCORE_MAIL_THRESHOLD } from "@/lib/contact";
import {
    Badge,
    Button,
    buttonClasses,
    Card,
    Dialog,
    DialogFooter,
    Separator,
} from "@/components/ui";

type ContactRequestItem = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    spamScore: number;
    mailedAt: Date | null;
    handledAt: Date | null;
    createdAt: Date;
};

const dateFormat = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
});

export function ContactRequestList({ requests }: { requests: ContactRequestItem[] }) {
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();
    // Die Anfrage, für die gerade das Löschen bestätigt werden soll.
    const [pendingDelete, setPendingDelete] = useState<ContactRequestItem | null>(null);

    function run(action: (fd: FormData) => Promise<{ ok: boolean; message?: string }>, fd: FormData) {
        setError("");
        startTransition(async () => {
            const result = await action(fd);
            if (!result.ok) {
                setError(result.message ?? "Aktion fehlgeschlagen.");
            }
        });
    }

    function confirmDelete() {
        if (!pendingDelete) return;
        const fd = new FormData();
        fd.set("id", pendingDelete.id);
        setPendingDelete(null);
        run(removeContactRequest, fd);
    }

    return (
        <div className="grid gap-3">
            {error && (
                <p role="alert" className="text-sm text-negative">
                    {error}
                </p>
            )}

            {requests.map((request) => {
                const suspicious = request.spamScore >= SPAM_SCORE_MAIL_THRESHOLD;
                return (
                    <Card key={request.id} className="grid gap-3 p-5">
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                            <div className="grid min-w-0 gap-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-semibold">{request.subject}</span>
                                    {request.handledAt && <Badge tone="positive">Erledigt</Badge>}
                                    {suspicious && (
                                        <Badge tone="warning">
                                            Spam-Verdacht ({request.spamScore})
                                        </Badge>
                                    )}
                                    {!request.mailedAt && !suspicious && (
                                        <Badge>Nicht gemailt</Badge>
                                    )}
                                </div>
                                <p className="text-sm break-words text-muted">
                                    {request.name} &lt;{request.email}&gt; ·{" "}
                                    {dateFormat.format(new Date(request.createdAt))}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <a
                                    href={`mailto:${encodeURIComponent(request.email)}?subject=${encodeURIComponent(
                                        `Re: ${request.subject}`,
                                    )}`}
                                    className={buttonClasses({ variant: "soft", size: "sm" })}
                                >
                                    Antworten
                                </a>
                                <Button
                                    size="sm"
                                    variant="soft"
                                    color="neutral"
                                    disabled={isPending}
                                    onClick={() => {
                                        const fd = new FormData();
                                        fd.set("id", request.id);
                                        fd.set("handled", String(!request.handledAt));
                                        run(markContactRequestHandled, fd);
                                    }}
                                >
                                    {request.handledAt ? "Wieder öffnen" : "Erledigt"}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="soft"
                                    color="danger"
                                    disabled={isPending}
                                    onClick={() => setPendingDelete(request)}
                                >
                                    Löschen
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        {/* Visitor-supplied text: rendered as plain text, never as markup. */}
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {request.message}
                        </p>
                    </Card>
                );
            })}

            <Dialog
                open={pendingDelete != null}
                onClose={() => setPendingDelete(null)}
                title="Anfrage löschen?"
                size="sm"
            >
                <p className="text-sm leading-relaxed text-muted">
                    Die Anfrage „{pendingDelete?.subject}“ von {pendingDelete?.name} wird
                    endgültig gelöscht. Das lässt sich nicht rückgängig machen.
                </p>
                <DialogFooter>
                    <Button
                        size="sm"
                        variant="soft"
                        color="neutral"
                        onClick={() => setPendingDelete(null)}
                    >
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
