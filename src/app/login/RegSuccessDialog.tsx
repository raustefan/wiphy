"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Dialog, DialogFooter } from "@/components/ui";

export function RegSuccessDialog() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(searchParams.get("register") === "success");
    }, [searchParams]);

    function handleClose() {
        setOpen(false);
        router.replace(pathname);
    }

    return (
        <Dialog open={open} onClose={handleClose} title="Account beantragt!" size="sm">
            <p className="text-sm leading-relaxed text-muted">
                Die Registrierung war erfolgreich. Unser Vorstand wird sich bald bei dir melden!
                Du kannst bereits jetzt deine E-Mail-Adresse bestätigen, um den Prozess zu
                beschleunigen.
            </p>
            <DialogFooter>
                <Button type="button" onClick={handleClose}>
                    OK
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
