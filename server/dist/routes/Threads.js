"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../utils/trpc");
const server_1 = require("@trpc/server");
const Message_1 = require("../types/Message");
const db_1 = require("../utils/db");
exports.Thread = (0, trpc_1.router)({
    getThreads: trpc_1.protectedProcedure
        .input(zod_1.z.object({}))
        .query(async ({ ctx }) => {
        const threads = await (0, db_1.getUsersThreads)({ userId: ctx.userId });
        if (!threads) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Error Loading User Profile. Please try again.' });
        }
        return threads;
    }),
    addThread: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        roomId: zod_1.z.string(),
        name: zod_1.z.string(),
        users: zod_1.z.array(zod_1.z.string()),
        messages: zod_1.z.array(Message_1.MessageSchema),
        creator: zod_1.z.string(),
    }))
        .mutation(async ({ input: { roomId, name, users, messages, creator, } }) => {
        const checkThreadName = await (0, db_1.countThreadByName)({ threadName: name });
        if (checkThreadName !== 0)
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Community alrady exists.' });
        const thread = await (0, db_1.addThread)({ thread: {
                roomId,
                name,
                users,
                messages,
                creator,
            } });
        if (!thread) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Thread not found' });
        }
        return thread;
    })
});
