import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import chargeCreditCard from "../utils/charge-credit-card";

export const paymentRouter = createTRPCRouter({
    testCharge: publicProcedure.mutation(() => {
        // chargeCreditCard();
        return "Hello from testCharge :)";
    }),
});
