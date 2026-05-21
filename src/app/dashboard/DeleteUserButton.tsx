"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

export function DeleteUserButton() {
    return (
        <Button
            size="1"
            variant="soft"
            color="red"
            type="submit"
            onClick={(e) => {
                if (!window.confirm("Bist du sicher, dass du diesen Benutzer unwiderruflich löschen möchtest? Dies löscht auch alle Beiträge.")) {
                    e.preventDefault();
                }
            }}
        >
            <TrashIcon />

        </Button>
    );
}
