"use client";

import { useId, useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import {
    Button,
    Callout,
    Card,
    Dialog,
    DialogFooter,
    Field,
    Input,
} from "@/components/ui";

type DeleteMemberSectionProps = {
    userId: string;
    displayName: string;
    email: string;
    deleteAction: (formData: FormData) => void | Promise<void>;
};

export function DeleteMemberSection({
    userId,
    displayName,
    email,
    deleteAction,
}: DeleteMemberSectionProps) {
    const [step1Open, setStep1Open] = useState(false);
    const [step2Open, setStep2Open] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const confirmInputId = useId();

    const canDelete = confirmText.trim().toLowerCase() === email.trim().toLowerCase();

    function openStep1() {
        setConfirmText("");
        setStep1Open(true);
    }

    function proceedToStep2() {
        setStep1Open(false);
        setConfirmText("");
        setStep2Open(true);
    }

    function closeAll() {
        setStep1Open(false);
        setStep2Open(false);
        setConfirmText("");
    }

    return (
        <Card className="mt-8 border-negative/30 bg-negative/5 p-5 sm:p-6">
            <div className="grid justify-items-center gap-3 py-2 text-center">
                <p className="flex items-center gap-2 font-bold text-negative">
                    <AlertTriangle size={18} aria-hidden="true" />
                    Gefahrenzone
                </p>
                <p className="max-w-prose text-sm text-muted text-pretty">
                    Das endgültige Löschen dieses Mitglieds kann nicht rückgängig gemacht werden.
                </p>
                <Button
                    size="lg"
                    color="danger"
                    type="button"
                    onClick={openStep1}
                    className="w-full max-w-xs"
                >
                    <Trash2 size={16} aria-hidden="true" /> Mitglied löschen
                </Button>
            </div>

            {/* Schritt 1: Warnung */}
            <Dialog
                open={step1Open}
                onClose={closeAll}
                title="Mitglied unwiderruflich löschen?"
            >
                <Callout tone="danger" icon={<AlertTriangle size={16} />}>
                    <span className="font-bold text-foreground">Achtung:</span> Beim Löschen von{" "}
                    <span className="font-bold text-foreground">{displayName}</span> ({email})
                    werden auch{" "}
                    <span className="font-bold text-foreground">
                        alle Mitgliedsbeiträge (Zahlungshistorie)
                    </span>{" "}
                    dieses Mitglieds unwiderruflich gelöscht. Dieser Vorgang kann{" "}
                    <span className="font-bold text-foreground">nicht rückgängig gemacht werden</span>.
                </Callout>
                <DialogFooter>
                    <Button variant="soft" color="neutral" type="button" onClick={closeAll}>
                        Abbrechen
                    </Button>
                    <Button color="danger" type="button" onClick={proceedToStep2}>
                        Fortfahren
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Schritt 2: Bestätigung per Texteingabe */}
            <Dialog
                open={step2Open}
                onClose={closeAll}
                title="Bist du absolut sicher?"
                description={`Um das endgültige Löschen von ${displayName} zu bestätigen, gib die E-Mail-Adresse ${email} unten ein.`}
            >
                <form
                    action={deleteAction}
                    onSubmit={(event) => {
                        // Zusätzliche Absicherung: nur absenden, wenn die Eingabe exakt passt.
                        if (!canDelete) event.preventDefault();
                    }}
                >
                    <input type="hidden" name="id" value={userId} />
                    <Field label="E-Mail-Adresse zur Bestätigung" htmlFor={confirmInputId}>
                        <Input
                            id={confirmInputId}
                            name="confirmEmail"
                            autoComplete="off"
                            placeholder={email}
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            invalid={confirmText.length > 0 && !canDelete}
                        />
                    </Field>
                    <DialogFooter>
                        <Button variant="soft" color="neutral" type="button" onClick={closeAll}>
                            Abbrechen
                        </Button>
                        <Button color="danger" type="submit" disabled={!canDelete}>
                            <Trash2 size={16} aria-hidden="true" /> Endgültig löschen
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </Card>
    );
}
