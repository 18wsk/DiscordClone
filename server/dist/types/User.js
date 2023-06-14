"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
const Password_1 = require("./Password");
const Thread_1 = require("./Thread");
exports.UserSchema = zod_1.z.object({
    userId: zod_1.z.string().nullable(),
    userName: zod_1.z.string().nullable(),
    email: zod_1.z.string().nullable(),
    password: Password_1.PasswordSchema,
    birthday: zod_1.z.string().nullable(),
    threads: zod_1.z.array(Thread_1.ThreadSchema)
});
