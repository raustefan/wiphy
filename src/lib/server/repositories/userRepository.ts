import { prisma } from "@/lib/prisma";
import type { Prisma, Role } from "@prisma/client";
import { anonymizeSecurityEventsForUser } from "@/lib/server/securityLog";

export function findUsersForDashboard(userId: string, role: Role) {
  const where: Prisma.UserWhereInput | undefined = role === "ADMIN" ? undefined : { id: userId };
  return prisma.user.findMany({
    where,
    orderBy: [{ mitgliedId: { sort: "asc", nulls: "last" } }, { name: "asc" }],
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
  // Vor dem Löschen: danach hat der Fremdschlüssel `userId` im
  // Sicherheitsprotokoll bereits auf NULL gesetzt, und die Zeilen wären über
  // den E-Mail-Hash zwar noch zuzuordnen, aber nicht mehr auffindbar.
  const user = await prisma.user.findUnique({ where: { id }, select: { email: true } });
  await anonymizeSecurityEventsForUser(id, user?.email);

  await prisma.memberFee.deleteMany({ where: { userId: id } });
  return prisma.user.delete({ where: { id } });
}

export function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({ data });
}
