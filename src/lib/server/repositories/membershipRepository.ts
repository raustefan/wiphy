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
        select: { id: true, email: true, vorname: true, name: true, status: true, mitgliedId: true },
      },
    },
  });
}

export function findApplicationsForUser(userId: string) {
  return prisma.membershipApplication.findMany({
    where: { userId },
    orderBy: { submittedAt: "desc" },
  });
}

export function findApplications(status?: MembershipApplicationStatus, limit = 200) {
  return prisma.membershipApplication.findMany({
    where: status ? { status } : undefined,
    orderBy: { submittedAt: "desc" },
    take: limit,
    include: {
      user: {
        select: { id: true, email: true, vorname: true, name: true, status: true, mitgliedId: true },
      },
    },
  });
}

export function countOpenApplications() {
  return prisma.membershipApplication.count({ where: { status: "EINGEREICHT" } });
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
export async function getMaxMitgliedId(): Promise<number> {
  const result = await prisma.user.aggregate({ _max: { mitgliedId: true } });
  return result._max.mitgliedId ?? 0;
}
