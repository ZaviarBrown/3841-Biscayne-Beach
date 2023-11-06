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
            from: el.startDate,
            to: el.endDate,
        }));
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
                invoiceId: z.string().optional(),
                transactionId: z.string().optional(),
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
        .input(z.string())
        .mutation(async ({ input: id, ctx }) => {
            await ctx.prisma.booking.delete({
                where: { id },
            });

            return "Successfully deleted";
        }),
});
