import { z } from "zod";
import { normalizeEmail } from "@/lib/server/normalizeEmail";
import { isSepaIban, isValidBic, isValidIban, normalizeIban, requiresBic } from "@/lib/iban";
import { parseBerlinLocalInput, startOfBerlinDay } from "@/lib/berlinTime";
import { addDirectDebitIssues, birthDateField } from "@/lib/membershipFormSchemas";
import { isCountryCode, toCountryCode } from "@/lib/countries";
import { isValidMandateId } from "@/lib/sepa";
import {
  MAX_ANNUAL_FEE,
  hasControlChars,
  isCalendarDate,
  isPlausibleBirthDate,
  isValidPhone,
  isValidPostalCode,
} from "@/lib/inputRules";

/**
 * Email addresses are always stored lowercased — `User.email` is case-sensitive
 * and unique, so writes and lookups must agree on one canonical form.
 */
const emailField = z
  .string()
  .trim()
  .email("Bitte eine gültige E-Mail-Adresse angeben.")
  .max(320, "E-Mail ist zu lang.")
  .transform(normalizeEmail);

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
  "REGULAR_MEMBER",
  "HONORARY_MEMBER",
  "NON_MEMBER",
]);

/** Treats an empty string the same as "field not submitted" instead of baking "" into the type. */
const optionalEnum = <T extends [string, ...string[]]>(values: T) =>
  z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : v),
    z.enum(values).optional(),
  );

/**
 * Verknüpfung mit einem Termin — leer heißt „keiner“. Steht hier oben, weil
 * sowohl das Blog-Formular („Gehört zu Termin“) als auch die Rundmail
 * („Termin ankündigen“) dieselbe optionale Referenz führen.
 */
const optionalEventId = z
  .string()
  .max(64, "Ungültige Termin-ID.")
  .optional()
  .transform((value) => (value === undefined || value.trim() === "" ? null : value.trim()));

/** Nur echte LinkedIn-Profile — das Feld soll nicht zur beliebigen Linkablage werden. */
const linkedinUrlField = optionalString(300).refine(
  (v) => v === undefined || /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/\S+$/i.test(v),
  "Bitte einen LinkedIn-Link angeben, der mit https://www.linkedin.com/ beginnt.",
);

const mandateReferenceField = optionalString(35).refine(
  (v) => v === undefined || isValidMandateId(v),
  "Mandatsreferenz: höchstens 35 Zeichen, ohne Leerzeichen und Umlaute.",
);

/** Wie ein Admin das Ende einer Mitgliedschaft einträgt (siehe `TerminationReason`). */
export const TERMINATION_REASONS = ["RESIGNATION", "EXCLUSION", "DECEASED"] as const;

/** Vor- und Nachname: Pflicht, ohne Steuerzeichen — Namen landen im Mail-Betreff. */
const personName = z
  .string({ message: "Bitte einen Namen angeben." })
  .trim()
  .min(1, "Bitte einen Namen angeben.")
  .max(200, "Name ist zu lang.")
  .refine((v) => !hasControlChars(v), "Bitte ohne Zeilenumbrüche oder Steuerzeichen eingeben.");

/**
 * Bankdaten, wie sie Admin-Anlage, Profil und Import teilen: gültige IBAN und
 * BIC, und mit Lastschrift nur Konten im SEPA-Raum — außerhalb des EWR mit BIC.
 */
function addBankIssues(
  data: { iban?: string | null; bic?: string | null; directDebit?: boolean | null },
  ctx: z.RefinementCtx,
) {
  if (data.iban && !isValidIban(data.iban)) {
    ctx.addIssue({ code: "custom", message: "Diese IBAN ist ungültig (Prüfziffer oder Länge).", path: ["iban"] });
  } else if (data.iban && data.directDebit && !isSepaIban(data.iban)) {
    ctx.addIssue({ code: "custom", message: "Lastschrift geht nur von Konten im SEPA-Raum.", path: ["iban"] });
  } else if (data.iban && data.directDebit && requiresBic(data.iban) && !data.bic) {
    ctx.addIssue({ code: "custom", message: "Konto außerhalb des EWR: BIC angeben.", path: ["bic"] });
  }
  if (data.bic && !isValidBic(data.bic)) {
    ctx.addIssue({ code: "custom", message: "Dieser BIC ist ungültig (8 oder 11 Zeichen).", path: ["bic"] });
  }
}

