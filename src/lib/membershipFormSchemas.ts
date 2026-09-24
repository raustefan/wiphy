/**
 * Formular-Schemas des Aufnahmeantrags.
 *
 * Bewusst außerhalb von `lib/server`: der Wizard prüft damit jeden Schritt
 * direkt im Browser, bevor er weiterblättert. Diese Datei darf deshalb nie
 * etwas Serverseitiges importieren.
 */

import { z } from "zod";
import { isValidBic, isValidIban, normalizeIban } from "@/lib/iban";
import {
  MINOR_HINT,
  STUDENT_YEAR_LOOKAHEAD,
  isOldEnough,
} from "@/lib/membership";

const required = (max: number, label: string) =>
  z
    .string()
    .trim()
    .min(1, `Bitte ${label} angeben.`)
    .max(max, `${label.charAt(0).toUpperCase()}${label.slice(1)} ist zu lang.`);

const optional = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
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
  .refine((d) => isOldEnough(d), MINOR_HINT);

/** Die Steps validieren im Wizard einzeln; der Server prüft immer alles zusammen. */
export const applicationPersonSchema = z.object({
  vorname: required(200, "einen Vornamen"),
  name: required(200, "einen Nachnamen"),
  titel: optional(120),
  geburtsdatum: birthDateField,
  strasse: required(200, "eine Straße und Hausnummer"),
  plz: required(20, "eine Postleitzahl"),
  stadt: required(120, "einen Ort"),
  land: required(120, "ein Land"),
  telefon: optional(50),
});

export const applicationStudySchema = z.object({
  studiengang: optional(200),
  studienbeginn: optionalDate,
  studienende: optionalDate,
  arbeitgeber: optional(200),
  berufsstand: optional(200),
  berufszweig: optional(200),
  position: optional(200),
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
export const applicationBankSchema = z.object({
  kontoinhaber: required(200, "den Kontoinhaber"),
  IBAN: z
    .string()
    .trim()
    .min(1, "Bitte eine IBAN angeben.")
    .transform(normalizeIban)
    .refine(isValidIban, "Diese IBAN ist ungültig. Bitte prüfe deine Eingabe."),
  // Für SEPA-Inlandslastschriften nicht erforderlich, deshalb optional.
  BIC: optional(40).refine(
    (v) => v === null || isValidBic(v),
    "Dieser BIC ist ungültig (8 oder 11 Zeichen).",
  ),
  bank: optional(200),
  bankeinzug: checkedBox,
});

/**
 * Dieselben Felder, aber ohne Pflicht: Für das Gesamtschema hängt es von der
 * Zahlungsweise ab, ob sie ausgefüllt sein müssen — das entscheidet das
 * `superRefine` weiter unten, nicht das Feld für sich.
 */
const bankFieldsOptional = z.object({
  kontoinhaber: optional(200),
  IBAN: optional(80),
  BIC: optional(40),
  bank: optional(200),
  bankeinzug: z
    .string()
    .optional()
    .transform((v) => v === "on" || v === "true"),
});

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
    satzungAccepted: checkedBox,
    datenschutzAccepted: checkedBox,
  })
  .superRefine((data, ctx) => {
    // Auf dem Lastschriftweg gelten dieselben Pflichten wie im Schrittschema —
    // hier noch einmal, weil der Server dem Browser nicht glaubt.
    if (data.zahlungsweise === "lastschrift") {
      if (!data.kontoinhaber) {
        ctx.addIssue({
          code: "custom",
          message: "Bitte den Kontoinhaber angeben.",
          path: ["kontoinhaber"],
        });
      }
      if (!data.IBAN || !isValidIban(data.IBAN)) {
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

    if (data.studienbeginn && data.studienende && data.studienende < data.studienbeginn) {
      ctx.addIssue({
        code: "custom",
        message: "Das Studienende kann nicht vor dem Studienbeginn liegen.",
        path: ["studienende"],
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
      ? { ...data, IBAN: data.IBAN ? normalizeIban(data.IBAN) : null }
      : { ...data, kontoinhaber: null, IBAN: null, BIC: null, bank: null, bankeinzug: false },
  );

