export function feeReminderTemplate(params: {
  vorname?: string | null;
  name?: string | null;
  year: number;
}) {
  const greeting = params.vorname?.trim() || params.name?.trim() || "Mitglied";

  return {
    subject: `Erinnerung: Mitgliedsbeitrag ${params.year}`,
    message: `Hallo ${greeting},

wir möchten dich freundlich daran erinnern, dass der Mitgliedsbeitrag für das Jahr ${params.year} bei uns noch als offen geführt wird.

Bitte überweise den Beitrag zeitnah. Bei Fragen oder wenn du den Beitrag bereits gezahlt hast, melde dich gerne bei uns.

Viele Grüße
Dein Vereinsteam`,
  };
}
