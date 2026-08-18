import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { consumeRateLimit, extractClientIp, resetRateLimit } from "@/lib/server/rateLimit";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, request) {
                const email = String(credentials?.email ?? "");
                const clientIp = extractClientIp(request.headers);
                const rateLimitKey = [clientIp, email];

                // Per-IP cap first: stops credential spraying across many different
                // emails from one IP, which the per-(IP, email) bucket below can't catch.
                await consumeRateLimit({
                    bucket: "login-ip",
                    keyParts: [clientIp],
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

                if (!credentials?.email || !credentials?.password) return null;
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });
                if (!user) return null;
                if (!user.emailVerified) return null;
                const valid = await bcrypt.compare(credentials.password as string, user.password);
                if (!valid) return null;
                await prisma.user.update({
                    where: { id: user.id },
                    data: { lastLogin: new Date() },
                });
                await resetRateLimit("login", rateLimitKey);
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
