/**
 * Gemeinsame Vorbereitung der Datenbanktests (`pnpm test:db`).
 *
 * Diese Tests leeren vor jedem Fall alle Tabellen. Sie laufen deshalb nur
 * gegen eine Datenbank, deren Name auf `_test` endet — nie gegen die
 * Entwicklungs- oder Produktionsdatenbank.
 */
import { after } from "node:test";
import type { Prisma } from "@prisma/client";
import { prisma } from "../../src/lib/prisma";

const dbName = new URL(process.env.DATABASE_URL ?? "postgresql://localhost/").pathname.slice(1);
if (!dbName.endsWith("_test")) {
  throw new Error(
    `Datenbanktests brauchen eine Datenbank mit Namen auf "_test", bekommen: "${dbName}". Über \`pnpm test:db\` starten.`,
  );
}

// Pepper für die Pseudonymisierung im Sicherheitsprotokoll (Konto löschen).
process.env.NEXTAUTH_SECRET ??= "test-secret";

// Der Verbindungspool hielte den Testprozess sonst offen.
after(() => prisma.$disconnect());

export { prisma };

export const YEAR = new Date().getFullYear();

/** Monatsbeiträge der Tests: 5 € regulär, 2 € ermäßigt. */
export const RATES = { regular: 5, student: 2 };

export async function resetDb() {
  const tables = await prisma.$queryRaw<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'`;
  await prisma.$executeRawUnsafe(
    `TRUNCATE ${tables.map((t) => `"${t.tablename}"`).join(", ")} CASCADE`,
  );
  await prisma.feeDefault.create({ data: { year: 2000, ...RATES } });
  // Austrittsmails aus: die Tests sollen nie einen SMTP-Server ansprechen.
  await prisma.featureFlag.createMany({
    data: [
      { key: "MEMBERSHIP_TERMINATION_MAIL", enabled: false },
      { key: "MEMBERSHIP_TERMINATION_CONFIRMATION_MAIL", enabled: false },
    ],
  });
}

let counter = 0;

export function createUser(data: Partial<Prisma.UserCreateInput> = {}) {
  counter += 1;
  return prisma.user.create({
    data: {
      email: `user${counter}@example.org`,
      passwordHash: "x",
      firstName: "Marie",
      lastName: `Muster${counter}`,
      ...data,
    },
  });
}

/** Ordentliches Mitglied seit dem Vorjahr — schuldet das laufende Jahr voll. */
export function createMember(data: Partial<Prisma.UserCreateInput> = {}) {
  return createUser({
    status: "REGULAR_MEMBER",
    joinedAt: new Date(YEAR - 1, 5, 15),
    directDebit: true,
    ...data,
  });
}
