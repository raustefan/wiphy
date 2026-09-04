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

const GREETING = (vorname?: string | null, name?: string | null) =>
  vorname?.trim() || name?.trim() || "Mitglied";

export function membershipReceivedTemplate(params: {
  vorname?: string | null;
  name?: string | null;
}) {
  return {
    subject: "Dein Antrag auf Vereinsmitgliedschaft ist eingegangen",
    text: `Hallo ${GREETING(params.vorname, params.name)},

vielen Dank für deinen Antrag auf Mitgliedschaft im WirtschaftsPhysik Alumni e.V.

Über die Aufnahme entscheidet der Vorstand. Sobald darüber entschieden wurde, melden wir uns bei dir. Bis dahin ist noch keine Mitgliedschaft und damit auch keine Beitragspflicht entstanden.

Den Status deines Antrags kannst du jederzeit in deinem Mitgliederbereich einsehen.

Viele Grüße
Dein Vereinsteam des WirtschaftsPhysik Alumni e.V.`,
  };
}

export function membershipApprovedTemplate(params: {
  vorname?: string | null;
  name?: string | null;
  aufnahmedatum: Date;
  mitgliedId: number;
}) {
  const datum = params.aufnahmedatum.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    subject: "Willkommen im WirtschaftsPhysik Alumni e.V.",
    text: `Hallo ${GREETING(params.vorname, params.name)},

der Vorstand hat deinen Aufnahmeantrag angenommen — herzlich willkommen im WirtschaftsPhysik Alumni e.V.!

Aufnahmedatum: ${datum}
Mitgliedsnummer: ${params.mitgliedId}

Deine Beiträge findest du ab sofort in deinem Mitgliederbereich. Der Einzug erfolgt per SEPA-Lastschrift von dem von dir angegebenen Konto.

Viele Grüße
Dein Vereinsteam des WirtschaftsPhysik Alumni e.V.`,
  };
}

export function membershipRejectedTemplate(params: {
  vorname?: string | null;
  name?: string | null;
  note?: string | null;
}) {
  const reason = params.note?.trim()
    ? `\n\nBegründung:\n${params.note.trim()}`
    : "";

  return {
    subject: "Entscheidung über deinen Antrag auf Vereinsmitgliedschaft",
    text: `Hallo ${GREETING(params.vorname, params.name)},

der Vorstand hat deinen Aufnahmeantrag geprüft und ihm leider nicht entsprochen.${reason}

Bei Rückfragen kannst du dich jederzeit an den Vorstand wenden. Die von dir angegebene Bankverbindung wird nicht für einen Einzug verwendet.

Viele Grüße
Dein Vereinsteam des WirtschaftsPhysik Alumni e.V.`,
  };
}
