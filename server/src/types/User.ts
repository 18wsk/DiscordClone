import { z } from "zod";
import { PasswordSchema } from "./Password";

export const UserSchema = z.object({
    userId: z.string().nullish(),
    userName: z.string().nullish(),
    email: z.string().nullish(),
    password: PasswordSchema,
    birthday: z.string().nullish(),
});

export type User = z.infer<typeof UserSchema>;