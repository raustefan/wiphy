/**
 * Filter, Gruppen und Kennzahlen der Benutzerverwaltung. Frei von Server- und
 * React-Imports, damit Seite, Client-Tabelle und Tests dieselbe Logik teilen.
 */

import { studentStatusEndsAfter } from "@/lib/membership";

type Status = "REGULAR_MEMBER" | "HONORARY_MEMBER" | "NON_MEMBER";

export type DirectoryAccountBase = {
  firstName: string;
  name: string | null;
  email: string;
  memberNumber: number | null;
  role: string;
  status: Status | string;
  emailVerified: boolean;
  loginDisabled: boolean;
  directDebit: boolean;
  /** Steht in der Beitragsliste des gewählten Jahres. */
  inFeeYear: boolean;
  fees: Array<{ year: number; paid: boolean; isStudent: boolean; amount: number }>;
  studentYears: number[];
  /** „Nein“ auf die Studiums-Frage: ab diesem Jahr kein Sonderstatus mehr. */
  notStudentFromYear: number | null;
};

export type DirectoryFilters = {
  search: string;
  role: "" | "ADMIN" | "MEMBER";
  access: "" | "active" | "locked" | "unverified";
  payment: "" | "open" | "paid";
  /** `ending`: letztes ermäßigtes Jahr — ab dem Folgejahr regulär. */
  tariff: "" | "student" | "regular" | "ending";
  sepa: "" | "yes" | "no";
};

export const EMPTY_FILTERS: DirectoryFilters = {
  search: "",
  role: "",
  access: "",
  payment: "",
  tariff: "",
  sepa: "",
};

/** Filter, die nur für die Beitragsliste Sinn ergeben — alle übrigen Konten haben keinen Beitrag im Jahr. */
export function hasFeeFilter(filters: DirectoryFilters): boolean {
  return filters.payment !== "" || filters.tariff !== "";
}

export function hasAnyFilter(filters: DirectoryFilters): boolean {
  return Object.values(filters).some((value) => value.trim() !== "");
}

/** Beitragszeile des Jahres — nur für Konten in der Beitragsliste. */
export function yearFee<F extends { year: number }>(
  account: { inFeeYear: boolean; fees: F[] },
  year: number,
): F | undefined {
  return account.inFeeYear ? account.fees.find((f) => f.year === year) : undefined;
}

/** Erlaubte Werte je Auswahlfilter — alles andere aus der URL wird verworfen. */
const FILTER_VALUES = {
  role: ["ADMIN", "MEMBER"],
  access: ["active", "locked", "unverified"],
  payment: ["open", "paid"],
  tariff: ["student", "regular", "ending"],
  sepa: ["yes", "no"],
} as const;

/** Filter aus der Adresszeile; die Suche steht dort als `q`. */
export function filtersFromParams(params: URLSearchParams): DirectoryFilters {
  const filters: DirectoryFilters = { ...EMPTY_FILTERS, search: params.get("q") ?? "" };
  for (const [key, allowed] of Object.entries(FILTER_VALUES)) {
    const value = params.get(key);
    if (value && (allowed as readonly string[]).includes(value)) {
      (filters as Record<string, string>)[key] = value;
    }
  }
  return filters;
}

/** Schreibt die Filter in `params`, leere Filter fallen heraus; andere Parameter (Jahr) bleiben. */
export function filtersToParams(filters: DirectoryFilters, params: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams(params);
  for (const [key, value] of Object.entries(filters)) {
    const name = key === "search" ? "q" : key;
    if (value.trim()) next.set(name, value);
    else next.delete(name);
  }
  return next;
}

export function matchesFilters(
  account: DirectoryAccountBase,
  filters: DirectoryFilters,
  year: number,
): boolean {
  const term = filters.search.trim().toLowerCase();
  if (
    term &&
    !`${account.firstName} ${account.name ?? ""} ${account.email} ${account.memberNumber ?? ""}`
      .toLowerCase()
      .includes(term)
  ) {
    return false;
  }
  if (filters.role && account.role !== filters.role) return false;
  if (filters.access === "active" && (account.loginDisabled || !account.emailVerified)) return false;
  if (filters.access === "locked" && !account.loginDisabled) return false;
  if (filters.access === "unverified" && account.emailVerified) return false;
  if (filters.sepa && account.directDebit !== (filters.sepa === "yes")) return false;

  if (hasFeeFilter(filters)) {
    const fee = yearFee(account, year);
    if (!fee) return false;
    if (filters.payment && fee.paid !== (filters.payment === "paid")) return false;
    if (filters.tariff === "ending") {
      if (!studentStatusEndsAfter(account, year)) return false;
    } else if (filters.tariff && fee.isStudent !== (filters.tariff === "student")) return false;
  }
  return true;
}

/**
 * Jedes Konto steht genau einmal da: erst die Mitglieder — alle ordentlichen
 * plus die im Jahr Ausgetretenen, die den Beitrag noch schulden —, dann die
 * Ehrenmitglieder, dann die Konten ohne Mitgliedschaft.
 */
export function groupAccounts<T extends DirectoryAccountBase>(accounts: T[]) {
  const isMemberRow = (a: T) => a.inFeeYear || a.status === "REGULAR_MEMBER";
  return {
    members: accounts.filter(isMemberRow),
    honorary: accounts.filter((a) => !isMemberRow(a) && a.status === "HONORARY_MEMBER"),
    none: accounts.filter((a) => !isMemberRow(a) && a.status !== "HONORARY_MEMBER"),
  };
}

export const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export function directoryStats(
  accounts: Array<DirectoryAccountBase & { joinedAt: Date | string | null }>,
  year: number,
  now: Date = new Date(),
) {
  const since = now.getTime() - YEAR_MS;
  const stats = {
    total: accounts.length,
    admins: 0,
    regular: 0,
    honorary: 0,
    none: 0,
    students: 0,
    feeDue: 0,
    feePaid: 0,
    joined: 0,
  };
  for (const account of accounts) {
    if (account.role === "ADMIN") stats.admins++;
    if (account.status === "REGULAR_MEMBER") stats.regular++;
    else if (account.status === "HONORARY_MEMBER") stats.honorary++;
    else stats.none++;

    const fee = yearFee(account, year);
    if (fee) {
      stats.feeDue += fee.amount;
      if (fee.paid) stats.feePaid += fee.amount;
      if (fee.isStudent && account.status === "REGULAR_MEMBER") stats.students++;
    }

    const joinedAt = account.joinedAt ? new Date(account.joinedAt).getTime() : NaN;
    if (joinedAt > since && joinedAt <= now.getTime()) stats.joined++;
  }
  return stats;
}
