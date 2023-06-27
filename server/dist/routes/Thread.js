"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../utils/trpc");
exports.Thread = (0, trpc_1.router)({
    getAccount: trpc_1.protectedProcedure
        .input(zod_1.z.object({ userId: zod_1.z.string().nullish() }))
        .query(async ({ ctx }) => {
    })
});
