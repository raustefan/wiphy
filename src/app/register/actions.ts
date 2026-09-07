"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { AppError, executeAction } from "@/lib/server/errors";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";
import { requireFeatureEnabled } from "@/lib/server/featureGate";
import { verifyAltchaPayload } from "@/lib/server/altcha";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { registerFormSchema } from "@/lib/server/validation/schemas";
import { sendEmail } from "@/lib/server/email/mailer";
import {
    adminRegistrationNoticeMessage,
    registrationConfirmationMessage,
} from "@/lib/email/messages";
import { siteUrl } from "@/lib/server/siteUrl";
import { logSecurityEvent, type SecurityEventReason } from "@/lib/server/securityLog";

/** Sitz der Universität — die Antwort auf die Sicherheitsfrage im Formular. */
const SECURITY_ANSWER = "ulm";

/** Schneller als das füllt kein Mensch das Formular aus. */
const MIN_FILL_TIME_MS = 3000;

export async function registerUser(formData: FormData) {
    return executeAction(async () => {
        await requireFeatureEnabled("REGISTRATION");

        const { vorname, name, email, password, securityAnswer, website, renderedAt } =
            parseFormData(registerFormSchema, formData);

        // Vorgezogen, weil auch die stillen Abbrüche unten protokolliert werden
        // sollen — sonst fehlten im Protokoll ausgerechnet die Bot-Versuche.
        const requestHeaders = await headers();
        const clientIp = extractClientIp(requestHeaders);

        // Nur öffentliche Registrierungen landen im Protokoll. Ein Konto, das ein
        // Admin im Dashboard anlegt, ist kein Zugriffsversuch von außen.
        const logAttempt = (
            outcome: "SUCCESS" | "FAILURE" | "BLOCKED",
            reason?: SecurityEventReason,
            userId?: string,
        ) =>
            logSecurityEvent({
                type: "REGISTRATION",
                outcome,
                reason,
                userId,
                email,
                ip: clientIp,
                userAgent: requestHeaders.get("user-agent"),
            });

        // Honeypot und Zeitmessung laufen vor allem anderen: sie kosten nichts
        // und fangen die Bots ab, die stumpf jedes Feld füllen bzw. sofort
        // abschicken. Beide antworten mit einem vorgetäuschten Erfolg — einem
        // Bot zu erklären, woran er gescheitert ist, hilft nur ihm. Im Protokoll
        // steht dagegen der echte Grund.
        if (website && website.trim() !== "") {
            await logAttempt("BLOCKED", "honeypot");
            redirect("/login?register=success");
        }
        const renderedAtMs = Number(renderedAt);
        if (Number.isFinite(renderedAtMs) && Date.now() - renderedAtMs < MIN_FILL_TIME_MS) {
            await logAttempt("BLOCKED", "too_fast");
            redirect("/login?register=success");
        }

        try {
            // Per-IP cap first: stops spraying many different emails from one IP,
            // which the per-(IP, email) bucket below can't catch on its own.
            await consumeRateLimit({
                bucket: "register-ip",
                keyParts: [clientIp],
                limit: 10,
                windowMs: 60 * 60 * 1000,
                blockMs: 60 * 60 * 1000,
                message: "Zu viele Registrierungsversuche. Bitte versuche es in einer Stunde erneut.",
            });
        } catch (error) {
            await logAttempt("BLOCKED", "rate_limited");
            throw error;
        }

        // Vor dem Captcha, weil die Prüfung nichts kostet: verifyAltchaPayload()
        // schreibt eine Zeile in `SolvedAltchaChallenge`.
        if (securityAnswer.toLowerCase() !== SECURITY_ANSWER) {
            await logAttempt("FAILURE", "security_question");
            throw new AppError(
                "VALIDATION_ERROR",
                "Die Antwort auf die Sicherheitsfrage stimmt nicht. Bitte versuche es erneut.",
            );
        }

        const captchaValid = await verifyAltchaPayload(formData.get("altcha") as string | null);
        if (!captchaValid) {
            await logAttempt("BLOCKED", "captcha_failed");
            throw new AppError("VALIDATION_ERROR", "Captcha-Prüfung fehlgeschlagen. Bitte versuche es erneut.");
        }

        try {
            await consumeRateLimit({
                bucket: "register",
                keyParts: [clientIp, email],
                limit: 3,
                windowMs: 60 * 60 * 1000,
                blockMs: 60 * 60 * 1000,
                message: "Zu viele Registrierungsversuche. Bitte versuche es in einer Stunde erneut.",
            });
        } catch (error) {
            await logAttempt("BLOCKED", "rate_limited");
            throw error;
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            // Don't reveal whether the email is already registered (avoids account enumeration).
            // Pretend registration succeeded without creating a duplicate account or sending mail.
            await logAttempt("FAILURE", "email_taken", existingUser.id);
            redirect("/login?register=success");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                vorname,
                name,
                email,
                password: hashedPassword,
                emailVerified: false,
            },
        });

        // Generate email verification token
        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        await prisma.emailVerificationToken.create({
            data: {
                userId: user.id,
                email,
                token,
                expires,
            },
        });

        await logAttempt("SUCCESS", undefined, user.id);

        const verificationUrl = siteUrl(`/verify-email?token=${token}`);

        try {
            const admins = await prisma.user.findMany({
                where: { role: "ADMIN" },
                select: { email: true },
            });
            const adminEmails = admins.map((admin) => admin.email);

            await sendEmail({
                bcc: adminEmails,
                message: adminRegistrationNoticeMessage({ vorname, name, email }),
            });
            await sendEmail({
                to: email,
                message: registrationConfirmationMessage({ vorname, name }, verificationUrl),
            });
        } catch (error) {
            console.error("Failed to send registration notification emails:", error);
        }

        redirect("/login?register=success");
    });
}
