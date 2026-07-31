import type { Prisma, Role } from "@prisma/client";
import {
  findUserById,
  findUserByMitgliedIdExcludingUser,
  findUsersForDashboard,
  updateUserById,
  deleteUserById,
  createUser,
} from "@/lib/server/repositories/userRepository";
import bcrypt from "bcryptjs";
import { buildUserUpdateData, type UpdateUserInput } from "./userUpdateData";

export async function getDashboardUsers(userId: string, role: Role) {
  return findUsersForDashboard(userId, role);
}

export async function getEditableUser(id: string) {
  return findUserById(id);
}

export async function updateUserProfile(input: UpdateUserInput) {
  const data = buildUserUpdateData(input);

  const user = await findUserById(input.idToEdit);
  if (!user) {
    throw new Error("User not found");
  }

  let emailChanged = false;
  const isSelf = input.idToEdit === input.currentUserId;
  const isMember = input.currentUserRole !== "ADMIN";

  if ((isSelf || isMember) && input.email && input.email.trim().toLowerCase() !== user.email.trim().toLowerCase()) {
    const newEmail = input.email.trim().toLowerCase();

    const { prisma } = await import("@/lib/prisma");
    const existing = await prisma.user.findUnique({ where: { email: newEmail } });
    if (existing) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    emailChanged = true;

    const crypto = await import("crypto");
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    await prisma.emailVerificationToken.deleteMany({
      where: { userId: user.id },
    });

    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        email: newEmail,
        token,
        expires,
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const verificationUrl = `${baseUrl}/verify-email?token=${token}`;

    const { sendEmailChangeEmail } = await import("@/lib/mail");
    await sendEmailChangeEmail(newEmail, verificationUrl);

    // Keep the old email in updated data
    data.email = user.email;
  }

  // Admin-only updates
  if (input.currentUserRole === "ADMIN") {
    if (typeof input.mitgliedId === "string" && input.mitgliedId !== "") {
      const parsed = Number(input.mitgliedId);
      if (!Number.isNaN(parsed)) {
        const existing = await findUserByMitgliedIdExcludingUser(
          parsed,
          input.idToEdit
        );
        if (existing) {
          return { ok: false as const, reason: "mitgliedId_conflict" as const };
        }
        data.mitgliedId = parsed;
      }
    } else if (input.mitgliedId === "" || input.mitgliedId === null) {
      data.mitgliedId = null;
    }
  }

  await updateUserById(input.idToEdit, data);
  return { ok: true as const, emailChanged };
}

export async function adminDeleteUser(userIdToDelete: string, currentUserRole: Role) {
  if (currentUserRole !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can delete users");
  }
  await deleteUserById(userIdToDelete);
  return { ok: true as const };
}

export async function adminCreateUser(input: Prisma.UserCreateInput, currentUserRole: Role) {
  if (currentUserRole !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can create users");
  }
  // Hash password before saving
  const hashedPassword = await bcrypt.hash(input.password, 12);
  const data = { ...input, password: hashedPassword };
  await createUser(data);
  return { ok: true as const };
}
