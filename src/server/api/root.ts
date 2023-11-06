import { createTRPCRouter } from "./trpc";

import { userRouter } from "./routers/user";
import { bookingRouter } from "./routers/booking";
import { contactRouter } from "./routers/contact";
import { reviewRouter } from "./routers/review";
import { stripeRouter } from "./routers/stripe";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    booking: bookingRouter,
    contact: contactRouter,
    review: reviewRouter,
    stripe: stripeRouter,
    user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
