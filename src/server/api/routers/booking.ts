// TODO: Ensure all db calls are async/await

import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

import chargeCreditCard from "../utils/charge-credit-card";
import generateInvoiceId from "../utils/invoiceId";

export const bookingRouter = createTRPCRouter({
    getAllBookedDates: publicProcedure.query(async ({ ctx }) => {
        const bookedArr = await ctx.prisma.booking.findMany();

        return bookedArr.map((el) => ({
            from: el.startDate,
            to: el.endDate,
        }));
    }),

    getByStartDate: publicProcedure.input(z.date()).query(({ input, ctx }) => {
        return ctx.prisma.booking.findFirst({
            where: { startDate: input },
        });
    }),

    getByEndDate: publicProcedure.input(z.date()).query(({ input, ctx }) => {
        return ctx.prisma.booking.findFirst({
            where: { endDate: input },
        });
    }),

    getByUserId: protectedProcedure
        .input(z.string())
        .query(({ input, ctx }) => {
            return ctx.prisma.booking.findMany({ where: { userId: input } });
        }),

    getByInvoiceId: publicProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            let data = await ctx.prisma.booking.findFirst({
                where: { invoiceId: input },
            });

            if (!data) {
                data = await ctx.prisma.booking.findFirst({
                    where: { id: { startsWith: input.slice(0, 10) } },
                });
            }

            return data;
        }),

    create: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                name: z.string(),
                email: z.string(),
                startDate: z.date(),
                endDate: z.date(),
            })
        )
        .mutation(async ({ input: bookingInfo, ctx }) => {
            const newBooking = await ctx.prisma.booking.create({
                data: bookingInfo,
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