/**
 * Zod führt objektweite Prüfungen auch aus, wenn ein Feld schon gescheitert
 * ist — dann steht dort noch der rohe Text statt eines Datums. Solche Felder
 * hat die Feldprüfung bereits gemeldet; hier zählen nur echte Daten.
 */
const asDate = (value: unknown) => (value instanceof Date ? value : undefined);

/** Kontakt und Lebensdaten — nur was angegeben ist, wird geprüft. */
function addPersonIssues(
  data: {
    phone?: string | null;
    postalCode?: string | null;
    countryCode?: string | null;
    birthDate?: Date | null;
    joinedAt?: Date | null;
    studyStart?: Date | null;
    studyEnd?: Date | null;
  },
  ctx: z.RefinementCtx,
) {
  const now = new Date();
  const birthDate = asDate(data.birthDate);
  const joinedAt = asDate(data.joinedAt);
  const studyStart = asDate(data.studyStart);
  const studyEnd = asDate(data.studyEnd);
  if (data.phone && !isValidPhone(data.phone)) {
    ctx.addIssue({ code: "custom", message: "Telefonnummer nur aus Ziffern, + ( ) / . -", path: ["phone"] });
  }
  if (data.postalCode && !isValidPostalCode(data.countryCode, data.postalCode)) {
    ctx.addIssue({ code: "custom", message: "Postleitzahl passt nicht zum Land.", path: ["postalCode"] });
  }
  if (birthDate && !isPlausibleBirthDate(birthDate, now)) {
    ctx.addIssue({ code: "custom", message: "Geburtsdatum unplausibel (vor 1900 oder in der Zukunft).", path: ["birthDate"] });
  }
  if (joinedAt && joinedAt > now) {
    ctx.addIssue({ code: "custom", message: "Beitritt liegt in der Zukunft.", path: ["joinedAt"] });
  }
  if (joinedAt && birthDate && joinedAt < birthDate) {
    ctx.addIssue({ code: "custom", message: "Beitritt liegt vor der Geburt.", path: ["joinedAt"] });
  }
  if (studyStart && studyEnd && studyEnd < studyStart) {
    ctx.addIssue({ code: "custom", message: "Studienende liegt vor dem Studienbeginn.", path: ["studyEnd"] });
  }
}

export const registerSchema = z.object({
  firstName: personName,
  lastName: personName,
  email: emailField,
  password: z
    .string()
    .min(8, "Passwort muss mindestens 8 Zeichen haben.")
    .max(128, "Passwort ist zu lang."),
});

/** Eigene Adresse ändern (`/dashboard/konto`). */
export const emailChangeSchema = z.object({
  email: emailField,
  currentPassword: z.string().min(1, "Bitte gib dein aktuelles Passwort ein.").max(128),
});

/**
 * A header-injectable value must never reach nodemailer's `Reply-To`/`Subject`.
 * Zod's email check already rejects CR/LF in the address, but the free-text
 * fields need it spelled out.
 */
const noNewlines = (max: number, label: string) =>
  z
    .string()
    .trim()
    .min(1, `Bitte ${label} angeben.`)
    .max(max, `${label.charAt(0).toUpperCase()}${label.slice(1)} ist zu lang.`)
    .refine((v) => !/[\r\n]/.test(v), `${label} enthält ungültige Zeichen.`);

export const contactSchema = z.object({
  name: noNewlines(120, "einen Namen"),
  email: emailField,
  subject: noNewlines(200, "einen Betreff"),
  message: z
    .string()
    .trim()
    .min(20, "Bitte schreibe mindestens 20 Zeichen, damit wir dir helfen können.")
    .max(5000, "Nachricht ist zu lang (max. 5000 Zeichen)."),
  // Honeypot: hidden in the UI, so any value at all means a bot filled it in.
  website: z.string().max(200).optional(),
  // Milliseconds the form was on screen before submit; forged trivially, but it
  // costs nothing and catches the naive "POST immediately" bots.
  renderedAt: z.string().optional(),
});

/**
 * „Passwort vergessen“. Ohne Zeitmessung: ein einziges Feld ist per Autofill
 * schneller ausgefüllt als `MIN_FILL_TIME_MS`, und der vorgetäuschte Erfolg
 * hieße hier, dass ein echtes Mitglied auf eine Mail wartet, die nie kommt.
 */
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "E-Mail ist erforderlich"),
  // Honeypot: im UI versteckt, jeder Wert stammt also von einem Bot.
  website: z.string().max(200).optional(),
});

