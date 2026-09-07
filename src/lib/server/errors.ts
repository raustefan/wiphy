import { ZodError } from "zod";
import { isRedirectError } from "@/lib/redirectError";

export type AppErrorCode =
  | "VALIDATION_ERROR"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "TOO_MANY_REQUESTS"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  code: AppErrorCode;

  constructor(code: AppErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = "AppError";
  }
}

export type ActionResult<T = void> =
  | { ok: true; data?: T }
  | { ok: false; code: AppErrorCode; message: string };

export function mapErrorToActionResult(error: unknown): ActionResult {
  if (error instanceof AppError) {
    return { ok: false, code: error.code, message: error.message };
  }

  if (error instanceof ZodError) {
    const msg = error.issues[0]?.message ?? "Validierung fehlgeschlagen.";
    return { ok: false, code: "VALIDATION_ERROR", message: msg };
  }

  return {
    ok: false,
    code: "INTERNAL_ERROR",
    message: "Es ist ein unerwarteter Fehler aufgetreten.",
  };
}

export async function executeAction<T>(action: () => Promise<T>): Promise<ActionResult<T>> {
  try {
    const data = await action();
    return { ok: true, data };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return mapErrorToActionResult(error) as ActionResult<T>;
  }
}
