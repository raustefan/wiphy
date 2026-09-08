"use server";

import { AppError, executeAction } from "@/lib/server/errors";
import { mailSendSchema } from "@/lib/server/validation/schemas";
import { sendMailForTarget } from "@/lib/server/email/mailService";
import { getAnnouncedEvent } from "@/lib/server/services/eventService";
import { enforceAdminMailRateLimit } from "@/lib/server/email/rateLimitMail";
import { requireFeatureEnabled } from "@/lib/server/featureGate";

function parseMailForm(formData: FormData) {
    const selectedUserIds = [
        ...new Set(
            formData
                .getAll("selectedUserIds")
                .filter((v): v is string => typeof v === "string" && v.length > 0),
        ),
    ];

    const raw = {
        target: String(formData.get("target") ?? ""),
        subject: String(formData.get("subject") ?? ""),
        message: String(formData.get("message") ?? ""),
        selectedUserIds,
        bccToSelf: formData.get("bccToSelf") === "on",
        eventId: String(formData.get("eventId") ?? ""),
    };

    const parsed = mailSendSchema.safeParse(raw);
    if (!parsed.success) {
        throw new AppError(
            "VALIDATION_ERROR",
            parsed.error.issues[0]?.message ?? "Ungültige Eingaben.",
        );
    }
    return parsed.data;
}

export async function sendEmailAction(formData: FormData) {
    return executeAction(async () => {
        const admin = await enforceAdminMailRateLimit();
        await requireFeatureEnabled("MAIL_SERVICES");
        const { target, subject, message, selectedUserIds, bccToSelf, eventId } =
            parseMailForm(formData);

        // Der Terminblock entsteht serverseitig aus dem gespeicherten Termin —
        // was der Absender im Editor stehen hat, kann ihn nicht verfälschen.
        const event = eventId ? await getAnnouncedEvent(eventId) : undefined;

        await sendMailForTarget({
            target,
            selectedUserIds,
            subject,
            html: message,
            bccToSelf,
            adminEmail: admin.email,
            event,
        });

        return { ok: true };
    });
}
