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

test("member self-updates may change payment data but not admin fields or payment notes", () => {
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

  // Eigene Zahlungsdaten (ohne Kommentar/Mahnung) darf ein Mitglied selbst pflegen
  assert.equal(data.bank, "Example Bank");
  assert.equal(data.BLZ, "123");
  assert.equal(data.KTO, "456");
  assert.equal(data.IBAN, "DE123");
  assert.equal(data.BIC, "TESTDEFF");
  assert.equal(data.bankeinzug, true);
  assert.equal(data.zuwendungsbesch, true);
  assert.ok(data.mandatserteilung instanceof Date);
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
