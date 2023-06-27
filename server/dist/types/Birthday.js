"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirthDaySchema = void 0;
const zod_1 = require("zod");
exports.BirthDaySchema = zod_1.z.object({
    day: ((zod_1.z.string()).or(zod_1.z.number())).nullable(),
    month: ((zod_1.z.string()).or(zod_1.z.number())).nullable(),
    year: zod_1.z.string().nullable(),
});
