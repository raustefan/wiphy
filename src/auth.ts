import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { consumeRateLimit, extractClientIp, resetRateLimit } from "@/lib/server/rateLimit";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { normalizeEmail } from "@/lib/server/normalizeEmail";
import { verifyAltchaPayload } from "@/lib/server/altcha";
import { AppError } from "@/lib/server/errors";

/**
 * Thrown when the credentials are valid but the user hasn't confirmed their
 * email yet. The `code` is surfaced to the login page (as `res.code`) so it can
 * show a specific message plus a "resend confirmation email" option.
 */
export class EmailNotVerifiedError extends CredentialsSignin {
    code = "email_not_verified";
}

/**
 * Thrown when the per-IP or per-(IP, email) login budget is exhausted. Must
 * extend `CredentialsSignin` so NextAuth surfaces the `code` to the login page
 * — otherwise a locked-out user is told to "check their credentials" and keeps
 * retrying, extending their own block.
 */
export class LoginRateLimitedError extends CredentialsSignin {
    code = "rate_limited";
}

/** Thrown when the ALTCHA proof-of-work is missing, invalid, or already spent. */
export class CaptchaFailedError extends CredentialsSignin {
    code = "captcha_failed";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
                altcha: {},
            },
            async authorize(credentials, request) {
                const email = normalizeEmail(String(credentials?.email ?? ""));
                const clientIp = extractClientIp(request.headers);
                const ipRateLimitKey = [clientIp];
                const rateLimitKey = [clientIp, email];

                // `consumeRateLimit` throws an AppError, which NextAuth would flatten
                // into a generic "check your credentials". Re-throw as a CredentialsSignin
                // so the login page can show the real reason.
                try {
                    // Per-IP cap first: stops credential spraying across many different
                    // emails from one IP, which the per-(IP, email) bucket below can't catch.
                    await consumeRateLimit({
                        bucket: "login-ip",
                        keyParts: ipRateLimitKey,
                        limit: 20,
                        windowMs: 10 * 60 * 1000,
                        blockMs: 10 * 60 * 1000,
                        message: "Zu viele Login-Versuche von dieser Adresse. Bitte versuche es in 10 Minuten erneut.",
                    });

                    await consumeRateLimit({
                        bucket: "login",
                        keyParts: rateLimitKey,
                        limit: 5,
                        windowMs: 10 * 60 * 1000,
                        blockMs: 10 * 60 * 1000,
                        message: "Zu viele Login-Versuche. Bitte versuche es in 10 Minuten erneut.",
                    });
                } catch (error) {
                    if (error instanceof AppError && error.code === "TOO_MANY_REQUESTS") {
                        throw new LoginRateLimitedError();
                    }
                    throw error;
                }

                // Checked after the rate limit (so captcha work can't be used to
                // bypass it) but before any DB lookup, so scripted attempts pay
                // the proof-of-work cost first.
                if (!(await verifyAltchaPayload(String(credentials?.altcha ?? "")))) {
                    throw new CaptchaFailedError();
                }

                if (!email || !credentials?.password) return null;
                const user = await prisma.user.findUnique({
                    where: { email },
                });
                if (!user) return null;
                const valid = await bcrypt.compare(credentials.password as string, user.password);
                if (!valid) return null;
                // Only reveal the unconfirmed-email state once the password checks
                // out, so this can't be used to probe which emails have accounts.
                if (!user.emailVerified) throw new EmailNotVerifiedError();
                // Admins must always be able to log in, even while the LOGIN flag is off,
                // so they can get back in to re-enable it.
                if (user.role !== "ADMIN" && !(await isFeatureEnabled("LOGIN"))) return null;
                await prisma.user.update({
                    where: { id: user.id },
                    data: { lastLogin: new Date() },
                });
                // Clear both buckets: leaving "login-ip" armed lets a handful of
                // legitimate users behind one NAT/office IP exhaust the shared cap.
                await resetRateLimit("login", rateLimitKey);
                await resetRateLimit("login-ip", ipRateLimitKey);
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    status: user.status,
                    passwordChangedAt: user.passwordChangedAt,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const role = (user as { role?: unknown }).role;
                const status = (user as { status?: unknown }).status;
                const passwordChangedAt = (user as { passwordChangedAt?: Date }).passwordChangedAt;
                if (role === "ADMIN" || role === "MEMBER") {
                    token.role = role;
                }
                if (
                    status === "ORDENTLICHES_MITGLIED" ||
                    status === "EHRENMITGLIED" ||
                    status === "KEIN_MITGLIED"
                ) {
                    token.status = status;
                }
                token.id = user.id;
                // Stamp the token with the password's age at sign-in time.
                token.pwdChangedAt = passwordChangedAt ? passwordChangedAt.getTime() : Date.now();
                return token;
            }

            // On every subsequent request (no `user`, just re-reading the token):
            // if the password changed after this token was issued (e.g. via a
            // password reset), drop the session instead of trusting a stale JWT.
            if (typeof token.id === "string") {
                const dbUser = await prisma.user.findUnique({
                    where: { id: token.id },
                    select: { passwordChangedAt: true },
                });
                if (!dbUser || dbUser.passwordChangedAt.getTime() !== token.pwdChangedAt) {
                    delete token.id;
                    delete token.role;
                    delete token.status;
                    delete token.pwdChangedAt;
                }
            }

            return token;
        },
        session({ session, token }) {
            if (session.user) {
                if (token.role === "ADMIN" || token.role === "MEMBER") {
                    (session.user as { role?: "ADMIN" | "MEMBER" }).role = token.role;
                }
                if (typeof token.id === "string") {
                    (session.user as { id?: string }).id = token.id;
                }
                if (
                    token.status === "ORDENTLICHES_MITGLIED" ||
                    token.status === "EHRENMITGLIED" ||
                    token.status === "KEIN_MITGLIED"
                ) {
                    (session.user as { status?: string }).status = token.status;
                }
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});
