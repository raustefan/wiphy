"use client";

import { useId, useState } from "react";
import {
    AlertDialog,
    Box,
    Button,
    Callout,
    Card,
    Flex,
    Heading,
    Text,
    TextField,
} from "@radix-ui/themes";
import { ExclamationTriangleIcon, TrashIcon } from "@radix-ui/react-icons";

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
        <Card size="3" mt="6" style={{ border: "1px solid var(--red-a6)", background: "var(--red-a2)" }}>
            <Flex direction="column" gap="3" justify="center" align="center" py="4">
                <Flex align="center" gap="2">
                    <ExclamationTriangleIcon color="var(--red-11)" width={18} height={18} />
                    <Heading as="h2" size="4" color="red">
                        Gefahrenzone
                    </Heading>
                </Flex>
                <Text size="2" color="gray">
                    Das endgültige Löschen dieses Mitglieds kann nicht rückgängig gemacht werden.
                </Text>
                <Box>
                    <Button
                        size="3"
                        color="red"
                        variant="solid"
                        type="button"
                        onClick={openStep1}
                        style={{ width: "100%", maxWidth: 320, cursor: "pointer", justifyContent: "center" }}
                    >
                        <TrashIcon /> Mitglied löschen
                    </Button>
                </Box>
            </Flex>

            {/* Schritt 1: Warnung */}
            <AlertDialog.Root
                open={step1Open}
                onOpenChange={(open) => {
                    if (!open) closeAll();
                }}
            >
                <AlertDialog.Content maxWidth="480px">
                    <AlertDialog.Title>Mitglied unwiderruflich löschen?</AlertDialog.Title>
                    <Callout.Root color="red" mt="2" mb="3">
                        <Callout.Icon>
                            <ExclamationTriangleIcon />
                        </Callout.Icon>
                        <Callout.Text>
                            <Text weight="bold">Achtung:</Text> Beim Löschen von{" "}
                            <Text weight="bold">{displayName}</Text> ({email}) werden auch{" "}
                            <Text weight="bold">alle Mitgliedsbeiträge (Zahlungshistorie)</Text> dieses
                            Mitglieds unwiderruflich gelöscht. Dieser Vorgang kann{" "}
                            <Text weight="bold">nicht rückgängig gemacht werden</Text>.
                        </Callout.Text>
                    </Callout.Root>
                    <Flex gap="3" justify="end" mt="2">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray" type="button">
                                Abbrechen
                            </Button>
                        </AlertDialog.Cancel>
                        <Button color="red" type="button" onClick={proceedToStep2}>
                            Fortfahren
                        </Button>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

            {/* Schritt 2: Bestätigung per Texteingabe */}
            <AlertDialog.Root
                open={step2Open}
                onOpenChange={(open) => {
                    if (!open) closeAll();
                }}
            >
                <AlertDialog.Content maxWidth="480px">
                    <AlertDialog.Title>Bist du absolut sicher?</AlertDialog.Title>
                    <AlertDialog.Description size="2" mb="3">
                        Um das endgültige Löschen von <Text weight="bold">{displayName}</Text> zu
                        bestätigen, gib die E-Mail-Adresse <Text weight="bold">{email}</Text> unten ein.
                    </AlertDialog.Description>
                    <form
                        action={deleteAction}
                        onSubmit={() => {
                            // Zusätzliche Absicherung: nur absenden, wenn die Eingabe exakt passt.
                            if (!canDelete) return;
                        }}
                    >
                        <input type="hidden" name="id" value={userId} />
                        <Text size="2" weight="bold" as="label" htmlFor={confirmInputId} mb="1">
                            E-Mail-Adresse zur Bestätigung
                        </Text>
                        <TextField.Root
                            id={confirmInputId}
                            name="confirmEmail"
                            autoComplete="off"
                            placeholder={email}
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            mt="1"
                            mb="4"
                            color={confirmText.length > 0 && !canDelete ? "red" : undefined}
                        />
                        <Flex gap="3" justify="end">
                            <AlertDialog.Cancel>
                                <Button variant="soft" color="gray" type="button">
                                    Abbrechen
                                </Button>
                            </AlertDialog.Cancel>
                            <Button color="red" type="submit" disabled={!canDelete}>
                                <TrashIcon /> Endgültig löschen
                            </Button>
                        </Flex>
                    </form>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </Card>
    );
}