/**
 * Öffentliche Registrierung: `registerSchema` plus Bot-Abwehr.
 *
 * Bewusst *nicht* in `registerSchema` selbst — sonst erbt
 * `adminCreateUserSchema` die Sicherheitsfrage, und ein Admin müsste sie beim
 * Anlegen eines Kontos mitbeantworten.
 */
export const registerFormSchema = registerSchema.extend({
  // Beitreten kann nur, wer volljährig ist — das soll nicht erst im Antrag auffallen.
  birthDate: birthDateField,
  securityAnswer: z
    .string()
    .trim()
    .min(1, "Bitte beantworte die Sicherheitsfrage.")
    .max(100, "Antwort ist zu lang."),
  // Honeypot: im UI versteckt, jeder Wert stammt also von einem Bot.
  website: z.string().max(200).optional(),
  // Millisekunden zwischen Anzeige und Absenden des Formulars.
  renderedAt: z.string().optional(),
});

/**
 * Anlegen durch einen Admin — vor allem zum Übernehmen von Mitgliedern aus dem
 * alten System. Alles außer Name, E-Mail und Passwort ist freiwillig.
 */
export const adminCreateUserSchema = registerSchema
  .extend({
    role: roleEnum.default("MEMBER"),
    status: statusEnum.default("NON_MEMBER"),
    /** Zugangsdaten per Mail schicken (inkl. Passwort). */
    notify: preprocessBoolean,

    memberNumber: z
      .string()
      .optional()
      .refine((v) => !v || /^\d+$/.test(v), "Mitglieds-ID muss eine nicht-negative Ganzzahl sein.")
      .transform((v) => (v ? Number(v) : undefined)),
    joinedAt: optionalDate(),
    birthDate: optionalDate(),
    addressLine1: optionalString(200),
    addressLine2: optionalString(200),
    postalCode: optionalString(20),
    city: optionalString(120),
    region: optionalString(120),
    /** Ländercode oder — beim Import aus dem alten System — Ländername. */
    countryCode: optionalString(120).transform((v) => (v ? toCountryCode(v) : undefined)),
    adminNote: optionalString(10_000),

    accountHolder: optionalString(200),
    iban: optionalString(80),
    bic: optionalString(40),
    mandateReference: mandateReferenceField,
    mandateSignedAt: optionalDate(),
    /** Überweist selbst statt SEPA-Lastschrift. */
    selfPayer: preprocessBoolean,
    /** Alle Beiträge seit Beitritt bis zum laufenden Jahr als bezahlt markieren. */
    allPaid: preprocessBoolean,
    /** Kommagetrennte Jahre mit ermäßigtem Beitrag. */
    studentYears: z
      .string()
      .optional()
      .transform((v) =>
        (v ?? "")
          .split(",")
          .map(Number)
          .filter((y) => Number.isInteger(y) && y > 1900),
      ),
  })
  .superRefine((data, ctx) => {
    addBankIssues({ ...data, directDebit: !data.selfPayer }, ctx);
    addPersonIssues(data, ctx);
  })
  .transform((data) => ({ ...data, iban: data.iban ? normalizeIban(data.iban) : undefined }));

export type AdminCreateUserInput = z.infer<typeof adminCreateUserSchema>;

// ─────────────────────────── Massenimport ───────────────────────────

/** Im Import heißen `null` und "" gleichermaßen „nicht angegeben“. */
const absent = (value: unknown) => (value === null || value === "" ? undefined : value);

const importString = (max: number) =>
  z.preprocess(absent, z.string({ message: "Text angeben." }).trim().max(max, `Höchstens ${max} Zeichen.`).optional());

/** Reine Datumsangaben als `JJJJ-MM-TT`, gespeichert als 00:00 UTC wie überall. */
const importDate = z.preprocess(
  absent,
  z
    .string({ message: "Datum als JJJJ-MM-TT angeben." })
    .superRefine((value, ctx) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        ctx.addIssue({ code: "custom", message: "Datum als JJJJ-MM-TT angeben." });
      } else if (!isCalendarDate(value)) {
        ctx.addIssue({ code: "custom", message: "Dieses Datum gibt es nicht." });
      }
    })
    .transform((value) => new Date(`${value}T00:00:00Z`))
    .optional(),
);

