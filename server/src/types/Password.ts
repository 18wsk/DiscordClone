import { z } from "zod";

export const PasswordSchema = z.object({
    password: z.string().nullish(),
    iv: z.string().nullish(),
});


export type Password = z.infer<typeof PasswordSchema>;