"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogFooter } from "@/components/ui/Dialog";

export default function LogoutButton() {
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        // Führt den Logout aus und leitet danach auf die Startseite (/) um
        signOut({ callbackUrl: "/" });
    };

    return (
        <>
            <Button color="danger" variant="soft" onClick={() => setOpen(true)}>
                <LogOut size={16} aria-hidden="true" />
                Logout
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} title="Abmelden" size="sm">
                <p className="text-sm leading-relaxed text-muted">
                    Bist du sicher, dass du dich abmelden möchtest?
                </p>
                <DialogFooter>
                    <Button variant="soft" color="neutral" onClick={() => setOpen(false)}>
                        Abbrechen
                    </Button>
                    <Button color="danger" onClick={handleLogout}>
                        <LogOut size={16} aria-hidden="true" />
                        Ja, abmelden
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