const importBool = (fallback: boolean) =>
  z.preprocess(absent, z.boolean({ message: "true oder false angeben." }).default(fallback));

const importYear = z.number({ message: "Jahr als Zahl angeben." }).int().min(1950).max(2100);

/** Eine `MemberFee`-Zeile. Ohne `manualAmount` rechnet die App den Betrag selbst. */
const importFeeSchema = z.strictObject(
  {
    year: importYear,
    paid: importBool(false),
    amount: z.preprocess(
      absent,
      z
        .number({ message: "Betrag als Zahl angeben." })
        .min(0, "Betrag darf nicht negativ sein.")
        .max(MAX_ANNUAL_FEE, `Mehr als ${MAX_ANNUAL_FEE} € im Jahr — Tippfehler?`)
        .optional(),
    ),
    manualAmount: importBool(false),
  },
  { error: (issue) => (issue.code === "unrecognized_keys" ? `Unbekanntes Feld: ${issue.keys.join(", ")}` : undefined) },
);

/**
 * JSON-Massenimport: ein Objekt je Person, die Felder heißen wie die Spalten
 * von `User` (Beiträge als `fees` wie die Relation zu `MemberFee`). Was die
 * App selbst verwaltet — ID, Passwort, Zeitstempel, Sitzungen — fehlt; welche
 * Spalten das sind, hält `IMPORT_EXCLUDED_FIELDS` fest und ein Test nach.
 *
 * Unbekannte Felder sind ein Fehler statt still verworfen: ein Tippfehler wie
 * `vorname` soll auffallen, bevor 300 Konten ohne Vornamen angelegt sind.
 */
export const userImportSchema = z
  .strictObject(
    {
      email: emailField,
      role: z.preprocess(absent, roleEnum.default("MEMBER")),
      firstName: personName,
      lastName: personName,
      title: importString(120),
      birthDate: importDate,
      phone: importString(80),

      addressLine1: importString(200),
      addressLine2: importString(200),
      postalCode: importString(20),
      city: importString(120),
      region: importString(120),
      /** ISO-Code oder Ländername aus dem alten System („Deutschland“ → DE). */
      countryCode: importString(120).transform((value) => (value ? toCountryCode(value) : undefined)),

      memberNumber: z.preprocess(absent, z.number({ message: "Mitgliedsnummer als Zahl angeben." }).int().min(0).optional()),
      joinedAt: importDate,
      status: z.preprocess(absent, statusEnum.default("NON_MEMBER")),
      studentYears: z.preprocess(absent, z.array(importYear, { message: "Liste von Jahren angeben." }).default([])),
      adminNote: importString(10_000),

      degreeProgram: importString(200),
      studyStart: importDate,
      studyEnd: importDate,
      employer: importString(200),
      employmentStatus: importString(200),
      industry: importString(200),
      jobTitle: importString(200),
      linkedinUrl: z.preprocess(absent, linkedinUrlField),

      directDebit: importBool(false),
      accountHolder: importString(200),
      iban: importString(80),
      bic: importString(40),
      mandateReference: z.preprocess(absent, mandateReferenceField),
      mandateSignedAt: importDate,

      loginDisabled: importBool(false),
      /**
       * Kein Spaltenname, sondern die Abkürzung für den Regelfall: alle Jahre
       * seit `joinedAt` zum Standardsatz anlegen und als bezahlt markieren.
       * Schließt `fees` aus — beides zusammen wäre widersprüchlich.
       */
      allPaid: importBool(false),
      fees: z.preprocess(absent, z.array(importFeeSchema, { message: "Liste von Beitragsjahren angeben." }).optional()),
    },
    { error: (issue) => (issue.code === "unrecognized_keys" ? `Unbekanntes Feld: ${issue.keys.join(", ")}` : undefined) },
  )
  .superRefine((data, ctx) => {
    if (data.countryCode && !isCountryCode(data.countryCode)) {
      ctx.addIssue({ code: "custom", message: "Land nicht erkannt — ISO-Code wie DE oder CH angeben.", path: ["countryCode"] });
    }
    addBankIssues(data, ctx);
    addPersonIssues(data, ctx);
    if (data.directDebit && !data.iban) {
      ctx.addIssue({ code: "custom", message: "Lastschrift ohne IBAN.", path: ["iban"] });
    }
    // Wie im Antrag: ohne Mandat hat der Verein für Kontodaten keine Verwendung.
    if (!data.directDebit && (data.iban || data.bic || data.accountHolder || data.mandateReference || data.mandateSignedAt)) {
      ctx.addIssue({
        code: "custom",
        message: "Bankdaten ohne Lastschrift — directDebit: true setzen oder die Bankfelder weglassen.",
        path: ["directDebit"],
      });
    }
    if ((asDate(data.mandateSignedAt) ?? 0) > new Date()) {
      ctx.addIssue({ code: "custom", message: "Mandatsdatum liegt in der Zukunft.", path: ["mandateSignedAt"] });
    }
    const joinYear = asDate(data.joinedAt)?.getUTCFullYear();
    data.fees?.forEach((fee, i) => {
      if (joinYear !== undefined && fee.year < joinYear) {
        ctx.addIssue({ code: "custom", message: `Beitrag ${fee.year} liegt vor dem Beitritt (${joinYear}).`, path: ["fees", i, "year"] });
      }
    });
    if (data.allPaid && data.fees) {
      ctx.addIssue({ code: "custom", message: "Entweder allPaid oder fees angeben, nicht beides.", path: ["allPaid"] });
    }
    // Beiträge entstehen nur für ordentliche Mitglieder mit Beitrittsdatum —
    // ohne beides liefe `allPaid` ins Leere, statt aufzufallen.
    if (data.allPaid && (data.status !== "REGULAR_MEMBER" || !data.joinedAt)) {
      ctx.addIssue({
        code: "custom",
        message: "allPaid braucht status REGULAR_MEMBER und ein joinedAt.",
        path: ["allPaid"],
      });
    }
    const years = data.fees?.map((fee) => fee.year) ?? [];
    years.forEach((year, i) => {
      if (years.indexOf(year) !== i) {
        ctx.addIssue({ code: "custom", message: `Beitragsjahr ${year} doppelt.`, path: ["fees", i, "year"] });
      }
    });
    data.fees?.forEach((fee, i) => {
      if (fee.manualAmount && fee.amount === undefined) {
        ctx.addIssue({ code: "custom", message: "manualAmount braucht amount.", path: ["fees", i, "amount"] });
      }
    });
  })
  .transform((data) => ({ ...data, iban: data.iban ? normalizeIban(data.iban) : undefined }));

