"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { AppError, executeAction } from "@/lib/server/errors";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { registerSchema } from "@/lib/server/validation/schemas";
import { sendAdminRegistrationNotificationEmail, sendUserRegistrationConfirmationEmail } from "@/lib/mail";

export async function registerUser(formData: FormData) {
    return executeAction(async () => {
        const { vorname, name, email, password } = parseFormData(registerSchema, formData);
        const requestHeaders = await headers();

        await consumeRateLimit({
            bucket: "register",
            keyParts: [extractClientIp(requestHeaders), email],
            limit: 3,
            windowMs: 60 * 60 * 1000,
            blockMs: 60 * 60 * 1000,
            message: "Zu viele Registrierungsversuche. Bitte versuche es in einer Stunde erneut.",
        });

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new AppError("CONFLICT", "Diese E-Mail-Adresse wird bereits verwendet.");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.create({
            data: {
                vorname,
                name,
                email,
                password: hashedPassword,
            },
        });

        try {
            const admins = await prisma.user.findMany({
                where: { role: "ADMIN" },
                select: { email: true },
            });
            const adminEmails = admins.map((admin) => admin.email);

            await sendAdminRegistrationNotificationEmail(adminEmails, { vorname, name, email });
            await sendUserRegistrationConfirmationEmail(email, { vorname, name });
        } catch (error) {
            console.error("Failed to send registration notification emails:", error);
        }

        redirect("/login?register=success");
    });
}
