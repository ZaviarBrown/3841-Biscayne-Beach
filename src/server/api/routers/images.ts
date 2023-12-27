import { readdirSync } from "fs";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const imagesRouter = createTRPCRouter({
    getAll: publicProcedure.query(() => {
        console.log(readdirSync("./src"));

        const images: string[] = readdirSync("./public/allPhotos");

        return images;
    }),
});
