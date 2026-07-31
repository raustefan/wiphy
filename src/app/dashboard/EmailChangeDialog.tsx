"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

export function EmailChangeDialog() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(searchParams.get("emailChanged") === "1");
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
                <AlertDialog.Title>E-Mail-Bestätigung gesendet</AlertDialog.Title>
                <AlertDialog.Description size="2" mb="3">
                    Deine E-Mail-Adresse wurde noch nicht geändert. Wir haben eine E-Mail an deine neue E-Mail-Adresse mit einem Bestätigungslink gesendet. Bitte klicke auf diesen Link, um die Änderung abzuschließen.
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
