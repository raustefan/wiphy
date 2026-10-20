import { prisma } from "@/lib/prisma";

export function findFeeDefaults() {
  return prisma.feeDefault.findMany({ orderBy: { year: "asc" } });
}

export function upsertFeeDefault(year: number, regular: number, student: number) {
  return prisma.feeDefault.upsert({
    where: { year },
    update: { regular, student },
    create: { year, regular, student },
  });
}

export function deleteFeeDefault(year: number) {
  return prisma.feeDefault.delete({ where: { year } });
}
