import { z } from "zod";
import { PasswordSchema } from "./Password";

export const UserSchema = z.object({
    userId: z.string().nullable(),
    userName: z.string().nullable(),
    email: z.string().nullable(),
    password: PasswordSchema,
    birthday: z.string().nullable(),
    threads: z.array(z.string())
});

export type User = z.infer<typeof UserSchema>;