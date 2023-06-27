import dotenv from 'dotenv';
import { MessageModel, ThreadModel, UserModel } from '../types/models/schemas';
import { User } from '../types/User';
import mongoose from "mongoose";
import { Thread } from '../types/Thread';
import { Message } from '../types/Message';

dotenv.config();

const url = process.env.DB_URL || 'localhost';
const name = process.env.DB_NAME || 'users';

export async function connect() {
    try {
        await mongoose.connect(url);
        console.log('!!!!! Connected to DB !!!!!');
    }  catch (error) {
        console.log('????? Failed to connect to DB:', error + " ?????");
    }
}

// USER QUERIES
export async function getUserById({ id } : { id: string | null }): Promise<User | null> {
    return UserModel.findOne({ id }).exec();
}

export async function getUserByEmail({ email } : { email: string | null }): Promise<User | null> {
    return UserModel.findOne({ email });
}

export async function countUserByEmail({ email } : { email: string | null }): Promise<number> {
    return UserModel.countDocuments({ email }).exec();
}

export async function countUserByUserName({ userName } : { userName: string | null }): Promise<number> {
    return UserModel.countDocuments({ userName }).exec();
}

export async function createUser({ user }: { user: User }): Promise<User | null> {
    return UserModel.create(user);
}

// THREAD QUERIES
export async function getThreadById({ id } : { id: string | null }): Promise<Thread | null> {
    return ThreadModel.findOne({ id }).exec();
}

export async function getThreadByRoomId({ roomId } : { roomId: string | null }): Promise<Thread | null> {
    return ThreadModel.findOne({ roomId }).exec();
}

export async function getUsersThreads({ userId }: { userId: string | null }): Promise<Thread[]> {
    try {
        const threads: Thread[] = await ThreadModel.find({
            $or: [
                { users: userId }, 
                { creator: userId },
            ]
        }).exec();
        return threads;
    } catch (error) {
        return [];
    }
}

export async function addThread({ thread }: { thread: Thread }): Promise<Thread | null> {
    return ThreadModel.create(thread);
}

export async function countThreadByName({ threadName } : { threadName: string | null }): Promise<number> {
    return UserModel.countDocuments({ threadName }).exec();
}

// MESSAGE QUERIES
export async function getThreadMessages({ threadId }: { threadId: string | null }): Promise<Message[]> {
    return MessageModel.find({ roomId: threadId }).exec();
}

export async function addMessage({ message }: { message: Message }): Promise<Message | null> {
    return MessageModel.create(message);
}
