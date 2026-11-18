"use server";

import { AppError, executeAction } from "@/lib/server/errors";
import { mailSendSchema, type MailSendInput } from "@/lib/server/validation/schemas";
import {
    deliverableUsers,
    eventBlocks,
    icsAttachment,
    postBlocks,
    renderMailPreview,
    resolveRecipients,
    resolveUsersByIds,
    sendMailToUsers,
    sendTestMail,
    sepaBlocks,
    type MailExtras,
    type SepaDebitInfo,
} from "@/lib/server/email/mailService";
import { createPreviewToken, sha256, verifyPreviewToken } from "@/lib/server/email/previewToken";
import { processMailPhotos } from "@/lib/server/images/mailPhotoProcessing";
import { getAnnouncedEvent } from "@/lib/server/services/eventService";
import { getAnnouncedPost } from "@/lib/server/services/blogService";
import { getSepaCandidates } from "@/lib/server/services/feeService";
import { getSepaCreditorDefaults } from "@/lib/server/env";
import { SEPA_CREDITOR_ID } from "@/lib/membership";
import { enforceAdminMailRateLimit } from "@/lib/server/email/rateLimitMail";
import { requireFeatureEnabled } from "@/lib/server/featureGate";
import { requireAdmin } from "@/lib/server/authz";

async function parseMailForm(formData: FormData) {
    const selectedUserIds = [
        ...new Set(
            formData
                .getAll("selectedUserIds")
                .filter((v): v is string => typeof v === "string" && v.length > 0),
        ),
    ];

    const raw = {
        template: String(formData.get("template") ?? ""),
        newsletter: String(formData.get("newsletter") ?? ""),
        target: String(formData.get("target") ?? ""),
        selectedUserIds,
        subject: String(formData.get("subject") ?? ""),
        salutation: String(formData.get("salutation") ?? ""),
        message: String(formData.get("message") ?? ""),
        bccToSelf: String(formData.get("bccToSelf") ?? ""),
        eventId: String(formData.get("eventId") ?? ""),
        attachIcs: formData.get("attachIcs") === "on",
        postId: String(formData.get("postId") ?? ""),
        sepaDate: String(formData.get("sepaDate") ?? ""),
    };

    const files = formData.getAll("photos").filter((v): v is File => v instanceof File && v.size > 0);

    return {
        // Ein ZodError wird in `executeAction` zur ersten Zod-Meldung.
        fields: mailSendSchema.parse(raw),
        files,
        fileHashes: await Promise.all(files.map(async (file) => sha256(new Uint8Array(await file.arrayBuffer())))),
        token: String(formData.get("previewToken") ?? ""),
    };
}

/** Lastschriften des Einzugsjahres — dieselbe Quelle wie die SEPA-Datei. */
async function sepaDebits(adminId: string, collectionDate: string): Promise<Map<string, SepaDebitInfo>> {
    const candidates = await getSepaCandidates(adminId, Number(collectionDate.slice(0, 4)));
    return new Map(
        candidates
            .filter((c) => !c.problem)
            .map((c) => [c.id, { amount: c.amount, mandateReference: c.mandateReference, iban: c.iban }]),
    );
}

/**
 * Empfänger und Infoblöcke einer Rundmail. Termin, Beitrag und Beträge kommen
 * aus der Datenbank, nicht aus dem Formular — was im Editor steht, kann sie
 * nicht verfälschen.
 */
