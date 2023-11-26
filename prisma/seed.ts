import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.pricing.create({
        data: {
            startDate: null,
            endDate: null,
            price: 30000,
            note: "Default price",
        },
    });
    await prisma.pricing.create({
        data: {
            startDate: null,
            endDate: null,
            price: 45000,
            note: "Weekend price",
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        void prisma.$disconnect();
    });
