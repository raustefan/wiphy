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
import { registerSchema } from "@/lib/server/validation/schemas";
import { sendAdminRegistrationNotificationEmail, sendUserRegistrationConfirmationEmail } from "@/lib/mail";

export async function registerUser(formData: FormData) {
    return executeAction(async () => {
        await requireFeatureEnabled("REGISTRATION");

        const { vorname, name, email, password } = parseFormData(registerSchema, formData);
        const requestHeaders = await headers();
        const clientIp = extractClientIp(requestHeaders);

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

        const captchaValid = await verifyAltchaPayload(formData.get("altcha") as string | null);
        if (!captchaValid) {
            throw new AppError("VALIDATION_ERROR", "Captcha-Prüfung fehlgeschlagen. Bitte versuche es erneut.");
        }

        await consumeRateLimit({
            bucket: "register",
            keyParts: [clientIp, email],
            limit: 3,
            windowMs: 60 * 60 * 1000,
            blockMs: 60 * 60 * 1000,
            message: "Zu viele Registrierungsversuche. Bitte versuche es in einer Stunde erneut.",
        });

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            // Don't reveal whether the email is already registered (avoids account enumeration).
            // Pretend registration succeeded without creating a duplicate account or sending mail.
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

        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const verificationUrl = `${baseUrl}/verify-email?token=${token}`;

        try {
            const admins = await prisma.user.findMany({
                where: { role: "ADMIN" },
                select: { email: true },
            });
            const adminEmails = admins.map((admin) => admin.email);

            await sendAdminRegistrationNotificationEmail(adminEmails, { vorname, name, email });
            await sendUserRegistrationConfirmationEmail(email, verificationUrl, { vorname, name });
        } catch (error) {
            console.error("Failed to send registration notification emails:", error);
        }

        redirect("/login?register=success");
    });
}
