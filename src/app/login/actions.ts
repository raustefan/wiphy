"use server";

import crypto from "crypto";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { executeAction } from "@/lib/server/errors";
import { requireFeatureEnabled } from "@/lib/server/featureGate";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";
import { normalizeEmail } from "@/lib/server/normalizeEmail";
import { sendUserRegistrationConfirmationEmail } from "@/lib/mail";
import { createAltchaChallenge } from "@/lib/server/altcha";

/**
 * Mints a replacement ALTCHA challenge for the login form. A solved challenge
 * is single-use server-side, so the form needs a fresh one after every failed
 * attempt.
 */
export async function createLoginChallenge(): Promise<string> {
    return JSON.stringify(await createAltchaChallenge());
}

// Admins must always be able to log in, even while LOGIN is disabled, so they
// can get back in and re-enable it. Only an email lookup (no password check)
// is needed here — this just gates the UI, `auth.ts` enforces it for real.
export async function checkLoginFeatureEnabled(email: string): Promise<boolean> {
    if (await isFeatureEnabled("LOGIN")) return true;

    const trimmedEmail = normalizeEmail(email);
    if (!trimmedEmail) return false;

    const user = await prisma.user.findUnique({
        where: { email: trimmedEmail },
        select: { role: true },
    });
    return user?.role === "ADMIN";
}

/**
 * Re-sends the email-confirmation link for a user who tried to log in but hasn't
 * verified their address yet. Mirrors the registration flow exactly: a fresh
 * 24h `emailVerificationToken` and the same confirmation email.
 *
 * Always reports success (unless a feature flag / rate limit blocks it) so it
 * can't be used to tell which emails have an account.
 */
export async function resendVerificationEmail(email: string) {
    return executeAction(async () => {
        await requireFeatureEnabled("EMAIL_VERIFICATION");

        const trimmedEmail = normalizeEmail(email);
        const requestHeaders = await headers();
        const clientIp = extractClientIp(requestHeaders);

        await consumeRateLimit({
            bucket: "resend-verification-ip",
            keyParts: [clientIp],
            limit: 10,
            windowMs: 60 * 60 * 1000,
            blockMs: 60 * 60 * 1000,
            message: "Zu viele Anfragen. Bitte versuche es in einer Stunde erneut.",
        });

        if (!trimmedEmail) return;

        await consumeRateLimit({
            bucket: "resend-verification",
            keyParts: [clientIp, trimmedEmail],
            limit: 3,
            windowMs: 60 * 60 * 1000,
            blockMs: 60 * 60 * 1000,
            message: "Zu viele Anfragen. Bitte versuche es in einer Stunde erneut.",
        });

        const user = await prisma.user.findUnique({ where: { email: trimmedEmail } });
        if (!user || user.emailVerified) return;

        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        await prisma.emailVerificationToken.deleteMany({ where: { userId: user.id } });
        await prisma.emailVerificationToken.create({
            data: {
                userId: user.id,
                email: user.email,
                token,
                expires,
            },
        });

        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const verificationUrl = `${baseUrl}/verify-email?token=${token}`;

        try {
            await sendUserRegistrationConfirmationEmail(user.email, verificationUrl, {
                vorname: user.vorname,
                name: user.name,
            });
        } catch (error) {
            console.error("Failed to resend verification email:", error);
        }
    });
}
