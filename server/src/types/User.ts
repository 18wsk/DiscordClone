import { z } from "zod";
import { PasswordSchema } from "./Password";
import { FriendSchema } from "./Friend";

export const UserSchema = z.object({
    userId: z.string().nullable(),
    userName: z.string().nullable(),
    email: z.string().nullable(),
    password: PasswordSchema,
    birthday: z.string().nullable(),
    threads: z.array(z.string()),
    friends: z.array(FriendSchema),
    pfp: z.string().nullable(),
    status: z.boolean().nullable(),
});

export type User = z.infer<typeof UserSchema>;