/**
 * The single place email addresses are canonicalized.
 *
 * `User.email` is a case-sensitive unique column, so every write and every
 * lookup has to agree on one form. Use this on both sides — a mismatch means
 * users can register but never log in or reset their password.
 */
export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}
