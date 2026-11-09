import assert from "node:assert/strict";
import test, { beforeEach } from "node:test";
import { YEAR, createMember, createUser, resetDb } from "./setup";
import {
  getFeeDashboardData,
  getOpenFees,
  getSepaCandidates,
  resetFeeAmount,
  setFeeAmount,
  setFeeStatus,
} from "../../src/lib/server/services/feeService";

beforeEach(resetDb);

test("laufendes Jahr ist auch ohne Beitragszeile offen", async () => {
  const member = await createMember();
  const open = await getOpenFees(member.id);
  // 12 × 5 € mit Lastschrift.
  assert.deepEqual(open.map((f) => [f.year, f.amount, f.angelegt]), [[YEAR, 60, false]]);
});

test("bezahlt, erlassen oder später eingetreten: nichts offen", async () => {
  const paid = await createMember();
  await setFeeStatus({ userId: paid.id, year: YEAR, field: "paid", value: true });
  assert.deepEqual(await getOpenFees(paid.id), []);

  const waived = await createMember();
  await setFeeAmount({ userId: waived.id, year: YEAR, amount: 0 });
  assert.deepEqual(await getOpenFees(waived.id), []);

  const joinsNextYear = await createMember({ joinedAt: new Date(YEAR + 1, 0, 15) });
  assert.deepEqual(await getOpenFees(joinsNextYear.id), []);

  const nonMember = await createUser();
  assert.deepEqual(await getOpenFees(nonMember.id), []);
});

test("ermäßigtes Jahr rechnet mit dem Studierendensatz", async () => {
  const member = await createMember();
  await setFeeStatus({ userId: member.id, year: YEAR, field: "isStudent", value: true });
  const [fee] = await getOpenFees(member.id);
  assert.equal(fee.amount, 24);
});

test("manueller Betrag gilt, bis er zurückgenommen wird", async () => {
  const member = await createMember();

  await setFeeAmount({ userId: member.id, year: YEAR, amount: 10 });
  let [fee] = await getOpenFees(member.id);
  assert.deepEqual([fee.amount, fee.standard, fee.manuell], [10, 60, true]);

  await resetFeeAmount({ userId: member.id, year: YEAR });
  [fee] = await getOpenFees(member.id);
  assert.deepEqual([fee.amount, fee.manuell], [60, false]);
});

test("Mitglieder sehen nur ihr eigenes Konto, Admins die Beitragsliste", async () => {
  const admin = await createUser({ role: "ADMIN" });
  const a = await createMember();
  const b = await createMember();
  await createUser(); // Nichtmitglied: steht in keiner Beitragsliste.

  const own = await getFeeDashboardData(a.id, "MEMBER", YEAR);
  assert.deepEqual(own.map((u) => u.id), [a.id]);

  const all = await getFeeDashboardData(admin.id, "ADMIN", YEAR);
  assert.deepEqual(all.map((u) => u.id).sort(), [a.id, b.id].sort());
});

test("SEPA: nur offene Beiträge mit Mandat, fehlerhafte IBAN wird gemeldet", async () => {
  const admin = await createUser({ role: "ADMIN" });
  const ok = await createMember({ iban: "DE89370400440532013000" });
  const badIban = await createMember({ iban: "DE00123" });
  const transfer = await createMember({ directDebit: false });
  const paid = await createMember({ iban: "DE89370400440532013000" });
  await setFeeStatus({ userId: paid.id, year: YEAR, field: "paid", value: true });

  const candidates = await getSepaCandidates(admin.id, YEAR);
  const byId = new Map(candidates.map((c) => [c.id, c]));

  assert.deepEqual([...byId.keys()].sort(), [ok.id, badIban.id].sort());
  assert.equal(byId.has(transfer.id), false);
  assert.equal(byId.get(ok.id)?.problem, null);
  assert.equal(byId.get(ok.id)?.amount, 60);
  assert.equal(byId.get(badIban.id)?.problem, "IBAN ungültig");
});
