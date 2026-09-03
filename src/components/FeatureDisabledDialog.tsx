"use client";

import { Dialog, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

type FeatureDisabledDialogProps = {
    open: boolean;
    featureLabel?: string;
    onOpenChange: (open: boolean) => void;
};

/**
 * Generic "feature disabled by an admin" popup.
 */
export function FeatureDisabledDialog({ open, featureLabel, onOpenChange }: FeatureDisabledDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={() => onOpenChange(false)}
            title="Funktion deaktiviert"
            size="sm"
        >
            <p className="text-sm leading-relaxed text-muted">
                {featureLabel ? `„${featureLabel}“ wurde` : "Diese Funktion wurde"} von einem
                Administrator deaktiviert. Bitte versuche es später erneut.
            </p>
            <DialogFooter>
                <Button type="button" onClick={() => onOpenChange(false)}>
                    OK
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
