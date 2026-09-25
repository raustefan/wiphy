import { createHash, randomBytes } from "crypto";

/**
 * Einmal-Links (Passwort-Reset, E-Mail-Bestätigung): In der Datenbank steht nur
 * der SHA-256 des Tokens, der Klartext existiert ausschließlich im Link. Wer
 * die Tabelle oder ein Backup liest, kann damit kein Passwort zurücksetzen.
 * Ein einfacher Hash genügt, weil der Token 256 Bit Zufall trägt — anders als
 * ein Passwort lässt er sich nicht erraten.
 */
export function hashToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
}

/** `token` gehört in den Link, `hash` in die Datenbank. */
export function newToken(): { token: string; hash: string } {
    const token = randomBytes(32).toString("hex");
    return { token, hash: hashToken(token) };
}
