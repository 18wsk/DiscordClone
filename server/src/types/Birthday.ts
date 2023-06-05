import { z } from "zod";


export const BirthDaySchema = z.object({
    day:((z.string()).or(z.number())).nullable(),
    month: ((z.string()).or(z.number())).nullable(),
    year: z.string().nullable(),
});


export type Birthday = z.infer<typeof BirthDaySchema>;