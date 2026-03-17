"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
        return { error: "Bitte alle Felder ausfüllen." };
    }

    // Prüfen, ob Email schon existiert
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return { error: "Diese E-Mail-Adresse wird bereits verwendet." };
    }

    // Passwort hashen und User anlegen (Rolle ist standardmäßig MEMBER laut Schema)
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    // Nach erfolgreicher Registrierung zum Login leiten
    redirect("/login");
}