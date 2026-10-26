import type { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/server/errors";
import {
  changedStudentYears,
  studentEndYearOptions,
  studentStatusEndsAfter,
  withStudentEndYear,
} from "@/lib/membership";
import {
  findUsersWithFees,
  findFeeLiableUsers,
  upsertFeePaid,
  setStudentYear,
  upsertFeeAmount,
  clearFeeAmountOverride,
  findExistingFeeYears,
  updateFeeComment as updateFeeCommentRepo,
} from "@/lib/server/repositories/feeRepository";
import { findFeeDefaults } from "@/lib/server/repositories/feeDefaultRepository";
import { resolveFeeDefault } from "@/lib/feeDefaults";
import { calculateFee, wasMemberInYear, type FeeBreakdown } from "@/lib/feeCalculation";
import { isSepaIban, isValidBic, isValidIban, normalizeIban, requiresBic } from "@/lib/iban";
import { isCountryCode } from "@/lib/countries";
import { defaultMandateId, isoDate, type SepaDebtorAddress } from "@/lib/sepa";

export function getFeeLiableUsers() {
  return findFeeLiableUsers();
}

export type DashboardFee = {
  year: number;
  paid: boolean;
  isStudent: boolean;
  /** Tatsächlich fälliger Betrag — Standardbeitrag oder manuelle Ausnahme. */
  amount: number;
  /** Was der Standardbeitrag für dieses Jahr ergibt. */
  standard: number;
  /** true, wenn ein Admin den Betrag abweichend festgelegt hat. */
  manuell: boolean;
  /** false, wenn für dieses Jahr noch keine Beitragszeile existiert. */
  angelegt: boolean;
  breakdown: FeeBreakdown;
};

type UserWithFees = Awaited<ReturnType<typeof findUsersWithFees>>[number];
type FeeDefaults = Awaited<ReturnType<typeof findFeeDefaults>>;

/**
 * Steht das Konto in der Beitragsliste von `year`? Nur wer damals schon
 * Mitglied war — und entweder noch ist oder für das Jahr eine Beitragszeile
 * hat (Ausgetretene). Eine Zeile allein reicht nicht: das Anlegen eines Jahres
 * erzeugte früher auch Zeilen für Mitglieder, die erst später eintraten. Eine
 * verbuchte Zahlung wird dagegen nie ausgeblendet.
 */
function isInFeeYear(user: UserWithFees, year: number): boolean {
  const fee = user.fees.find((f) => f.year === year);
  if (fee?.paid) return true;
  return (
    wasMemberInYear(year, user.joinedAt) &&
    (user.status === "REGULAR_MEMBER" || fee !== undefined)
  );
}

/**
 * Beitragszeilen mit aufgelöstem Betrag.
 *
 * Der Regelfall wird bewusst *berechnet* statt gespeichert: so wirkt eine
 * Beitragsanpassung sofort auf alle Zeilen, die keine Ausnahme sind, und der
 * Datenbestand kann nicht von den beschlossenen Sätzen abdriften.
 *
 * `ensureYear`: Jahr, das in jedem Fall eine Zeile haben soll. Fehlt sie in der
 * Datenbank, wird sie berechnet ergänzt — so zeigt das Dashboard auch vor dem
 * Anlegen eines Geschäftsjahres den Beitrag, der sich aus den Standardsätzen
 * ergibt.
 */
function withResolvedFees(user: UserWithFees, defaults: FeeDefaults, ensureYear?: number) {
  function toDashboardFee(input: {
    year: number;
    paid: boolean;
    isStudent: boolean;
    amount: number;
    manualAmount: boolean;
    angelegt: boolean;
  }): DashboardFee {
    const rates = resolveFeeDefault(defaults, input.year);
    const breakdown = calculateFee({
      monthlyRegular: rates.regular,
      monthlyStudent: rates.student,
      isStudent: input.isStudent,
      directDebit: user.directDebit,
      year: input.year,
      joinedAt: user.joinedAt,
    });

    return {
      year: input.year,
      paid: input.paid,
      isStudent: input.isStudent,
      amount: input.manualAmount ? input.amount : breakdown.total,
      standard: breakdown.total,
      manuell: input.manualAmount,
      angelegt: input.angelegt,
      breakdown,
    };
  }

  // Der Sonderstatus steht nicht in der Zeile, sondern allein beim Mitglied.
  const fees = user.fees.map((fee) =>
    toDashboardFee({ ...fee, isStudent: user.studentYears.includes(fee.year), angelegt: true }),
  );

  if (ensureYear !== undefined && !fees.some((fee) => fee.year === ensureYear)) {
    fees.push(
      toDashboardFee({
        year: ensureYear,
        paid: false,
        isStudent: user.studentYears.includes(ensureYear),
        amount: 0,
        manualAmount: false,
        angelegt: false,
      }),
    );
  }

  return { ...user, fees };
}

/**
 * Konten mit aufgelösten Beiträgen. Mitglieder sehen nur sich selbst; die
 * Admin-Sicht auf ein Jahr enthält genau die Beitragsliste dieses Jahres
 * (`isInFeeYear`).
 */
export async function getFeeDashboardData(userId: string, role: Role, ensureYear?: number) {
  const [users, defaults] = await Promise.all([
    findUsersWithFees(userId, role, ensureYear),
    findFeeDefaults(),
  ]);

  const visible =
    role === "ADMIN" && ensureYear !== undefined
      ? users.filter((user) => isInFeeYear(user, ensureYear))
      : users;

  return visible.map((user) => withResolvedFees(user, defaults, ensureYear));
}

/**
 * Was ein Konto bis einschließlich des laufenden Jahres noch schuldet. Der
 * Beitrag des laufenden Jahres zählt für ordentliche Mitglieder auch ohne
 * angelegte Zeile (§ 5: am 1. Januar fällig), sofern sie da schon Mitglied
 * waren. Betrag 0 (erlassen) gilt als beglichen.
 */
export async function getOpenFees(userId: string, year = new Date().getFullYear()) {
  const [[user], defaults] = await Promise.all([
    findUsersWithFees(userId, "MEMBER"),
    findFeeDefaults(),
  ]);
  if (!user) return [];
  const liable = user.status === "REGULAR_MEMBER" && wasMemberInYear(year, user.joinedAt);
  return withResolvedFees(user, defaults, liable ? year : undefined).fees.filter(
    (fee) => fee.year <= year && !fee.paid && fee.amount > 0,
  );
}

/**
 * Alle Konten für die Benutzerverwaltung, jedes mit seinem Beitragsverlauf.
 * `inFeeYear` markiert die Beitragsliste von `year`. Nur gespeicherte Zeilen —
 * keine berechneten: Tabelle, Kennzahlen und SEPA zeigen, was angelegt ist.
 */
export async function getAccountsWithFees(adminId: string, year: number) {
  const [users, defaults] = await Promise.all([
    findUsersWithFees(adminId, "ADMIN", year),
    findFeeDefaults(),
  ]);

  return users.map((user) => {
    const inFeeYear = isInFeeYear(user, year);
    return { ...withResolvedFees(user, defaults), inFeeYear };
  });
}

export async function setFeeStatus(input: { userId: string; year: number; field: "paid" | "isStudent"; value: boolean }) {
  if (input.field === "isStudent") await setStudentYear(input.userId, input.year, input.value);
  else await upsertFeePaid(input.userId, input.year, input.value);
}

/**
 * Ob das Mitglied gerade im letzten ermäßigten Jahr steckt und noch nicht
 * gesagt hat, wie es weitergeht — dann zeigt das Dashboard die Frage.
 */
export function needsStudentStatusAnswer(
  member: { status: string; studentYears: number[]; notStudentFromYear: number | null },
  year: number,
): boolean {
  return (
    member.status === "REGULAR_MEMBER" &&
    member.notStudentFromYear !== year + 1 &&
    studentStatusEndsAfter(member, year)
  );
}

/**
 * Das Mitglied legt fest, bis wann es ermäßigt ist (Zahlungsseite, „Nein“ im
 * Dashboard). Nur künftige Jahre, höchstens drei voraus; bezahlte Jahre sind
 * fest, sonst änderte sich nachträglich ihr Betrag. Kein Nachweis — der Verein
 * vertraut der Angabe (§ 5 Abs. 10 verpflichtet zur Meldung).
 */
export async function setOwnStudentEndYear(userId: string, endYear: number) {
  const year = new Date().getFullYear();
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { status: true, studentYears: true, fees: { where: { paid: true }, select: { year: true } } },
  });
  if (!user || user.status !== "REGULAR_MEMBER") {
    throw new AppError("FORBIDDEN", "Den Studierendenstatus können nur ordentliche Mitglieder angeben.");
  }
  if (!studentEndYearOptions(user.studentYears, year).includes(endYear)) {
    throw new AppError("VALIDATION_ERROR", "Dieses Jahr kann nicht gewählt werden.");
  }

  const studentYears = withStudentEndYear(user.studentYears, endYear, year);
  const paidYears = new Set(user.fees.map((fee) => fee.year));
  if (changedStudentYears(user.studentYears, studentYears).some((y) => paidYears.has(y))) {
    throw new AppError("CONFLICT", "Ein betroffenes Jahr ist schon bezahlt. Bitte wende dich an den Vorstand.");
  }

  await prisma.user.update({
    where: { id: userId },
    // Endet der Status mit dem laufenden Jahr, ist das zugleich die Antwort
    // „Nein“ auf die Frage im Dashboard.
    data: { studentYears, notStudentFromYear: endYear === year ? year + 1 : null },
  });
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
  memberNumber: number | null;
  /** Name des Mitglieds — zur Anzeige. */
  name: string;
  /** Zahler in der Lastschrift: Kontoinhaber:in, sonst das Mitglied selbst. */
  debtorName: string;
  iban: string | null;
  bic: string | null;
  /** Gespeicherte Mandatsreferenz oder die Vorbelegung aus der Mitgliedsnummer. */
  mandateReference: string;
  /** Nur bei Konten außerhalb des EWR — dort verlangt die Lastschrift die Anschrift. */
  address: SepaDebtorAddress | null;
  amount: number;
  /** YYYY-MM-DD, leer bei Altmandaten ohne erfasstes Datum. */
  mandateDate: string;
  joinedAt: Date | null;
  /** Grund, warum das Mitglied nicht eingezogen werden kann. */
  problem: string | null;
};

