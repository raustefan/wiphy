"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    const handleLogout = () => {
        // Führt den Logout aus und leitet danach auf die Startseite (/) um
        signOut({ callbackUrl: "/" });
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red" variant="soft" style={{ cursor: "pointer" }}>
                    Logout
                </Button>
            </AlertDialog.Trigger>

            <AlertDialog.Content maxWidth="400px">
                <AlertDialog.Title>Abmelden</AlertDialog.Title>
                <AlertDialog.Description size="2" mb="4">
                    Bist du sicher, dass du dich abmelden möchtest?
                </AlertDialog.Description>

                <Flex gap="3" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray" style={{ cursor: "pointer" }}>
                            Abbrechen
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={handleLogout} style={{ cursor: "pointer" }}>
                            Ja, abmelden
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}