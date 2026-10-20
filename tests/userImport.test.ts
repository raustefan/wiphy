import { test } from "node:test";
import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";
import {
    EXAMPLE,
    FEE_FIELDS,
    FEES_EXAMPLE,
    IMPORT_EXCLUDED_FIELDS,
    IMPORT_KEYS,
} from "../src/app/dashboard/users/new/importFormat";
import { userImportSchema } from "../src/lib/server/validation/schemas";

const issues = (entry: unknown) => {
    const result = userImportSchema.safeParse(entry);
    return result.success ? [] : result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
};

test("Vorlage besteht das Import-Schema", () => {
    const entry = userImportSchema.parse(EXAMPLE);
    assert.equal(entry.memberNumber, 42);
    assert.equal(entry.countryCode, "DE");
    assert.deepEqual(entry.studentYears, [2015, 2016]);
    assert.ok(entry.joinedAt instanceof Date);
    assert.equal(entry.joinedAt.toISOString(), "2015-04-01T00:00:00.000Z");
    assert.equal(entry.addressLine2, undefined);
    assert.equal(entry.allPaid, true);
    assert.equal(entry.fees, undefined);

    const withFees = userImportSchema.parse({ ...EXAMPLE, allPaid: false, fees: FEES_EXAMPLE });
    assert.equal(withFees.fees?.length, 3);
    assert.equal(withFees.fees?.[2].amount, 20);
});

/* Hält das Versprechen „1:1 wie das Schema“: Kommt eine Spalte zu `User` oder
   `MemberFee` hinzu, muss sie im Import auftauchen oder bewusst als
   App-verwaltet ausgeschlossen werden. */
test("Importfelder decken das Prisma-Schema vollständig ab", () => {
    const userColumns = Object.values(Prisma.UserScalarFieldEnum).sort();
    // `allPaid` und `fees` sind keine Spalten: Abkürzung bzw. die Relation zu `MemberFee`.
    const covered = [...IMPORT_KEYS.filter((k) => k !== "fees" && k !== "allPaid"), ...IMPORT_EXCLUDED_FIELDS].sort();
    assert.deepEqual(covered, userColumns);
    assert.deepEqual(Object.keys(EXAMPLE).sort(), [...IMPORT_KEYS].sort());

    const feeColumns = Object.values(Prisma.MemberFeeScalarFieldEnum).filter(
        (k) => !["id", "userId", "createdAt", "updatedAt"].includes(k) && !k.startsWith("archived"),
    );
    assert.deepEqual(FEE_FIELDS.map((f) => f.key).sort(), feeColumns.sort());
    assert.deepEqual(Object.keys(FEES_EXAMPLE[0]).sort(), feeColumns.sort());
});

test("Tippfehler im Feldnamen werden gemeldet statt verworfen", () => {
    assert.deepEqual(issues({ ...EXAMPLE, vorname: "Erika" }), [": Unbekanntes Feld: vorname"]);
});

test("Ländernamen aus dem alten System werden zu Ländercodes", () => {
    // Ohne PLZ: die deutsche aus der Vorlage passte nicht zu jedem dieser Länder.
    const country = (countryCode: string) =>
        userImportSchema.parse({ ...EXAMPLE, countryCode, postalCode: null }).countryCode;
    assert.equal(country("Deutschland"), "DE");
    assert.equal(country("Schweiz"), "CH");
    assert.equal(country("United Kingdom"), "GB");
    assert.equal(country("ch"), "CH");
    assert.deepEqual(issues({ ...EXAMPLE, countryCode: "Atlantis", postalCode: null }), [
        "countryCode: Land nicht erkannt — ISO-Code wie DE oder CH angeben.",
    ]);
});

