/**
 * Format des JSON-Massenimports: ein Array mit einem Objekt je Person. Die
 * Schlüssel heißen wie die Spalten von `User`, Beiträge stehen als `fees`
 * darin wie die Relation zu `MemberFee`. Geprüft wird serverseitig mit
 * `userImportSchema`; ein Test hält Vorlage und Prisma-Schema deckungsgleich.
 */

export type ImportEntry = Record<string, unknown>;

/** Vorlage zum Herunterladen — zugleich die Referenz für jedes Feld. */
export const EXAMPLE = {
    email: "erika@example.org",
    role: "MEMBER",
    firstName: "Erika",
    lastName: "Mustermann",
    title: "Dr.",
    birthDate: "1990-01-31",
    phone: "+49 123 456789",

    addressLine1: "Musterstraße 1",
    addressLine2: null,
    postalCode: "89073",
    city: "Ulm",
    region: null,
    countryCode: "DE",

    memberNumber: 42,
    joinedAt: "2015-04-01",
    status: "REGULAR_MEMBER",
    studentYears: [2015, 2016],
    adminNote: null,

    degreeProgram: "Wirtschaftsphysik",
    studyStart: "2010-10-01",
    studyEnd: "2015-03-31",
    employer: "Beispiel GmbH",
    employmentStatus: "Angestellt",
    industry: "Beratung",
    jobTitle: "Consultant",
    linkedinUrl: "https://www.linkedin.com/in/erika-mustermann",

    directDebit: true,
    accountHolder: "Erika Mustermann",
    iban: "DE89370400440532013000",
    bic: null,
    mandateReference: "ID42-Mandat0",
    mandateSignedAt: "2015-04-01",

    loginDisabled: false,
    // Der Regelfall beim Übernehmen: alle Beiträge seit dem Beitritt bezahlt.
    // Für abweichende Zahlungsstände stattdessen `allPaid: false` und `fees`.
    allPaid: true,
    fees: null,
};

/** Beispiel für `fees`, wenn nicht alles bezahlt ist — ein Objekt je Beitragsjahr. */
export const FEES_EXAMPLE = [
    { year: 2015, paid: true, amount: null, manualAmount: false },
    { year: 2016, paid: true, amount: null, manualAmount: false },
    { year: 2017, paid: false, amount: 20, manualAmount: true },
];

/**
 * `User`-Spalten, die der Import bewusst nicht annimmt: die App setzt sie
 * selbst. `kosmosVisible` ist eine Einwilligung — die gibt nur das Mitglied,
 * ebenso die Bestätigung der Datenschutzerklärung (`privacyPolicyVersion`).
 * `newsletter` startet immer an; abbestellen kann nur das Mitglied selbst.
 * `notStudentFromYear` ist die Antwort des Mitglieds auf die Studiums-Frage.
 */
export const IMPORT_EXCLUDED_FIELDS = [
    "id",
    "passwordHash",
    "createdAt",
    "updatedAt",
    "lastLoginAt",
    "emailVerified",
    "registrationPendingSince",
    "passwordChangedAt",
    "sessionVersion",
    "kosmosVisible",
    "privacyPolicyVersion",
    "newsletter",
    "notStudentFromYear",
] as const;

export type ImportField = { key: string; label: string; format: string };

