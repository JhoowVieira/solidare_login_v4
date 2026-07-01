import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ 
    adapter,
    log: process.env.NODE_ENV === "development"
    ? ["query", "error", "warn"]
    : ["error"]
});

const connectDB = async () => {
    try {
        await prisma.$connect()
        console.log("BD conectado via Prisma")
    } catch (error) {
        console.error(`Erro de conexão com BD: ${error.message}`)
        process.exit(1)
    }
}

const disconnectDB = async () => {
    await prisma.$disconnect()
}

export { prisma, connectDB, disconnectDB};