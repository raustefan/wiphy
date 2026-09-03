"use client";

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
    // Der Query-Parameter trägt den Zustand: Schließen entfernt ihn aus der
    // URL, damit ein Reload den Dialog nicht erneut öffnet.
    const open = searchParams.get(param) === value;

    function handleClose() {
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
