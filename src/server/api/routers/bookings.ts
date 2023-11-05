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
                bookingInfo: z.object({
                    userId: z.string(),
                    name: z.string(),
                    email: z.string(),
                    startDate: z.date(),
                    endDate: z.date(),
                }),
                cardInfo: z.object({
                    cardNum: z.string(),
                    expDate: z.string(),
                    cardCode: z.string(),
                    totalPrice: z.number(),
                }),
            })
        )
        .mutation(async ({ input: { bookingInfo, cardInfo }, ctx }) => {
            const { userId, email, startDate, endDate } = bookingInfo;

            if (ctx.session.user.id === userId) {
                const newBooking = await ctx.prisma.booking.create({
                    data: bookingInfo,
                });

                const invoiceId = generateInvoiceId(
                    newBooking.id,
                    newBooking.createdAt
                );

                const transaction = await chargeCreditCard({
                    ...cardInfo,
                    invoiceId,
                    email,
                    dates: `From ${startDate.toDateString()} To ${endDate.toDateString()}`,
                });

                if (transaction.wasSuccessful) {
                    const updatedBooking = await ctx.prisma.booking.update({
                        where: {
                            id: newBooking.id,
                        },
                        data: {
                            invoiceId,
                            transactionId: transaction.transactionId,
                        },
                    });

                    return { updatedBooking };
                } else {
                    await ctx.prisma.booking.delete({
                        where: { id: newBooking.id },
                    });

                    return "Deleted";
                }
            }

            throw new Error("Invalid userId");
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
        .input(z.object({ id: z.string(), userId: z.string() }))
        .mutation(async ({ input: { id, userId }, ctx }) => {
            if (ctx.session.user.id === userId) {
                await ctx.prisma.booking.delete({
                    where: { id },
                });

                return "Successfully deleted";
            }

            throw new Error("Invalid userId");
        }),
});
