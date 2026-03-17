import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const hashed = await bcrypt.hash("admin123", 12);
    await prisma.user.upsert({
        where: { email: "admin@wiphy.de" },
        update: {},
        create: {
            email: "admin@wiphy.de",
            name: "Admin",
            password: hashed,
            role: "ADMIN",
        },
    });
    console.log("✅ Admin user created");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });