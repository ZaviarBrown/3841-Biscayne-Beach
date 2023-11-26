import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
    adminProcedure,
} from "~/server/api/trpc";

export const pricingRouter = createTRPCRouter({
    getAllValidWindows: publicProcedure.query(async ({ ctx }) => {
        const [defaultPrice, weekendPrice] =
            await ctx.prisma.pricingWindows.findMany({
                where: {
                    startDate: null,
                },
            });

        const customPrices = await ctx.prisma.pricingWindows.findMany({
            where: {
                endDate: {
                    gte: new Date(),
                },
            },
            orderBy: {
                startDate: "asc",
            },
        });

        return {
            defaultPrice: defaultPrice?.price ?? 30000,
            weekendPrice: weekendPrice?.price ?? 45000,
            customPrices,
        };
    }),

    // TODO: Create custom priced days
    // createPrice: adminProcedure.input().mutation(),
});
