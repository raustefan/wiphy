import type { FeatureFlagKey } from "@prisma/client";

export const FEATURE_FLAG_ORDER: FeatureFlagKey[] = [
  "LOGIN",
  "PASSWORD_RESET",
  "REGISTRATION",
  "EMAIL_CHANGE",
  "PROFILE_EDIT",
  "FEE_CHANGES",
  "MAIL_SERVICES",
  "USER_CREATION",
  "USER_DELETION",
  "BLOG_MANAGEMENT",
  "EMAIL_VERIFICATION",
];

export const FEATURE_FLAG_LABELS: Record<FeatureFlagKey, string> = {
  LOGIN: "Login",
  PASSWORD_RESET: "Passwort zurücksetzen",
  REGISTRATION: "Registrierung",
  EMAIL_CHANGE: "E-Mail-Änderung",
  PROFILE_EDIT: "Profil bearbeiten",
  FEE_CHANGES: "Beitragsänderungen",
  MAIL_SERVICES: "Mail-Versand",
  USER_CREATION: "Nutzer anlegen",
  USER_DELETION: "Nutzer löschen",
  BLOG_MANAGEMENT: "Blog-Verwaltung",
  EMAIL_VERIFICATION: "E-Mail-Verifizierung",
};

export const FEATURE_FLAG_DESCRIPTIONS: Record<FeatureFlagKey, string> = {
  LOGIN: "Erlaubt Mitgliedern das Einloggen in den Mitgliederbereich.",
  PASSWORD_RESET: "Erlaubt das Zurücksetzen des Passworts per E-Mail.",
  REGISTRATION: "Erlaubt die Registrierung neuer Mitglieder.",
  EMAIL_CHANGE: "Erlaubt Mitgliedern, ihre hinterlegte E-Mail-Adresse zu ändern.",
  PROFILE_EDIT: "Erlaubt das Bearbeiten von Profildaten (durch Mitglieder und Admins).",
  FEE_CHANGES: "Erlaubt Admins, Mitgliedsbeiträge zu ändern.",
  MAIL_SERVICES: "Erlaubt den Versand von Rundmails/E-Mails an Mitglieder.",
  USER_CREATION: "Erlaubt Admins, neue Benutzerkonten manuell anzulegen.",
  USER_DELETION: "Erlaubt Admins, Benutzerkonten unwiderruflich zu löschen.",
  BLOG_MANAGEMENT: "Erlaubt Admins, Blogbeiträge zu erstellen, zu bearbeiten oder zu löschen.",
  EMAIL_VERIFICATION: "Erlaubt Nutzern, ihre E-Mail-Adresse über den Bestätigungslink zu verifizieren.",
};

export function isFeatureFlagKey(value: string | null): value is FeatureFlagKey {
  return !!value && (FEATURE_FLAG_ORDER as string[]).includes(value);
}
