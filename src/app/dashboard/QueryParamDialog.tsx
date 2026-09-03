"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Dialog, DialogFooter } from "@/components/ui";

/**
 * Bestätigungsdialog, der an einen Query-Parameter gekoppelt ist: Server
 * Actions leiten nach getaner Arbeit auf `?<param>=<value>` um. Beim Schließen
 * wird der Parameter wieder aus der URL entfernt, damit ein Reload den Dialog
 * nicht erneut öffnet.
 */
export function QueryParamDialog({
    param,
    value,
    title,
    children,
}: {
    param: string;
    value: string;
    title: string;
    children: React.ReactNode;
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const matches = searchParams.get(param) === value;

    useEffect(() => {
        setOpen(matches);
    }, [matches]);

    function handleClose() {
        setOpen(false);
        router.replace(pathname);
    }

    return (
        <Dialog open={open} onClose={handleClose} title={title} size="sm">
            <p className="text-sm leading-relaxed text-muted">{children}</p>
            <DialogFooter>
                <Button type="button" onClick={handleClose}>
                    OK
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