/**
 * Mitglieder mit Lastschriftmandat und offenem Beitrag für `year`. Wer per
 * Überweisung zahlt, schon bezahlt hat oder nichts schuldet, fehlt ganz.
 */
export async function getSepaCandidates(adminId: string, year: number): Promise<SepaCandidate[]> {
  return toSepaCandidates(await getFeeDashboardData(adminId, "ADMIN", year), year);
}

/** Warum ein Mitglied mit Mandat trotzdem nicht in die Lastschriftdatei kann. */
function sepaProblem(iban: string | null, bic: string | null, missingAddress: boolean): string | null {
  if (!iban) return "Keine IBAN hinterlegt";
  if (!isValidIban(iban)) return "IBAN ungültig";
  if (!isSepaIban(iban)) return "Konto außerhalb des SEPA-Raums";
  if (requiresBic(iban) && !bic) return "BIC fehlt (Konto außerhalb des EWR)";
  if (missingAddress) return "Anschrift mit Ort und Land fehlt (Konto außerhalb des EWR)";
  return null;
}

/** Wie `getSepaCandidates`, für schon geladene Konten (Benutzerverwaltung). */
export function toSepaCandidates(
  users: Awaited<ReturnType<typeof getFeeDashboardData>>,
  year: number,
): SepaCandidate[] {
  return users.flatMap((user) => {
    const fee = user.fees.find((f) => f.year === year);
    // Nur aktuelle Mitglieder: bei Ausgetretenen ist das Mandat erloschen.
    if (user.status !== "REGULAR_MEMBER") return [];
    if (!user.directDebit || !fee || fee.paid || fee.amount <= 0) return [];

    const iban = user.iban ? normalizeIban(user.iban) : null;
    const rawBic = user.bic?.replace(/\s/g, "").toUpperCase() || null;
    const bic = rawBic && isValidBic(rawBic) ? rawBic : null;
    const name = `${user.firstName} ${user.lastName}`;
    const outsideEea = iban !== null && requiresBic(iban);
    const address =
      outsideEea && user.city && user.countryCode && isCountryCode(user.countryCode)
        ? {
            street: user.addressLine1,
            postalCode: user.postalCode,
            city: user.city,
            region: user.region,
            country: user.countryCode,
          }
        : null;
    return [{
      id: user.id,
      memberNumber: user.memberNumber,
      name,
      debtorName: user.accountHolder || name,
      iban,
      bic,
      mandateReference: user.mandateReference || defaultMandateId(user.memberNumber),
      address,
      amount: fee.amount,
      mandateDate: user.mandateSignedAt ? isoDate(user.mandateSignedAt) : "",
      joinedAt: user.joinedAt,
      problem: sepaProblem(iban, bic, outsideEea && !address),
    }];
  });
}
