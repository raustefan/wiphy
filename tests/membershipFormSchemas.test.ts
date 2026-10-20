import assert from "node:assert/strict";
import test from "node:test";
import { membershipApplicationSchema } from "../src/lib/membershipFormSchemas";

/**
 * Ein vollständiger, gültiger Basisdatensatz — die Tests verändern nur das,
 * was sie gerade prüfen. Das Geburtsdatum liegt bewusst weit genug zurück, um
 * die Mindestaltersprüfung nicht zu berühren.
 */
const base = {
  firstName: "Marie",
  lastName: "Musterfrau",
  birthDate: "2000-01-01",
  addressLine1: "Musterstraße 1",
  postalCode: "89073",
  city: "Ulm",
  countryCode: "DE",
  bylawsAccepted: "on",
  privacyAccepted: "on",
};

test("Lastschrift ohne IBAN wird abgelehnt", () => {
  const result = membershipApplicationSchema.safeParse({
    ...base,
    zahlungsweise: "lastschrift",
    accountHolder: "Marie Musterfrau",
    directDebit: "on",
    // IBAN fehlt.
  });
  assert.equal(result.success, false);
});

test("Lastschrift ohne bestätigtes Mandat wird abgelehnt", () => {
  const result = membershipApplicationSchema.safeParse({
    ...base,
    zahlungsweise: "lastschrift",
    accountHolder: "Marie Musterfrau",
    iban: "DE89370400440532013000",
    // directDebit fehlt — das Kästchen ist nicht angehakt.
  });
  assert.equal(result.success, false);
});

test("Lastschrift mit vollständigen Angaben wird angenommen und die IBAN normalisiert", () => {
  const result = membershipApplicationSchema.safeParse({
    ...base,
    zahlungsweise: "lastschrift",
    accountHolder: "Marie Musterfrau",
    iban: "de89 3704 0044 0532 0130 00",
    directDebit: "on",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.iban, "DE89370400440532013000");
    assert.equal(result.data.directDebit, true);
  }
});

/* Regressionstest zum eigentlichen Grund dieser Änderung: Der Wizard behält
   alle Schritte im DOM. Wählt jemand zuerst Lastschrift, tippt eine IBAN ein
   und wechselt dann zu Überweisung, bleibt die FormData bestehen — ohne diese
   Prüfung landete die IBAN trotzdem in der Datenbank, obwohl der Verein sie
   auf diesem Weg gar nicht erheben soll. */
test("Überweisung verwirft mitgeschickte Bankfelder", () => {
  const result = membershipApplicationSchema.safeParse({
    ...base,
    zahlungsweise: "ueberweisung",
    accountHolder: "Marie Musterfrau",
    iban: "DE89370400440532013000",
    directDebit: "on",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.accountHolder, null);
    assert.equal(result.data.iban, null);
    assert.equal(result.data.directDebit, false);
  }
});

test("Überweisung ohne jede Bankangabe wird angenommen", () => {
  const result = membershipApplicationSchema.safeParse({
    ...base,
    zahlungsweise: "ueberweisung",
  });
  assert.equal(result.success, true);
});

test("fehlende Zahlungsweise wird abgelehnt", () => {
  const result = membershipApplicationSchema.safeParse({
    ...base,
  });
  assert.equal(result.success, false);
});

const directDebit = { zahlungsweise: "lastschrift", accountHolder: "Marie Musterfrau", directDebit: "on" };

test("Lastschrift von einem Schweizer Konto verlangt den BIC", () => {
  const swiss = "CH93 0076 2011 6238 5295 7";
  const without = membershipApplicationSchema.safeParse({ ...base, ...directDebit, iban: swiss });
  assert.equal(without.success, false);
  if (!without.success) assert.deepEqual(without.error.issues[0].path, ["bic"]);

  const withBic = membershipApplicationSchema.safeParse({ ...base, ...directDebit, iban: swiss, bic: "UBSWCHZH80A" });
  assert.equal(withBic.success, true);
});

test("Lastschrift von einem Konto außerhalb des SEPA-Raums wird abgelehnt", () => {
  const result = membershipApplicationSchema.safeParse({
    ...base,
    ...directDebit,
    iban: "TR33 0006 1005 1978 6457 8413 26",
  });
  assert.equal(result.success, false);
  if (!result.success) assert.match(result.error.issues[0].message, /SEPA-Raum/);
});

test("Auslandsanschrift ohne Postleitzahl, mit Region", () => {
  const result = membershipApplicationSchema.safeParse({
    ...base,
    zahlungsweise: "ueberweisung",
    addressLine1: "1 Main Street",
    postalCode: "",
    city: "Dublin",
    region: "Leinster",
    countryCode: "IE",
  });
  assert.equal(result.success, true);
});

test("deutsche Anschrift braucht eine fünfstellige Postleitzahl", () => {
  const result = membershipApplicationSchema.safeParse({ ...base, zahlungsweise: "ueberweisung", postalCode: "" });
  assert.equal(result.success, false);
  if (!result.success) assert.deepEqual(result.error.issues[0].path, ["postalCode"]);
});

test("Freitext statt Ländercode wird abgelehnt", () => {
  const result = membershipApplicationSchema.safeParse({ ...base, zahlungsweise: "ueberweisung", countryCode: "Deutschland" });
  assert.equal(result.success, false);
});

test("Antrag: Telefon, Postleitzahl je Land und Namen werden geprüft", () => {
  const firstIssue = (entry: object) => {
    const result = membershipApplicationSchema.safeParse({ ...base, zahlungsweise: "ueberweisung", ...entry });
    return result.success ? null : result.error.issues[0].path.join(".");
  };
  assert.equal(firstIssue({ phone: "hallo" }), "phone");
  assert.equal(firstIssue({ phone: "+49 731 123456" }), null);
  assert.equal(firstIssue({ countryCode: "AT", postalCode: "12345" }), "postalCode");
  assert.equal(firstIssue({ countryCode: "AT", postalCode: "1010" }), null);
  assert.equal(firstIssue({ countryCode: "GB", postalCode: "SW1A 1AA" }), null);
  assert.equal(firstIssue({ firstName: "Ma\nrie" }), "firstName");
});
