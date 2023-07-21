import { z } from "zod";


export const MessageSchema = z.object({
    id: z.string(),
    user: z.object({
        userId: z.string(),
        userName: z.string(),
        pfp: z.string().nullable(),
        status: z.boolean().nullable(),
    }),
    payload: z.string(),
    roomId: z.string(),
    timeStamp: z.string().nullable(),
});


export type Message = z.infer<typeof MessageSchema>;