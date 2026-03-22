import type { z } from "zod";
import { ZodError } from "zod";
import { AppError } from "@/lib/server/errors";

function zodMessage(error: ZodError): string {
  const first = error.issues[0];
  if (first?.message) return first.message;
  return "Validierung fehlgeschlagen.";
}

/**
 * Parse and validate FormData with a Zod schema.
 * Throws AppError VALIDATION_ERROR on failure.
 */
export function parseFormData<T extends z.ZodTypeAny>(
  schema: T,
  formData: FormData,
): z.infer<T> {
  const raw: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      raw[key] = value;
    }
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    throw new AppError("VALIDATION_ERROR", zodMessage(result.error));
  }
  return result.data;
}
