import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    adminProcedure,
} from "~/server/api/trpc";
import { convertDollarsIntoCents } from "~/utils/booking";

export interface PricingWindowType {
    id: string;
    startDate: Date;
    endDate: Date;
    price: number;
    note: string;
}

export const pricingRouter = createTRPCRouter({
    getAllValidWindows: publicProcedure.query(async ({ ctx }) => {
        const [defaultPrice, weekendPrice] =
            await ctx.prisma.pricingWindow.findMany({
                where: {
                    startDate: null,
                },
            });

        const customPrices = (await ctx.prisma.pricingWindow.findMany({
            where: {
                startDate: {
                    not: null,
                },
                endDate: {
                    not: null,
                    gte: new Date(),
                },
            },
            orderBy: {
                startDate: "asc",
            },
        })) as PricingWindowType[];

        return {
            defaultPrice: defaultPrice?.price ?? 28500,
            weekendPrice: weekendPrice?.price ?? 30000,
            customPrices,
        };
    }),

    createWindow: adminProcedure
        .input(
            z.object({
                startDate: z.date(),
                endDate: z.date(),
                priceInDollars: z.string(),
                note: z.string(),
            })
        )
        .mutation(
            async ({
                input: { startDate, endDate, priceInDollars, note },
                ctx,
            }) => {
                const price = convertDollarsIntoCents(priceInDollars);

                const newWindow = await ctx.prisma.pricingWindow.create({
                    data: {
                        startDate,
                        endDate,
                        price,
                        note,
                    },
                });

                return newWindow;
            }
        ),

    updateWindow: adminProcedure
        .input(
            z.object({
                id: z.string(),
                startDate: z.date(),
                endDate: z.date(),
                priceInDollars: z.string(),
                note: z.string(),
            })
        )
        .mutation(
            async ({
                input: { id, startDate, endDate, priceInDollars, note },
                ctx,
            }) => {
                const price = convertDollarsIntoCents(priceInDollars);

                const updatedWindow = await ctx.prisma.pricingWindow.update({
                    where: {
                        id,
                    },

                    data: {
                        startDate,
                        endDate,
                        price,
                        note,
                    },
                });

                return updatedWindow;
            }
        ),

    deleteWindow: adminProcedure
        .input(z.string())
        .mutation(async ({ input: id, ctx }) => {
            await ctx.prisma.pricingWindow.delete({ where: { id } });

            return "Successfully deleted";
        }),
});
