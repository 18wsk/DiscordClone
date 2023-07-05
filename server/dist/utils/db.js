"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessage = exports.getThreadMessages = exports.addUserToThread = exports.countThreadByName = exports.addThread = exports.getUsersThreads = exports.getThreadByRoomId = exports.addFriend = exports.createUser = exports.countUserByUserName = exports.countUserByEmail = exports.getUserByEmail = exports.getUserById = exports.connect = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const schemas_1 = require("../types/models/schemas");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const url = process.env.DB_URL;
async function connect() {
    if (url !== undefined) {
        try {
            await mongoose_1.default.connect(url);
            console.log('!!!!! Connected to DB !!!!!');
        }
        catch (error) {
            console.log('????? Failed to connect to DB:', error + " ?????");
        }
    }
    else {
        console.log('????? Failed to connect to DB: URL not found ?????');
    }
}
exports.connect = connect;
// USER QUERIES
async function getUserById({ id }) {
    return schemas_1.UserModel.findOne({ id }).exec();
}
exports.getUserById = getUserById;
async function getUserByEmail({ email }) {
    return schemas_1.UserModel.findOne({ email });
}
exports.getUserByEmail = getUserByEmail;
async function countUserByEmail({ email }) {
    return schemas_1.UserModel.countDocuments({ email }).exec();
}
exports.countUserByEmail = countUserByEmail;
async function countUserByUserName({ userName }) {
    return schemas_1.UserModel.countDocuments({ userName }).exec();
}
exports.countUserByUserName = countUserByUserName;
async function createUser({ user }) {
    return schemas_1.UserModel.create(user);
}
exports.createUser = createUser;
async function addFriend({ currentId, friend }) {
    const updatedUser = await schemas_1.UserModel.findOne({ userId: currentId }).exec();
    const updatedFriend = await schemas_1.UserModel.findOne({ userId: friend.id }).exec();
    if (!updatedUser || !updatedFriend || !updatedUser.userName)
        return null;
    updatedUser.friends = [...updatedUser.friends, friend];
    if (updatedUser.userName) {
        updatedFriend.friends = [...updatedFriend.friends, { id: currentId, userName: updatedUser.userName }];
    }
    await updatedUser.updateOne(updatedUser).exec();
    await updatedFriend.updateOne(updatedFriend).exec();
    return updatedUser;
}
exports.addFriend = addFriend;
// THREAD QUERIES
async function getThreadByRoomId({ roomId }) {
    return schemas_1.ThreadModel.findOne({ roomId }).exec();
}
exports.getThreadByRoomId = getThreadByRoomId;
async function getUsersThreads({ userId }) {
    try {
        const threads = await schemas_1.ThreadModel.find({
            $or: [
                { users: userId },
                { creator: userId },
            ]
        }).exec();
        return threads;
    }
    catch (error) {
        return [];
    }
}
exports.getUsersThreads = getUsersThreads;
async function addThread({ thread }) {
    return schemas_1.ThreadModel.create(thread);
}
exports.addThread = addThread;
async function countThreadByName({ threadName }) {
    return schemas_1.ThreadModel.countDocuments({ threadName }).exec();
}
exports.countThreadByName = countThreadByName;
async function addUserToThread({ userId, threadId }) {
    const updatedThread = await schemas_1.ThreadModel.findOne({ roomId: threadId }).exec();
    if (!updatedThread)
        return null;
    updatedThread.users = [...updatedThread.users, userId];
    await updatedThread.updateOne(updatedThread).exec();
    console.log('updatedThread', updatedThread.users);
    return updatedThread;
}
exports.addUserToThread = addUserToThread;
// MESSAGE QUERIES
async function getThreadMessages({ threadId }) {
    return schemas_1.MessageModel.find({ roomId: threadId }).exec();
}
exports.getThreadMessages = getThreadMessages;
async function addMessage({ message }) {
    return schemas_1.MessageModel.create(message);
}
exports.addMessage = addMessage;
