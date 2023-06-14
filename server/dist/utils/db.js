"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countThreadByName = exports.addThread = exports.getUsersThreads = exports.getThreadByRoomId = exports.getThreadById = exports.createUser = exports.countUserByUserName = exports.countUserByEmail = exports.getUserByEmail = exports.getUserById = exports.connect = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const schemas_1 = require("../types/models/schemas");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const url = process.env.DB_URL || 'localhost';
const name = process.env.DB_NAME || 'users';
async function connect() {
    try {
        await mongoose_1.default.connect(url);
        console.log('!!!!! Connected to DB !!!!!');
    }
    catch (error) {
        console.log('????? Failed to connect to DB:', error + " ?????");
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
// THREAD QUERIES
async function getThreadById({ id }) {
    return schemas_1.ThreadModel.findOne({ id }).exec();
}
exports.getThreadById = getThreadById;
async function getThreadByRoomId({ roomId }) {
    return schemas_1.ThreadModel.findOne({ roomId }).exec();
}
exports.getThreadByRoomId = getThreadByRoomId;
async function getUsersThreads({ userId }) {
    try {
        const threads = await schemas_1.ThreadModel.find({
            $or: [
                { users: { $elemMatch: { userId: userId } } },
                { creator: userId }
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
    return schemas_1.UserModel.countDocuments({ threadName }).exec();
}
exports.countThreadByName = countThreadByName;
