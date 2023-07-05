"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadSchema = void 0;
const zod_1 = require("zod");
exports.ThreadSchema = zod_1.z.object({
    roomId: zod_1.z.string(),
    name: zod_1.z.string(),
    users: zod_1.z.array(zod_1.z.string()),
    messages: zod_1.z.array(zod_1.z.string()),
    creator: zod_1.z.string(),
    img: zod_1.z.string().nullable(),
});
