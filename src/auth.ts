import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { consumeRateLimit, extractClientIp, resetRateLimit } from "@/lib/server/rateLimit";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { normalizeEmail } from "@/lib/server/normalizeEmail";
import { verifyAltchaPayload } from "@/lib/server/altcha";
import { AppError } from "@/lib/server/errors";
import { logSecurityEvent, type SecurityEventReason } from "@/lib/server/securityLog";
import { adminSessionExpired } from "@/lib/server/sessionPolicy";

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

/** Login gesperrt (`loginDisabled`) — vom Mitglied selbst oder von einem Admin. */
export class AccountDisabledError extends CredentialsSignin {
    code = "account_disabled";
}

/** Thrown when the ALTCHA proof-of-work is missing, invalid, or already spent. */
export class CaptchaFailedError extends CredentialsSignin {
    code = "captcha_failed";
}

/**
 * Vergleichsziel für unbekannte Adressen, damit jeder Login-Versuch einen
 * bcrypt-Vergleich kostet. Ohne ihn antwortet eine nicht registrierte Adresse
 * um die Hash-Dauer schneller, und die Antwortzeit verrät, wer ein Konto hat.
 * Gleiche Kostenstufe (12) wie die echten Hashes; einmal pro Prozess erzeugt.
 */
const dummyPasswordHash = bcrypt.hash(crypto.randomUUID(), 12);

