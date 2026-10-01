"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/server/authz";
import { AppError, executeAction } from "@/lib/server/errors";
import { requireFeatureEnabled } from "@/lib/server/featureGate";
import { consumeRateLimit } from "@/lib/server/rateLimit";
import { logSecurityEvent } from "@/lib/server/securityLog";
import { sendEmail } from "@/lib/server/email/mailer";
import { passwordResetMessage } from "@/lib/email/messages";
import {
    createPasswordResetUrl,
    getEditableUser,
    requestEmailChange,
} from "@/lib/server/services/userService";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { emailChangeSchema } from "@/lib/server/validation/schemas";

/**
 * Schickt denselben Link wie „Passwort vergessen“ an die eigene Adresse. Der
 * Klick darauf setzt das Passwort und entwertet damit alle Sitzungen
 * (`passwordChangedAt`) — auch diese hier.
 */
export async function requestPasswordChange() {
    return executeAction(async () => {
        const currentUser = await requireUser();
        await requireFeatureEnabled("PASSWORD_RESET");
        const user = await getEditableUser(currentUser.id);
        if (!user) throw new AppError("NOT_FOUND", "Konto nicht gefunden.");

        try {
            await consumeRateLimit({
                bucket: "password-change",
                keyParts: [user.id],
                limit: 3,
                windowMs: 15 * 60 * 1000,
                blockMs: 15 * 60 * 1000,
                message: "Zu viele Anfragen. Bitte versuche es in 15 Minuten erneut.",
            });
        } catch (error) {
            if (error instanceof AppError && error.code === "TOO_MANY_REQUESTS") {
                await logSecurityEvent({ type: "PASSWORD_RESET_REQUEST", outcome: "BLOCKED", reason: "rate_limited", userId: user.id });
            }
            throw error;
        }

        const resetUrl = await createPasswordResetUrl(user.email);
        try {
            await sendEmail({ to: user.email, message: passwordResetMessage(resetUrl) });
        } catch (error) {
            console.error("Failed to send password change email:", error);
            await logSecurityEvent({ type: "PASSWORD_RESET_REQUEST", outcome: "FAILURE", reason: "mail_failed", userId: user.id });
            throw new AppError("INTERNAL_ERROR", "Die E-Mail konnte nicht gesendet werden. Bitte versuche es später erneut.");
        }
        await logSecurityEvent({ type: "PASSWORD_RESET_REQUEST", outcome: "SUCCESS", userId: user.id });
        return { sentTo: user.email };
    });
}

const EMAIL_CHANGE_ERRORS = {
    unchanged: ["VALIDATION_ERROR", "Das ist bereits deine aktuelle E-Mail-Adresse."],
    wrong_password: ["VALIDATION_ERROR", "Das aktuelle Passwort stimmt nicht."],
    email_taken: ["CONFLICT", "Diese E-Mail-Adresse wird bereits verwendet."],
    rate_limited: ["TOO_MANY_REQUESTS", "Zu viele Versuche. Bitte versuche es in einer Stunde erneut."],
} as const;

export async function requestEmailChangeAction(formData: FormData) {
    return executeAction(async () => {
        const currentUser = await requireUser();
        await requireFeatureEnabled("EMAIL_CHANGE");
        const { email, currentPassword } = parseFormData(emailChangeSchema, formData);

        const result = await requestEmailChange(currentUser.id, email, currentPassword);
        if (!result.ok) {
            const [code, message] = EMAIL_CHANGE_ERRORS[result.reason];
            throw new AppError(code, message);
        }
        revalidatePath("/dashboard/konto");
        return { sentTo: email };
    });
}

