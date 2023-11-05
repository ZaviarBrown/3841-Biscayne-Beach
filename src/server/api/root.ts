import { createTRPCRouter } from "./trpc";

import { adminRouter } from "./routers/admin";
import { bookingRouter } from "./routers/booking";
import { contactRouter } from "./routers/contact";
import { reviewRouter } from "./routers/review";
import { stripeRouter } from "./routers/stripe";
import { transactionRouter } from "./routers/transaction";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    admin: adminRouter,
    booking: bookingRouter,
    contact: contactRouter,
    review: reviewRouter,
    stripe: stripeRouter,
    transaction: transactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
