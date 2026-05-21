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
                const valid = await bcrypt.compare(credentials.password as string, user.password);
                if (!valid) return null;
                await prisma.user.update({
                    where: { id: user.id },
                    data: { lastLogin: new Date() },
                });
                await resetRateLimit("login", rateLimitKey);
                return { id: user.id, email: user.email, name: user.name, role: user.role, status: user.status };
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                const role = (user as { role?: unknown }).role;
                const status = (user as { status?: unknown }).status;
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
