import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
    adminProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    createNewAdmin: adminProcedure
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

    changeRole: adminProcedure
        .input(z.string())
        .mutation(async ({ input: id, ctx }) => {
            const updatedToAdmin = await ctx.prisma.user.update({
                where: { id },
                data: {
                    role: "admin",
                },
            });

            return updatedToAdmin;
        }),

    

    getAll: publicProcedure.query(async ({ ctx }) => {
        const allUsers = await ctx.prisma.user.findMany();

        return allUsers;
    }),
});
