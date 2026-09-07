import { prisma } from "@/lib/prisma";
import { deleteUserById } from "@/lib/server/repositories/userRepository";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { logSecurityEvent } from "@/lib/server/securityLog";

/**
 * Automatisches Löschen unbestätigter Selbstregistrierungen.
 *
 * Hintergrund ist Spam: das Registrierungsformular ist öffentlich, und ein
 * Konto, dessen Adresse nie bestätigt wurde, ist entweder ein Tippfehler oder
 * ein Bot. Beides soll nicht dauerhaft in der Nutzertabelle stehen — es
 * blockiert die Adresse für eine echte Anmeldung und ist Datenhaltung ohne
 * Zweck (Art. 5 Abs. 1 lit. e DSGVO).
 *
 * Betroffen sind ausschließlich Konten mit gesetztem
 * `registrationPendingSince`, also nur solche, die sich nach Einführung dieser
 * Regel selbst registriert haben. Von Admins angelegte Konten und der
 * Altbestand tragen NULL und bleiben unangetastet — dort ist eine unbestätigte
 * Adresse ein Migrationsstand, kein Spamverdacht.
 */

/**
 * Frist bis zur Löschung. Identisch mit der Gültigkeit des Bestätigungslinks
 * aus der Registrierung: nach dessen Ablauf ist das Konto ohnehin nicht mehr
 * aktivierbar, ein längeres Behalten hätte also keinen Nutzen mehr.
 */
export const UNVERIFIED_TTL_HOURS = 24;

/**
 * Obergrenze je Durchlauf. Ein Spam-Schwall soll nicht dazu führen, dass eine
 * einzelne Anfrage tausende Löschungen abarbeitet; der Rest kommt beim
 * nächsten Lauf dran.
 */
const MAX_PER_RUN = 100;

/** Höchstens alle 15 Minuten aufräumen — häufiger wäre reine DB-Last. */
const RUN_INTERVAL_MS = 15 * 60 * 1000;

let lastRunAt = 0;

/**
 * Löscht abgelaufene, unbestätigte Registrierungen und protokolliert jede
 * Löschung als `REGISTRATION_EXPIRED`.
 *
 * Läuft huckepack auf den Anfragen, die ohnehin mit Registrierungen zu tun
 * haben (Registrierung, Bestätigungslink, Sicherheitsseite) — dasselbe Muster
 * wie `pruneSecurityEvents()`, damit die Frist auch ohne Cron-Job greift. Die
 * Drossel oben sorgt dafür, dass das je Anfrage bestenfalls eine indizierte
 * Abfrage kostet.
 *
 * Fehler werden geschluckt: ein hängender Aufräumlauf darf keine Registrierung
 * und keine Bestätigung scheitern lassen.
 */
export async function pruneUnverifiedRegistrations(force = false): Promise<number> {
  const now = Date.now();
  if (!force && now - lastRunAt < RUN_INTERVAL_MS) {
    return 0;
  }
  lastRunAt = now;

  try {
    // Wer die Bestätigung abgeschaltet hat, darf niemanden dafür löschen, dass
    // er sie nicht durchführen konnte. Der eigene Schalter erlaubt es
    // zusätzlich, das Aufräumen allein anzuhalten — etwa während der Klärung
    // eines Vorfalls.
    if (!(await isFeatureEnabled("REGISTRATION_CLEANUP"))) return 0;
    if (!(await isFeatureEnabled("EMAIL_VERIFICATION"))) return 0;

    const cutoff = new Date(now - UNVERIFIED_TTL_HOURS * 60 * 60 * 1000);

    const expired = await prisma.user.findMany({
      where: {
        emailVerified: false,
        registrationPendingSince: { not: null, lt: cutoff },
      },
      select: { id: true },
      take: MAX_PER_RUN,
    });

    let deleted = 0;
    for (const user of expired) {
      try {
        // `EmailVerificationToken` hängt nicht am Fremdschlüssel und bliebe
        // sonst als verwaiste Zeile mit der E-Mail-Adresse im Klartext zurück.
        await prisma.emailVerificationToken.deleteMany({ where: { userId: user.id } });
        await deleteUserById(user.id);
        deleted += 1;
      } catch (error) {
        // Zwei Anfragen können denselben Kandidaten gleichzeitig aufgreifen —
        // dann hat der andere Lauf ihn bereits gelöscht. Kein Grund, den Rest
        // der Liste liegen zu lassen.
        console.error("Failed to delete unverified registration:", error);
        continue;
      }

      // Erst nach der Löschung und bewusst ohne Konto- oder Adressbezug: das
      // Konto gibt es nicht mehr, übrig bleiben soll nur der Zähler. Ein
      // `userId` würde im nächsten Schritt ohnehin auf NULL gesetzt.
      await logSecurityEvent({
        type: "REGISTRATION_EXPIRED",
        outcome: "BLOCKED",
        reason: "unverified_expired",
      });
    }

    return deleted;
  } catch (error) {
    console.error("Failed to prune unverified registrations:", error);
    return 0;
  }
}

export type PendingRegistrationStats = {
  /** Konten, die auf ihre Bestätigung warten und in die Frist laufen. */
  pending: number;
  /** Fälligkeit des ältesten davon — der nächste Löschzeitpunkt. */
  nextDeletionAt: Date | null;
  /** Spiegelt das Feature-Flag: aus heißt, die Frist läuft zurzeit nicht. */
  enabled: boolean;
};

/** Kennzahlen der offenen Frist für das Sicherheitsdashboard. */
export async function getPendingRegistrationStats(): Promise<PendingRegistrationStats> {
  const [pending, oldest, enabled] = await Promise.all([
    prisma.user.count({
      where: { emailVerified: false, registrationPendingSince: { not: null } },
    }),
    prisma.user.findFirst({
      where: { emailVerified: false, registrationPendingSince: { not: null } },
      orderBy: { registrationPendingSince: "asc" },
      select: { registrationPendingSince: true },
    }),
    isFeatureEnabled("REGISTRATION_CLEANUP"),
  ]);

  const since = oldest?.registrationPendingSince ?? null;

  return {
    pending,
    nextDeletionAt: since
      ? new Date(since.getTime() + UNVERIFIED_TTL_HOURS * 60 * 60 * 1000)
      : null,
    enabled,
  };
}
