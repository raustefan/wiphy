import { z } from "zod";
import { normalizeEmail } from "@/lib/server/normalizeEmail";
import { isValidBic, isValidIban, normalizeIban } from "@/lib/iban";
import { parseBerlinLocalInput, startOfBerlinDay } from "@/lib/berlinTime";
import { birthDateField } from "@/lib/membershipFormSchemas";

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
  email: emailField,
  password: z
    .string()
    .min(8, "Passwort muss mindestens 8 Zeichen haben.")
    .max(128, "Passwort ist zu lang."),
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
 * Öffentliche Registrierung: `registerSchema` plus Bot-Abwehr.
 *
 * Bewusst *nicht* in `registerSchema` selbst — sonst erbt
 * `adminCreateUserSchema` die Sicherheitsfrage, und ein Admin müsste sie beim
 * Anlegen eines Kontos mitbeantworten.
 */
export const registerFormSchema = registerSchema.extend({
  // Beitreten kann nur, wer volljährig ist — das soll nicht erst im Antrag auffallen.
  geburtsdatum: birthDateField,
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

export const adminCreateUserSchema = registerSchema.extend({
  role: roleEnum.default("MEMBER"),
  status: statusEnum.default("KEIN_MITGLIED"),
});

/** Rundmail: Gruppen oder einzeln ausgewählte Nutzer (IDs per FormData getAll) */
export const mailSendSchema = z
  .object({
    target: z.enum(
      ["ALL", "EHRENMITGLIED", "ORDENTLICHES_MITGLIED", "KEIN_MITGLIED", "SELECTED"],
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
    onlineUrl: optionalUrl(500),
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

    // basic
    name: z
      .string()
      .trim()
      .min(1, "Bitte einen Namen angeben.")
      .max(200, "Name ist zu lang."),
    vorname: optionalString(200),
    email: emailField,
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
    loginDisabled: preprocessBoolean,

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
  })
  .superRefine((data, ctx) => {
    if (data.IBAN && !isValidIban(normalizeIban(data.IBAN))) {
      ctx.addIssue({
        code: "custom",
        message: "Diese IBAN ist ungültig. Bitte prüfe die Eingabe.",
        path: ["IBAN"],
      });
    }
    if (data.BIC && !isValidBic(data.BIC)) {
      ctx.addIssue({
        code: "custom",
        message: "Dieser BIC ist ungültig (8 oder 11 Zeichen).",
        path: ["BIC"],
      });
    }
  })
  .transform((data) => ({
    ...data,
    IBAN: data.IBAN ? normalizeIban(data.IBAN) : data.IBAN,
  }));

export type UserUpdateParsed = z.infer<typeof userUpdateSchema>;

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
    IBAN: optionalString(80),
    BIC: optionalString(40),
    bank: optionalString(200),
    BLZ: optionalString(50),
    KTO: optionalString(50),
    bankeinzug: preprocessBoolean,
  })
  .superRefine((data, ctx) => {
    // Auf dem Lastschriftweg gelten dieselben Pflichten wie im Antrag — hier
    // einmal serverseitig, weil der Browser nicht vertrauenswürdig ist.
    if (data.zahlungsweise === "lastschrift") {
      if (!data.IBAN || !isValidIban(normalizeIban(data.IBAN))) {
        ctx.addIssue({
          code: "custom",
          message: "Diese IBAN ist ungültig. Bitte prüfe deine Eingabe.",
          path: ["IBAN"],
        });
      }
      if (data.BIC && !isValidBic(data.BIC)) {
        ctx.addIssue({
          code: "custom",
          message: "Dieser BIC ist ungültig (8 oder 11 Zeichen).",
          path: ["BIC"],
        });
      }
      if (!data.bankeinzug) {
        ctx.addIssue({
          code: "custom",
          message: "Bitte bestätige das SEPA-Lastschriftmandat, um fortzufahren.",
          path: ["bankeinzug"],
        });
      }
    }
  })
  .transform((data) =>
    data.zahlungsweise === "lastschrift"
      ? {
          ...data,
          IBAN: data.IBAN ? normalizeIban(data.IBAN) : null,
          bankeinzug: data.bankeinzug ?? false,
        }
      : {
          ...data,
          IBAN: null,
          BIC: null,
          bank: null,
          BLZ: null,
          KTO: null,
          bankeinzug: false,
        },
  );

export type BankUpdateParsed = z.infer<typeof bankUpdateSchema>;
