"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";

type FeatureDisabledDialogProps = {
    open: boolean;
    featureLabel?: string;
    onOpenChange: (open: boolean) => void;
};

/**
 * Generic "feature disabled by an admin" popup, styled like the other AlertDialog
 * popups in the app (see MailSuccessDialog / EmailChangeDialog).
 */
export function FeatureDisabledDialog({ open, featureLabel, onOpenChange }: FeatureDisabledDialogProps) {
    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content maxWidth="420px">
                <AlertDialog.Title>Funktion deaktiviert</AlertDialog.Title>
                <AlertDialog.Description size="2" mb="3">
                    {featureLabel ? `„${featureLabel}“ wurde` : "Diese Funktion wurde"} von einem
                    Administrator deaktiviert. Bitte versuche es später erneut.
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
