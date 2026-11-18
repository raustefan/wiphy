/**
 * Empfängergruppen der Rundmail.
 *
 * Eine Quelle für beide Seiten: das Formular zählt mit denselben Filtern vor,
 * mit denen der Server später auswählt — die angezeigte Zahl kann deshalb nicht
 * von der tatsächlichen abweichen. Ohne Server-Importe, damit der Client sie
 * laden kann.
 */

export const MAIL_TARGETS = ["ALL", "MEMBERS", "SEPA_YES", "SEPA_NO", "HONORARY_MEMBER", "SELECTED"] as const;
export type MailTarget = (typeof MAIL_TARGETS)[number];
export type GroupTarget = Exclude<MailTarget, "SELECTED">;

export type MailTargetPerson = { status: string; directDebit: boolean };

const isMember = (person: MailTargetPerson) => person.status !== "NON_MEMBER";

export const MAIL_TARGET_FILTERS: Record<GroupTarget, (person: MailTargetPerson) => boolean> = {
  ALL: () => true,
  MEMBERS: isMember,
  SEPA_YES: (person) => isMember(person) && person.directDebit,
  SEPA_NO: (person) => isMember(person) && !person.directDebit,
  HONORARY_MEMBER: (person) => person.status === "HONORARY_MEMBER",
};

export const MAIL_TARGET_INFO: Record<MailTarget, { title: string; description: string }> = {
  ALL: { title: "Alle Nutzer", description: "Jedes Konto, auch Nicht-Mitglieder." },
  MEMBERS: { title: "Alle Vereinsmitglieder", description: "Ordentliche und Ehrenmitglieder." },
  SEPA_YES: { title: "Mitglieder mit SEPA-Mandat", description: "Mitglieder, die per Lastschrift zahlen." },
  SEPA_NO: { title: "Mitglieder ohne SEPA-Mandat", description: "Mitglieder, die selbst überweisen." },
  HONORARY_MEMBER: { title: "Ehrenmitglieder", description: "Nur Ehrenmitglieder." },
  SELECTED: { title: "Ausgewählte Nutzer", description: "Einzelne Personen über die Suche auswählen." },
};

export function isMailTarget(value: string): value is MailTarget {
  return (MAIL_TARGETS as readonly string[]).includes(value);
}
