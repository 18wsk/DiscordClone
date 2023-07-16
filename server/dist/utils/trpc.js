"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicProcedure = exports.protectedProcedure = exports.router = exports.middleware = exports.createContext = void 0;
const server_1 = require("@trpc/server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
const createContext = ({ req, res }) => {
    let userId = null;
    // check if verified user from cookie
    const authCookie = cookie_1.default.parse(req.headers.cookie || " ").auth;
    if (authCookie !== undefined) {
        try {
            const jwt_val = jsonwebtoken_1.default.verify(authCookie, "KOMOS");
            if (jwt_val) {
                userId = JSON.parse(JSON.stringify(jwt_val)).userId;
            }
        }
        catch (err) {
            throw new server_1.TRPCError({ code: 'UNAUTHORIZED', message: 'verify' });
        }
    }
    const cookieOptions = {
        domain: 'swiftchat.ca',
        secure: true,
        sameSite: 'none',
        httpOnly: true,
    };
    return { req, res, userId };
};
exports.createContext = createContext;
const t = server_1.initTRPC.context().create();
exports.middleware = t.middleware;
exports.router = t.router;
const isAuthed = t.middleware((opts) => {
    const { ctx } = opts;
    if (!ctx.userId) {
        throw new server_1.TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized. Please Log in.' });
    }
    return opts.next({
        ctx: {
            userId: ctx.userId,
        },
    });
});
exports.protectedProcedure = t.procedure.use(isAuthed);
exports.publicProcedure = t.procedure;
