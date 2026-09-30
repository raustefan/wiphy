/** Beispiel für den JSON-Massenimport; seine Schlüssel sind zugleich die Spalten der Prüftabelle. */
export const EXAMPLE = {
    vorname: "Erika",
    name: "Mustermann",
    email: "erika@example.org",
    titel: "Dr.",
    role: "MEMBER",
    status: "ORDENTLICHES_MITGLIED",
    mitgliedId: 42,
    aufnahmedatum: "2015-04-01",
    geburtsdatum: "1990-01-31",
    strasse: "Musterstraße 1",
    plz: "12345",
    stadt: "Musterstadt",
    land: "Deutschland",
    telefon: "+49 123 456789",
    website: "https://example.org",
    user: "emustermann",
    studiengang: "Wirtschaftsphysik",
    studienbeginn: "2010-10-01",
    studienende: "2015-03-31",
    studentYears: [2015, 2016],
    diplomarbeit: "",
    bachelorarbeit: "Titel der Bachelorarbeit",
    masterarbeit: "Titel der Masterarbeit",
    dissertation: "",
    arbeitgeber: "Beispiel GmbH",
    berufsstand: "Angestellt",
    berufszweig: "Beratung",
    position: "Consultant",
    praktika: "",
    berufserfahrung: "",
    selbstzahler: false,
    bankeinzug: true,
    mandatserteilung: "2015-04-01",
    bank: "Musterbank",
    IBAN: "DE89370400440532013000",
    BIC: "COBADEFFXXX",
    BLZ: "",
    KTO: "",
    allePaid: true,
    zahlungsKommentar: "",
    zuwendungsbesch: false,
    mahnung: "",
    datensperren: false,
    ausschluss: false,
    loginDisabled: false,
};

export const FIELDS = Object.keys(EXAMPLE);

export type Row = Record<string, string>;

export function toRow(obj: Record<string, unknown>): Row {
    return Object.fromEntries(
        FIELDS.map((key) => {
            const v = obj[key];
            return [key, v == null ? "" : Array.isArray(v) ? v.join(",") : String(v)];
        }),
    );
}