export type UserImport = z.infer<typeof userImportSchema>;
export type UserImportFee = NonNullable<UserImport["fees"]>[number];

/** Rundmail: Gruppen oder einzeln ausgewählte Nutzer (IDs per FormData getAll) */
export const mailSendSchema = z
  .object({
    target: z.enum(
      ["ALL", "HONORARY_MEMBER", "REGULAR_MEMBER", "NON_MEMBER", "SELECTED"],
      {
        message: "Ungültige Empfänger-Gruppe.",
      },
    ),
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
    /**
     * Angekündigter Termin. Ist er gesetzt, hängt der Versand einen Terminblock
     * mit Eckdaten und Knopf zur Terminseite an die Nachricht — der Text im
     * Editor bleibt davon unberührt.
     */
    eventId: optionalEventId,
    /** Checkbox „Kalenderdatei anhängen“ — wirkt nur zusammen mit `eventId`. */
    attachIcs: z.boolean().default(false),
    /**
     * Pflichtangabe ohne Vorauswahl: ein Newsletter geht nur an Abonnenten und
     * trägt einen Abmeldelink, alles andere an alle und ohne.
     */
    newsletter: z
      .enum(["yes", "no"], { message: "Bitte angeben, ob die Mail ein Newsletter ist." })
      .transform((value) => value === "yes"),
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
  amount: z.coerce.number().min(0),
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
  /** Rückblick auf einen Termin — leer, wenn der Beitrag zu keinem gehört. */
  eventId: optionalEventId,
});

export const blogDeleteSchema = z.object({
  id: z.string().min(1, "Ungültige Beitrags-ID.").max(64),
});

// ─────────────────────────── Termine ───────────────────────────

/**
 * Formularwerte aus `datetime-local` bzw. `date` sind Wandzeit ohne Zeitzone.
 * `new Date(value)` würde sie in der Zeitzone der Laufzeitumgebung lesen — auf
 * dem Server also UTC, und der Termin läge eine bis zwei Stunden daneben.
 */
const berlinDateTime = (message: string) =>
  z
    .string()
    .trim()
    .transform((value) => parseBerlinLocalInput(value))
    .refine((value): value is Date => value !== null, message);

