import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dates = [
    {
        startDate: null,
        endDate: null,
        price: 30000,
        note: "Default price",
    },
    {
        startDate: null,
        endDate: null,
        price: 45000,
        note: "Weekend price",
    },
    {
        startDate: new Date(2024, 1, 9), // Feb 9
        endDate: new Date(2024, 1, 11), // Feb 11
        price: 60000,
        note: "Mardi Gras Parade",
    },
    {
        startDate: new Date(2024, 1, 12), // Feb 12
        endDate: new Date(2024, 1, 13), // Feb 13
        price: 45000,
        note: "Mardi Gras",
    },
    {
        startDate: new Date(2024, 2, 1), // March 1
        endDate: new Date(2024, 2, 22), // March 22
        price: 75000,
        note: "Spring Break",
    },
    {
        startDate: new Date(2024, 3, 5), // April 5
        endDate: new Date(2024, 3, 8), // April 8
        price: 60000,
        note: "Eclipse",
    },
    {
        startDate: new Date(2024, 4, 1), // May 1
        endDate: new Date(2024, 4, 31), // May 31
        price: 60000,
        note: "May's default price",
    },
    {
        startDate: new Date(2024, 5, 1), // June 1
        endDate: new Date(2024, 5, 30), // June 30
        price: 70000,
        note: "June's default price",
    },
    {
        startDate: new Date(2024, 6, 1), // July 1
        endDate: new Date(2024, 6, 6), // July 6
        price: 75000,
        note: "July 4th",
    },
    {
        startDate: new Date(2024, 6, 7), // July 7
        endDate: new Date(2024, 6, 31), // July 31
        price: 55000,
        note: "July's default price",
    },
    {
        startDate: new Date(2024, 7, 30), // Aug 30
        endDate: new Date(2024, 8, 2), // Sept 2
        price: 70000,
        note: "Labor Day",
    },
];

const admins = [
    {
        email: "brown.zaviar@gmail.com",
        role: "admin",
    },
    {
        email: "sworrall@drivegc.com",
        role: "admin",
    },
    {
        email: "worrallstephena@gmail.com",
        role: "admin",
    },
];

async function main() {
    for (const data of dates) {
        await prisma.pricingWindow.create({ data });
    }

    for (const data of admins) {
        await prisma.user.create({ data });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        void prisma.$disconnect();
    });
