"use client";

import { useRef, useState } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

export function DeletePostButton({
    postId,
    title,
    deleteAction,
}: {
    postId: string;
    title: string;
    deleteAction: (formData: FormData) => void | Promise<void>;
}) {
    const [open, setOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <>
            <form ref={formRef} action={deleteAction}>
                <input type="hidden" name="id" value={postId} />
            </form>
            <Button
                size="2"
                color="red"
                variant="soft"
                type="button"
                onClick={() => setOpen(true)}
            >
                <TrashIcon /> Löschen
            </Button>

            <AlertDialog.Root open={open} onOpenChange={setOpen}>
                <AlertDialog.Content maxWidth="420px">
                    <AlertDialog.Title>Beitrag löschen?</AlertDialog.Title>
                    <AlertDialog.Description size="2" mb="3">
                        Möchtest du den Beitrag &quot;{title}&quot; wirklich unwiderruflich löschen?
                    </AlertDialog.Description>
                    <Flex gap="3" justify="end">
                        <AlertDialog.Cancel>
                            <Button size="2" variant="soft" color="gray" type="button">
                                Abbrechen
                            </Button>
                        </AlertDialog.Cancel>
                        <Button
                            size="2"
                            color="red"
                            type="button"
                            onClick={() => {
                                setOpen(false);
                                formRef.current?.requestSubmit();
                            }}
                        >
                            <TrashIcon /> Endgültig löschen
                        </Button>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
}
