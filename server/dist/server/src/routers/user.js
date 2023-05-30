"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const zod_1 = require("zod");
const db_1 = require("../utils/db");
const trpc_1 = require("../utils/trpc");
exports.userRouter = (0, trpc_1.router)({
    userCreate: trpc_1.publicProcedure
        .input(zod_1.z.object({ userName: zod_1.z.string(), password: zod_1.z.string(), birthday: zod_1.z.string() }))
        .mutation(async (opts) => {
        const { userName, password, birthday } = opts.input;
        const db = (0, db_1.getDB)().collection("users");
        const user = await db.insertOne({ userName, password, birthday });
        return user;
    }),
    getUser: trpc_1.publicProcedure
        .input(zod_1.z.object({ userName: zod_1.z.string() }))
        .query(async (opts) => {
        const { userName } = opts.input;
        const db = (0, db_1.getDB)().collection("users");
        const user = await db.findOne({ userName });
        return user;
    })
});
