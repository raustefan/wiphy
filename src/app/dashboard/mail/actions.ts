"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { redirect } from "next/navigation";

export async function sendEmailAction(formData: FormData) {
    const session = await auth();
    if ((session?.user as any)?.role !== "ADMIN") {
        throw new Error("Keine Berechtigung");
    }

    const target = formData.get("target") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // 1. Empfänger aus der Datenbank laden
    let users = [];
    if (target === "ALL") {
        users = await prisma.user.findMany({ select: { email: true } });
    } else if (target === "MEMBER" || target === "ADMIN") {
        users = await prisma.user.findMany({ where: { role: target }, select: { email: true } });
    }

    const emails = users.map((u) => u.email).join(",");

    if (!emails) {
        return { error: "Keine Empfänger gefunden." };
    }

    // 2. Nodemailer Transporter konfigurieren
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465, // true für 465, false für 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // 3. E-Mail senden (BCC, damit Empfänger die anderen Adressen nicht sehen)
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        bcc: emails,
        subject: subject,
        text: message, // Für einfaches Textformat
        // html: message.replace(/\n/g, "<br>"), // Falls du HTML erlauben willst
    });

    redirect("/dashboard?mail=success");
}