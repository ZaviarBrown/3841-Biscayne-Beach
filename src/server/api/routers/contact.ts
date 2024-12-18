import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const contactRouter = createTRPCRouter({
    confirmationEmail: publicProcedure
        .input(
            z.object({
                to: z.string().email(),
                subject: z.string(),
                html: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            await ctx.sendEmail(input);
            return 'Success';
        }),
    contactSupportEmail: publicProcedure
        .input(
            z.object({
                replyTo: z.string().email(),
                subject: z.string(),
                html: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            await ctx.sendEmail(input);
            return 'Success';
        }),
});
