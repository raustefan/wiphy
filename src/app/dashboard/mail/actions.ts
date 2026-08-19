"use server";

import { redirect } from "next/navigation";
import { AppError, executeAction } from "@/lib/server/errors";
import { mailSendSchema } from "@/lib/server/validation/schemas";
import { sendMailForTarget } from "@/lib/server/email/mailService";
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
        const { target, subject, message, selectedUserIds, bccToSelf } = parseMailForm(formData);
        const htmlMessage = String(formData.get("message") ?? "");

        await sendMailForTarget({
            target,
            selectedUserIds,
            subject,
            message,
            htmlMessage,
            bccToSelf,
            adminEmail: admin.email,
        });

        return { ok: true };
    });
}
