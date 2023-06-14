"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordSchema = void 0;
const zod_1 = require("zod");
exports.PasswordSchema = zod_1.z.object({
    password: zod_1.z.string().nullable(),
    iv: zod_1.z.string().nullable(),
});
