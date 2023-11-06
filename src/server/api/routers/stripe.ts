import { z } from "zod";
import { env } from "~/env.mjs";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
    adminProcedure,
} from "~/server/api/trpc";
import { getBaseUrl } from "~/utils/api";

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

    createPrice: adminProcedure
        .input(
            z
                .object({
                    priceInUSD: z.number(),
                    startDate: z.date().optional(),
                    endDate: z.date().optional(),
                    newDefault: z.boolean(),
                })
                .superRefine((input, ctx) => {
                    if (!input.newDefault) {
                        if (!input.startDate) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                path: ["startDate"],
                                message:
                                    "startDate is required when newDefault is false",
                            });
                        }
                        if (!input.endDate) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                path: ["endDate"],
                                message:
                                    "endDate is required when newDefault is false",
                            });
                        }
                    }
                })
        )
        .mutation(async ({ input, ctx }) => {
            const { priceInUSD, startDate, endDate, newDefault } = input;

            let newPrice;

            if (!newDefault && startDate && endDate) {
                newPrice = await ctx.stripe.prices.create({
                    currency: "usd",
                    product: env.STRIPE_PRODUCT_ID,
                    unit_amount: Math.floor(priceInUSD * 100),
                    metadata: {
                        startDate: startDate.toUTCString(),
                        endDate: endDate.toUTCString(),
                    },
                });
            } else {
                const { default_price } = await ctx.stripe.products.retrieve(
                    env.STRIPE_PRODUCT_ID
                );

                newPrice = await ctx.stripe.prices.create({
                    currency: "usd",
                    product: env.STRIPE_PRODUCT_ID,
                    unit_amount: Math.floor(priceInUSD * 100),
                });

                await ctx.stripe.products.update(env.STRIPE_PRODUCT_ID, {
                    default_price: newPrice.id,
                });

                if (typeof default_price === "string") {
                    await ctx.stripe.prices.update(default_price, {
                        active: false,
                    });
                }
            }

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
        .input(z.object({ priceId: z.string(), numberOfNights: z.number() }))
        .mutation(async ({ input: { priceId, numberOfNights }, ctx }) => {
            const session = await ctx.stripe.checkout.sessions.create({
                ui_mode: "embedded",
                line_items: [
                    {
                        price: priceId,
                        quantity: numberOfNights,
                    },
                ],
                mode: "payment",
                return_url: `${getBaseUrl()}/return?session_id={CHECKOUT_SESSION_ID}`,
            });

            return session;
        }),
});
