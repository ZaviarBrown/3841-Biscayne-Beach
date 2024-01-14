import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendEmail } from "~/server/email";

export const contactRouter = createTRPCRouter({
    confirmationEmail: publicProcedure
        .input(
            z.object({
                to: z.string().email(),
                subject: z.string(),
                html: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            await sendEmail(input);
            return "Success";
        }),
    contactSupportEmail: publicProcedure
        .input(
            z.object({
                from: z.string().email(),
                subject: z.string(),
                html: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            await sendEmail({ ...input, replyTo: input.from });
            return "Success";
        }),
});
