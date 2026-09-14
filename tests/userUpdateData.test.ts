import assert from "node:assert/strict";
import test from "node:test";
import { buildUserUpdateData, type UpdateUserInput } from "../src/lib/server/services/userUpdateData";

const baseInput: UpdateUserInput = {
  idToEdit: "user-1",
  currentUserId: "user-1",
  currentUserRole: "MEMBER",
  name: "Rau",
  vorname: "Stefan",
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
    status: "EHRENMITGLIED",
    zahlungsKommentar: "internal note",
    bank: "Example Bank",
    BLZ: "123",
    KTO: "456",
    IBAN: "DE123",
    BIC: "TESTDEFF",
    mahnung: "reminder",
    mandatserteilung: "2026-01-02",
    bankeinzug: "on",
    zuwendungsbesch: "on",
    datensperren: "on",
    ausschluss: "on",
  });

  assert.equal(data.name, "Rau");
  assert.equal(data.email, "stefan@example.com");

  // Admin-exklusive Felder bleiben gesperrt
  assert.equal("role" in data, false);
  assert.equal("status" in data, false);
  assert.equal("datensperren" in data, false);
  assert.equal("ausschluss" in data, false);
  assert.equal("zahlungsKommentar" in data, false);
  assert.equal("mahnung" in data, false);

  // Zahlungsdaten bleiben dem Profilformular ebenfalls verschlossen
  assert.equal("bank" in data, false);
  assert.equal("BLZ" in data, false);
  assert.equal("KTO" in data, false);
  assert.equal("IBAN" in data, false);
  assert.equal("BIC" in data, false);
  assert.equal("bankeinzug" in data, false);
  assert.equal("zuwendungsbesch" in data, false);
  assert.equal("mandatserteilung" in data, false);

  // Die eigenen Profilfelder bleiben schreibbar
  assert.equal(data.vorname, "Stefan");
});

test("member editing another user's profile ignores payment and admin fields", () => {
  const data = buildUserUpdateData({
    ...baseInput,
    idToEdit: "other-user",
    bank: "Example Bank",
    IBAN: "DE123",
    zahlungsKommentar: "internal note",
    role: "ADMIN",
  });

  assert.equal("bank" in data, false);
  assert.equal("IBAN" in data, false);
  assert.equal("zahlungsKommentar" in data, false);
  assert.equal("role" in data, false);
});

test("admin profile updates include admin and payment fields", () => {
  const data = buildUserUpdateData({
    ...baseInput,
    currentUserRole: "ADMIN",
    currentUserId: "admin-1",
    idToEdit: "user-1",
    role: "ADMIN",
    status: "ORDENTLICHES_MITGLIED",
    zahlungsKommentar: "paid manually",
    IBAN: "DE123",
    BIC: "TESTDEFF",
    mandatserteilung: "2026-01-02",
    bankeinzug: "on",
    datensperren: "false",
  });

  assert.equal(data.role, "ADMIN");
  assert.equal(data.status, "ORDENTLICHES_MITGLIED");
  assert.equal(data.zahlungsKommentar, "paid manually");
  assert.equal(data.IBAN, "DE123");
  assert.equal(data.BIC, "TESTDEFF");
  assert.equal(data.bankeinzug, true);
  assert.equal(data.datensperren, false);
  assert.ok(data.mandatserteilung instanceof Date);
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
    bankeinzug: false,
    zuwendungsbesch: false,
    datensperren: false,
    ausschluss: false,
  });

  assert.equal(data.bankeinzug, false);
  assert.equal(data.zuwendungsbesch, false);
  assert.equal(data.datensperren, false);
  assert.equal(data.ausschluss, false);
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

  assert.equal("bankeinzug" in data, false);
  assert.equal("zuwendungsbesch" in data, false);
  assert.equal("datensperren" in data, false);
  assert.equal("ausschluss" in data, false);
});
