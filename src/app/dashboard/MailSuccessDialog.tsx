"use client";

import { QueryParamDialog } from "./QueryParamDialog";

/**
 * Zeigt nach erfolgreichem Rundmail-Versand (Redirect: /dashboard?mail=success)
 * einen Bestätigungsdialog.
 */
export function MailSuccessDialog() {
    return (
        <>
            <QueryParamDialog param="mail" value="success" title="E-Mail gesendet">
                Die Rundmail wurde erfolgreich versendet.
            </QueryParamDialog>
            {/* Nach dem Anlegen eines Kontos: das Konto existiert, nur die Mail kam nicht raus. */}
            <QueryParamDialog param="mail" value="failed" title="E-Mail nicht gesendet">
                Das Konto wurde angelegt, die E-Mail mit den Zugangsdaten konnte aber nicht versendet
                werden. Bitte gib die Zugangsdaten auf anderem Weg weiter.
            </QueryParamDialog>
        </>
    );
}
