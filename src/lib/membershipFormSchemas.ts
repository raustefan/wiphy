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

/** Die Steps validieren im Wizard einzeln; der Server prüft immer alles zusammen. */
export const applicationPersonSchema = z.object({
  vorname: required(200, "einen Vornamen"),
  name: required(200, "einen Nachnamen"),
  titel: optional(120),
  geburtsdatum: z.coerce
    .date({ message: "Bitte ein gültiges Geburtsdatum angeben." })
    .refine((d) => d <= new Date(), "Das Geburtsdatum kann nicht in der Zukunft liegen.")
    .refine((d) => isOldEnough(d), MINOR_HINT),
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
 * Gesamtschema für das Absenden. `studentYears` kommt über `getAll` als Array
 * und wird deshalb außerhalb von `parseFormData` eingespeist.
 */
export const membershipApplicationSchema = applicationPersonSchema
  .extend(applicationStudySchema.shape)
  .extend(applicationBankSchema.shape)
  .extend({
    studentYears: z.array(z.coerce.number().int()).default([]),
    satzungAccepted: checkedBox,
    datenschutzAccepted: checkedBox,
  })
  .superRefine((data, ctx) => {
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
  });

