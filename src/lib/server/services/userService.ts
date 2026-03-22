import type { Prisma, Role } from "@prisma/client";
import {
  findUserById,
  findUserByMitgliedIdExcludingUser,
  findUsersForDashboard,
  updateUserById,
  deleteUserById,
  createUser,
} from "@/lib/server/repositories/userRepository";
import bcrypt from "bcryptjs";

type MaybeDate = Date | string | null | undefined;
type MaybeBool = boolean | string | null | undefined;

type UpdateUserInput = {
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

  // additional fields
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
  // string
  const s = String(val);
  if (!s) return null;
  const d = new Date(s);
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

export async function getDashboardUsers(userId: string, role: Role) {
  return findUsersForDashboard(userId, role);
}

export async function getEditableUser(id: string) {
  return findUserById(id);
}

export async function updateUserProfile(input: UpdateUserInput) {
  // Build the Prisma update data object
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

    zahlungsKommentar: input.zahlungsKommentar ?? null,
    bank: input.bank ?? null,
    BLZ: input.BLZ ?? null,
    KTO: input.KTO ?? null,
    mahnung: input.mahnung ?? null,
    IBAN: input.IBAN ?? null,
    BIC: input.BIC ?? null,
  };

  // Dates: convert only when provided (parseDateInput returns Date | null | undefined)
  const geburtsdatum = parseDateInput(input.geburtsdatum);
  if (geburtsdatum !== undefined) {
    data.geburtsdatum = geburtsdatum;
  }

  const studienbeginn = parseDateInput(input.studienbeginn);
  if (studienbeginn !== undefined) {
    data.studienbeginn = studienbeginn;
  }

  const studienende = parseDateInput(input.studienende);
  if (studienende !== undefined) {
    data.studienende = studienende;
  }

  const mandatserteilung = parseDateInput(input.mandatserteilung);
  if (mandatserteilung !== undefined) {
    data.mandatserteilung = mandatserteilung;
  }

  // Booleans: coerce to boolean|null/undefined
  const bankeinzug = parseBoolInput(input.bankeinzug);
  if (bankeinzug !== undefined) {
    data.bankeinzug = bankeinzug;
  }
  const zuwendungsbesch = parseBoolInput(input.zuwendungsbesch);
  if (zuwendungsbesch !== undefined) {
    data.zuwendungsbesch = zuwendungsbesch;
  }
  const datensperren = parseBoolInput(input.datensperren);
  if (datensperren !== undefined) {
    data.datensperren = datensperren;
  }
  const ausschluss = parseBoolInput(input.ausschluss);
  if (ausschluss !== undefined) {
    data.ausschluss = ausschluss;
  }

  // Admin-only updates
  if (input.currentUserRole === "ADMIN") {
    if (input.role) {
      data.role = input.role;
    }

    if (input.status) {
      data.status = input.status;
    }

    if (typeof input.mitgliedId === "string" && input.mitgliedId !== "") {
      const parsed = Number(input.mitgliedId);
      if (!Number.isNaN(parsed)) {
        const existing = await findUserByMitgliedIdExcludingUser(
          parsed,
          input.idToEdit
        );
        if (existing) {
          return { ok: false as const, reason: "mitgliedId_conflict" as const };
        }
        data.mitgliedId = parsed;
      }
    } else if (input.mitgliedId === "" || input.mitgliedId === null) {
      data.mitgliedId = null;
    }
  }

  await updateUserById(input.idToEdit, data);
  return { ok: true as const };
}

export async function adminDeleteUser(userIdToDelete: string, currentUserRole: Role) {
  if (currentUserRole !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can delete users");
  }
  await deleteUserById(userIdToDelete);
  return { ok: true as const };
}

export async function adminCreateUser(input: Prisma.UserCreateInput, currentUserRole: Role) {
  if (currentUserRole !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can create users");
  }
  // Hash password before saving
  const hashedPassword = await bcrypt.hash(input.password, 12);
  const data = { ...input, password: hashedPassword };
  await createUser(data);
  return { ok: true as const };
}