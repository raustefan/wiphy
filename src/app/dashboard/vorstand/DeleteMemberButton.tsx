"use client";

import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button, Dialog, DialogFooter } from "@/components/ui";

export function DeleteMemberButton({
    memberId,
    name,
    deleteAction,
}: {
    memberId: string;
    name: string;
    deleteAction: (formData: FormData) => void | Promise<void>;
}) {
    const [open, setOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <>
            <form ref={formRef} action={deleteAction}>
                <input type="hidden" name="id" value={memberId} />
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

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                title="Vorstandsmitglied löschen?"
                size="sm"
            >
                <p className="text-sm leading-relaxed text-muted">
                    Möchtest du „{name}“ wirklich unwiderruflich aus dem Vorstand löschen?
                </p>
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
