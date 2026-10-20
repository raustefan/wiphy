import type { Prisma, Role, TerminationReason } from "@prisma/client";

type MaybeDate = Date | string | null | undefined;
type MaybeBool = boolean | string | null | undefined;

export type UpdateUserInput = {
  idToEdit: string;
  currentUserRole: Role;
  currentUserId: string;
  lastName: string;
  email: string;
  firstName?: string;
  title?: string | null;
  birthDate?: MaybeDate;
  phone?: string | null;

  addressLine1?: string | null;
  addressLine2?: string | null;
  postalCode?: string | null;
  city?: string | null;
  region?: string | null;
  countryCode?: string | null;

  degreeProgram?: string | null;
  studyStart?: MaybeDate;
  studyEnd?: MaybeDate;
  employer?: string | null;
  employmentStatus?: string | null;
  industry?: string | null;
  jobTitle?: string | null;
  linkedinUrl?: string | null;

  role?: "ADMIN" | "MEMBER";
  status?: "REGULAR_MEMBER" | "HONORARY_MEMBER" | "NON_MEMBER";
  memberNumber?: string | null;
  adminNote?: string | null;
  directDebit?: MaybeBool;
  accountHolder?: string | null;
  iban?: string | null;
  bic?: string | null;
  mandateReference?: string | null;
  mandateSignedAt?: MaybeDate;
  loginDisabled?: MaybeBool;
  /** Beim Umstellen auf „Kein Mitglied“: Grund für das Ende der Mitgliedschaft. */
  terminationReason?: TerminationReason;
};

function parseDateInput(val: MaybeDate): Date | null | undefined {
  if (val === undefined) return undefined;
  if (val === null || val === "") return null;
  if (val instanceof Date) return val;
  const d = new Date(String(val));
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function parseBoolInput(val: MaybeBool): boolean | null | undefined {
  if (val === undefined) return undefined;
  if (val === null) return null;
  if (typeof val === "boolean") return val;
  const s = String(val).toLowerCase();
  if (s === "true" || s === "1" || s === "on") return true;
  if (s === "false" || s === "0" || s === "") return false;
  return null;
}

function applyDate(
  data: Prisma.UserUpdateInput,
  key: "birthDate" | "studyStart" | "studyEnd" | "mandateSignedAt",
  value: MaybeDate,
) {
  const parsed = parseDateInput(value);
  if (parsed !== undefined) {
    data[key] = parsed;
  }
}

/** Nicht nullbare Kästchen: „unbekannt“ heißt hier „nicht anfassen“. */
function applyBool(
  data: Prisma.UserUpdateInput,
  key: "directDebit" | "loginDisabled",
  value: MaybeBool,
) {
  const parsed = parseBoolInput(value);
  if (parsed != null) {
    data[key] = parsed;
  }
}

export function buildUserUpdateData(input: UpdateUserInput): Prisma.UserUpdateInput {
  const data: Prisma.UserUpdateInput = {
    lastName: input.lastName,
    email: input.email,
    firstName: input.firstName,
    title: input.title ?? null,
    phone: input.phone ?? null,

    addressLine1: input.addressLine1 ?? null,
    addressLine2: input.addressLine2 ?? null,
    postalCode: input.postalCode ?? null,
    city: input.city ?? null,
    region: input.region ?? null,
    countryCode: input.countryCode ?? null,

    degreeProgram: input.degreeProgram ?? null,
    employer: input.employer ?? null,
    employmentStatus: input.employmentStatus ?? null,
    industry: input.industry ?? null,
    jobTitle: input.jobTitle ?? null,
    linkedinUrl: input.linkedinUrl ?? null,
  };

  applyDate(data, "birthDate", input.birthDate);
  applyDate(data, "studyStart", input.studyStart);
  applyDate(data, "studyEnd", input.studyEnd);

  // Zahlungsdaten und Verwaltung: nur Admins ändern sie hier — Mitglieder tun
  // das ausschließlich über die Zahlungsverwaltung (`/dashboard/zahlungen`),
  // wo dafür erneut das SEPA-Mandat bestätigt werden muss.
  if (input.currentUserRole === "ADMIN") {
    data.adminNote = input.adminNote ?? null;
    data.accountHolder = input.accountHolder ?? null;
    data.iban = input.iban ?? null;
    data.bic = input.bic ?? null;
    data.mandateReference = input.mandateReference ?? null;
    applyDate(data, "mandateSignedAt", input.mandateSignedAt);
    applyBool(data, "directDebit", input.directDebit);
    applyBool(data, "loginDisabled", input.loginDisabled);

    if (input.role) {
      data.role = input.role;
    }

    if (input.status) {
      data.status = input.status;
    }
  }

  return data;
}
