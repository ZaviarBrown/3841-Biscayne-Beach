import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
        DATABASE_URL: z.string().url(),
        NODE_ENV: z.enum(["development", "test", "production"]),
        NEXTAUTH_SECRET:
            process.env.NODE_ENV === "production"
                ? z.string().min(1)
                : z.string().min(1).optional(),
        NEXTAUTH_URL: z.preprocess(
            // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
            // Since NextAuth.js automatically uses the VERCEL_URL if present.
            (str) => process.env.VERCEL_URL ?? str,
            // VERCEL_URL doesn't include `https` so it cant be validated as a URL
            process.env.VERCEL ? z.string().min(1) : z.string().url()
        ),
        PROD_URL: z.string().url(),
        // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string(),
        STRIPE_SECRET: z.string(),
        STRIPE_PRODUCT_ID: z.string(),
        EMAIL_USER: z.string().email(),
        EMAIL_PASSWORD: z.string(),
    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
        NEXT_PUBLIC_STRIPE_PUBLIC: z.string(),
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
        NEXT_PUBLIC_REFUND_FEE: z.string(),
        NEXT_PUBLIC_PURCHASE_FEE: z.string(),
        NEXT_PUBLIC_TAX_RATE: z.string(),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        PROD_URL: process.env.PROD_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        STRIPE_SECRET: process.env.STRIPE_SECRET,
        STRIPE_PRODUCT_ID: process.env.STRIPE_PRODUCT_ID,
        NEXT_PUBLIC_STRIPE_PUBLIC: process.env.NEXT_PUBLIC_STRIPE_PUBLIC,
        NEXT_PUBLIC_REFUND_FEE: process.env.NEXT_PUBLIC_REFUND_FEE,
        NEXT_PUBLIC_PURCHASE_FEE: process.env.NEXT_PUBLIC_PURCHASE_FEE,
        NEXT_PUBLIC_TAX_RATE: process.env.NEXT_PUBLIC_TAX_RATE,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    },
});
