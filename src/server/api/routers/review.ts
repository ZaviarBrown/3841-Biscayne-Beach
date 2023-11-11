import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.review.findMany();
    }),

    getOne: publicProcedure
        .input(z.string())
        .query(async ({ input: id, ctx }) => {
            return await ctx.prisma.review.findUnique({ where: { id } });
        }),

    getByUserId: protectedProcedure
        .input(z.string())
        .query(async ({ input: userId, ctx }) => {
            return await ctx.prisma.review.findMany({ where: { userId } });
        }),

    create: protectedProcedure
        .input(
            z.object({
                text: z.string(),
                rating: z.number(),
                bookingId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const duplicateReview = await ctx.prisma.review.findFirst({
                where: { bookingId: input.bookingId },
            });

            if (duplicateReview)
                throw new Error("Can't have more than 1 review per booking");

            const newReview = await ctx.prisma.review.create({
                data: { ...input, userId: ctx.session.user.id },
            });

            return newReview;
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                text: z.string().optional(),
                rating: z.number().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const updatedReview = await ctx.prisma.review.update({
                where: { id: input.id },
                data: input,
            });

            return updatedReview;
        }),
});