test("Datumsformat, Lastschrift und Beitragsjahre werden geprüft", () => {
    assert.deepEqual(issues({ ...EXAMPLE, joinedAt: "01.04.2015" }), ["joinedAt: Datum als JJJJ-MM-TT angeben."]);
    assert.deepEqual(issues({ ...EXAMPLE, iban: null }), ["iban: Lastschrift ohne IBAN."]);
    assert.deepEqual(issues({ ...EXAMPLE, iban: "CH9300762011623852957", bic: null }), [
        "bic: Konto außerhalb des EWR: BIC angeben.",
    ]);
    const own = { ...EXAMPLE, allPaid: false };
    assert.deepEqual(issues({ ...own, fees: [{ year: 2015 }, { year: 2015 }] }), ["fees.1.year: Beitragsjahr 2015 doppelt."]);
    assert.deepEqual(issues({ ...own, fees: [{ year: 2015, manualAmount: true }] }), [
        "fees.0.amount: manualAmount braucht amount.",
    ]);
});

test("Pflichtangaben: nur Name und E-Mail", () => {
    const minimal = userImportSchema.parse({ email: "Max@Example.org", firstName: "Max", lastName: "Muster" });
    assert.equal(minimal.email, "max@example.org");
    assert.equal(minimal.status, "NON_MEMBER");
    assert.equal(minimal.directDebit, false);
    assert.equal(minimal.fees, undefined);
});

test("allPaid: nur ohne fees und nur für ordentliche Mitglieder mit Beitritt", () => {
    assert.deepEqual(issues({ ...EXAMPLE, fees: FEES_EXAMPLE }), [
        "allPaid: Entweder allPaid oder fees angeben, nicht beides.",
    ]);
    assert.deepEqual(issues({ ...EXAMPLE, joinedAt: null }), [
        "allPaid: allPaid braucht status REGULAR_MEMBER und ein joinedAt.",
    ]);
    assert.deepEqual(issues({ ...EXAMPLE, status: "HONORARY_MEMBER" }), [
        "allPaid: allPaid braucht status REGULAR_MEMBER und ein joinedAt.",
    ]);
});

/* Plausibilität über das Format hinaus — jeder Fall hier ging früher durch. */
test("unplausible Angaben werden abgelehnt", () => {
    const first = (entry: object) => issues({ ...EXAMPLE, ...entry })[0];
    assert.equal(first({ joinedAt: "2015-02-31" }), "joinedAt: Dieses Datum gibt es nicht.");
    assert.equal(first({ birthDate: "2090-01-01" }), "birthDate: Geburtsdatum unplausibel (vor 1900 oder in der Zukunft).");
    assert.equal(first({ birthDate: "2000-01-01", joinedAt: "1999-01-01" }), "joinedAt: Beitritt liegt vor der Geburt.");
    assert.equal(first({ studyStart: "2015-10-01", studyEnd: "2012-01-01" }), "studyEnd: Studienende liegt vor dem Studienbeginn.");
    assert.equal(first({ postalCode: "abc" }), "postalCode: Postleitzahl passt nicht zum Land.");
    assert.equal(first({ phone: "hallo" }), "phone: Telefonnummer nur aus Ziffern, + ( ) / . -");
    assert.equal(first({ firstName: "A\nBcc: x@evil.org" }), "firstName: Bitte ohne Zeilenumbrüche oder Steuerzeichen eingeben.");
    assert.equal(first({ iban: "TR330006100519786457841326" }), "iban: Lastschrift geht nur von Konten im SEPA-Raum.");
    assert.equal(
        first({ directDebit: false, mandateReference: null, mandateSignedAt: null, accountHolder: null }),
        "directDebit: Bankdaten ohne Lastschrift — directDebit: true setzen oder die Bankfelder weglassen.",
    );
    assert.equal(first({ mandateSignedAt: "2099-01-01" }), "mandateSignedAt: Mandatsdatum liegt in der Zukunft.");
    assert.equal(
        first({ allPaid: false, fees: [{ year: 2020, amount: 99999, manualAmount: true }] }),
        "fees.0.amount: Mehr als 1000 € im Jahr — Tippfehler?",
    );
    assert.equal(first({ allPaid: false, fees: [{ year: 2010 }] }), "fees.0.year: Beitrag 2010 liegt vor dem Beitritt (2015).");
});
