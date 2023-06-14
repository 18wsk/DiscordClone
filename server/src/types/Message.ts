import { z } from "zod";


export const MessageSchema = z.object({
    user: z.object({
        userId: z.string(),
        userName: z.string(),
    }),
    payload: z.string(),
    roomId: z.string(),
    timeStamp: z.string().nullable(),
});


export type Message = z.infer<typeof MessageSchema>;