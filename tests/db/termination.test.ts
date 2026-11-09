import assert from "node:assert/strict";
import test, { beforeEach } from "node:test";
import { YEAR, createMember, createUser, prisma, resetDb } from "./setup";
import { setFeeStatus } from "../../src/lib/server/services/feeService";
import {
  processTerminations,
  resignMembership,
} from "../../src/lib/server/services/terminationService";
import {
  deleteAccountWithoutMembership,
  disableOwnLogin,
} from "../../src/lib/server/services/accountService";

beforeEach(resetDb);

function findUser(id: string) {
  return prisma.user.findUnique({ where: { id }, include: { fees: true } });
}

test("Austritt ohne offene Beiträge löscht das Konto sofort", async () => {
  const member = await createMember();
  await setFeeStatus({ userId: member.id, year: YEAR, field: "paid", value: true });

  await resignMembership(member.id);

  assert.equal(await findUser(member.id), null);
});

test("Austritt mit offenem Beitrag: Konto bleibt, bis bezahlt ist", async () => {
  const member = await createMember();
  // Angelegtes Folgejahr: schuldet niemand, der heute austritt.
  await prisma.memberFee.create({ data: { userId: member.id, year: YEAR + 1 } });

  const { openFees } = await resignMembership(member.id);
  assert.deepEqual(openFees.map((f) => f.year), [YEAR]);

  let after = await findUser(member.id);
  assert.equal(after?.status, "NON_MEMBER");
  assert.equal(after?.newsletter, false);
  // Das laufende Jahr ist jetzt festgeschrieben, das Folgejahr weg.
  assert.deepEqual(after?.fees.map((f) => [f.year, f.paid]), [[YEAR, false]]);

  // Noch offen: der Aufräumlauf lässt das Konto stehen.
  await processTerminations(true);
  assert.notEqual(await findUser(member.id), null);

  await setFeeStatus({ userId: member.id, year: YEAR, field: "paid", value: true });
  await processTerminations(true);
  after = await findUser(member.id);
  assert.equal(after, null);
  assert.equal(await prisma.membershipTermination.count(), 0);
});

test("Nichtmitglieder können nicht austreten", async () => {
  const user = await createUser();
  await assert.rejects(resignMembership(user.id), { code: "FORBIDDEN" });
});

test("Konto löschen: nicht mit Mitgliedschaft, nicht mit offenen Beiträgen", async () => {
  const member = await createMember();
  await assert.rejects(deleteAccountWithoutMembership(member.id), { code: "FORBIDDEN" });

  const owing = await createMember();
  await resignMembership(owing.id);
  await assert.rejects(deleteAccountWithoutMembership(owing.id), { code: "FORBIDDEN" });

  const plain = await createUser();
  await deleteAccountWithoutMembership(plain.id);

  assert.notEqual(await findUser(member.id), null);
  assert.notEqual(await findUser(owing.id), null);
  assert.equal(await findUser(plain.id), null);
});

test("Zugang sperren: beendet Sitzungen, für Admins gesperrt", async () => {
  const admin = await createMember({ role: "ADMIN" });
  await assert.rejects(disableOwnLogin(admin.id), { code: "FORBIDDEN" });

  const member = await createMember();
  await disableOwnLogin(member.id);
  const after = await findUser(member.id);
  assert.equal(after?.loginDisabled, true);
  assert.equal(after?.sessionVersion, member.sessionVersion + 1);
  assert.equal(after?.status, "REGULAR_MEMBER");
});
