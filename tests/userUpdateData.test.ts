import assert from "node:assert/strict";
import test from "node:test";
import { buildUserUpdateData, type UpdateUserInput } from "../src/lib/server/services/userUpdateData";

const baseInput: UpdateUserInput = {
  idToEdit: "user-1",
  currentUserId: "user-1",
  currentUserRole: "MEMBER",
  lastName: "Rau",
  firstName: "Stefan",
  email: "stefan@example.com",
};

/* Erwartung angepasst an die Regel, die `buildUserUpdateData` inzwischen
   umsetzt und im Quelltext auch begründet: Zahlungsdaten ändert ein Mitglied
   nicht über das Profilformular, sondern ausschließlich unter
   `/dashboard/zahlungen`, wo dafür erneut das SEPA-Mandat bestätigt wird.
   Der Test behauptete noch das frühere, weitere Verhalten und schlug deshalb
   fehl — er hat die Verschärfung nicht bemerkt. */
test("member self-updates change neither payment data nor admin fields", () => {
  const data = buildUserUpdateData({
    ...baseInput,
    role: "ADMIN",
    status: "HONORARY_MEMBER",
    adminNote: "internal note",
    accountHolder: "Someone Else",
    iban: "DE123",
    bic: "TESTDEFF",
    mandateReference: "ID1-Mandat0",
    mandateSignedAt: "2026-01-02",
    directDebit: "on",
    loginDisabled: "on",
  });

  assert.equal(data.lastName, "Rau");
  assert.equal(data.email, "stefan@example.com");

  // Admin-exklusive Felder bleiben gesperrt
  assert.equal("role" in data, false);
  assert.equal("status" in data, false);
  assert.equal("loginDisabled" in data, false);
  assert.equal("adminNote" in data, false);

  // Zahlungsdaten bleiben dem Profilformular ebenfalls verschlossen
  assert.equal("accountHolder" in data, false);
  assert.equal("iban" in data, false);
  assert.equal("bic" in data, false);
  assert.equal("mandateReference" in data, false);
  assert.equal("directDebit" in data, false);
  assert.equal("mandateSignedAt" in data, false);

  // Die eigenen Profilfelder bleiben schreibbar
  assert.equal(data.firstName, "Stefan");
});

test("member editing another user's profile ignores payment and admin fields", () => {
  const data = buildUserUpdateData({
    ...baseInput,
    idToEdit: "other-user",
    accountHolder: "Someone Else",
    iban: "DE123",
    adminNote: "internal note",
    role: "ADMIN",
  });

  assert.equal("accountHolder" in data, false);
  assert.equal("iban" in data, false);
  assert.equal("adminNote" in data, false);
  assert.equal("role" in data, false);
});

test("admin profile updates include admin and payment fields", () => {
  const data = buildUserUpdateData({
    ...baseInput,
    currentUserRole: "ADMIN",
    currentUserId: "admin-1",
    idToEdit: "user-1",
    role: "ADMIN",
    status: "REGULAR_MEMBER",
    adminNote: "paid manually",
    iban: "DE123",
    bic: "TESTDEFF",
    mandateSignedAt: "2026-01-02",
    directDebit: "on",
    loginDisabled: "false",
  });

  assert.equal(data.role, "ADMIN");
  assert.equal(data.status, "REGULAR_MEMBER");
  assert.equal(data.adminNote, "paid manually");
  assert.equal(data.iban, "DE123");
  assert.equal(data.bic, "TESTDEFF");
  assert.equal(data.directDebit, true);
  assert.equal(data.loginDisabled, false);
  assert.ok(data.mandateSignedAt instanceof Date);
});

/* Regressionstest zu dem Fehler, dass ein Haken sich setzen, aber nicht wieder
   entfernen ließ: Ein abgewähltes Kontrollkästchen schickt der Browser gar
   nicht mit, das Feld kam als `undefined` an — und `undefined` heißt hier
   „nicht anfassen“. Das Profilformular übersetzt „fehlt“ deshalb zu `false`,
   bevor es hierher kommt; `buildUserUpdateData` muss ein ausdrückliches
   `false` dann auch schreiben. */
test("explizites false schaltet Admin-Kästchen wieder ab", () => {
  const data = buildUserUpdateData({
    ...baseInput,
    currentUserRole: "ADMIN",
    currentUserId: "admin-1",
    directDebit: false,
    loginDisabled: false,
  });

  assert.equal(data.directDebit, false);
  assert.equal(data.loginDisabled, false);
});

/* Die Gegenprobe: `undefined` darf weiterhin „nicht anfassen“ bedeuten. Daran
   hängen Aufrufer, die nur einen Teil der Felder kennen — würde das hier zu
   `false`, löschte ein Teil-Update stillschweigend fremde Angaben. */
test("undefined lässt Admin-Kästchen unverändert", () => {
  const data = buildUserUpdateData({
    ...baseInput,
    currentUserRole: "ADMIN",
    currentUserId: "admin-1",
  });

  assert.equal("directDebit" in data, false);
  assert.equal("loginDisabled" in data, false);
});
