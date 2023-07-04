import { z } from "zod";

export const FriendSchema = z.object({
    id: z.string(),
    userName: z.string().nullable(),
});


export type Friend = z.infer<typeof FriendSchema>;