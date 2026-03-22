import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });
                if (!user) return null;
                const valid = await bcrypt.compare(credentials.password as string, user.password);
                if (!valid) return null;
                return { id: user.id, email: user.email, name: user.name, role: user.role };
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                const role = (user as { role?: unknown }).role;
                if (role === "ADMIN" || role === "MEMBER") {
                    token.role = role;
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
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});