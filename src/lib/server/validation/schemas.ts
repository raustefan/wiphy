import { z } from "zod";

/** Trim empty strings to undefined for optional fields */
const optionalString = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
    .transform((v) =>
      v === undefined ? undefined : v.trim() === "" ? undefined : v.trim()
    );

/** Helper to coerce common checkbox/form boolean values to boolean */
const preprocessBoolean = z.preprocess((val) => {
  if (val === undefined) return undefined;
  if (val === null) return undefined;
  if (typeof val === "boolean") return val;
  const s = String(val).toLowerCase().trim();
  if (s === "on" || s === "true" || s === "1") return true;
  if (s === "false" || s === "0" || s === "") return false;
  return undefined;
}, z.boolean().optional());

/**
 * Helper to coerce date strings (YYYY-MM-DD) to Date objects, while treating
 * empty strings as undefined so optional fields remain optional.
 */
const optionalDate = () =>
  z.preprocess((val) => {
    if (val === undefined || val === null) return undefined;
    if (typeof val === "string") {
      const s = val.trim();
      if (s === "") return undefined;
      // let z.coerce.date handle conversion from string
      return s;
    }
    return val;
  }, z.coerce.date().optional());

const roleEnum = z.enum(["ADMIN", "MEMBER"]);
const statusEnum = z.enum([
  "ORDENTLICHES_MITGLIED",
  "EHRENMITGLIED",
  "KEIN_MITGLIED",
]);

/** Treats an empty string the same as "field not submitted" instead of baking "" into the type. */
const optionalEnum = <T extends [string, ...string[]]>(values: T) =>
  z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : v),
    z.enum(values).optional(),
  );

export const registerSchema = z.object({
  vorname: z
    .string()
    .trim()
    .min(1, "Bitte einen Namen angeben.")
    .max(200, "Name ist zu lang."),
  name: z
    .string()
    .trim()
    .min(1, "Bitte einen Namen angeben.")
    .max(200, "Name ist zu lang."),
  email: z
    .string()
    .trim()
    .email("Bitte eine gültige E-Mail-Adresse angeben.")
    .max(320, "E-Mail ist zu lang."),
  password: z
    .string()
    .min(8, "Passwort muss mindestens 8 Zeichen haben.")
    .max(128, "Passwort ist zu lang."),
});

export const adminCreateUserSchema = registerSchema.extend({
  role: roleEnum.default("MEMBER"),
  status: statusEnum.default("KEIN_MITGLIED"),
});

/** Rundmail: Gruppen oder einzeln ausgewählte Nutzer (IDs per FormData getAll) */
export const mailSendSchema = z
  .object({
    target: z.enum(["ALL", "MEMBER", "ADMIN", "SELECTED"], {
      message: "Ungültige Empfänger-Gruppe.",
    }),
    subject: z
      .string()
      .trim()
      .min(1, "Bitte einen Betreff angeben.")
      .max(200, "Betreff ist zu lang."),
    message: z
      .string()
      .trim()
      .min(1, "Bitte eine Nachricht eingeben.")
      .max(100_000, "Nachricht ist zu lang."),
    selectedUserIds: z.array(z.string().min(1)).default([]),
    /** Checkbox „BCC an mich“: FormData sendet value "on" wenn gesetzt */
    bccToSelf: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.target === "SELECTED" && data.selectedUserIds.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Bitte mindestens einen Empfänger auswählen.",
        path: ["selectedUserIds"],
      });
    }
  });

/** Direktmail an explizit ausgewählte Nutzer (Overlay, Fees-Erinnerung, …) */
export const directMailSchema = z.object({
  selectedUserIds: z
    .array(z.string().min(1))
    .min(1, "Bitte mindestens einen Empfänger auswählen."),
  subject: z
    .string()
    .trim()
    .min(1, "Bitte einen Betreff angeben.")
    .max(200, "Betreff ist zu lang."),
  message: z
    .string()
    .trim()
    .min(1, "Bitte eine Nachricht eingeben.")
    .max(100_000, "Nachricht ist zu lang."),
  bccToSelf: z.boolean().default(false),
});

export const feeToggleSchema = z.object({
  userId: z.string().min(1, "Ungültige Benutzer-ID."),
  year: z.coerce.number().int().min(2000).max(2100),
  paid: z.enum(["true", "false"]).transform((v) => v === "true"),
});

