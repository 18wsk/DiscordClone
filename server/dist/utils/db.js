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
