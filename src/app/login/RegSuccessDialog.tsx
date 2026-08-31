"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";


export function RegSuccessDialog() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(searchParams.get("register") === "success");
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
                <AlertDialog.Title>Account beantragt!</AlertDialog.Title>
                <AlertDialog.Description size="2" mb="3">
                    Die Registierung war erfolgreich. Unser Vorstand wird sich bald bei dir melden!
                    Du kannst bereits jetzt deine E-Mail-Adresse bestätigen, um den Prozess zu beschleunigen.   
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
