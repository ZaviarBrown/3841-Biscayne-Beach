import { createTRPCRouter } from "~/server/api/trpc";
import { paymentRouter } from "~/server/api/routers/payment";
import { bookingRouter } from "./routers/bookings";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    payment: paymentRouter,
    bookings: bookingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
