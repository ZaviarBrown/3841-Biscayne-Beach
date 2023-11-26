import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
    adminProcedure,
} from "~/server/api/trpc";

export const pricingRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const [defaultPrice, weekendPrice] = await ctx.prisma.pricing.findMany({
            where: {
                startDate: null,
            },
        });

        const customPrices = await ctx.prisma.pricing.findMany({
            where: {
                endDate: {
                    gte: new Date(),
                },
            },
            orderBy: {
                startDate: "asc",
            },
        });

        return { defaultPrice, weekendPrice, customPrices };
    }),

    // TODO: Create custom priced days
    // createPrice: adminProcedure.input().mutation(),
});
