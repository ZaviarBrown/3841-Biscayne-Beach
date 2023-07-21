import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

import chargeCreditCard from "../paymentSDK/charge-credit-card";

export const bookingRouter = createTRPCRouter({
    createBooking: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                email: z.string(),
                startDate: z.date(),
                endDate: z.date(),
                cardNumber: z.string(),
                expDate: z.string(),
                cardCode: z.string(),
                totalPrice: z.number(),
            })
        )
        .mutation((ctx, input) => {}),
});
