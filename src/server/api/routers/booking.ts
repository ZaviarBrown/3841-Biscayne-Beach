import { z } from "zod";
import ical from "node-ical";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
    adminProcedure,
} from "~/server/api/trpc";
import { convertToUTCNoonCST } from "~/utils/booking";

const get3rdPartyDates = async () => {
    const airbnbData = await ical.async.fromURL(
        "https://www.airbnb.com/calendar/ical/1124115159193989789.ics?s=1e0f560ce9919cbaa6b94a3578a50b37"
    );
    const vrboData = await ical.async.fromURL(
        "http://www.vrbo.com/icalendar/2dd45e8fad584978820f10ab8ee53a18.ics?nonTentative"
    );

    const dates = [];

    for (const key in airbnbData) {
        const val = airbnbData[key] as { start: Date; end: Date; uid: string };
        if (val.start) {
            dates.push({
                from: val.start,
                to: val.end,
                id: val.uid,
            });
        }
    }

    for (const key in vrboData) {
        const val = vrboData[key] as { start: Date; end: Date; uid: string };

        if (val.start) {
            dates.push({
                from: val.start,
                to: val.end,
                id: val.uid,
            });
        }
    }

    return dates;
};

export const bookingRouter = createTRPCRouter({
    getForCalendar: publicProcedure.query(async ({ ctx }) => {
        const bookedArr = await ctx.prisma.booking.findMany({
            where: {
                endDate: {
                    gte: new Date(),
                },
            },
        });
        const outsideBookings = await get3rdPartyDates();

        return [
            ...bookedArr.map((el) => ({
                id: el.id,
                from: el.startDate,
                to: el.endDate,
            })),
            ...outsideBookings,
        ];
    }),

    getAllFuture: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.booking.findMany({
            where: {
                startDate: {
                    gte: new Date(),
                },
            },
            orderBy: {
                startDate: "asc",
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
            orderBy: {
                startDate: "desc",
            },
        });
    }),

    getAllCancelled: adminProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.cancelledBooking.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                cancelDate: "desc",
            },
        });
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

    adminCreate: adminProcedure
        .input(
            z.object({
                bookingInfo: z.object({
                    userId: z.string(),
                    name: z.string(),
                    email: z.string().email(),
                    startDate: z.date(),
                    endDate: z.date(),
                    price: z.number(),
                    numberOfNights: z.number(),
                }),
                emailInfo: z.object({
                    to: z.string().email(),
                    subject: z.string(),
                    html: z.string(),
                }),
            })
        )
        .mutation(async ({ input: { bookingInfo, emailInfo }, ctx }) => {
            const newBooking = await ctx.prisma.booking.create({
                data: {
                    ...bookingInfo,
                    status: "admin",
                    startDate: convertToUTCNoonCST(bookingInfo.startDate),
                    endDate: convertToUTCNoonCST(bookingInfo.endDate),
                },
            });

            await ctx.sendEmail(emailInfo);

            return newBooking;
        }),

    create: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                name: z.string(),
                email: z.string().email(),
                startDate: z.date(),
                endDate: z.date(),
                priceId: z.string(),
                price: z.number(),
                numberOfNights: z.number(),
            })
        )
        .mutation(async ({ input: bookingInfo, ctx }) => {
            const newBooking = await ctx.prisma.booking.create({
                data: {
                    ...bookingInfo,
                    status: "pending",
                    startDate: convertToUTCNoonCST(bookingInfo.startDate),
                    endDate: convertToUTCNoonCST(bookingInfo.endDate),
                },
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
                bookingInfo: z.object({
                    id: z.string(),
                    userId: z.string(),
                    refundPrice: z.number(),
                    paymentId: z.string().nullable().optional(),
                }),
                emailInfo: z.object({
                    to: z.string().email(),
                    subject: z.string(),
                    html: z.string(),
                }),
            })
        )
        .mutation(
            async ({
                input: {
                    bookingInfo: { id, userId, paymentId, refundPrice },
                    emailInfo,
                },
                ctx,
            }) => {
                if (paymentId) {
                    const refund = await ctx.stripe.refunds.create({
                        payment_intent: paymentId,
                        amount: refundPrice,
                    });

                    const adminEmail = {
                        replyTo: emailInfo.to,
                        html: emailInfo.html,
                        subject: emailInfo.subject,
                    };

                    void ctx.sendEmail(emailInfo);
                    void ctx.sendEmail(adminEmail);

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

    deletePending: protectedProcedure
        .input(z.string())
        .mutation(async ({ input: id, ctx }) => {
            await ctx.prisma.booking.delete({
                where: { id },
            });

            return "Successfully deleted";
        }),
});
