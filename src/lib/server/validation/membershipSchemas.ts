import { z } from "zod";
import { membershipApplicationSchema } from "@/lib/membershipFormSchemas";

export {
  applicationBankSchema,
  applicationPersonSchema,
  applicationStudySchema,
  membershipApplicationSchema,
} from "@/lib/membershipFormSchemas";

const optionalNote = z
  .string()
  .max(5000)
  .optional()
  .transform((v) => (v === undefined || v.trim() === "" ? null : v.trim()));

export type MembershipApplicationInput = z.infer<typeof membershipApplicationSchema>;

export const applicationDecisionSchema = z.object({
  id: z.string().min(1, "Ungültiger Antrag."),
  // Beschlussdatum des Vorstands — die Mitgliedschaft beginnt hier, nicht mit
  // dem Absenden des Formulars.
  aufnahmedatum: z.coerce.date({ message: "Bitte ein gültiges Beschlussdatum angeben." }),
  note: optionalNote,
});

export const applicationRejectSchema = z.object({
  id: z.string().min(1, "Ungültiger Antrag."),
  note: optionalNote,
});

export const applicationIdSchema = z.object({
  id: z.string().min(1, "Ungültiger Antrag."),
});

export const feeDefaultSchema = z.object({
  jahr: z.coerce.number().int().min(2000).max(2100),
  regular: z.coerce.number().min(0, "Der Beitrag darf nicht negativ sein.").max(100_000),
  student: z.coerce.number().min(0, "Der Beitrag darf nicht negativ sein.").max(100_000),
});
