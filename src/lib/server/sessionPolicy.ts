/**
 * Harte Obergrenze für Admin-Sitzungen, gerechnet ab dem Login. Das
 * Session-Cookie selbst verlängert sich bei jeder Nutzung (30 Tage Leerlauf);
 * ein gestohlenes Admin-Cookie soll aber nicht wochenlang weiterleben.
 */
export const ADMIN_SESSION_MAX_MS = 12 * 60 * 60 * 1000;

/** Fehlt der Login-Zeitpunkt (Token von vor dieser Regel), gilt die Sitzung als abgelaufen. */
export function adminSessionExpired(role: string, loginAt: unknown, now = Date.now()): boolean {
    if (role !== "ADMIN") return false;
    return typeof loginAt !== "number" || now - loginAt > ADMIN_SESSION_MAX_MS;
}
