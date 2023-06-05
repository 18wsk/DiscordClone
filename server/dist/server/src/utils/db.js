"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.connect = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.DB_URL || 'localhost';
const name = process.env.DB_NAME || 'test';
let db;
async function connect() {
    const client = await mongodb_1.MongoClient.connect(url);
    db = client.db(name);
    console.log('Connected to DB');
}
exports.connect = connect;
function getDB() {
    return db;
}
exports.getDB = getDB;
// import dotenv from 'dotenv';
// import { UserModel } from '../models/User';
// import { User } from '../../../common/User';
// import mongoose from "mongoose";
// dotenv.config();
// const url = process.env.DB_URL || 'localhost';
// const name = process.env.DB_NAME || 'test';
// export async function connect() {
//     try {
//         await mongoose.connect(url);
//         console.log('Connected to DB');
//     }  catch (error) {
//         console.log('Failed to connect to DB:', error);
//     }
// }
// export async function getUserById({ id } : { id: string | null }): Promise<User | null> {
//     return UserModel.findOne({ id }).exec();
// }
// export async function getUserByEmail({ email } : { email: string | null }): Promise<User | null> {
//     return UserModel.findOne({ email });
// }
// export async function countUserByEmail({ email } : { email: string | null }): Promise<number> {
//     return UserModel.countDocuments({ email }).exec();
// }
// export async function countUserByUserName({ userName } : { userName: string | null }): Promise<number> {
//     return UserModel.countDocuments({ userName }).exec();
// }
// export async function createUser({ user } : { user: User }): Promise<User | null> {
//     return UserModel.create(user);
// }
