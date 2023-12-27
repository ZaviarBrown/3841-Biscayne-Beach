import { readdirSync } from "fs";
import { z } from "zod";
import { env } from "~/env.mjs";
import path from "path";
import { fileURLToPath } from "url";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const imagesRouter = createTRPCRouter({
    getAll: publicProcedure.query(() => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        console.log(__dirname);

        const images: string[] = readdirSync("./public/allPhotos");

        return images;
    }),
});
