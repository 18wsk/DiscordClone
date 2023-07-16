"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../utils/trpc");
const server_1 = require("@trpc/server");
const db_1 = require("../utils/db");
const Password_1 = require("../types/Password");
const schemas_1 = require("../types/models/schemas");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const secretKey = process.env.SECRET_KEY || "KOMOS"; // for JWT
const key = process.env.CIPHER_KEY || '0123456789abcdef'; // 16-byte key in hexadecimal format
function encryptPassword({ password }) {
    const algorithm = 'aes-128-cbc';
    const iv = crypto_1.default.randomBytes(16); // Generate a random Initialization Vector (IV)
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
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
    if (encryptedData.password && encryptedData.iv) {
        const iv = Buffer.from(encryptedData?.iv, 'hex');
        const decipher = crypto_1.default.createDecipheriv(algorithm, key, iv);
        if (decipher) {
            let decrypted = decipher.update(encryptedData?.password, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }
        else
            return "";
    }
    ;
    return "";
}
exports.Auth = (0, trpc_1.router)({
    signup: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string(),
        userName: zod_1.z.string(),
        password: zod_1.z.string(),
        birthday: zod_1.z.string(),
        pfp: zod_1.z.string().nullable()
    }))
        .mutation(async ({ input: { email, userName, password, birthday, pfp }, ctx }) => {
        // Verify this is a new user
        const doesEmailExist = await (0, db_1.countUserByEmail)({ email });
        if (doesEmailExist !== 0) {
            throw new server_1.TRPCError({
                code: "BAD_REQUEST",
                message: "Email already registered to another account.",
                cause: "email"
            });
        }
        // Verify username is not taken
        const doesUserNameExist = await (0, db_1.countUserByUserName)({ userName });
        if (doesUserNameExist !== 0) {
            throw new server_1.TRPCError({
                code: "BAD_REQUEST",
                message: "Username taken.",
                cause: "username"
            });
        }
        const userId = (0, uuid_1.v4)();
        const token = jsonwebtoken_1.default.sign({ userId: userId }, secretKey, { expiresIn: '4h' });
        ctx.res.cookie('auth', token, { maxAge: 4 * 60 * 60 * 1000,
            domain: process.env.REACT_APP_URL,
            secure: true,
            sameSite: 'none',
            httpOnly: true
        });
        const encryptedPassword = encryptPassword({ password });
        const user = await (0, db_1.createUser)({
            user: {
                userId,
                email,
                userName,
                password: encryptedPassword,
                birthday,
                threads: [],
                friends: [],
                pfp: pfp
            }
        });
        return user;
    }),
    login: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string().nullish(),
        password: Password_1.PasswordSchema.nullish()
    }))
        .query(async ({ input: { email, password }, ctx }) => {
        if (email && password) {
            // find a user with the email
            const user = await schemas_1.UserModel.findOne({ email });
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
                if (decryptedPassword.toString() != password.password || user.email !== email) {
                    throw new server_1.TRPCError({
                        code: "BAD_REQUEST",
                        message: "Incorrect email or password.",
                        cause: "password",
                    });
                }
                // generate their new token from their userID
                const token = jsonwebtoken_1.default.sign({ userId: user.userId }, secretKey, { expiresIn: '4h' });
                // Set the JWT as a cookie
                ctx.res.cookie('auth', token, { maxAge: 4 * 60 * 60 * 1000,
                    domain: process.env.REACT_APP_URL,
                    secure: true,
                    sameSite: 'none',
                    httpOnly: true
                });
                // return the user
                return user;
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
    checkUser: trpc_1.protectedProcedure
        .input(zod_1.z.object({}))
        .query(async ({ ctx }) => {
        return ctx.userId;
    }),
    getAccount: trpc_1.protectedProcedure
        .input(zod_1.z.object({ userId: zod_1.z.string().nullish() }))
        .query(async ({ ctx }) => {
        const user = await schemas_1.UserModel.findOne({ userId: ctx.userId });
        if (!user) {
            throw new server_1.TRPCError({
                code: "BAD_REQUEST",
                message: "ERROR: Could not load User, Please try again.",
            });
        }
        else {
            return user;
        }
    }),
});
