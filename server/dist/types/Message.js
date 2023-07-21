"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const zod_1 = require("zod");
exports.MessageSchema = zod_1.z.object({
    user: zod_1.z.object({
        userId: zod_1.z.string(),
        userName: zod_1.z.string(),
        pfp: zod_1.z.string().nullable(),
        status: zod_1.z.boolean().nullable(),
    }),
    payload: zod_1.z.string(),
    roomId: zod_1.z.string(),
    timeStamp: zod_1.z.string().nullable(),
});
