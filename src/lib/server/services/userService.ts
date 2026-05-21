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
  return { ok: true as const };
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
