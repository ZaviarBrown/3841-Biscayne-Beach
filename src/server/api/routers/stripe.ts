import { z } from "zod";
import { env } from "~/env.mjs";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
    adminProcedure,
} from "~/server/api/trpc";
import { getBaseUrl } from "~/utils/api";
import { convertDollarsIntoCents } from "~/utils/booking";

export const stripeRouter = createTRPCRouter({
    getAllPrices: publicProcedure.query(async ({ ctx }) => {
        const prices = await ctx.stripe.prices.list();

        return prices.data.map(({ id, metadata, unit_amount }) => {
            if (unit_amount) {
                if (metadata.startDate && metadata.endDate) {
                    return {
                        id,
                        defaultPrice: false,
                        startDate: new Date(metadata.startDate),
                        endDate: new Date(metadata.endDate),
                        price: unit_amount / 100,
                    };
                } else {
                    return {
                        id,
                        defaultPrice: true,
                        price: unit_amount / 100,
                    };
                }
            } else
                return {
                    id,
                    defaultPrice: false,
                    price: 0,
                };
        });
    }),

    createPriceForBooking: publicProcedure
        .input(
            z.object({
                priceInUSD: z.string(),
                startDate: z.date(),
                endDate: z.date(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { priceInUSD, startDate, endDate } = input;

            const newPrice = await ctx.stripe.prices.create({
                currency: "usd",
                product: env.STRIPE_PRODUCT_ID,
                unit_amount: convertDollarsIntoCents(priceInUSD),
                metadata: {
                    startDate: startDate.toUTCString(),
                    endDate: endDate.toUTCString(),
                },
            });

            return newPrice;
        }),

    getCheckoutSession: protectedProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            const session = await ctx.stripe.checkout.sessions.retrieve(input);

            return {
                status: session.status,
                customer_email: session.customer_details?.email,
            };
        }),

    createCheckoutSession: protectedProcedure
        .input(z.object({ priceId: z.string(), url: z.string() }))
        .mutation(async ({ input: { priceId, url }, ctx }) => {
            const session = await ctx.stripe.checkout.sessions.create({
                ui_mode: "embedded",
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: "payment",
                return_url: `${url}/return?session_id={CHECKOUT_SESSION_ID}`,
            });

            return session;
        }),
});
