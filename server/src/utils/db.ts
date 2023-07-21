import dotenv from 'dotenv';
import { MessageModel, ThreadModel, UserModel } from '../types/models/schemas';
import { User } from '../types/User';
import mongoose from "mongoose";
import { Thread } from '../types/Thread';
import { Message } from '../types/Message';
import { Friend } from '../types/Friend';
import { ThreadNotification } from '../types/ThreadNotification';

dotenv.config();

const url = process.env.DB_URL;

export async function connect() {
    if (url !== undefined) {
        try {
            await mongoose.connect(url);
            console.log('!!!!! Connected to DB !!!!!');
        }  catch (error) {
            console.log('????? Failed to connect to DB:', error + " ?????");
        }
    }
    else {
        console.log('????? Failed to connect to DB: URL not found ?????');
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

export async function addFriend({ currentId, friend}: {currentId: string, friend: Friend}): Promise<User | null> {
    const updatedUser = await UserModel.findOne({ userId: currentId }).exec();
    const updatedFriend = await UserModel.findOne({ userId: friend.id }).exec();

    if (!updatedUser || !updatedFriend || !updatedUser.userName) return null;
    
    updatedUser.friends = [...updatedUser.friends, friend];
    if (updatedUser.userName) {
        updatedFriend.friends = [...updatedFriend.friends, { 
            id: currentId, 
            userName: updatedUser.userName, 
            pfp: updatedUser.pfp,
            status: updatedUser.status,
        }];
    }

    await updatedUser.updateOne(updatedUser).exec();
    await updatedFriend.updateOne(updatedFriend).exec();

    return updatedUser;
}

export async function getUsers(): Promise<Friend[]> {
    const users = await UserModel.find({}).exec() as User[];
    const users_as_friends: Friend[] = users.map((user: User) => ({
        id: user.userId,
        userName: user.userName,
        pfp: user.pfp,
        status: user.status,
    }));
    return users_as_friends;
}

// THREAD QUERIES

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
    return ThreadModel.countDocuments({ threadName }).exec();
}

export async function addUserToThread({ userId, threadId } : { userId: string, threadId: string}): Promise<Thread | null> { 
    const updatedThread = await ThreadModel.findOne({ roomId: threadId }).exec();
    if (!updatedThread) return null;
    updatedThread.users = [...updatedThread.users, userId];
    await updatedThread.updateOne(updatedThread).exec();
    return updatedThread;
}


// MESSAGE QUERIES
export async function getThreadMessages({ threadId }
    : { threadId: string | null })
    : Promise<Message[]> {
    return MessageModel.find({ roomId: threadId }).exec();
}

export async function addMessage({ message }: { message: Message }): Promise<Message | null> {
    const thread = await ThreadModel.findOne({ roomId: message.roomId }).exec();
    if (!thread) return null;
    thread.messages = [...thread.messages, message.id];
    await thread.updateOne(thread).exec();
    return MessageModel.create(message);
}
