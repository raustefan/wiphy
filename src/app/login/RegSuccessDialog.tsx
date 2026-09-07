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
                Die Registrierung war erfolgreich. Wir haben dir eine E-Mail geschickt: bitte
                bestätige darüber innerhalb von 24 Stunden deine Adresse — sonst wird das Konto
                automatisch wieder gelöscht. Danach informieren wir den Vorstand, der sich bei dir
                meldet.
            </p>
            <DialogFooter>
                <Button type="button" onClick={handleClose}>
                    OK
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
