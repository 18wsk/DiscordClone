"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../utils/trpc");
const server_1 = require("@trpc/server");
const Message_1 = require("../types/Message");
const db_1 = require("../utils/db");
const Friend_1 = require("../types/Friend");
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
        messages: zod_1.z.array(zod_1.z.string()),
        creator: zod_1.z.string(),
        img: zod_1.z.string().nullable(),
    }))
        .mutation(async ({ input: { roomId, name, users, messages, creator, img, } }) => {
        const checkThreadName = await (0, db_1.countThreadByName)({ threadName: name });
        if (checkThreadName !== 0)
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Community alrady exists.' });
        const thread = await (0, db_1.addThread)({ thread: {
                roomId,
                name,
                users,
                messages,
                creator,
                img,
            } });
        if (!thread) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Thread not found' });
        }
        return thread;
    }),
    getThreadMessages: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        roomId: zod_1.z.string().nullable(),
    }))
        .query(async ({ input: { roomId } }) => {
        const messages = await (0, db_1.getThreadMessages)({ threadId: roomId });
        if (!messages) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Thread not found' });
        }
        return messages;
    }),
    addMessage: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        message: Message_1.MessageSchema,
    }))
        .mutation(async ({ input: { message } }) => {
        const addedMessage = await (0, db_1.addMessage)({ message });
        if (!addedMessage) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Could not send message.' });
        }
        return addedMessage;
    }),
    addFriend: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        currentId: zod_1.z.string(),
        friend: Friend_1.FriendSchema,
    }))
        .mutation(async ({ input: { currentId, friend } }) => {
        const updatedThread = await (0, db_1.addFriend)({ currentId: currentId, friend: friend });
        if (!updatedThread) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Could not add friend.' });
        }
        return updatedThread;
    }),
    addFriendToThread: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        threadId: zod_1.z.string(),
        friendId: zod_1.z.string(),
    }))
        .mutation(async ({ input: { threadId, friendId } }) => {
        const userInThread = await (0, db_1.getThreadByRoomId)({ roomId: threadId });
        if (!userInThread) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Error validating community - Please try again.' });
        }
        if (userInThread.users.includes(friendId)) {
            throw new server_1.TRPCError({ code: 'CONFLICT', message: 'This friend is already in this community.' });
        }
        ;
        const updatedThread = await (0, db_1.addUserToThread)({ userId: friendId, threadId: threadId });
        if (!updatedThread) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Could not add friend to community.' });
        }
        return updatedThread;
    }),
    getUsersToMakeFriends: trpc_1.protectedProcedure
        .input(zod_1.z.object({}))
        .query(async () => {
        try {
            const users = await (0, db_1.getUsers)();
            return users;
        }
        catch (err) {
            throw new server_1.TRPCError({ code: 'CONFLICT', message: 'Could not load users.' });
        }
    }),
});
