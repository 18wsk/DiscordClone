"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const trpc_js_1 = require("./trpc.js");
const zod_1 = require("zod");
const userRouter = (0, trpc_js_1.router)({
    userCreate: trpc_js_1.publicProcedure
        .input(zod_1.z.object({ userName: zod_1.z.string(), password: zod_1.z.string(), birthday: zod_1.z.string() }))
        .mutation(async (opts) => {
        const { userName, password, birthday } = opts.input;
        const db = (0, db_1.getDB)().collection("users");
        const user = await db.create({ userName, password, birthday });
        console.log(user);
        return user;
    })
});
