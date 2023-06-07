import mongoose, { Schema } from "mongoose";
import { Password } from "../Password";
import { User } from "../User";

const passwordSchema: Schema<Password> = new mongoose.Schema<Password>({
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
    },
    {
        collection: 'users' 
    },
);

export const UserModel = mongoose.model<User>("User", userSchema);
