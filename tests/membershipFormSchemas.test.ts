import assert from "node:assert/strict";
import test from "node:test";
import { membershipApplicationSchema } from "../src/lib/membershipFormSchemas";

/**
 * Ein vollständiger, gültiger Basisdatensatz — die Tests verändern nur das,
 * was sie gerade prüfen. Das Geburtsdatum liegt bewusst weit genug zurück, um
 * die Mindestaltersprüfung nicht zu berühren.
 */
const base = {
  vorname: "Marie",
  name: "Musterfrau",
  geburtsdatum: "2000-01-01",
  strasse: "Musterstraße 1",
  plz: "89073",
  stadt: "Ulm",
  land: "Deutschland",
  satzungAccepted: "on",
  datenschutzAccepted: "on",
};

test("Lastschrift ohne IBAN wird abgelehnt", () => {
  const result = membershipApplicationSchema.safeParse({
    ...base,
    zahlungsweise: "lastschrift",
    kontoinhaber: "Marie Musterfrau",
    bankeinzug: "on",
    // IBAN fehlt.
  });
  assert.equal(result.success, false);
});

test("Lastschrift ohne bestätigtes Mandat wird abgelehnt", () => {
  const result = membershipApplicationSchema.safeParse({
    ...base,
    zahlungsweise: "lastschrift",
    kontoinhaber: "Marie Musterfrau",
    IBAN: "DE89370400440532013000",
    // bankeinzug fehlt — das Kästchen ist nicht angehakt.
  });
  assert.equal(result.success, false);
});

test("Lastschrift mit vollständigen Angaben wird angenommen und die IBAN normalisiert", () => {
  const result = membershipApplicationSchema.safeParse({
    ...base,
    zahlungsweise: "lastschrift",
    kontoinhaber: "Marie Musterfrau",
    IBAN: "de89 3704 0044 0532 0130 00",
    bankeinzug: "on",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.IBAN, "DE89370400440532013000");
    assert.equal(result.data.bankeinzug, true);
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
    kontoinhaber: "Marie Musterfrau",
    IBAN: "DE89370400440532013000",
    bankeinzug: "on",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.kontoinhaber, null);
    assert.equal(result.data.IBAN, null);
    assert.equal(result.data.bankeinzug, false);
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
