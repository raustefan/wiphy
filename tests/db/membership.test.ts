import assert from "node:assert/strict";
import test, { beforeEach } from "node:test";
import { YEAR, createUser, prisma, resetDb } from "./setup";
import { membershipApplicationSchema } from "../../src/lib/membershipFormSchemas";
import {
  approveApplication,
  rejectApplication,
  submitApplication,
  withdrawApplication,
} from "../../src/lib/server/services/membershipService";

beforeEach(resetDb);

/** Gültiger Antrag per Überweisung, wie ihn das Formular abliefert. */
const input = membershipApplicationSchema.parse({
  firstName: "Marie",
  lastName: "Musterfrau",
  birthDate: "2000-01-01",
  addressLine1: "Musterstraße 1",
  postalCode: "89073",
  city: "Ulm",
  countryCode: "DE",
  zahlungsweise: "ueberweisung",
  bylawsAccepted: "on",
  privacyAccepted: "on",
});

function submit(userId: string) {
  return submitApplication(input, { userId, ipHash: null, userAgent: null });
}

const joinedAt = new Date(YEAR, 0, 15);

test("Antrag: Konto bleibt Nichtmitglied, Profildaten werden übernommen", async () => {
  const user = await createUser();
  const application = await submit(user.id);

  assert.equal(application.status, "SUBMITTED");
  const after = await prisma.user.findUniqueOrThrow({ where: { id: user.id } });
  assert.equal(after.status, "NON_MEMBER");
  assert.equal(after.city, "Ulm");
  assert.equal(after.directDebit, false);
});

test("zweiter Antrag bei offenem Antrag wird abgelehnt", async () => {
  const user = await createUser();
  await submit(user.id);
  await assert.rejects(submit(user.id), { code: "CONFLICT" });
  assert.equal(await prisma.membershipApplication.count(), 1);
});

test("Mitglieder können keinen Antrag stellen", async () => {
  const user = await createUser({ status: "REGULAR_MEMBER" });
  await assert.rejects(submit(user.id), { code: "FORBIDDEN" });
});

test("Aufnahme: Status, nächste Mitglieds-ID und Beitrag des Eintrittsjahres", async () => {
  await createUser({ status: "REGULAR_MEMBER", memberNumber: 41 });
  const admin = await createUser({ role: "ADMIN" });
  const user = await createUser();
  const application = await submit(user.id);

  await approveApplication({ id: application.id, adminId: admin.id, joinedAt, note: null });

  const after = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
    include: { fees: true },
  });
  assert.equal(after.status, "REGULAR_MEMBER");
  assert.equal(after.memberNumber, 42);
  // 12 × 5 € = 60 €, ohne Lastschrift +10 % → 66 €.
  assert.deepEqual(
    after.fees.map((f) => [f.year, f.amount, f.paid]),
    [[YEAR, 66, false]],
  );
  const decided = await prisma.membershipApplication.findUniqueOrThrow({
    where: { id: application.id },
  });
  assert.equal(decided.status, "ACCEPTED");
  assert.equal(decided.decidedById, admin.id);
});

test("über einen Antrag wird nur einmal entschieden", async () => {
  const admin = await createUser({ role: "ADMIN" });
  const user = await createUser();
  const application = await submit(user.id);
  const params = { id: application.id, adminId: admin.id, joinedAt, note: null };

  await approveApplication(params);
  await assert.rejects(approveApplication(params), { code: "CONFLICT" });
  await assert.rejects(rejectApplication(params), { code: "CONFLICT" });
  assert.equal(await prisma.memberFee.count(), 1);
});

test("vergebene Mitglieds-ID: Aufnahme scheitert, nichts ändert sich", async () => {
  await createUser({ status: "REGULAR_MEMBER", memberNumber: 7 });
  const admin = await createUser({ role: "ADMIN" });
  const user = await createUser();
  const application = await submit(user.id);

  await assert.rejects(
    approveApplication({ id: application.id, adminId: admin.id, joinedAt, note: null, memberNumber: 7 }),
    { code: "CONFLICT" },
  );
  const after = await prisma.user.findUniqueOrThrow({ where: { id: user.id } });
  assert.equal(after.status, "NON_MEMBER");
  assert.equal(await prisma.memberFee.count(), 0);
});

test("Ablehnung: kein Mitglied, neuer Antrag möglich", async () => {
  const admin = await createUser({ role: "ADMIN" });
  const user = await createUser();
  const application = await submit(user.id);

  await rejectApplication({ id: application.id, adminId: admin.id, note: "unvollständig" });

  const after = await prisma.user.findUniqueOrThrow({ where: { id: user.id } });
  assert.equal(after.status, "NON_MEMBER");
  assert.equal((await submit(user.id)).status, "SUBMITTED");
});

test("zurücknehmen kann nur, wer den Antrag gestellt hat", async () => {
  const user = await createUser();
  const other = await createUser();
  const application = await submit(user.id);

  await assert.rejects(withdrawApplication(application.id, other.id), { code: "NOT_FOUND" });
  await withdrawApplication(application.id, user.id);

  const after = await prisma.membershipApplication.findUniqueOrThrow({
    where: { id: application.id },
  });
  assert.equal(after.status, "WITHDRAWN");
});
