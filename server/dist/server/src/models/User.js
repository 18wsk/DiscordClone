"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
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
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
