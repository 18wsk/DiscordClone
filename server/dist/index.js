"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CIPHER_KEY = exports.CIPHER_ALG = exports.CIPHER_SECRET_KEY = exports.secretKey = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./utils/db");
const trpc_1 = require("./utils/trpc");
const zod_1 = require("zod");
const trpc_2 = require("./utils/trpc");
const server_1 = require("@trpc/server");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
dotenv_1.default.config();
const port = process.env.PORT || 8080;
exports.secretKey = 'KOMOS';
exports.CIPHER_SECRET_KEY = 'KOMOS';
exports.CIPHER_ALG = "aes256";
exports.CIPHER_KEY = 'NotChillis#4973';
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
const appRouter = (0, trpc_2.router)({
    signup: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string(),
        userName: zod_1.z.string(),
        password: zod_1.z.string(),
        birthday: zod_1.z.string()
    }))
        .mutation(async ({ input: { email, userName, password, birthday }, ctx }) => {
        // access 
        const db = (0, db_1.getDB)().collection("users");
        // Verify this is a new user
        const doesEmailExist = await db.countDocuments({ email });
        if (doesEmailExist) {
            throw new server_1.TRPCError({
                code: "BAD_REQUEST",
                message: "Email already registered to another account.",
                cause: "email"
            });
        }
        // Verify username is not taken
        const doesUserNameExist = await db.countDocuments({ userName });
        if (doesUserNameExist) {
            throw new server_1.TRPCError({
                code: "BAD_REQUEST",
                message: "Username taken.",
                cause: "username"
            });
        }
        // assign the user a unique id
        const userId = (0, uuid_1.v4)();
        // create a JWT for the user
        const token = jsonwebtoken_1.default.sign({ userId: userId }, exports.secretKey, { expiresIn: '4h' });
        // Set the JWT as a cookie using
        ctx.res.cookie('auth', token, { maxAge: 4 * 60 * 60 * 1000, httpOnly: true });
        // insert the user into the database
        const encryptedPassword = (0, crypto_1.createCipheriv)(exports.CIPHER_ALG, exports.CIPHER_SECRET_KEY, password);
        const user = await db.insertOne({ userId, email, userName, encryptedPassword, birthday });
        return user;
    }),
    login: trpc_1.publicProcedure
        .input(zod_1.z.object({ email: zod_1.z.string().nullish(), password: zod_1.z.string().nullish() }))
        .query(async ({ input: { email, password }, ctx }) => {
        const db = (0, db_1.getDB)().collection("users");
        // check if there is a token already in user cookies - for homepage refresh case
        const userId = ctx.userId;
        const userById = await db.findOne({ userId });
        // if no user is found by id, check if there is a user by email and password - this is for actual login case
        if (!userById) {
            if (!userById && email && password) {
                // find a user with the email
                const user = await db.findOne({ email });
                // check if this user exists
                if (!user) {
                    throw new server_1.TRPCError({
                        code: "BAD_REQUEST",
                        message: "Email not registered.",
                        cause: "email",
                    });
                }
                const decryptedPassword = (0, crypto_1.createDecipheriv)(exports.CIPHER_ALG, exports.CIPHER_SECRET_KEY, user.encryptedPassword || " ");
                // make sure both credentials match
                if (decryptedPassword.toString() != password || user.email !== email) {
                    throw new server_1.TRPCError({
                        code: "BAD_REQUEST",
                        message: "Incorrect email or password.",
                        cause: "password",
                    });
                }
                return user;
            }
        }
        else {
            return userById;
        }
    })
});
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: trpc_2.createContext,
}));
server.listen(port, async () => {
    await (0, db_1.connect)();
    console.log(`Server listening on port ${port}`);
});
