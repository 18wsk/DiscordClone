import { z } from 'zod';
import { protectedProcedure, router } from '../utils/trpc';
import { TRPCError } from '@trpc/server';
import { MessageSchema } from '../types/Message';
import { addFriend, addMessage, addThread, addUserToThread, countThreadByName, getThreadByRoomId, getThreadMessages, getUsers, getUsersThreads } from '../utils/db';
import { FriendSchema } from '../types/Friend';

export const Thread = router({
    getThreads: protectedProcedure
        .input(z.object({}))
        .query(async({ ctx }) => {
            const threads = await getUsersThreads({ userId: ctx.userId });
            if (!threads) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Error Loading User Profile. Please try again.' });
            }
            return threads;
        }),
    addThread: protectedProcedure
        .input(z.object({ 
            roomId: z.string(),
            name: z.string(),
            users: z.array(z.string()),
            messages: z.array(z.string()),
            creator: z.string(),
            img: z.string().nullable(),
        }))
        .mutation(async({input:  { 
            roomId,
            name,
            users,
            messages,
            creator,
            img,
        }}) => {
            const checkThreadName = await countThreadByName({ threadName: name });
            if (checkThreadName !== 0)  throw new TRPCError({ code: 'NOT_FOUND', message: 'Community alrady exists.' });
            const thread = await addThread({ thread: {
                roomId,
                name,
                users,
                messages,
                creator,
                img,
            }});
            if (!thread) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Thread not found' });
            }
            return thread;
        }),
    getThreadMessages: protectedProcedure
        .input(z.object({
            roomId: z.string().nullable(),
        }))
        .query(async({ input: { roomId } }) => {
            const messages = await getThreadMessages({ threadId: roomId });
            if (!messages) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Thread not found' });
            }
            return messages;
        }),
    addMessage: protectedProcedure
        .input(z.object({
            message: MessageSchema,
        }))
        .mutation(async({ input: { message }}) => {
            const addedMessage = await addMessage({ message });
            if (!addedMessage) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Could not send message.' });
            }
            return addedMessage;
        }),
    addFriend: protectedProcedure
        .input(z.object({
            currentId: z.string(),
            friend: FriendSchema,
        }))
        .mutation(async({  input: { currentId, friend }}) => {
            const updatedThread = await addFriend({ currentId: currentId, friend: friend });
            if (!updatedThread) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Could not add friend.' });
            }
            return updatedThread;
        }),
    addFriendToThread: protectedProcedure
        .input(z.object({
            threadId: z.string(),
            friendId: z.string(),
        }))
        .mutation(async({  input: { threadId, friendId }}) => {
            const userInThread = await getThreadByRoomId({ roomId: threadId });
            if (!userInThread) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Error validating community - Please try again.' });
            }
            if (userInThread.users.includes(friendId)) {
                throw new TRPCError({ code: 'CONFLICT', message: 'This friend is already in this community.' });
            };
            const updatedThread = await addUserToThread({ userId: friendId, threadId: threadId });
            if (!updatedThread) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Could not add friend to community.' });
            }
            return updatedThread;
        }),
    getUsersToMakeFriends: protectedProcedure
        .input(z.object({}))
        .query(async() => {
            try {
                const users = await getUsers();
                return users;
            } catch (err) {
                throw new TRPCError({ code: 'CONFLICT', message: 'Could not load users.' });
            }
        }),
});