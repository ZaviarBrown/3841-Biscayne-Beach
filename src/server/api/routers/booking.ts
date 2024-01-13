import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const bookingRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const bookedArr = await ctx.prisma.booking.findMany();

        return bookedArr.map((el) => ({
            id: el.id,
            from: el.startDate,
            to: el.endDate,
        }));
    }),

    getAllFuture: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.booking.findMany({
            where: {
                startDate: {
                    gte: new Date(),
                },
            },
        });
    }),

    getAllPast: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.booking.findMany({
            where: {
                startDate: {
                    lte: new Date(),
                },
            },
        });
    }),

    getAllDetailed: publicProcedure.query(async ({ ctx }) => {
        const bookedArr = await ctx.prisma.booking.findMany();

        return bookedArr;
    }),

    getById: publicProcedure
        .input(z.string())
        .query(async ({ input: id, ctx }) => {
            return await ctx.prisma.booking.findUnique({ where: { id } });
        }),

    getByStartDate: publicProcedure
        .input(z.date())
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.booking.findFirst({
                where: { startDate: input },
            });
        }),

    getByEndDate: publicProcedure
        .input(z.date())
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.booking.findFirst({
                where: { endDate: input },
            });
        }),

    getByUserId: protectedProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.booking.findMany({
                where: { userId: input },
                // include: { Review: true },
                orderBy: { startDate: "asc" },
            });
        }),

    create: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                name: z.string(),
                email: z.string(),
                startDate: z.date(),
                endDate: z.date(),
                priceId: z.string(),
                price: z.number(),
                numberOfNights: z.number(),
            })
        )
        .mutation(async ({ input: bookingInfo, ctx }) => {
            const newBooking = await ctx.prisma.booking.create({
                data: { ...bookingInfo, status: "pending" },
            });

            return newBooking;
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                name: z.string().optional(),
                email: z.string().email().optional(),
                startDate: z.date().optional(),
                endDate: z.date().optional(),
                priceId: z.string().optional(),
                paymentId: z.string().nullable().optional(),
                numberOfNights: z.number().optional(),
                status: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const updatedBooking = await ctx.prisma.booking.update({
                    where: {
                        id: input.id,
                    },
                    data: input,
                });

                return updatedBooking;
            }

            throw new Error("Invalid userId");
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                refundPrice: z.number(),
                paymentId: z.string().nullable().optional(),
            })
        )
        .mutation(
            async ({ input: { id, userId, refundPrice, paymentId }, ctx }) => {
                if (paymentId) {
                    const refund = await ctx.stripe.refunds.create({
                        payment_intent: paymentId,
                        amount: refundPrice,
                    });

                    await ctx.prisma.cancelledBooking.create({
                        data: {
                            userId,
                            cancelDate: new Date(),
                            refundPrice: refundPrice ?? 0,
                            refundId: refund.id,
                        },
                    });
                }

                await ctx.prisma.booking.delete({
                    where: { id },
                });

                return "Successfully deleted";
            }
        ),
});
