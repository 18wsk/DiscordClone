import mongoose, { Schema } from "mongoose";
import { User } from "../../../common/User";
import { Password } from "../../../common/User";

const passwordSchema: Schema<Password> = new mongoose.Schema<Password>({
    password: {
        type: String,
        required: true,
    },
    iv: {
        type: String,
        required: true,
    },
});


const userSchema = new mongoose.Schema<User>({ 
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
});

export const UserModel = mongoose.model<User>("User", userSchema);
