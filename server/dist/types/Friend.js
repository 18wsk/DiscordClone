"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendSchema = void 0;
const zod_1 = require("zod");
exports.FriendSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userName: zod_1.z.string().nullable(),
    pfp: zod_1.z.string().nullable(),
});
