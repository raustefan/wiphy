import { prisma } from "@/lib/prisma";

export function findFeeDefaults() {
  return prisma.feeDefault.findMany({ orderBy: { jahr: "asc" } });
}

export function upsertFeeDefault(jahr: number, regular: number, student: number) {
  return prisma.feeDefault.upsert({
    where: { jahr },
    update: { regular, student },
    create: { jahr, regular, student },
  });
}

export function deleteFeeDefault(jahr: number) {
  return prisma.feeDefault.delete({ where: { jahr } });
}
