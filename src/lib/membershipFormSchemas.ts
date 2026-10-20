/**
 * Formular-Schemas des Aufnahmeantrags.
 *
 * Bewusst außerhalb von `lib/server`: der Wizard prüft damit jeden Schritt
 * direkt im Browser, bevor er weiterblättert. Diese Datei darf deshalb nie
 * etwas Serverseitiges importieren.
 */

import { z } from "zod";
import { isSepaIban, isValidBic, isValidIban, normalizeIban, requiresBic } from "@/lib/iban";
import { isCountryCode } from "@/lib/countries";
import { hasControlChars, isPlausibleBirthDate, isValidPhone, isValidPostalCode } from "@/lib/inputRules";
import {
  MINOR_HINT,
  STUDENT_YEAR_LOOKAHEAD,
  isOldEnough,
} from "@/lib/membership";

const CONTROL_CHARS = "Bitte ohne Zeilenumbrüche oder Steuerzeichen eingeben.";

const required = (max: number, label: string) =>
  z
    .string()
    .trim()
    .min(1, `Bitte ${label} angeben.`)
    .max(max, `${label.charAt(0).toUpperCase()}${label.slice(1)} ist zu lang.`)
    .refine((v) => !hasControlChars(v), CONTROL_CHARS);

const optional = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
    .refine((v) => v === undefined || !hasControlChars(v), CONTROL_CHARS)
    .transform((v) => (v === undefined || v.trim() === "" ? null : v.trim()));

const optionalDate = z.preprocess(
  (v) => (v === undefined || v === null || String(v).trim() === "" ? undefined : v),
  z.coerce.date().optional(),
).transform((v) => v ?? null);

const checkedBox = z
  .string()
  .optional()
  .transform((v) => v === "on" || v === "true")
  .pipe(z.literal(true, { message: "Bitte bestätige diesen Punkt, um fortzufahren." }));

/** Auch die Registrierung fragt es schon ab — der Antrag übernimmt es dann vom Konto. */
export const birthDateField = z.coerce
  .date({ message: "Bitte ein gültiges Geburtsdatum angeben." })
  .refine((d) => d <= new Date(), "Das Geburtsdatum kann nicht in der Zukunft liegen.")
  .refine((d) => isPlausibleBirthDate(d), "Bitte ein gültiges Geburtsdatum angeben.")
  .refine((d) => isOldEnough(d), MINOR_HINT);

/** Die Steps validieren im Wizard einzeln; der Server prüft immer alles zusammen. */
export const applicationPersonSchema = z.object({
  firstName: required(200, "einen Vornamen"),
  lastName: required(200, "einen Nachnamen"),
  title: optional(120),
  birthDate: birthDateField,
  addressLine1: required(200, "eine Straße und Hausnummer"),
  addressLine2: optional(200),
  // Nicht jedes Land hat Postleitzahlen — Pflicht nur für Deutschland, siehe `addAddressIssues`.
  postalCode: optional(20),
  city: required(120, "einen Ort"),
  region: optional(120),
  countryCode: z.string().trim().refine(isCountryCode, "Bitte ein Land auswählen."),
  phone: optional(50).refine(
    (v) => v === null || isValidPhone(v),
    "Bitte eine Telefonnummer aus Ziffern angeben, z. B. +49 731 123456.",
  ),
});

/** Feldübergreifende Adressprüfung; als `superRefine`, weil sie das Land kennen muss. */
export function addAddressIssues(
  data: { countryCode: string; postalCode: string | null },
  ctx: z.RefinementCtx,
) {
  if (data.countryCode === "DE" && !data.postalCode) {
    ctx.addIssue({ code: "custom", message: "Bitte eine Postleitzahl angeben.", path: ["postalCode"] });
  } else if (data.postalCode && !isValidPostalCode(data.countryCode, data.postalCode)) {
    ctx.addIssue({
      code: "custom",
      message: "Diese Postleitzahl passt nicht zum gewählten Land.",
      path: ["postalCode"],
    });
  }
}

/** Der Personenschritt im Wizard — mit derselben Adressprüfung wie beim Absenden. */
export const applicationPersonStepSchema = applicationPersonSchema.superRefine(addAddressIssues);

export const applicationStudySchema = z.object({
  degreeProgram: optional(200),
  studyStart: optionalDate,
  studyEnd: optionalDate,
  employer: optional(200),
  employmentStatus: optional(200),
  industry: optional(200),
  jobTitle: optional(200),
});

/**
 * Wie der Beitrag bezahlt wird. Eigener Schritt im Antrag, damit die
 * Entscheidung bewusst fällt und nicht nebenbei beim Ausfüllen der Bankdaten.
 */
