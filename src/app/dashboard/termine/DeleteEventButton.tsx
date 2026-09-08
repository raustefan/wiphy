"use client";

import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button, Dialog, DialogFooter } from "@/components/ui";

export function DeleteEventButton({
    eventId,
    title,
    linkedPosts,
    deleteAction,
}: {
    eventId: string;
    title: string;
    /** Zahl der verknüpften Blogbeiträge — sie bleiben erhalten, verlieren aber den Bezug. */
    linkedPosts: number;
    deleteAction: (formData: FormData) => void | Promise<void>;
}) {
    const [open, setOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <>
            <form ref={formRef} action={deleteAction}>
                <input type="hidden" name="id" value={eventId} />
            </form>
            <Button
                size="sm"
                color="danger"
                variant="soft"
                type="button"
                onClick={() => setOpen(true)}
            >
                <Trash2 size={16} aria-hidden="true" /> Löschen
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} title="Termin löschen?" size="sm">
                <p className="text-sm leading-relaxed text-muted">
                    Möchtest du den Termin „{title}“ wirklich unwiderruflich löschen?
                </p>
                {linkedPosts > 0 && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                        {linkedPosts === 1
                            ? "Ein Blogbeitrag verweist auf diesen Termin. Der Beitrag bleibt bestehen und verliert nur die Verknüpfung."
                            : `${linkedPosts} Blogbeiträge verweisen auf diesen Termin. Sie bleiben bestehen und verlieren nur die Verknüpfung.`}
                    </p>
                )}
                <DialogFooter>
                    <Button
                        size="sm"
                        variant="soft"
                        color="neutral"
                        type="button"
                        onClick={() => setOpen(false)}
                    >
                        Abbrechen
                    </Button>
                    <Button
                        size="sm"
                        color="danger"
                        type="button"
                        onClick={() => {
                            setOpen(false);
                            formRef.current?.requestSubmit();
                        }}
                    >
                        <Trash2 size={16} aria-hidden="true" /> Endgültig löschen
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
