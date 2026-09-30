/**
 * Filter, Gruppen und Kennzahlen der Benutzerverwaltung. Frei von Server- und
 * React-Imports, damit Seite, Client-Tabelle und Tests dieselbe Logik teilen.
 */

type Status = "ORDENTLICHES_MITGLIED" | "EHRENMITGLIED" | "KEIN_MITGLIED";

export type DirectoryAccountBase = {
  vorname: string;
  name: string | null;
  email: string;
  mitgliedId: number | null;
  role: string;
  status: Status | string;
  emailVerified: boolean;
  loginDisabled: boolean;
  bankeinzug: boolean;
  /** Steht in der Beitragsliste des gewählten Jahres. */
  inFeeYear: boolean;
  fees: Array<{ jahr: number; bezahlt: boolean; isStudent: boolean; beitrag: number }>;
};

export type DirectoryFilters = {
  search: string;
  role: "" | "ADMIN" | "MEMBER";
  access: "" | "active" | "locked" | "unverified";
  payment: "" | "open" | "paid";
  tariff: "" | "student" | "regular";
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
export function yearFee<F extends { jahr: number }>(
  account: { inFeeYear: boolean; fees: F[] },
  year: number,
): F | undefined {
  return account.inFeeYear ? account.fees.find((f) => f.jahr === year) : undefined;
}

/** Erlaubte Werte je Auswahlfilter — alles andere aus der URL wird verworfen. */
const FILTER_VALUES = {
  role: ["ADMIN", "MEMBER"],
  access: ["active", "locked", "unverified"],
  payment: ["open", "paid"],
  tariff: ["student", "regular"],
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
    !`${account.vorname} ${account.name ?? ""} ${account.email} ${account.mitgliedId ?? ""}`
      .toLowerCase()
      .includes(term)
  ) {
    return false;
  }
  if (filters.role && account.role !== filters.role) return false;
  if (filters.access === "active" && (account.loginDisabled || !account.emailVerified)) return false;
  if (filters.access === "locked" && !account.loginDisabled) return false;
  if (filters.access === "unverified" && account.emailVerified) return false;
  if (filters.sepa && account.bankeinzug !== (filters.sepa === "yes")) return false;

  if (hasFeeFilter(filters)) {
    const fee = yearFee(account, year);
    if (!fee) return false;
    if (filters.payment && fee.bezahlt !== (filters.payment === "paid")) return false;
    if (filters.tariff && fee.isStudent !== (filters.tariff === "student")) return false;
  }
  return true;
}

/**
 * Jedes Konto steht genau einmal da: erst die Mitglieder — alle ordentlichen
 * plus die im Jahr Ausgetretenen, die den Beitrag noch schulden —, dann die
 * Ehrenmitglieder, dann die Konten ohne Mitgliedschaft.
 */
export function groupAccounts<T extends DirectoryAccountBase>(accounts: T[]) {
  const isMemberRow = (a: T) => a.inFeeYear || a.status === "ORDENTLICHES_MITGLIED";
  return {
    members: accounts.filter(isMemberRow),
    honorary: accounts.filter((a) => !isMemberRow(a) && a.status === "EHRENMITGLIED"),
    none: accounts.filter((a) => !isMemberRow(a) && a.status !== "EHRENMITGLIED"),
  };
}

export const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export function directoryStats(
  accounts: Array<DirectoryAccountBase & { aufnahmedatum: Date | string | null }>,
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
    if (account.status === "ORDENTLICHES_MITGLIED") stats.regular++;
    else if (account.status === "EHRENMITGLIED") stats.honorary++;
    else stats.none++;

    const fee = yearFee(account, year);
    if (fee) {
      stats.feeDue += fee.beitrag;
      if (fee.bezahlt) stats.feePaid += fee.beitrag;
      if (fee.isStudent && account.status === "ORDENTLICHES_MITGLIED") stats.students++;
    }

    const joinedAt = account.aufnahmedatum ? new Date(account.aufnahmedatum).getTime() : NaN;
    if (joinedAt > since && joinedAt <= now.getTime()) stats.joined++;
  }
  return stats;
}
