import { z } from "zod";
import { getDB } from "../utils/db";
import { router, publicProcedure } from "../utils/trpc";

export const userRouter = router({
    userCreate: publicProcedure
        .input(z.object({ userName: z.string(), password: z.string(), birthday: z.string() }))
        .mutation(async (opts) => {
            const { userName, password, birthday } = opts.input;
            const db = getDB().collection("users");
            const user = await db.insertOne({ userName, password, birthday });
            return user;
    }),
    getUser: publicProcedure
        .input(z.object({ userName: z.string() }))
        .query(async (opts) => {
            const { userName } = opts.input;
            const db = getDB().collection("users");
            const user = await db.findOne({ userName });
            return user;
    })
})