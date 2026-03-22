"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { AppError, executeAction } from "@/lib/server/errors";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { registerSchema } from "@/lib/server/validation/schemas";

export async function registerUser(formData: FormData) {
    return executeAction(async () => {
        const { vorname, name, email, password } = parseFormData(registerSchema, formData);

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

        redirect("/login?register=success");
    });
}