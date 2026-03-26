"use server";

import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { requireAdmin } from "@/lib/server/authz";
import { AppError, executeAction } from "@/lib/server/errors";
import { consumeRateLimit, extractClientIp } from "@/lib/server/rateLimit";
import { mailSendSchema } from "@/lib/server/validation/schemas";

function parseMailForm(formData: FormData) {
    const selectedUserIds = [
        ...new Set(
            formData
                .getAll("selectedUserIds")
                .filter((v): v is string => typeof v === "string" && v.length > 0),
        ),
    ];

    const raw = {
        target: String(formData.get("target") ?? ""),
        subject: String(formData.get("subject") ?? ""),
        message: String(formData.get("message") ?? ""),
        selectedUserIds,
        bccToSelf: formData.get("bccToSelf") === "on",
    };

    const parsed = mailSendSchema.safeParse(raw);
    if (!parsed.success) {
        throw new AppError(
            "VALIDATION_ERROR",
            parsed.error.issues[0]?.message ?? "Ungültige Eingaben.",
        );
    }
    return parsed.data;
}

export async function sendEmailAction(formData: FormData) {
    return executeAction(async () => {
        const admin = await requireAdmin();
        const requestHeaders = await headers();

        consumeRateLimit({
            bucket: "admin-mail",
            keyParts: [admin.id, extractClientIp(requestHeaders)],
            limit: 5,
            windowMs: 10 * 60 * 1000,
            blockMs: 10 * 60 * 1000,
            message: "Zu viele Rundmails in kurzer Zeit. Bitte warte 10 Minuten und versuche es erneut.",
        });

        const { target, subject, message, selectedUserIds, bccToSelf } = parseMailForm(formData);

        let users: Array<{ email: string }> = [];

        if (target === "ALL") {
            users = await prisma.user.findMany({ select: { email: true } });
        } else if (target === "MEMBER" || target === "ADMIN") {
            users = await prisma.user.findMany({
                where: { role: target },
                select: { email: true },
            });
        } else if (target === "SELECTED") {
            const found = await prisma.user.findMany({
                where: { id: { in: selectedUserIds } },
                select: { id: true, email: true },
            });
            if (found.length !== selectedUserIds.length) {
                throw new AppError(
                    "VALIDATION_ERROR",
                    "Ein oder mehrere ausgewählte Nutzer existieren nicht.",
                );
            }
            users = found;
        } else {
            throw new AppError("VALIDATION_ERROR", "Ungültige Empfänger-Gruppe.");
        }

        const bccAddresses = new Set(users.map((u) => u.email));
        if (bccToSelf) {
            const selfEmail = admin.email?.trim();
            if (!selfEmail) {
                throw new AppError(
                    "VALIDATION_ERROR",
                    "Keine E-Mail in der Session. Bitte neu einloggen oder „BCC an mich“ deaktivieren.",
                );
            }
            bccAddresses.add(selfEmail);
        }

        const emails = Array.from(bccAddresses).join(",");
        if (!emails) {
            throw new AppError("NOT_FOUND", "Keine Empfänger gefunden.");
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            bcc: emails,
            subject,
            text: message,
        });

        redirect("/dashboard?mail=success");
    });
}
