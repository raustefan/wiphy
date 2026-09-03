"use client";

import { QueryParamDialog } from "./QueryParamDialog";

/**
 * Zeigt nach erfolgreichem Rundmail-Versand (Redirect: /dashboard?mail=success)
 * einen Bestätigungsdialog.
 */
export function MailSuccessDialog() {
    return (
        <QueryParamDialog param="mail" value="success" title="E-Mail gesendet">
            Die Rundmail wurde erfolgreich versendet.
        </QueryParamDialog>
    );
}
