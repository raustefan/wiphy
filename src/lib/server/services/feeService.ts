import type { Role } from "@prisma/client";
import {
  findUsersWithFees,
  findFeeLiableUsers,
  upsertMemberFee,
  upsertFeeStatus,
  upsertFeeAmount,
  clearFeeAmountOverride,
  findExistingFeeYears,
  findArchivedFees,
  updateFeeComment as updateFeeCommentRepo,
} from "@/lib/server/repositories/feeRepository";
import { findFeeDefaults } from "@/lib/server/repositories/feeDefaultRepository";
import { resolveFeeDefault } from "@/lib/feeDefaults";
import { calculateFee, wasMemberInYear, type FeeBreakdown } from "@/lib/feeCalculation";
import { isValidBic, isValidIban, normalizeIban } from "@/lib/iban";
import { isoDate } from "@/lib/sepa";

export function getFeeDashboardUsers(userId: string, role: Role) {
  return findUsersWithFees(userId, role);
}

export function getArchivedFees() {
  return findArchivedFees();
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
    findUsersWithFees(userId, role, ensureYear),
    findFeeDefaults(),
  ]);

  // Admin-Sicht auf ein Jahr: nur wer damals schon Mitglied war — und entweder
  // noch ist oder für das Jahr eine Beitragszeile hat (Ausgetretene). Eine
  // Zeile allein reicht nicht: das Anlegen eines Jahres erzeugte früher auch
  // Zeilen für Mitglieder, die erst später eintraten. Eine verbuchte Zahlung
  // wird dagegen nie ausgeblendet.
  const visible =
    role === "ADMIN" && ensureYear !== undefined
      ? users.filter((user) => {
          const fee = user.fees.find((f) => f.jahr === ensureYear);
          if (fee?.bezahlt) return true;
          return (
            wasMemberInYear(ensureYear, user.aufnahmedatum) &&
            (user.status === "ORDENTLICHES_MITGLIED" || fee !== undefined)
          );
        })
      : users;

  return visible.map((user) => {
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

export type SepaCandidate = {
  id: string;
  mitgliedId: number | null;
  name: string;
  iban: string | null;
  bic: string | null;
  amount: number;
  /** YYYY-MM-DD, leer bei Altmandaten ohne erfasstes Datum. */
  mandateDate: string;
  aufnahmedatum: Date | null;
  /** Grund, warum das Mitglied nicht eingezogen werden kann. */
  problem: string | null;
};

/**
 * Mitglieder mit Lastschriftmandat und offenem Beitrag für `year`. Wer per
 * Überweisung zahlt, schon bezahlt hat oder nichts schuldet, fehlt ganz.
 */
export async function getSepaCandidates(adminId: string, year: number): Promise<SepaCandidate[]> {
  const users = await getFeeDashboardData(adminId, "ADMIN", year);

  return users.flatMap((user) => {
    const fee = user.fees.find((f) => f.jahr === year);
    // Nur aktuelle Mitglieder: bei Ausgetretenen ist das Mandat erloschen.
    if (user.status !== "ORDENTLICHES_MITGLIED") return [];
    if (!user.bankeinzug || !fee || fee.bezahlt || fee.beitrag <= 0) return [];

    const iban = user.IBAN ? normalizeIban(user.IBAN) : null;
    const bic = user.BIC?.replace(/\s/g, "").toUpperCase() || null;
    return [{
      id: user.id,
      mitgliedId: user.mitgliedId,
      name: `${user.vorname} ${user.name}`,
      iban,
      bic: bic && isValidBic(bic) ? bic : null,
      amount: fee.beitrag,
      mandateDate: user.mandatserteilung ? isoDate(user.mandatserteilung) : "",
      aufnahmedatum: user.aufnahmedatum,
      problem: !iban ? "Keine IBAN hinterlegt" : !isValidIban(iban) ? "IBAN ungültig" : null,
    }];
  });
}
