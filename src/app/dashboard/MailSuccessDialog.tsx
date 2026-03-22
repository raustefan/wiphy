"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

/**
 * Zeigt nach erfolgreichem Rundmail-Versand (Redirect: /dashboard?mail=success) einen Bestätigungsdialog.
 */
export function MailSuccessDialog() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(searchParams.get("mail") === "success");
    }, [searchParams]);

    function handleOpenChange(next: boolean) {
        setOpen(next);
        if (!next) {
            router.replace(pathname);
        }
    }

    return (
        <AlertDialog.Root open={open} onOpenChange={handleOpenChange}>
            <AlertDialog.Content maxWidth="420px">
                <AlertDialog.Title>E-Mail gesendet</AlertDialog.Title>
                <AlertDialog.Description size="2" mb="3">
                    Die Rundmail wurde erfolgreich versendet.
                </AlertDialog.Description>
                <Flex gap="3" justify="end" mt="2">
                    <AlertDialog.Action>
                        <Button type="button">OK</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}
