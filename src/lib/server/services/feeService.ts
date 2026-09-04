import type { Role } from "@prisma/client";
import {
  findUsersWithFees,
  findFeeLiableUsers,
  upsertMemberFee,
  upsertFeeStatus,
  upsertFeeAmount,
  clearFeeAmountOverride,
  findExistingFeeYears,
  updateFeeComment as updateFeeCommentRepo,
} from "@/lib/server/repositories/feeRepository";
import { findFeeDefaults } from "@/lib/server/repositories/feeDefaultRepository";
import { resolveFeeDefault } from "@/lib/feeDefaults";
import { calculateFee, type FeeBreakdown } from "@/lib/feeCalculation";

export function getFeeDashboardUsers(userId: string, role: Role) {
  return findUsersWithFees(userId, role);
}

export function getFeeLiableUsers() {
  return findFeeLiableUsers();
}

export type DashboardFee = {
  jahr: number;
  bezahlt: boolean;
  isStudent: boolean;
  /** Tatsächlich fälliger Betrag — Standardbeitrag oder manuelle Ausnahme. */
  beitrag: number;
  /** Was der Standardbeitrag für dieses Jahr ergibt. */
  standard: number;
  /** true, wenn ein Admin den Betrag abweichend festgelegt hat. */
  manuell: boolean;
  /** false, wenn für dieses Jahr noch keine Beitragszeile existiert. */
  angelegt: boolean;
  breakdown: FeeBreakdown;
};

/**
 * Beitragszeilen mit aufgelöstem Betrag.
 *
 * Der Regelfall wird bewusst *berechnet* statt gespeichert: so wirkt eine
 * Beitragsanpassung sofort auf alle Zeilen, die keine Ausnahme sind, und der
 * Datenbestand kann nicht von den beschlossenen Sätzen abdriften.
 */
export async function getFeeDashboardData(
  userId: string,
  role: Role,
  /**
   * Jahr, das in jedem Fall eine Zeile haben soll. Fehlt sie in der Datenbank,
   * wird sie berechnet ergänzt — so zeigt das Dashboard auch vor dem Anlegen
   * eines Geschäftsjahres den Beitrag, der sich aus den Standardsätzen ergibt.
   */
  ensureYear?: number,
) {
  const [users, defaults] = await Promise.all([
    findUsersWithFees(userId, role),
    findFeeDefaults(),
  ]);

  return users.map((user) => {
    function toDashboardFee(input: {
      jahr: number;
      bezahlt: boolean;
      isStudent: boolean;
      beitrag: number;
      beitragManuell: boolean;
      angelegt: boolean;
    }): DashboardFee {
      const rates = resolveFeeDefault(defaults, input.jahr);
      const breakdown = calculateFee({
        monthlyRegular: rates.regular,
        monthlyStudent: rates.student,
        isStudent: input.isStudent,
        bankeinzug: user.bankeinzug ?? false,
        jahr: input.jahr,
        aufnahmedatum: user.aufnahmedatum,
      });

      return {
        jahr: input.jahr,
        bezahlt: input.bezahlt,
        isStudent: input.isStudent,
        beitrag: input.beitragManuell ? input.beitrag : breakdown.total,
        standard: breakdown.total,
        manuell: input.beitragManuell,
        angelegt: input.angelegt,
        breakdown,
      };
    }

    const fees = user.fees.map((fee) => toDashboardFee({ ...fee, angelegt: true }));

    if (ensureYear !== undefined && !fees.some((fee) => fee.jahr === ensureYear)) {
      fees.push(
        toDashboardFee({
          jahr: ensureYear,
          bezahlt: false,
          // Ohne Zeile zählt die Erklärung des Mitglieds.
          isStudent: user.studentYears.includes(ensureYear),
          beitrag: 0,
          beitragManuell: false,
          angelegt: false,
        }),
      );
    }

    return { ...user, fees };
  });
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

/** Nimmt die manuelle Festlegung zurück — die Zeile folgt wieder dem Standard. */
export async function resetFeeAmount(input: { userId: string; year: number }) {
  await clearFeeAmountOverride(input.userId, input.year);
}

export async function getExistingFeeYears() {
  return findExistingFeeYears();
}

export async function setFeeComment(input: { userId: string; comment: string | null }) {
  await updateFeeCommentRepo(input.userId, input.comment);
}
