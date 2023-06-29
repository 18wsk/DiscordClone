import {  z } from "zod";


export const ThreadSchema = z.object({
    roomId: z.string(),
    name: z.string(),
    users: z.array(z.string()),
    messages: z.array(z.string()),
    creator: z.string(),
    img: z.string().nullable(),
});


export type Thread = z.infer<typeof ThreadSchema>;