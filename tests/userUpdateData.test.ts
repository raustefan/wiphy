import assert from "node:assert/strict";
import test from "node:test";
import { buildUserUpdateData, type UpdateUserInput } from "../src/lib/server/services/userUpdateData";

const baseInput: UpdateUserInput = {
  idToEdit: "user-1",
  currentUserRole: "MEMBER",
  name: "Rau",
  vorname: "Stefan",
  email: "stefan@example.com",
};

test("member profile updates ignore admin and payment fields", () => {
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
  assert.equal("role" in data, false);
  assert.equal("status" in data, false);
  assert.equal("zahlungsKommentar" in data, false);
  assert.equal("bank" in data, false);
  assert.equal("BLZ" in data, false);
  assert.equal("KTO" in data, false);
  assert.equal("IBAN" in data, false);
  assert.equal("BIC" in data, false);
  assert.equal("mahnung" in data, false);
  assert.equal("mandatserteilung" in data, false);
  assert.equal("bankeinzug" in data, false);
  assert.equal("zuwendungsbesch" in data, false);
  assert.equal("datensperren" in data, false);
  assert.equal("ausschluss" in data, false);
});

test("admin profile updates include admin and payment fields", () => {
  const data = buildUserUpdateData({
    ...baseInput,
    currentUserRole: "ADMIN",
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
