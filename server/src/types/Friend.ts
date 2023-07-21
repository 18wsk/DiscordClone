import { z } from "zod";

export const FriendSchema = z.object({
    id: z.string().nullable(),
    userName: z.string().nullable(),
    pfp: z.string().nullable(),
    status: z.boolean().nullable(),
});


export type Friend = z.infer<typeof FriendSchema>;