export const feeStatusUpdateSchema = z.object({
  userId: z.string().min(1, "Ungültige Benutzer-ID."),
  year: z.coerce.number().int().min(2000).max(2100),
  field: z.enum(["paid", "isStudent"]),
  value: z.enum(["true", "false"]).transform((v) => v === "true"),
});

export const feeAmountUpdateSchema = z.object({
  userId: z.string().min(1, "Ungültige Benutzer-ID."),
  year: z.coerce.number().int().min(2000).max(2100),
  beitrag: z.coerce.number().min(0),
});

export const feeCommentSchema = z.object({
  userId: z.string().min(1, "Ungültige Benutzer-ID."),
  comment: z
    .string()
    .max(10_000, "Kommentar ist zu lang.")
    .default("")
    .transform((v) => (v.trim() === "" ? null : v.trim())),
});

export const blogSaveSchema = z.object({
  id: z.string().min(1, "Ungültige Beitrags-ID.").max(64),
  title: z
    .string()
    .trim()
    .min(1, "Bitte einen Titel angeben.")
    .max(500, "Titel ist zu lang."),
  content: z
    .string()
    .min(1, "Bitte Inhalt angeben.")
    .max(500_000, "Inhalt ist zu lang."),
  preview: z
    .string()
    .trim()
    .min(1, "Bitte eine Vorschau angeben.")
    .max(1000, "Vorschau ist zu lang."),
  author: z
    .string()
    .trim()
    .min(1, "Bitte einen Autor angeben.")
    .max(200, "Autor ist zu lang."),
  publishedAt: z.coerce.date().default(() => new Date()),
  published: z.boolean(),
});

export const blogDeleteSchema = z.object({
  id: z.string().min(1, "Ungültige Beitrags-ID.").max(64),
});

export const userUpdateSchema = z.object({
  id: z.string().min(1, "Ungültige Benutzer-ID."),

  // basic
  name: z
    .string()
    .trim()
    .min(1, "Bitte einen Namen angeben.")
    .max(200, "Name ist zu lang."),
  vorname: optionalString(200),
  email: z
    .string()
    .trim()
    .email("Bitte eine gültige E-Mail-Adresse angeben.")
    .max(320, "E-Mail ist zu lang."),
  titel: optionalString(120),

  // kontakt & adresse
  berufsstand: optionalString(200),
  plz: optionalString(20),
  stadt: optionalString(120),
  strasse: optionalString(200),
  telefon: optionalString(50),
  arbeitgeber: optionalString(200),
  land: optionalString(120),
  website: optionalString(200),

  // dates
  geburtsdatum: optionalDate(),

  // studium
  studiengang: optionalString(200),
  studienbeginn: optionalDate(),
  studienende: optionalDate(),
  diplomarbeit: optionalString(200),
  bachelorarbeit: optionalString(200),
  masterarbeit: optionalString(200),
  dissertation: optionalString(200),

  // beruf
  berufszweig: optionalString(200),
  position: optionalString(200),
  praktika: optionalString(2000),
  berufserfahrung: optionalString(5000),

  // zahlungs/admin info
  zahlungsKommentar: optionalString(10_000),
  bank: optionalString(200),
  BLZ: optionalString(50),
  KTO: optionalString(50),
  bankeinzug: preprocessBoolean,
  zuwendungsbesch: preprocessBoolean,
  mahnung: optionalString(2000),
  IBAN: optionalString(80),
  BIC: optionalString(40),
  mandatserteilung: optionalDate(),

  // admin-only flags
  datensperren: preprocessBoolean,
  ausschluss: preprocessBoolean,

  // Mitglieds- / admin-only fields
  /** Present only for admins; omit or empty for members */
  role: optionalEnum(["ADMIN", "MEMBER"]),
  status: optionalEnum(["ORDENTLICHES_MITGLIED", "EHRENMITGLIED", "KEIN_MITGLIED"]),
  mitgliedId: z
    .string()
    .optional()
    .refine(
      (v) => v === undefined || v === "" || /^\d+$/.test(String(v)),
      "Mitglieds-ID muss eine gültige nicht-negative Ganzzahl sein."
    ),
});

export type UserUpdateParsed = z.infer<typeof userUpdateSchema>;