export const PAYMENT_METHODS = ["lastschrift", "ueberweisung"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const applicationPaymentSchema = z.object({
  zahlungsweise: z.enum(PAYMENT_METHODS, {
    message: "Bitte wähle aus, wie du den Beitrag zahlen möchtest.",
  }),
});

/**
 * Bankdaten — nur auf dem Lastschriftweg. Ohne Mandat zieht der Verein nichts
 * ein und hat für die Kontodaten keine Verwendung; der Antrag fragt sie dann
 * gar nicht erst ab.
 */
export const applicationBankSchema = z
  .object({
    accountHolder: required(200, "den Kontoinhaber"),
    iban: z.string().trim().min(1, "Bitte eine IBAN angeben.").transform(normalizeIban),
    bic: optional(40),
    directDebit: checkedBox,
  })
  .superRefine(addDirectDebitIssues);

/**
 * Dieselben Felder, aber ohne Pflicht: Für das Gesamtschema hängt es von der
 * Zahlungsweise ab, ob sie ausgefüllt sein müssen — das entscheidet das
 * `superRefine` weiter unten, nicht das Feld für sich.
 */
const bankFieldsOptional = z.object({
  accountHolder: optional(200),
  iban: optional(80),
  bic: optional(40),
  directDebit: z
    .string()
    .optional()
    .transform((v) => v === "on" || v === "true"),
});

/**
 * Lastschrift-Pflichten: gültige IBAN aus dem SEPA-Raum, BIC bei Konten
 * außerhalb des EWR, erteiltes Mandat. Geteilt mit der Bankdaten-Änderung in
 * der Zahlungsverwaltung.
 */
export function addDirectDebitIssues(
  data: { iban?: string | null; bic?: string | null; directDebit?: boolean | null },
  ctx: z.RefinementCtx,
) {
  if (!data.iban || !isValidIban(data.iban)) {
    ctx.addIssue({
      code: "custom",
      message: "Diese IBAN ist ungültig. Bitte prüfe deine Eingabe.",
      path: ["iban"],
    });
  } else if (!isSepaIban(data.iban)) {
    ctx.addIssue({
      code: "custom",
      message: "Lastschriften sind nur von Konten im SEPA-Raum möglich. Bitte wähle Überweisung.",
      path: ["iban"],
    });
  } else if (requiresBic(data.iban) && !data.bic) {
    ctx.addIssue({
      code: "custom",
      message: "Für Konten außerhalb des EWR ist der BIC Pflicht.",
      path: ["bic"],
    });
  }
  if (data.bic && !isValidBic(data.bic)) {
    ctx.addIssue({
      code: "custom",
      message: "Dieser BIC ist ungültig (8 oder 11 Zeichen).",
      path: ["bic"],
    });
  }
  if (!data.directDebit) {
    ctx.addIssue({
      code: "custom",
      message: "Bitte bestätige das SEPA-Lastschriftmandat, um fortzufahren.",
      path: ["directDebit"],
    });
  }
}

/**
 * Gesamtschema für das Absenden. `studentYears` kommt über `getAll` als Array
 * und wird deshalb außerhalb von `parseFormData` eingespeist.
 */
export const membershipApplicationSchema = applicationPersonSchema
  .extend(applicationStudySchema.shape)
  .extend(applicationPaymentSchema.shape)
  .extend(bankFieldsOptional.shape)
  .extend({
    studentYears: z.array(z.coerce.number().int()).default([]),
    bylawsAccepted: checkedBox,
    privacyAccepted: checkedBox,
  })
  .superRefine((data, ctx) => {
    addAddressIssues(data, ctx);

    // Auf dem Lastschriftweg gelten dieselben Pflichten wie im Schrittschema —
    // hier noch einmal, weil der Server dem Browser nicht glaubt.
    if (data.zahlungsweise === "lastschrift") {
      if (!data.accountHolder) {
        ctx.addIssue({
          code: "custom",
          message: "Bitte den Kontoinhaber angeben.",
          path: ["accountHolder"],
        });
      }
      addDirectDebitIssues(data, ctx);
    }

    if (data.studyStart && data.studyEnd && data.studyEnd < data.studyStart) {
      ctx.addIssue({
        code: "custom",
        message: "Das Studienende kann nicht vor dem Studienbeginn liegen.",
        path: ["studyEnd"],
      });
    }

    // Der Client bietet nur das laufende Jahr bis +STUDENT_YEAR_LOOKAHEAD an;
    // hier wird derselbe Rahmen serverseitig erzwungen, damit niemand sich per
    // manipuliertem Request eine Ermäßigung für 30 Jahre einträgt.
    const currentYear = new Date().getFullYear();
    const outOfRange = data.studentYears.some(
      (year) => year < currentYear || year > currentYear + STUDENT_YEAR_LOOKAHEAD,
    );
    if (outOfRange) {
      ctx.addIssue({
        code: "custom",
        message: "Ungültiges Studienjahr ausgewählt.",
        path: ["studentYears"],
      });
    }
  })
  /*
   * Ohne Mandat werden die Bankfelder verworfen, statt sie nur zu ignorieren:
   * Der Wizard behält alle Schritte im DOM, eine vorher eingetippte IBAN wird
   * also mitgeschickt, auch wenn der Weg danach auf „Überweisung“ gewechselt
   * hat. Was der Verein nicht braucht, soll er auch nicht speichern.
   */
  .transform((data) =>
    data.zahlungsweise === "lastschrift"
      ? { ...data, iban: data.iban ? normalizeIban(data.iban) : null }
      : { ...data, accountHolder: null, iban: null, bic: null, directDebit: false },
  );

