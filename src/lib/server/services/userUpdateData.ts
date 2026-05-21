import type { Prisma, Role } from "@prisma/client";

type MaybeDate = Date | string | null | undefined;
type MaybeBool = boolean | string | null | undefined;

export type UpdateUserInput = {
  idToEdit: string;
  currentUserRole: Role;
  name: string;
  email: string;
  titel?: string | null;
  vorname?: string;
  berufsstand?: string | null;
  plz?: string | null;
  stadt?: string | null;
  strasse?: string | null;
  telefon?: string | null;
  arbeitgeber?: string | null;
  role?: "ADMIN" | "MEMBER";
  status?: "ORDENTLICHES_MITGLIED" | "EHRENMITGLIED" | "KEIN_MITGLIED";
  mitgliedId?: string | null;

  land?: string | null;
  geburtsdatum?: MaybeDate;
  website?: string | null;

  studiengang?: string | null;
  studienbeginn?: MaybeDate;
  studienende?: MaybeDate;
  diplomarbeit?: string | null;
  bachelorarbeit?: string | null;
  masterarbeit?: string | null;
  dissertation?: string | null;

  berufszweig?: string | null;
  position?: string | null;
  praktika?: string | null;
  berufserfahrung?: string | null;

  zahlungsKommentar?: string | null;
  bank?: string | null;
  BLZ?: string | null;
  KTO?: string | null;
  bankeinzug?: MaybeBool;
  zuwendungsbesch?: MaybeBool;
  mahnung?: string | null;
  IBAN?: string | null;
  BIC?: string | null;
  mandatserteilung?: MaybeDate;

  datensperren?: MaybeBool;
  ausschluss?: MaybeBool;
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
  key: "geburtsdatum" | "studienbeginn" | "studienende" | "mandatserteilung",
  value: MaybeDate,
) {
  const parsed = parseDateInput(value);
  if (parsed !== undefined) {
    data[key] = parsed;
  }
}

function applyBool(
  data: Prisma.UserUpdateInput,
  key: "bankeinzug" | "zuwendungsbesch" | "datensperren" | "ausschluss",
  value: MaybeBool,
) {
  const parsed = parseBoolInput(value);
  if (parsed !== undefined) {
    data[key] = parsed;
  }
}

export function buildUserUpdateData(input: UpdateUserInput): Prisma.UserUpdateInput {
  const data: Prisma.UserUpdateInput = {
    name: input.name,
    email: input.email,
    titel: input.titel ?? null,
    vorname: input.vorname,
    berufsstand: input.berufsstand ?? null,
    plz: input.plz ?? null,
    stadt: input.stadt ?? null,
    strasse: input.strasse ?? null,
    telefon: input.telefon ?? null,
    arbeitgeber: input.arbeitgeber ?? null,

    land: input.land ?? null,
    website: input.website ?? null,

    studiengang: input.studiengang ?? null,
    diplomarbeit: input.diplomarbeit ?? null,
    bachelorarbeit: input.bachelorarbeit ?? null,
    masterarbeit: input.masterarbeit ?? null,
    dissertation: input.dissertation ?? null,

    berufszweig: input.berufszweig ?? null,
    position: input.position ?? null,
    praktika: input.praktika ?? null,
    berufserfahrung: input.berufserfahrung ?? null,
  };

  applyDate(data, "geburtsdatum", input.geburtsdatum);
  applyDate(data, "studienbeginn", input.studienbeginn);
  applyDate(data, "studienende", input.studienende);

  if (input.currentUserRole === "ADMIN") {
    data.zahlungsKommentar = input.zahlungsKommentar ?? null;
    data.bank = input.bank ?? null;
    data.BLZ = input.BLZ ?? null;
    data.KTO = input.KTO ?? null;
    data.mahnung = input.mahnung ?? null;
    data.IBAN = input.IBAN ?? null;
    data.BIC = input.BIC ?? null;

    applyDate(data, "mandatserteilung", input.mandatserteilung);
    applyBool(data, "bankeinzug", input.bankeinzug);
    applyBool(data, "zuwendungsbesch", input.zuwendungsbesch);
    applyBool(data, "datensperren", input.datensperren);
    applyBool(data, "ausschluss", input.ausschluss);

    if (input.role) {
      data.role = input.role;
    }

    if (input.status) {
      data.status = input.status;
    }
  }

  return data;
}
