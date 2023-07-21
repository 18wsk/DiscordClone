import mongoose, { Schema } from "mongoose";
import { Password } from "../Password";
import { User } from "../User";
import { Thread } from "../Thread";
import { Message } from "../Message";
import { Friend } from "../Friend";
import { ThreadNotification } from "../ThreadNotification";


const passwordSchema: Schema<Password> = new mongoose.Schema<Password>(
    {
        password: {
            type: String,
            required: true,
        },
        iv: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'users' 
    },
);

const friendSchema = new mongoose.Schema<Friend>(
    {
        id: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        pfp: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
    }
);

const notificationSchema = new mongoose.Schema<ThreadNotification>(
    {
        threadId: {
            type: String,
            required: true,
        },
        messagesSeen: {
            type: Number,
            required: true,
        },
    }
)


const userSchema = new mongoose.Schema<User>(
    {
        userId: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: passwordSchema,
            required: true,
        },
        birthday: {
            type: String,
            required: true,
        },
        threads: {
            type: [String],
            required: true,
        },
        friends: {
            type: [friendSchema],
            required: true,
        },
        pfp: {
            type: String,
            required: false,
        },
        status: {
            type: Boolean,
            required: true,
        },
        threadViews: {
            type: [notificationSchema],
            required: true,
        }
    },
    {
        collection: 'users' 
    },
);

const threadSchema = new mongoose.Schema<Thread>(
    {
        roomId:  {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        users: {
            type: [String],
            required: true,
        },
        messages: {
            type: [String],
            required: true,
        },
        creator: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: false,
        },
    },
    {
        collection: 'threads' 
    },
);

const messageSchema = new mongoose.Schema<Message>(
    {
        id: {
            type: String,
            required: true,
        },
        user: {
            userName: {
                type: String,
                required: true,
            },
            userId: {
                type: String,
                required: true,
            },
            pfp: {
                type: String,
                required: false,
            }
        },
        payload: {
            type: String,
            required: true,
        },
        roomId: {
            type: String,
            required: true,
        },
        timeStamp: {
            type: String,
            required: false,
        },
    },
    {
        collection: 'messages',
    }
);

export const PasswordModel = mongoose.model<Password>("Password", passwordSchema);
export const ThreadModel = mongoose.model<Thread>("Thread", threadSchema);
export const UserModel = mongoose.model<User>("User", userSchema);
export const MessageModel = mongoose.model<Message>("Message", messageSchema);
