import { test } from "node:test";
import assert from "node:assert/strict";
import { EXAMPLE, toRow } from "../src/app/dashboard/users/new/importFormat";
import { adminCreateUserSchema, userImportExtraSchema } from "../src/lib/server/validation/schemas";

test("Beispiel-JSON besteht beide Import-Schemas", () => {
    const row = toRow(EXAMPLE);
    const core = adminCreateUserSchema.parse({ ...row, password: "x".repeat(12) });
    const extra = userImportExtraSchema.parse(row);
    assert.deepEqual(core.studentYears, [2015, 2016]);
    assert.equal(core.mitgliedId, 42);
    assert.equal(core.allePaid, true);
    assert.equal(extra.telefon, "+49 123 456789");
    assert.equal(extra.diplomarbeit, undefined);
    assert.ok(extra.studienbeginn instanceof Date);
});
