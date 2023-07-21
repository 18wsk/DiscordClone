"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = exports.UserModel = exports.ThreadModel = exports.PasswordModel = void 0;
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
const friendSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    pfp: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
});
const notificationSchema = new mongoose_1.default.Schema({
    threadId: {
        type: String,
        required: true,
    },
    messagesSeen: {
        type: Number,
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
    threads: {
        type: [String],
        required: true,
    },
    friends: {
        type: [friendSchema],
        required: true,
    },
    pfp: {
        type: String,
        required: false,
    },
    status: {
        type: Boolean,
        required: true,
    },
    threadViews: {
        type: [notificationSchema],
        required: true,
    }
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
    img: {
        type: String,
        required: false,
    },
}, {
    collection: 'threads'
});
const messageSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
    },
    user: {
        userName: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        pfp: {
            type: String,
            required: false,
        }
    },
    payload: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: String,
        required: false,
    },
}, {
    collection: 'messages',
});
exports.PasswordModel = mongoose_1.default.model("Password", passwordSchema);
exports.ThreadModel = mongoose_1.default.model("Thread", threadSchema);
exports.UserModel = mongoose_1.default.model("User", userSchema);
exports.MessageModel = mongoose_1.default.model("Message", messageSchema);
