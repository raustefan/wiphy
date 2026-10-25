import type { FeatureFlagKey } from "@prisma/client";

/** Gruppierung auf /dashboard/feature-flags; jeder Schlüssel steht in genau einer Kategorie. */
export const FEATURE_FLAG_CATEGORIES: { title: string; keys: FeatureFlagKey[] }[] = [
  {
    title: "E-Mail",
    keys: ["EMAIL_DELIVERY", "MAIL_SERVICES"],
  },
  {
    title: "Konto & Anmeldung",
    keys: [
      "LOGIN",
      "REGISTRATION",
      "EMAIL_VERIFICATION",
      "REGISTRATION_CLEANUP",
      "PASSWORD_RESET",
      "EMAIL_CHANGE",
      "PROFILE_EDIT",
      "ACCOUNT_NOTICE_MAIL",
    ],
  },
  {
    title: "Mitgliedschaft",
    keys: [
      "MEMBERSHIP_APPLICATION",
      "MEMBERSHIP_APPLICATION_MAIL",
      "MEMBERSHIP_APPLICATION_CONFIRMATION_MAIL",
      "MEMBERSHIP_TERMINATION",
      "MEMBERSHIP_TERMINATION_MAIL",
      "MEMBERSHIP_TERMINATION_CONFIRMATION_MAIL",
    ],
  },
  {
    title: "Öffentliche Seiten",
    keys: ["PAGE_TERMINE", "PAGE_BLOG", "PAGE_GESCHICHTE", "PAGE_VORSTAND", "PAGE_SATZUNG"],
  },
  {
    title: "Mitgliederbereich",
    keys: ["KOSMOS", "PDF_DOCUMENTS"],
  },
  {
    title: "Kontaktformular",
    keys: ["CONTACT_FORM", "CONTACT_FORM_MAIL", "CONTACT_FORM_STORAGE"],
  },
  {
    title: "Verwaltung",
    keys: [
      "USER_CREATION",
      "USER_DELETION",
      "FEE_CHANGES",
      "BLOG_MANAGEMENT",
      "EVENT_MANAGEMENT",
      "BOARD_MANAGEMENT",
    ],
  },
];

export const FEATURE_FLAG_ORDER: FeatureFlagKey[] = FEATURE_FLAG_CATEGORIES.flatMap((c) => c.keys);

export const FEATURE_FLAG_LABELS: Record<FeatureFlagKey, string> = {
  LOGIN: "Login",
  PASSWORD_RESET: "Passwort zurücksetzen",
  REGISTRATION: "Registrierung",
  EMAIL_CHANGE: "E-Mail-Änderung",
  PROFILE_EDIT: "Profil bearbeiten",
  FEE_CHANGES: "Beitragsänderungen",
  MAIL_SERVICES: "Mail-Versand an Mitglieder",
  USER_CREATION: "Nutzer anlegen",
  USER_DELETION: "Nutzer löschen",
  BLOG_MANAGEMENT: "Blog-Verwaltung",
  EMAIL_VERIFICATION: "E-Mail-Verifizierung",
  CONTACT_FORM: "Kontaktformular",
  CONTACT_FORM_MAIL: "Kontaktformular: Benachrichtigung per Mail",
  CONTACT_FORM_STORAGE: "Kontaktformular: Speicherung in der Datenbank",
  MEMBERSHIP_APPLICATION: "Mitgliedsantrag",
  MEMBERSHIP_APPLICATION_MAIL: "Mitgliedsantrag: Benachrichtigung an Admins",
  MEMBERSHIP_APPLICATION_CONFIRMATION_MAIL: "Mitgliedsantrag: Eingangsbestätigung",
  MEMBERSHIP_TERMINATION: "Mitgliedschaft kündigen",
  MEMBERSHIP_TERMINATION_MAIL: "Kündigung: Benachrichtigung an Admins",
  MEMBERSHIP_TERMINATION_CONFIRMATION_MAIL: "Kündigung: Mails an das Mitglied",
  ACCOUNT_NOTICE_MAIL: "Konto: Mail bei Sperrung oder Löschung",
  REGISTRATION_CLEANUP: "Registrierung: unbestätigte Konten löschen",
  EVENT_MANAGEMENT: "Termin-Verwaltung",
  BOARD_MANAGEMENT: "Vorstands-Verwaltung",
  KOSMOS: "Alumni-Kosmos",
  PDF_DOCUMENTS: "PDF-Dokumente",
  EMAIL_DELIVERY: "Mail-Versand (alle Mails)",
  PAGE_TERMINE: "Seite: Termine",
  PAGE_BLOG: "Seite: Blog",
  PAGE_GESCHICHTE: "Seite: Geschichte",
  PAGE_VORSTAND: "Seite: Vorstand",
  PAGE_SATZUNG: "Seite: Satzung",
};