const optionalBerlinDateTime = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value === undefined || value === "" ? null : parseBerlinLocalInput(value)))
  .refine((value) => value === null || value instanceof Date, "Ungültiges Enddatum.");

const optionalUrl = (max: number) =>
  z
    .string()
    .trim()
    .max(max, "Der Link ist zu lang.")
    .default("")
    .refine(
      (value) => value === "" || /^https?:\/\/\S+$/i.test(value),
      "Bitte eine vollständige Adresse angeben, die mit https:// beginnt.",
    );

export const eventSaveSchema = z
  .object({
    id: z.string().min(1, "Ungültige Termin-ID.").max(64),
    title: z
      .string()
      .trim()
      .min(1, "Bitte einen Titel angeben.")
      .max(200, "Titel ist zu lang."),
    summary: z
      .string()
      .trim()
      .max(500, "Die Kurzbeschreibung ist zu lang (max. 500 Zeichen).")
      .default(""),
    description: z.string().max(100_000, "Die Beschreibung ist zu lang.").default(""),
    start: berlinDateTime("Bitte einen gültigen Beginn angeben."),
    end: optionalBerlinDateTime,
    allDay: z.boolean().default(false),
    location: z.string().trim().max(200, "Der Ort ist zu lang.").default(""),
    address: z.string().trim().max(300, "Die Anschrift ist zu lang.").default(""),
    linkUrl: optionalUrl(500),
    linkLabel: z.string().trim().max(80, "Der Linktext ist zu lang.").default(""),
    published: z.boolean().default(false),
  })
  // Ganztägige Termine tragen keine Uhrzeit: was im Formular stehen bleibt,
  // wird hier verworfen, statt später an drei Stellen ignoriert zu werden.
  .transform((data) =>
    data.allDay
      ? {
          ...data,
          start: startOfBerlinDay(data.start),
          end: data.end ? startOfBerlinDay(data.end) : null,
        }
      : data,
  )
  .superRefine((data, ctx) => {
    if (data.end && data.end.getTime() < data.start.getTime()) {
      ctx.addIssue({
        code: "custom",
        message: "Das Ende darf nicht vor dem Beginn liegen.",
        path: ["end"],
      });
    }
  });

export const eventDeleteSchema = z.object({
  id: z.string().min(1, "Ungültige Termin-ID.").max(64),
});


/**
 * Bilder werden immer im Kontext ihres Beitrags angesprochen: die `postId`
 * steht nicht nur der Vollständigkeit halber dabei, sie ist die Zuständigkeits-
 * prüfung. Ohne sie könnte eine erratene Bild-ID ein Bild eines fremden
 * Beitrags treffen.
 */
export const blogImageSchema = z.object({
  postId: z.string().min(1, "Ungültige Beitrags-ID.").max(64),
  imageId: z.string().min(1, "Ungültige Bild-ID.").max(64),
});

export const blogImageMoveSchema = blogImageSchema.extend({
  direction: z.enum(["up", "down"]),
});

export const blogImageAltSchema = blogImageSchema.extend({
  alt: z.string().trim().max(300, "Der Alternativtext ist zu lang."),
});

// ─────────────────────────── Vorstand ───────────────────────────

export const boardSaveSchema = z.object({
  id: z.string().min(1, "Ungültige Mitglieds-ID.").max(64),
  name: z.string().trim().min(1, "Bitte einen Namen angeben.").max(200, "Name ist zu lang."),
  role: z.string().trim().max(200, "Funktion ist zu lang."),
  linkedin: z
    .string()
    .trim()
    .max(500, "LinkedIn-Link ist zu lang.")
    .optional()
    .transform((v) => v ?? "")
    .refine((v) => v === "" || v.startsWith("https://"), {
      message: "Der LinkedIn-Link muss mit https:// beginnen.",
    }),
  published: z.preprocess((v) => v === "on", z.boolean()),
  inSignature: z.preprocess((v) => v === "on", z.boolean()),
});

export const boardDeleteSchema = z.object({
  id: z.string().min(1, "Ungültige Mitglieds-ID.").max(64),
});

export const boardMoveSchema = z.object({
  id: z.string().min(1, "Ungültige Mitglieds-ID.").max(64),
  direction: z.enum(["up", "down"]),
});

