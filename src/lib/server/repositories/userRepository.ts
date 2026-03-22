import { prisma } from "@/lib/prisma";
import type { Prisma, Role } from "@prisma/client";

export function findUsersForDashboard(userId: string, role: Role) {
  const where: Prisma.UserWhereInput | undefined = role === "ADMIN" ? undefined : { id: userId };
  return prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export function findUserByMitgliedIdExcludingUser(mitgliedId: number, excludedUserId: string) {
  return prisma.user.findFirst({
    where: {
      mitgliedId,
      id: { not: excludedUserId },
    },
  });
}

export function updateUserById(id: string, data: Prisma.UserUpdateInput) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUserById(id: string) {
  await prisma.memberFee.deleteMany({ where: { userId: id } });
  return prisma.user.delete({ where: { id } });
}

export function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({ data });
}
