import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getDatabaseUrl } from "./server/env";

/**
 * Der Passwort-Hash fehlt in jeder Abfrage, solange sie ihn nicht ausdrücklich
 * anfordert (`omit: { password: false }`, nur beim Login). Sonst landet er über
 * eine Seite, die den ganzen Datensatz an eine Client-Komponente reicht, im
 * Browser.
 */
function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: getDatabaseUrl() });
  return new PrismaClient({ adapter, omit: { user: { password: true } } });
}

const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
