import type { Role } from "@prisma/client";
import {
  findUsersWithFees,
  upsertMemberFee,
  upsertFeeStatus,
  upsertFeeAmount,
  getMinAndMaxFeeYears,
  updateFeeComment as updateFeeCommentRepo,
} from "@/lib/server/repositories/feeRepository";

export function getFeeYears(startYear = 2024, endYear?: number) {
  const currentYear = endYear ?? new Date().getFullYear();
  const start = Math.min(startYear, currentYear);
  const end = Math.max(startYear, currentYear);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function getFeeDashboardUsers(userId: string, role: Role) {
  return findUsersWithFees(userId, role);
}

export async function setFeePaidStatus(input: { userId: string; year: number; paid: boolean }) {
  await upsertMemberFee(input.userId, input.year, input.paid);
}

export async function setFeeStatus(input: { userId: string; year: number; field: "paid" | "isStudent"; value: boolean }) {
  await upsertFeeStatus(input.userId, input.year, input.field, input.value);
}

export async function setFeeAmount(input: { userId: string; year: number; amount: number }) {
  await upsertFeeAmount(input.userId, input.year, input.amount);
}

export async function getDatabaseYearRange() {
  return getMinAndMaxFeeYears();
}

export async function setFeeComment(input: { userId: string; comment: string | null }) {
  await updateFeeCommentRepo(input.userId, input.comment);
}
