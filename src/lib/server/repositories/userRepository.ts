import { prisma } from "@/lib/prisma";
import type { Prisma, Role } from "@prisma/client";
import { anonymizeSecurityEventsForUser } from "@/lib/server/securityLog";
import { archiveFeesOfUser } from "./feeRepository";

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

  return prisma.$transaction(async (tx) => {
    // Die Token-Tabellen hängen nicht am Fremdschlüssel und behielten sonst die
    // Adresse im Klartext.
    if (user) {
      await tx.passwordResetToken.deleteMany({ where: { email: user.email } });
      await tx.emailVerificationToken.deleteMany({
        where: { OR: [{ userId: id }, { email: user.email }] },
      });
    }
    // Beitragszeilen bleiben als Aufzeichnung stehen; der Fremdschlüssel wird
    // beim Löschen auf NULL gesetzt.
    await archiveFeesOfUser(tx, id);
    return tx.user.delete({ where: { id } });
  });
}

export function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({ data });
}
