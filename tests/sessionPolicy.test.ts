import assert from "node:assert/strict";
import test from "node:test";
import { ADMIN_SESSION_MAX_MS, adminSessionExpired } from "../src/lib/server/sessionPolicy";

const now = 1_800_000_000_000;

test("Admin-Sitzung innerhalb der Obergrenze bleibt gültig", () => {
  assert.equal(adminSessionExpired("ADMIN", now - ADMIN_SESSION_MAX_MS + 1000, now), false);
});

test("Admin-Sitzung nach der Obergrenze läuft ab", () => {
  assert.equal(adminSessionExpired("ADMIN", now - ADMIN_SESSION_MAX_MS - 1, now), true);
});

test("Admin-Token ohne Login-Zeitpunkt wird verworfen", () => {
  assert.equal(adminSessionExpired("ADMIN", undefined, now), true);
  assert.equal(adminSessionExpired("ADMIN", "0", now), true);
});

test("Mitglieder sind nicht betroffen", () => {
  assert.equal(adminSessionExpired("MEMBER", undefined, now), false);
});
