import assert from "node:assert/strict";
import test from "node:test";
import { MAIL_TARGET_FILTERS, type GroupTarget } from "../src/lib/mailTargets";
import { createPreviewToken, verifyPreviewToken } from "../src/lib/server/email/previewToken";

process.env.NEXTAUTH_SECRET = "test-secret";

const people = [
  { name: "ordentlich, Lastschrift", status: "REGULAR_MEMBER", directDebit: true },
  { name: "ordentlich, Überweisung", status: "REGULAR_MEMBER", directDebit: false },
  { name: "Ehrenmitglied", status: "HONORARY_MEMBER", directDebit: false },
  // Ein Mandat aus der Mitgliedszeit gilt nach dem Austritt nicht mehr.
  { name: "ausgetreten mit Altmandat", status: "NON_MEMBER", directDebit: true },
];

function names(target: GroupTarget) {
  return people.filter(MAIL_TARGET_FILTERS[target]).map((p) => p.name);
}

test("Empfängergruppen der Rundmail", () => {
  assert.equal(names("ALL").length, 4);
  assert.deepEqual(names("MEMBERS"), ["ordentlich, Lastschrift", "ordentlich, Überweisung", "Ehrenmitglied"]);
  assert.deepEqual(names("SEPA_YES"), ["ordentlich, Lastschrift"]);
  assert.deepEqual(names("SEPA_NO"), ["ordentlich, Überweisung", "Ehrenmitglied"]);
  assert.deepEqual(names("HONORARY_MEMBER"), ["Ehrenmitglied"]);
});

// Der Versand darf nur durchgehen, wenn er genau dem entspricht, was die
// Vorschau gezeigt hat.
test("Vorschau-Token bindet den Versand an die geprüfte Fassung", () => {
  const fields = { target: "SELECTED", selectedUserIds: ["b", "a"], subject: "Hallo", message: "<p>x</p>" };
  const token = createPreviewToken(fields, ["hash1"]);

  assert.ok(verifyPreviewToken(token, fields, ["hash1"]));
  assert.ok(
    verifyPreviewToken(token, { ...fields, selectedUserIds: ["a", "b"] }, ["hash1"]),
    "Reihenfolge der Empfänger ist egal",
  );
  assert.ok(!verifyPreviewToken(token, { ...fields, subject: "Hallo!" }, ["hash1"]), "Betreff geändert");
  assert.ok(!verifyPreviewToken(token, { ...fields, selectedUserIds: ["a", "b", "c"] }, ["hash1"]), "Empfänger ergänzt");
  assert.ok(!verifyPreviewToken(token, fields, ["hash2"]), "anderes Foto");
  assert.ok(!verifyPreviewToken(token, fields, []), "Foto entfernt");
  assert.ok(!verifyPreviewToken("", fields, ["hash1"]), "ohne Token");
  assert.ok(!verifyPreviewToken(undefined, fields, ["hash1"]));
});
