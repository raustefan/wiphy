import { prisma } from "@/lib/prisma";
import type { Role } from "@prisma/client";

export function findUsersWithFees(userId: string, role: Role) {
  return prisma.user.findMany({
    where: role === "ADMIN" ? {} : { id: userId },
    orderBy: { createdAt: "asc" },
    include: { fees: true },
  });
}

export function upsertMemberFee(userId: string, jahr: number, bezahlt: boolean) {
  return prisma.memberFee.upsert({
    where: {
      userId_jahr: { userId, jahr },
    },
    update: { bezahlt },
    create: { userId, jahr, bezahlt },
  });
}

export function updateFeeComment(userId: string, comment: string | null) {
  return prisma.user.update({
    where: { id: userId },
    data: { zahlungsKommentar: comment },
  });
}
