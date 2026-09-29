import assert from "node:assert/strict";
import test from "node:test";
import { sentMailRecord } from "../src/lib/email/sentMailRecord";

/**
 * Das Versandprotokoll speichert eine Adresse nur bei einer Mail an genau eine
 * ausgewählte Person — bei Rundmails reichen Gruppe und Anzahl.
 */

const one = [{ email: "a@example.org" }];
const two = [{ email: "a@example.org" }, { email: "b@example.org" }];

test("einzelne ausgewählte Person: Adresse wird gespeichert", () => {
  const record = sentMailRecord({ subject: "Hallo", recipientGroup: null, recipients: one });
  assert.equal(record.recipientEmail, "a@example.org");
  assert.equal(record.recipientCount, 1);
});

test("mehrere ausgewählte Personen: nur die Anzahl", () => {
  const record = sentMailRecord({ subject: "Hallo", recipientGroup: null, recipients: two });
  assert.equal(record.recipientEmail, null);
  assert.equal(record.recipientCount, 2);
});

test("Gruppe mit nur einem Mitglied: Gruppe statt Adresse", () => {
  const record = sentMailRecord({
    subject: "Hallo",
    recipientGroup: "EHRENMITGLIED",
    recipients: one,
  });
  assert.equal(record.recipientEmail, null);
  assert.equal(record.recipientGroup, "EHRENMITGLIED");
});
