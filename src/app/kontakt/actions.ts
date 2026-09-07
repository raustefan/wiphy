"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { AppError, executeAction } from "@/lib/server/errors";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";
import { requireFeatureEnabled } from "@/lib/server/featureGate";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { verifyAltchaPayload } from "@/lib/server/altcha";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { contactSchema } from "@/lib/server/validation/schemas";
import { MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD } from "@/lib/contact";
import { hashIp, scoreSpam } from "@/lib/server/contactSpam";
import { getAdminNotificationEmails } from "@/lib/server/services/contactService";
import { sendEmail } from "@/lib/server/email/mailer";
import { contactRequestMessage } from "@/lib/email/messages";
import { logSecurityEvent, type SecurityEventReason } from "@/lib/server/securityLog";

/**
 * Public contact form.
 *
 * Checks run cheapest-first so that abusive traffic is dropped before it can
 * cost us a database write or an SMTP round trip. In particular the rate limits
 * run *before* the ALTCHA verification: verifying spends a row in
 * `SolvedAltchaChallenge`, so an unthrottled attacker could otherwise inflate
 * that table at will.
 */
export async function submitContactRequest(formData: FormData) {
    return executeAction(async () => {
        await requireFeatureEnabled("CONTACT_FORM");

        // Resolved up front: with both sinks off there is nowhere for the
        // message to go, and silently accepting it would be a lie.
        const [storageEnabled, mailEnabled] = await Promise.all([
            isFeatureEnabled("CONTACT_FORM_STORAGE"),
            isFeatureEnabled("CONTACT_FORM_MAIL"),
        ]);
        if (!storageEnabled && !mailEnabled) {
            throw new AppError(
                "FORBIDDEN",
                "Das Kontaktformular ist derzeit nicht verfügbar. Bitte wende dich direkt per E-Mail an uns.",
            );
        }

        const input = parseFormData(contactSchema, formData);

        // Vorgezogen, damit auch die still abgewiesenen Bot-Versuche unten mit
        // IP-Pseudonym im Protokoll landen.
        const requestHeaders = await headers();
        const clientIp = extractClientIp(requestHeaders);

        const logAttempt = (
            outcome: "SUCCESS" | "FAILURE" | "BLOCKED",
            reason?: SecurityEventReason,
        ) =>
            logSecurityEvent({
                type: "CONTACT_REQUEST",
                outcome,
                reason,
                // Bewusst nur als Pseudonym: der Absender einer *gespeicherten*
                // Anfrage steht ohnehin im Klartext in `ContactRequest`, das
                // Protokoll braucht ihn dafür nicht ein zweites Mal.
                email: input.email,
                ip: clientIp,
                userAgent: requestHeaders.get("user-agent"),
            });

        // Honeypot: hidden field, so only an automated filler touches it. The
        // caller gets a success response — telling a bot why it failed just
        // helps it adapt.
        if (input.website && input.website.trim() !== "") {
            await logAttempt("BLOCKED", "honeypot");
            return { accepted: true };
        }

        // Timing check, same silent-success treatment.
        const renderedAt = Number(input.renderedAt);
        if (Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_FILL_TIME_MS) {
            await logAttempt("BLOCKED", "too_fast");
            return { accepted: true };
        }

        try {
            await consumeRateLimit({
                bucket: "contact-ip",
                keyParts: [clientIp],
                limit: 3,
                windowMs: 60 * 60 * 1000,
                blockMs: 6 * 60 * 60 * 1000,
                message: "Zu viele Anfragen von dieser Verbindung. Bitte versuche es später erneut.",
            });

            await consumeRateLimit({
                bucket: "contact-email",
                keyParts: [input.email],
                limit: 3,
                windowMs: 24 * 60 * 60 * 1000,
                blockMs: 24 * 60 * 60 * 1000,
                message: "Für diese E-Mail-Adresse liegen bereits mehrere Anfragen vor. Bitte warte unsere Antwort ab.",
            });

            // Global cap: a distributed botnet defeats the per-IP bucket entirely,
            // but this still protects the SMTP quota.
            await consumeRateLimit({
                bucket: "contact-global",
                keyParts: ["all"],
                limit: 5,
                windowMs: 60 * 60 * 1000,
                blockMs: 60 * 60 * 1000,
                message: "Das Kontaktformular ist momentan überlastet. Bitte versuche es später erneut.",
            });
        } catch (error) {
            await logAttempt("BLOCKED", "rate_limited");
            throw error;
        }

        const captchaValid = await verifyAltchaPayload(formData.get("altcha") as string | null);
        if (!captchaValid) {
            await logAttempt("BLOCKED", "captcha_failed");
            throw new AppError(
                "VALIDATION_ERROR",
                "Sicherheitsüberprüfung fehlgeschlagen. Bitte lade die Seite neu und versuche es erneut.",
            );
        }

        const payload = {
            name: input.name,
            email: input.email,
            subject: input.subject,
            message: input.message,
        };
        const spamScore = scoreSpam(payload);
        const shouldMail = mailEnabled && spamScore < SPAM_SCORE_MAIL_THRESHOLD;

        // Persist first: if SMTP is down, the enquiry survives in the dashboard.
        let requestId: string | null = null;
        let mailFailed = false;
        if (storageEnabled) {
            const created = await prisma.contactRequest.create({
                data: {
                    ...payload,
                    ipHash: clientIp === "unknown" ? null : hashIp(clientIp),
                    userAgent: requestHeaders.get("user-agent")?.slice(0, 500) ?? null,
                    spamScore,
                },
                select: { id: true },
            });
            requestId = created.id;
        }

        if (shouldMail) {
            try {
                const adminEmails = await getAdminNotificationEmails();
                await sendEmail({
                    // BCC hält die Admin-Verteilerliste aus den sichtbaren Headern
                    // heraus; die Besucheradresse steht im Reply-To statt im From,
                    // sonst würde die Mail an unserem SPF/DKIM/DMARC scheitern.
                    bcc: adminEmails,
                    replyTo: `${payload.name} <${payload.email}>`,
                    message: contactRequestMessage(payload),
                });
                if (requestId) {
                    await prisma.contactRequest.update({
                        where: { id: requestId },
                        data: { mailedAt: new Date() },
                    });
                }
            } catch (error) {
                // A mail failure must not surface as a failed submission when the
                // request is already stored — but with storage off there is no
                // second chance, so the visitor has to be told.
                console.error("Failed to send contact notification email:", error);
                if (!storageEnabled) {
                    await logAttempt("FAILURE", "mail_failed");
                    throw new AppError(
                        "INTERNAL_ERROR",
                        "Deine Nachricht konnte nicht zugestellt werden. Bitte versuche es später erneut.",
                    );
                }
                mailFailed = true;
            }
        }

        // Angenommen ist angenommen — der Grund hält nur fest, ob die Anfrage
        // auch tatsächlich bei den Admins ankam. Ohne das sähe eine vom
        // Spamfilter aussortierte Anfrage im Protokoll aus wie eine zugestellte.
        await logAttempt(
            "SUCCESS",
            mailFailed ? "mail_failed" : shouldMail ? undefined : "spam_filtered",
        );

        return { accepted: true };
    });
}
