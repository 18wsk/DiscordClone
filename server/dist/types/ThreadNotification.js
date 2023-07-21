"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = void 0;
const zod_1 = require("zod");
exports.NotificationSchema = zod_1.z.object({
    threadId: zod_1.z.string(),
    messagesSeen: zod_1.z.number(),
});