/** Felder nach Themen, mit Beschriftung und Format — für Vorschau und Feldübersicht. */
export const IMPORT_SECTIONS: { title: string; fields: ImportField[] }[] = [
    {
        title: "Person",
        fields: [
            { key: "firstName", label: "Vorname", format: "Text, Pflicht" },
            { key: "lastName", label: "Nachname", format: "Text, Pflicht" },
            { key: "email", label: "E-Mail", format: "Pflicht, eindeutig" },
            { key: "title", label: "Titel", format: "Text, z. B. „Dr.“" },
            { key: "birthDate", label: "Geburtsdatum", format: "JJJJ-MM-TT" },
            { key: "phone", label: "Telefon", format: "Text" },
        ],
    },
    {
        title: "Anschrift",
        fields: [
            { key: "addressLine1", label: "Straße und Hausnummer", format: "Text" },
            { key: "addressLine2", label: "Adresszusatz", format: "Text" },
            { key: "postalCode", label: "PLZ", format: "Text" },
            { key: "city", label: "Ort", format: "Text" },
            { key: "region", label: "Region", format: "Bundesstaat, Provinz …" },
            { key: "countryCode", label: "Land", format: "ISO-Code (DE, CH) oder Ländername" },
        ],
    },
    {
        title: "Mitgliedschaft",
        fields: [
            { key: "memberNumber", label: "Mitgliedsnummer", format: "Zahl; leer = nächste freie" },
            { key: "joinedAt", label: "Beitritt", format: "JJJJ-MM-TT" },
            { key: "status", label: "Status", format: "REGULAR_MEMBER, HONORARY_MEMBER, NON_MEMBER" },
            { key: "role", label: "Rolle", format: "MEMBER oder ADMIN" },
            { key: "studentYears", label: "Studienjahre", format: "Liste, z. B. [2015, 2016]; bestimmt den ermäßigten Beitrag" },
            { key: "loginDisabled", label: "Login gesperrt", format: "true / false" },
            { key: "adminNote", label: "Interner Vermerk", format: "Text" },
        ],
    },
    {
        title: "Studium & Beruf",
        fields: [
            { key: "degreeProgram", label: "Studiengang", format: "Text" },
            { key: "studyStart", label: "Studienbeginn", format: "JJJJ-MM-TT" },
            { key: "studyEnd", label: "Studienende", format: "JJJJ-MM-TT" },
            { key: "employer", label: "Arbeitgeber", format: "Text" },
            { key: "jobTitle", label: "Position", format: "Text" },
            { key: "employmentStatus", label: "Berufsstand", format: "Text" },
            { key: "industry", label: "Berufszweig", format: "Text" },
            { key: "linkedinUrl", label: "LinkedIn", format: "https://www.linkedin.com/…" },
        ],
    },
    {
        title: "SEPA-Lastschrift",
        fields: [
            { key: "directDebit", label: "Lastschrift", format: "true / false" },
            { key: "accountHolder", label: "Kontoinhaber:in", format: "Text; leer = Name des Mitglieds" },
            { key: "iban", label: "IBAN", format: "mit oder ohne Leerzeichen" },
            { key: "bic", label: "BIC", format: "Pflicht außerhalb des EWR" },
            { key: "mandateReference", label: "Mandatsreferenz", format: "max. 35 Zeichen; leer = ID<Nr>-Mandat0" },
            { key: "mandateSignedAt", label: "Mandat erteilt am", format: "JJJJ-MM-TT" },
        ],
    },
];

/** Beiträge: entweder pauschal `allPaid` oder Jahr für Jahr `fees`. */
export const PAYMENT_FIELDS: ImportField[] = [
    { key: "allPaid", label: "Alles bezahlt", format: "true = alle Jahre seit Beitritt zum Standardsatz, bezahlt" },
    { key: "fees", label: "Beitragsjahre", format: "Liste, ein Objekt je Jahr (siehe unten); nicht mit allPaid" },
];

export const FEE_FIELDS: ImportField[] = [
    { key: "year", label: "Jahr", format: "Zahl, Pflicht" },
    { key: "paid", label: "Bezahlt", format: "true / false" },
    { key: "amount", label: "Betrag", format: "Euro; nur mit manualAmount" },
    { key: "manualAmount", label: "Betrag fest", format: "true = amount gilt, sonst Standardsatz" },
];

/** Alle Schlüssel eines Eintrags, `allPaid` und `fees` eingeschlossen. */
export const IMPORT_KEYS = [...IMPORT_SECTIONS, { fields: PAYMENT_FIELDS }].flatMap((s) => s.fields.map((f) => f.key));
