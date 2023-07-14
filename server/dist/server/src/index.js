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
exports.key = exports.secretKey = void 0;
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
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
exports.secretKey = 'KOMOS';
exports.key = '0123456789abcdef'; // 16-byte key in hexadecimal format
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: process.env.REACT_APP_URL_URL, credentials: true }));
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
function encryptPassword({ password }) {
    const algorithm = 'aes-128-cbc';
    const iv = crypto_1.default.randomBytes(16); // Generate a random Initialization Vector (IV)
    const cipher = crypto_1.default.createCipheriv(algorithm, exports.key, iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const encryptedData = {
        iv: iv.toString('hex'),
        password: encrypted
    };
    return encryptedData;
}
function decryptPassword(encryptedData) {
    const algorithm = 'aes-128-cbc';
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const decipher = crypto_1.default.createDecipheriv(algorithm, exports.key, iv);
    let decrypted = decipher.update(encryptedData.password, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
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
        const encryptedPassword = encryptPassword({ password });
        const user = await db.insertOne({ userId, email, userName, password: encryptedPassword, birthday });
        return user;
    }),
    login: trpc_1.publicProcedure
        .input(zod_1.z.object({ email: zod_1.z.string().nullish(), password: zod_1.z.string().nullish() }))
        .query(async ({ input: { email, password }, ctx }) => {
        const db = (0, db_1.getDB)().collection("users");
        if (email && password) {
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
            else {
                const decryptedPassword = decryptPassword(user.password);
                // make sure both credentials match
                if (decryptedPassword.toString() != password || user.email !== email) {
                    throw new server_1.TRPCError({
                        code: "BAD_REQUEST",
                        message: "Incorrect email or password.",
                        cause: "password",
                    });
                }
                const typedUser = { userId: user.userId, email: user.email, userName: user.userName, password: user.password, birthday: user.birthday };
                // generate their new token from their userID
                const token = jsonwebtoken_1.default.sign({ userId: user.userId }, exports.secretKey, { expiresIn: '4h' });
                // Set the JWT as a cookie
                ctx.res.cookie('auth', token, { maxAge: 4 * 60 * 60 * 1000, httpOnly: true });
                // return the user
                return typedUser;
            }
        }
        else {
            return null;
        }
    }),
    logout: trpc_1.publicProcedure
        .input(zod_1.z.object({}))
        .query(async ({ ctx }) => {
        ctx.res.clearCookie('auth');
        return null;
    }),
    getUser: trpc_1.protectedProcedure
        .input(zod_1.z.object({ userId: zod_1.z.string().nullish() }))
        .query(async ({ ctx }) => {
        const db = (0, db_1.getDB)().collection("users");
        const token = ctx.req.cookies.auth;
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, exports.secretKey);
            const user = await db.findOne({ userId: decoded.userId });
            if (user) {
                const typedUser = { userId: user?.userId, email: user.email, userName: user.userName, password: user.password, birthday: user.birthday };
                return typedUser;
            }
            else {
                return null;
            }
        }
        else {
            return null;
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
