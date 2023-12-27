import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const contactRouter = createTRPCRouter({});

// TODO: sendMessage

// getAll

// getAllPending

// getAllResolved

// markResolved
