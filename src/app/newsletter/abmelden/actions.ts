"use server";

import { AppError, executeAction } from "@/lib/server/errors";
import { verifyNewsletterToken } from "@/lib/server/newsletterToken";
import { setNewsletter } from "@/lib/server/services/userService";

/**
 * Ab- oder wieder anmelden über den Link aus einer Newsletter-Mail — ohne
 * Login. Der signierte Token ist die ganze Berechtigung, und er reicht für
 * nichts anderes als genau diesen Schalter.
 */
export async function setNewsletterByTokenAction(token: string, subscribed: boolean) {
    return executeAction(async () => {
        const userId = verifyNewsletterToken(token);
        if (!userId) throw new AppError("VALIDATION_ERROR", "Dieser Abmeldelink ist ungültig oder unvollständig.");
        if (!(await setNewsletter(userId, subscribed === true))) {
            throw new AppError("NOT_FOUND", "Zu diesem Link gibt es kein Konto mehr.");
        }
        return subscribed === true;
    });
}
