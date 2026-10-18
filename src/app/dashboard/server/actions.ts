"use server";

import { backupLinkMessage } from "@/lib/email/messages";
import { requireDebugAdmin } from "@/lib/server/authz";
import { sendEmail } from "@/lib/server/email/mailer";
import { AppError, executeAction } from "@/lib/server/errors";
import { startDeploy } from "@/lib/server/serverStatus";
import { verifyPasswordForAccountAction } from "@/lib/server/services/accountService";
import { BACKUP_LINK_MINUTES, createBackupLink } from "@/lib/server/services/backupService";

export async function triggerDeploy() {
    return executeAction(async () => {
        await requireDebugAdmin();
        await startDeploy();
    });
}

/**
 * Prüft das Passwort und schickt einen Einmal-Link an die eigene Adresse. Erst
 * der Link lädt herunter: ein erbeutetes Passwort allein reicht so nicht, und
 * wer den Link nicht selbst angefordert hat, bemerkt es an der Mail.
 */
export async function requestBackupLink(formData: FormData) {
    return executeAction(async () => {
        const user = await requireDebugAdmin();
        if (!user.email) throw new AppError("VALIDATION_ERROR", "Zu deinem Konto ist keine E-Mail-Adresse hinterlegt.");
        await verifyPasswordForAccountAction(user.id, String(formData.get("password") ?? ""));
        const url = await createBackupLink(user.id);
        await sendEmail({ to: user.email, message: backupLinkMessage(url, BACKUP_LINK_MINUTES) });
        return { sentTo: user.email };
    });
}
