import type { Role } from "@prisma/client";
import {
  findUsersWithFees,
  upsertMemberFee,
  updateFeeComment as updateFeeCommentRepo,
} from "@/lib/server/repositories/feeRepository";

export function getFeeYears(startYear = 2000) {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
}

export function getFeeDashboardUsers(userId: string, role: Role) {
  return findUsersWithFees(userId, role);
}

export async function setFeePaidStatus(input: { userId: string; year: number; paid: boolean }) {
  await upsertMemberFee(input.userId, input.year, input.paid);
}

export async function setFeeComment(input: { userId: string; comment: string | null }) {
  await updateFeeCommentRepo(input.userId, input.comment);
}
