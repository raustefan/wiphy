"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Dialog, DialogFooter } from "@/components/ui";
import { withdrawMembershipApplication } from "./actions";

export function WithdrawApplicationButton({ applicationId }: { applicationId: string }) {
    const router = useRouter();
    const [confirming, setConfirming] = useState(false);
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    function withdraw() {
        setError("");
        const formData = new FormData();
        formData.set("id", applicationId);
        startTransition(async () => {
            const result = await withdrawMembershipApplication(formData);
            if (!result.ok) {
                setError(result.message);
                return;
            }
            setConfirming(false);
            router.refresh();
        });
    }

    return (
        <>
            {error && (
                <p role="alert" className="text-sm text-negative">
                    {error}
                </p>
            )}
            <Button
                type="button"
                variant="soft"
                color="neutral"
                className="justify-self-start"
                onClick={() => setConfirming(true)}
            >
                Antrag zurückziehen
            </Button>

            <Dialog
                open={confirming}
                onClose={() => setConfirming(false)}
                title="Antrag zurückziehen?"
                description="Dein Aufnahmeantrag wird zurückgezogen. Du kannst danach jederzeit einen neuen Antrag stellen."
            >
                <DialogFooter>
                    <Button
                        type="button"
                        variant="soft"
                        color="neutral"
                        onClick={() => setConfirming(false)}
                        disabled={isPending}
                    >
                        Abbrechen
                    </Button>
                    <Button type="button" color="danger" onClick={withdraw} loading={isPending}>
                        Zurückziehen
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
