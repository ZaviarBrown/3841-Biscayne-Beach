import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    // TODO: protectedProcedure
    createAdmin: publicProcedure
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

    getAll: publicProcedure.query(async ({ ctx }) => {
        const allUsers = await ctx.prisma.user.findMany();

        return allUsers;
    }),
});