export const userUpdateSchema = z
  .object({
    id: z.string().min(1, "Ungültige Benutzer-ID."),

    // Person
    lastName: personName,
    firstName: optionalString(200).refine(
      (v) => v === undefined || !hasControlChars(v),
      "Bitte ohne Zeilenumbrüche oder Steuerzeichen eingeben.",
    ),
    email: emailField,
    title: optionalString(120),
    birthDate: optionalDate(),
    phone: optionalString(50),

    // Anschrift. Das Land kommt aus einer Auswahlliste; Altdaten im Klartext
    // bleiben erlaubt, bis jemand ein Land auswählt.
    addressLine1: optionalString(200),
    addressLine2: optionalString(200),
    postalCode: optionalString(20),
    city: optionalString(120),
    region: optionalString(120),
    countryCode: optionalString(120),

    // Studium & Beruf
    degreeProgram: optionalString(200),
    studyStart: optionalDate(),
    studyEnd: optionalDate(),
    employer: optionalString(200),
    employmentStatus: optionalString(200),
    industry: optionalString(200),
    jobTitle: optionalString(200),
    linkedinUrl: linkedinUrlField,

    // Nur Admins: Zahlung und Verwaltung
    adminNote: optionalString(10_000),
    directDebit: preprocessBoolean,
    accountHolder: optionalString(200),
    iban: optionalString(80),
    bic: optionalString(40),
    mandateReference: mandateReferenceField,
    mandateSignedAt: optionalDate(),
    loginDisabled: preprocessBoolean,
    /** Nur beim Umstellen auf „Kein Mitglied“: warum die Mitgliedschaft endet. */
    terminationReason: optionalEnum([...TERMINATION_REASONS]),

    // Mitglieds- / admin-only fields
    /** Present only for admins; omit or empty for members */
    role: optionalEnum(["ADMIN", "MEMBER"]),
    status: optionalEnum(["REGULAR_MEMBER", "HONORARY_MEMBER", "NON_MEMBER"]),
    memberNumber: z
      .string()
      .optional()
      .refine(
        (v) => v === undefined || v === "" || /^\d+$/.test(String(v)),
        "Mitglieds-ID muss eine gültige nicht-negative Ganzzahl sein."
      ),
  })
  // Bewusst ohne `addPersonIssues`: Profile aus dem alten System tragen teils
  // Altformate (z. B. „D-89073“), und das Profilformular soll sich auch dann
  // speichern lassen, wenn jemand nur die E-Mail korrigiert.
  .superRefine((data, ctx) => addBankIssues(data, ctx))
  .transform((data) => ({
    ...data,
    iban: data.iban ? normalizeIban(data.iban) : data.iban,
  }));

/**
 * Schema für die Bankdaten-Änderung eines Mitglieds über die
 * Zahlungsverwaltung (`/dashboard/zahlungen`). Bewusst getrennt von
 * `userUpdateSchema`: hier entscheidet die `zahlungsweise` — wie im
 * Mitgliedsantrag — ob Bankdaten und die Mandatsbestätigung Pflicht sind.
 * Auf dem Überweisungsweg werden die Bankfelder verworfen: was der Verein
 * nicht braucht, soll er auch nicht speichern.
 */
export const bankUpdateSchema = z
  .object({
    zahlungsweise: z.enum(["lastschrift", "ueberweisung"], {
      message: "Bitte wähle aus, wie du den Beitrag zahlen möchtest.",
    }),
    accountHolder: optionalString(200),
    iban: optionalString(80),
    bic: optionalString(40),
    directDebit: preprocessBoolean,
  })
  .superRefine((data, ctx) => {
    // Auf dem Lastschriftweg gelten dieselben Pflichten wie im Antrag — hier
    // einmal serverseitig, weil der Browser nicht vertrauenswürdig ist.
    if (data.zahlungsweise === "lastschrift") {
      if (!data.accountHolder) {
        ctx.addIssue({ code: "custom", message: "Bitte den Kontoinhaber angeben.", path: ["accountHolder"] });
      }
      addDirectDebitIssues(data, ctx);
    }
  })
  .transform((data) =>
    data.zahlungsweise === "lastschrift"
      ? {
          ...data,
          iban: data.iban ? normalizeIban(data.iban) : null,
          directDebit: data.directDebit ?? false,
        }
      : {
          ...data,
          accountHolder: null,
          iban: null,
          bic: null,
          directDebit: false,
        },
  );
