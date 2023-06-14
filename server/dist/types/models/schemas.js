"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.ThreadModel = exports.PasswordModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const passwordSchema = new mongoose_1.default.Schema({
    password: {
        type: String,
        required: true,
    },
    iv: {
        type: String,
        required: true,
    },
}, {
    collection: 'users'
});
const userSchema = new mongoose_1.default.Schema({
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
}, {
    collection: 'users'
});
const threadSchema = new mongoose_1.default.Schema({
    roomId: {
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
}, {
    collection: 'threads'
});
exports.PasswordModel = mongoose_1.default.model("Password", passwordSchema);
exports.ThreadModel = mongoose_1.default.model("Thread", threadSchema);
exports.UserModel = mongoose_1.default.model("User", userSchema);
