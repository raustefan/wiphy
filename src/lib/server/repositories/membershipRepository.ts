import { prisma } from "@/lib/prisma";
import type { MembershipApplicationStatus } from "@prisma/client";

/** Der offene Antrag eines Accounts, falls es einen gibt. */
export function findOpenApplication(userId: string) {
  return prisma.membershipApplication.findUnique({ where: { openForUserId: userId } });
}

export function findApplicationById(id: string) {
  return prisma.membershipApplication.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, email: true, firstName: true, lastName: true, status: true, memberNumber: true },
      },
    },
  });
}

export function findApplications(status?: MembershipApplicationStatus, limit = 200) {
  return prisma.membershipApplication.findMany({
    where: status ? { status } : undefined,
    orderBy: { submittedAt: "desc" },
    take: limit,
    include: {
      user: {
        select: { id: true, email: true, firstName: true, lastName: true, status: true, memberNumber: true },
      },
    },
  });
}

export function countOpenApplications() {
  return prisma.membershipApplication.count({ where: { status: "SUBMITTED" } });
}

export function markApplicationMailed(id: string) {
  return prisma.membershipApplication.update({
    where: { id },
    data: { mailedAt: new Date() },
  });
}

export function deleteApplication(id: string) {
  return prisma.membershipApplication.delete({ where: { id } });
}

/** Höchste vergebene Mitglieds-ID; Basis für die automatische Vergabe. */
export async function getMaxMemberNumber(): Promise<number> {
  const result = await prisma.user.aggregate({ _max: { memberNumber: true } });
  return result._max.memberNumber ?? 0;
}
