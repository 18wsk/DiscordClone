import { z } from "zod";

export const PasswordSchema = z.object({
    password: z.string().nullable(),
    iv: z.string().nullable(),
});


export type Password = z.infer<typeof PasswordSchema>;