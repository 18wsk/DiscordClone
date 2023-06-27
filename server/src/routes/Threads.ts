import { z } from 'zod';
import { protectedProcedure, router } from '../utils/trpc';
import { TRPCError } from '@trpc/server';
import { MessageSchema } from '../types/Message';
import { addMessage, addThread, countThreadByName, getThreadMessages, getUsersThreads } from '../utils/db';

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
        }))
        .mutation(async({input:  { 
            roomId,
            name,
            users,
            messages,
            creator,
        }}) => {
            const checkThreadName = await countThreadByName({ threadName: name });
            if (checkThreadName !== 0)  throw new TRPCError({ code: 'NOT_FOUND', message: 'Community alrady exists.' });
            const thread = await addThread({ thread: {
                roomId,
                name,
                users,
                messages,
                creator,
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
});