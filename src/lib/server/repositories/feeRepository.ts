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

export async function upsertFeeStatus(userId: string, jahr: number, field: "paid" | "isStudent", value: boolean) {
  const existing = await prisma.memberFee.findUnique({
    where: { userId_jahr: { userId, jahr } },
  });

  if (existing) {
    return prisma.memberFee.update({
      where: { userId_jahr: { userId, jahr } },
      data: {
        [field === "paid" ? "bezahlt" : "isStudent"]: value,
      },
    });
  } else {
    let isStudentDefault = false;
    const lastFee = await prisma.memberFee.findFirst({
      where: { userId, jahr: { lt: jahr } },
      orderBy: { jahr: "desc" },
    });
    if (lastFee) {
      isStudentDefault = lastFee.isStudent;
    }

    return prisma.memberFee.create({
      data: {
        userId,
        jahr,
        bezahlt: field === "paid" ? value : false,
        isStudent: field === "isStudent" ? value : isStudentDefault,
        beitrag: 0,
      },
    });
  }
}

export async function upsertFeeAmount(userId: string, jahr: number, beitrag: number) {
  const existing = await prisma.memberFee.findUnique({
    where: { userId_jahr: { userId, jahr } },
  });

  if (existing) {
    return prisma.memberFee.update({
      where: { userId_jahr: { userId, jahr } },
      data: { beitrag },
    });
  } else {
    let isStudentDefault = false;
    const lastFee = await prisma.memberFee.findFirst({
      where: { userId, jahr: { lt: jahr } },
      orderBy: { jahr: "desc" },
    });
    if (lastFee) {
      isStudentDefault = lastFee.isStudent;
    }

    return prisma.memberFee.create({
      data: {
        userId,
        jahr,
        bezahlt: false,
        isStudent: isStudentDefault,
        beitrag,
      },
    });
  }
}

export async function getMinAndMaxFeeYears() {
  const minAgg = await prisma.memberFee.aggregate({
    _min: { jahr: true },
  });
  const maxAgg = await prisma.memberFee.aggregate({
    _max: { jahr: true },
  });
  return {
    minYear: minAgg._min.jahr ?? 2020,
    maxYear: maxAgg._max.jahr ?? new Date().getFullYear(),
  };
}

export function updateFeeComment(userId: string, comment: string | null) {
  return prisma.user.update({
    where: { id: userId },
    data: { zahlungsKommentar: comment },
  });
}
