"use client";

import { QueryParamDialog } from "./QueryParamDialog";

export function EmailChangeDialog() {
    return (
        <QueryParamDialog param="emailChanged" value="1" title="E-Mail-Bestätigung gesendet">
            Deine E-Mail-Adresse wurde noch nicht geändert. Wir haben eine E-Mail an deine neue
            E-Mail-Adresse mit einem Bestätigungslink gesendet. Bitte klicke auf diesen Link, um
            die Änderung abzuschließen.
        </QueryParamDialog>
    );
}