export const FEATURE_FLAG_DESCRIPTIONS: Record<FeatureFlagKey, string> = {
  LOGIN: "Erlaubt Mitgliedern das Einloggen in den Mitgliederbereich.",
  PASSWORD_RESET: "Erlaubt das Zurücksetzen des Passworts per E-Mail.",
  REGISTRATION: "Erlaubt die Registrierung neuer Mitglieder.",
  EMAIL_CHANGE: "Erlaubt Mitgliedern, ihre hinterlegte E-Mail-Adresse zu ändern.",
  PROFILE_EDIT: "Erlaubt das Bearbeiten von Profildaten (durch Mitglieder und Admins).",
  FEE_CHANGES: "Erlaubt Admins, Mitgliedsbeiträge zu ändern.",
  MAIL_SERVICES:
    "Erlaubt Admins, Rundmails und Direktnachrichten an Mitglieder zu verschicken. Systemmails (Passwort-Reset, E-Mail-Bestätigung, Benachrichtigungen zu Anträgen, Kündigungen und Kontaktanfragen) sind davon nicht betroffen — die haben eigene Schalter.",
  USER_CREATION: "Erlaubt Admins, neue Benutzerkonten manuell anzulegen.",
  USER_DELETION: "Erlaubt Admins, Benutzerkonten unwiderruflich zu löschen.",
  BLOG_MANAGEMENT: "Erlaubt Admins, Blogbeiträge zu erstellen, zu bearbeiten oder zu löschen.",
  EMAIL_VERIFICATION: "Erlaubt Nutzern, ihre E-Mail-Adresse über den Bestätigungslink zu verifizieren.",
  CONTACT_FORM:
    "Schaltet das öffentliche Kontaktformular unter /kontakt komplett ein oder aus.",
  CONTACT_FORM_MAIL:
    "Verschickt bei jeder Anfrage eine Benachrichtigung an alle Admins. Aus: Anfragen werden nur noch im Dashboard gesammelt.",
  CONTACT_FORM_STORAGE:
    "Speichert eingehende Anfragen in der Datenbank. Aus: Anfragen werden nur noch per Mail zugestellt und sind später nicht mehr einsehbar.",
  MEMBERSHIP_APPLICATION:
    "Schaltet den Antrag auf Vereinsmitgliedschaft im Mitgliederbereich ein oder aus. Aus: Nicht-Mitglieder können keinen neuen Antrag stellen; bereits eingegangene Anträge bleiben im Dashboard bearbeitbar.",
  MEMBERSHIP_APPLICATION_MAIL:
    "Benachrichtigt alle Admins per Mail über einen neuen Aufnahmeantrag. Aus: Anträge werden nur noch im Dashboard gesammelt.",
  MEMBERSHIP_APPLICATION_CONFIRMATION_MAIL:
    "Schickt dem Antragsteller eine Eingangsbestätigung sowie eine Mail bei Annahme oder Ablehnung.",
  MEMBERSHIP_TERMINATION:
    "Erlaubt Mitgliedern, ihre Mitgliedschaft im Mitgliederbereich zu kündigen. Aus: Mitglieder sehen stattdessen den Hinweis, per Kontaktformular oder E-Mail an den Vorstand zu kündigen; bereits eingegangene Kündigungen bleiben im Dashboard bearbeitbar.",
  MEMBERSHIP_TERMINATION_MAIL:
    "Benachrichtigt alle Admins per Mail über eine neue Kündigung. Aus: Kündigungen landen nur im Dashboard unter „Anträge & Austritte“ — bitte regelmäßig prüfen, die Frist läuft ab Eingang.",
  MEMBERSHIP_TERMINATION_CONFIRMATION_MAIL:
    "Schickt dem Mitglied eine Eingangsbestätigung der Kündigung und die Bestätigung des Austritts durch den Vorstand. Aus: Der Austritt muss dem Mitglied anderweitig schriftlich bestätigt werden.",
  ACCOUNT_NOTICE_MAIL:
    "Informiert Nutzer per Mail, wenn sie ihren Zugang deaktiviert oder ihr Konto gelöscht haben — auch als Warnung, falls das jemand anderes war.",
  REGISTRATION_CLEANUP:
    "Löscht selbst registrierte Konten automatisch, deren E-Mail-Adresse nach 24 Stunden nicht bestätigt ist. Aus: Unbestätigte Registrierungen bleiben stehen und müssen von Hand gelöscht werden. Von Admins angelegte Konten und der Altbestand sind nie betroffen.",
  EVENT_MANAGEMENT:
    "Erlaubt Admins, Termine anzulegen, zu bearbeiten oder zu löschen. Aus: Bereits veröffentlichte Termine bleiben unter /termine sichtbar, lassen sich aber nicht mehr ändern.",
  BOARD_MANAGEMENT:
    "Erlaubt Admins, Vorstandsmitglieder anzulegen, zu bearbeiten oder zu löschen. Aus: Die Seite /vorstand und die Mail-Signatur bleiben mit dem zuletzt gespeicherten Stand sichtbar, lassen sich aber nicht mehr ändern.",
  EMAIL_DELIVERY:
    "Hauptschalter für jede ausgehende Mail, auch Systemmails wie Passwort-Reset, E-Mail-Bestätigung und alle Benachrichtigungen. Aus: Keine Mail verlässt den Server, die Seite verhält sich wie bei einem ausgefallenen Mailserver. Neue Nutzer können ihre Adresse nicht bestätigen (und werden bei aktiver Registrierungs-Bereinigung nach 24 Stunden gelöscht), Passwörter lassen sich nicht zurücksetzen.",
  KOSMOS:
    "Schaltet den Alumni-Kosmos im Mitgliederbereich ein oder aus. Aus: Niemand sieht den Zeitstrahl oder kann E-Mail-Adressen aufdecken; Mitglieder können ihre Sichtbarkeit weiterhin ausschalten.",
  PDF_DOCUMENTS:
    "Erlaubt Mitgliedern, ihre Zahlungshistorie und ihr Mitgliedschaftszertifikat als PDF herunterzuladen. Aus: Die Download-Knöpfe verschwinden, die Angaben bleiben im Mitgliederbereich sichtbar.",
  PAGE_TERMINE:
    "Blendet /termine samt Termin-Detailseiten und Kalender-Downloads ein oder aus. Aus: Die Adressen liefern 404, Links in Navigation, Footer und auf der Startseite verschwinden. Die Termin-Verwaltung im Dashboard bleibt nutzbar.",
  PAGE_BLOG:
    "Blendet /blog samt Beiträgen und RSS-Feed ein oder aus. Aus: Die Adressen liefern 404, Links in Navigation, Footer und auf der Startseite verschwinden. Die Blog-Verwaltung im Dashboard bleibt nutzbar.",
  PAGE_GESCHICHTE:
    "Blendet /geschichte ein oder aus. Aus: Die Adresse liefert 404, Links und der Zeitstrahl auf der Startseite verschwinden.",
  PAGE_VORSTAND:
    "Blendet /vorstand ein oder aus. Aus: Die Adresse liefert 404, Links verschwinden. Die Vorstands-Verwaltung und die Mail-Signatur sind nicht betroffen.",
  PAGE_SATZUNG:
    "Blendet /satzung ein oder aus. Aus: Die Adresse liefert 404, Links verschwinden. Achtung: Andere Seiten (z. B. der Mitgliedsantrag) verweisen womöglich weiterhin auf die Satzung.",
};

/** Öffentliche Seiten mit eigenem Schalter — aus heißt 404 samt Unterseiten, Links verschwinden. */
export const PAGE_FLAGS = {
  "/termine": "PAGE_TERMINE",
  "/blog": "PAGE_BLOG",
  "/geschichte": "PAGE_GESCHICHTE",
  "/vorstand": "PAGE_VORSTAND",
  "/satzung": "PAGE_SATZUNG",
} as const satisfies Record<string, FeatureFlagKey>;

export function isFeatureFlagKey(value: string | null): value is FeatureFlagKey {
  return !!value && (FEATURE_FLAG_ORDER as string[]).includes(value);
}