export const { handlers, signIn, signOut, auth } = NextAuth({
    // Auth.js leitet das Secure-Flag sonst aus NEXTAUTH_URL ab — steht dort
    // `http://…` (so im README-Beispiel), geht das Session-Cookie ohne Secure
    // raus und kann über jede unverschlüsselte Anfrage mitgelesen werden.
    useSecureCookies: process.env.NODE_ENV === "production",
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

                // Jeder Ausgang dieser Funktion wird protokolliert — ein
                // Protokoll mit Lücken ist als Angriffserkennung wertlos.
                const logAttempt = (
                    outcome: "SUCCESS" | "FAILURE" | "BLOCKED",
                    reason?: SecurityEventReason,
                    userId?: string,
                ) =>
                    logSecurityEvent({
                        type: "LOGIN",
                        outcome,
                        reason,
                        userId,
                        email,
                        ip: clientIp,
                        userAgent: request.headers.get("user-agent"),
                    });

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
                        await logAttempt("BLOCKED", "rate_limited");
                        throw new LoginRateLimitedError();
                    }
                    throw error;
                }

                // Checked after the rate limit (so captcha work can't be used to
                // bypass it) but before any DB lookup, so scripted attempts pay
                // the proof-of-work cost first.
                if (!(await verifyAltchaPayload(String(credentials?.altcha ?? "")))) {
                    await logAttempt("BLOCKED", "captcha_failed");
                    throw new CaptchaFailedError();
                }

                // Pro Konto, egal von welcher IP: fängt verteiltes Raten gegen
                // ein einzelnes Konto ab, das die IP-Buckets oben nie sehen.
                // Bewusst erst nach dem Captcha, damit jeder gezählte Versuch
                // Rechenarbeit kostet — sonst könnte jeder ein fremdes Konto
                // gratis aussperren. Großzügig bemessen und ohne Reset beim
                // erfolgreichen Login, aus demselben Grund.
                if (email) {
                    try {
                        await consumeRateLimit({
                            bucket: "login-account",
                            keyParts: [email],
                            limit: 50,
                            windowMs: 60 * 60 * 1000,
                            blockMs: 15 * 60 * 1000,
                            message: "Zu viele Login-Versuche für dieses Konto. Bitte versuche es in 15 Minuten erneut.",
                        });
                    } catch (error) {
                        if (error instanceof AppError && error.code === "TOO_MANY_REQUESTS") {
                            await logAttempt("BLOCKED", "rate_limited");
                            throw new LoginRateLimitedError();
                        }
                        throw error;
                    }
                }

                if (!email || !credentials?.password) {
                    await logAttempt("FAILURE", "invalid_credentials");
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: { email },
                    omit: { password: false },
                });
                // Unbekannte Adresse und falsches Passwort teilen sich denselben
                // Grund: die Unterscheidung stünde sonst dauerhaft im Protokoll,
                // obwohl sie nach außen bewusst verborgen wird.
                if (!user) {
                    await bcrypt.compare(credentials.password as string, await dummyPasswordHash);
                    await logAttempt("FAILURE", "invalid_credentials");
                    return null;
                }
                const valid = await bcrypt.compare(credentials.password as string, user.password);
                if (!valid) {
                    await logAttempt("FAILURE", "invalid_credentials", user.id);
                    return null;
                }
                // Wie beim unbestätigten Konto erst nach dem Passwortvergleich, damit
                // sich darüber nicht erfragen lässt, welche Adressen gesperrt sind.
                if (user.loginDisabled) {
                    await logAttempt("BLOCKED", "account_disabled", user.id);
                    throw new AccountDisabledError();
                }
                // Only reveal the unconfirmed-email state once the password checks
                // out, so this can't be used to probe which emails have accounts.
                if (!user.emailVerified) {
                    await logAttempt("FAILURE", "email_not_verified", user.id);
                    throw new EmailNotVerifiedError();
                }
                // Admins must always be able to log in, even while the LOGIN flag is off,
                // so they can get back in to re-enable it.
                if (user.role !== "ADMIN" && !(await isFeatureEnabled("LOGIN"))) {
                    await logAttempt("BLOCKED", "feature_disabled", user.id);
                    return null;
                }
                await prisma.user.update({
                    where: { id: user.id },
                    data: { lastLogin: new Date() },
                });
                // Only the per-(IP, email) bucket: resetting "login-ip" here would let
                // anyone with a valid account wipe the IP cap and keep spraying.
                await resetRateLimit("login", rateLimitKey);
                await logAttempt("SUCCESS", undefined, user.id);
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    status: user.status,
                    passwordChangedAt: user.passwordChangedAt,
                    sessionVersion: user.sessionVersion,
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
                token.loginAt = Date.now();
                token.sessionVersion = (user as { sessionVersion?: number }).sessionVersion;
                return token;
            }

            // On every subsequent request (no `user`, just re-reading the token):
            // if the password changed after this token was issued (e.g. via a
            // password reset), drop the session instead of trusting a stale JWT.
            // Role and status are re-read too — otherwise a demoted admin would
            // keep admin rights for the whole lifetime of their token.
            if (typeof token.id === "string") {
                const dbUser = await prisma.user.findUnique({
                    where: { id: token.id },
                    select: {
                        passwordChangedAt: true,
                        sessionVersion: true,
                        role: true,
                        status: true,
                        loginDisabled: true,
                    },
                });
                if (
                    !dbUser ||
                    dbUser.loginDisabled ||
                    dbUser.passwordChangedAt.getTime() !== token.pwdChangedAt ||
                    dbUser.sessionVersion !== token.sessionVersion ||
                    adminSessionExpired(dbUser.role, token.loginAt)
                ) {
                    delete token.id;
                    delete token.role;
                    delete token.status;
                    delete token.pwdChangedAt;
                    delete token.loginAt;
                    delete token.sessionVersion;
                } else {
                    token.role = dbUser.role;
                    token.status = dbUser.status;
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
    events: {
        // signOut löscht sonst nur das Cookie im eigenen Browser. Das Hochzählen
        // entwertet jede Kopie davon — und damit auch die Sitzungen auf allen
        // anderen Geräten dieses Nutzers.
        // ponytail: Logout beendet alle Geräte; eine Session-Tabelle, falls
        // einzelne Geräte getrennt abgemeldet werden sollen.
        async signOut(message) {
            const id = "token" in message ? message.token?.id : undefined;
            if (typeof id !== "string") return;
            await prisma.user.updateMany({
                where: { id },
                data: { sessionVersion: { increment: 1 } },
            });
        },
    },
    pages: {
        signIn: "/login",
    },
});
