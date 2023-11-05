import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
    // TODO: protectedProcedure
    createNewAdmin: publicProcedure
        .input(z.string())
        .mutation(async ({ input: email, ctx }) => {
            const newAdmin = await ctx.prisma.user.create({
                data: {
                    email,
                    role: "admin",
                },
            });

            return newAdmin;
        }),

    // TODO: changeRole

    // TODO: find one

    getAll: publicProcedure.query(async ({ ctx }) => {
        const allUsers = await ctx.prisma.user.findMany();

        return allUsers;
    }),
});
