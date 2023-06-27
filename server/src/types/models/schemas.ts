import mongoose, { Schema } from "mongoose";
import { Password } from "../Password";
import { User } from "../User";
import { Thread } from "../Thread";
import { Message } from "../Message";

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
    },
    {
        collection: 'threads' 
    },
);

const messageSchema = new mongoose.Schema<Message>(
    {
        user: {
            userName: {
                type: String,
                required: true,
            },
            userId: {
                type: String,
                required: true,
            },
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
