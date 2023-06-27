"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const zod_1 = require("zod");
const User_1 = require("./User");
exports.MessageSchema = zod_1.z.object({
    user: User_1.UserSchema,
    payload: zod_1.z.string(),
    timeStamp: zod_1.z.string().nullable(),
});