async function prepareMail(fields: MailSendInput, files: File[], adminId: string) {
    let users = await resolveRecipients(fields);
    const extras: MailExtras = {
        salutation: fields.salutation === "PERSONAL",
        attachments: [...(await processMailPhotos(files))],
    };
    let skipped = 0;

    if (fields.template === "EVENT") {
        const event = await getAnnouncedEvent(fields.eventId!);
        extras.blocks = eventBlocks(event);
        if (fields.attachIcs) extras.attachments!.unshift(icsAttachment(event));
    } else if (fields.template === "BLOG") {
        extras.blocks = postBlocks(await getAnnouncedPost(fields.postId!));
    } else if (fields.template === "SEPA") {
        const debits = await sepaDebits(adminId, fields.sepaDate);
        const creditorId = getSepaCreditorDefaults().id || SEPA_CREDITOR_ID;
        // Ohne Gläubiger-ID ist die Vorabankündigung unvollständig — lieber
        // gar nicht senden als eine Mail, der die Pflichtangabe fehlt.
        if (!creditorId) {
            throw new AppError(
                "VALIDATION_ERROR",
                "Keine Gläubiger-ID hinterlegt. Bitte SEPA_CREDITOR_ID in der Server-Konfiguration (.env) setzen.",
            );
        }
        extras.personalBlocks = (user) =>
            sepaBlocks({
                info: user ? (debits.get(user.id) ?? null) : null,
                collectionDate: fields.sepaDate,
                creditorId,
            });
        // Wer nichts eingezogen bekommt, braucht keine Vorabankündigung.
        const payers = users.filter((user) => debits.has(user.id));
        skipped = users.length - payers.length;
        users = payers;
    }

    users = deliverableUsers(users, fields.newsletter);
    if (users.length === 0) {
        throw new AppError(
            "VALIDATION_ERROR",
            fields.template === "SEPA"
                ? "Niemand in dieser Gruppe hat für das Einzugsjahr eine offene Lastschrift."
                : "Keine Empfänger — bei einem Newsletter haben womöglich alle abbestellt.",
        );
    }
    return { users, extras, skipped };
}

function requireMatchingPreview(token: string, fields: MailSendInput, fileHashes: string[]) {
    if (!verifyPreviewToken(token, fields, fileHashes)) {
        throw new AppError(
            "VALIDATION_ERROR",
            "Die Mail wurde nach der Vorschau geändert. Bitte die Vorschau neu erstellen und prüfen.",
        );
    }
}

/**
 * Pflicht-Vorschau. Liefert neben dem HTML den Token, ohne den weder Testmail
 * noch Versand durchgehen, und die Empfängerzahl, wie der Server sie sieht.
 */
export async function previewRundmailAction(formData: FormData) {
    return executeAction(async () => {
        const admin = await requireAdmin();
        const { fields, files, fileHashes } = await parseMailForm(formData);
        const { users, extras, skipped } = await prepareMail(fields, files, admin.id);

        return {
            html: await renderMailPreview({
                subject: fields.subject,
                html: fields.message,
                extras,
                newsletter: fields.newsletter,
            }),
            token: createPreviewToken(fields, fileHashes),
            recipients: users.length,
            skipped,
        };
    });
}

/** Optional vor dem Versand: dieselbe Mail an den Absender, mit seinen Daten. */
export async function sendTestMailAction(formData: FormData) {
    return executeAction(async () => {
        const admin = await enforceAdminMailRateLimit();
        await requireFeatureEnabled("MAIL_SERVICES");
        const { fields, files, fileHashes, token } = await parseMailForm(formData);
        requireMatchingPreview(token, fields, fileHashes);
        const { extras } = await prepareMail(fields, files, admin.id);
        const [self] = await resolveUsersByIds([admin.id]);

        await sendTestMail({
            subject: fields.subject,
            html: fields.message,
            extras,
            newsletter: fields.newsletter,
            to: self,
        });
        return { to: self.email };
    });
}

export async function sendEmailAction(formData: FormData) {
    return executeAction(async () => {
        const admin = await enforceAdminMailRateLimit();
        await requireFeatureEnabled("MAIL_SERVICES");
        const { fields, files, fileHashes, token } = await parseMailForm(formData);
        requireMatchingPreview(token, fields, fileHashes);
        const { users, extras } = await prepareMail(fields, files, admin.id);

        return sendMailToUsers({
            subject: fields.subject,
            html: fields.message,
            bccToSelf: fields.bccToSelf,
            adminEmail: admin.email,
            users,
            extras,
            recipientGroup: fields.target === "SELECTED" ? null : fields.target,
            // Schon oben gefiltert; hier nur noch für den Abmeldelink.
            newsletter: fields.newsletter,
        });
    });
}
