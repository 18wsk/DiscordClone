import { z } from "zod";

export const NotificationSchema = z.object({
    threadId: z.string(),
    messagesSeen: z.number(),
});


export type ThreadNotification = z.infer<typeof NotificationSchema>;