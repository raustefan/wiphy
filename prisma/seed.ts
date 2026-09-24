import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    // Kein Standardpasswort: ein bekanntes Admin-Passwort in Produktion ist ein offenes Tor.
    const password = process.env.SEED_ADMIN_PASSWORD;
    if (!password || password.length < 12) {
        throw new Error("SEED_ADMIN_PASSWORD fehlt oder ist kürzer als 12 Zeichen.");
    }
    const hashed = await bcrypt.hash(password, 12);
    await prisma.user.upsert({
        where: { email: "admin@wiphy.de" },
        update: {},
        create: {
            email: "admin@wiphy.de",
            name: "Admin",
            vorname: "Admin",
            password: hashed,
            role: "ADMIN",
            emailVerified: true,
        },
    });
    console.log("✅ Admin user created");
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
