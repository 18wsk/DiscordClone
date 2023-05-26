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
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
const appRouter = (0, trpc_2.router)({
    createUser: trpc_1.publicProcedure
        .input(zod_1.z.object({ email: zod_1.z.string(), userName: zod_1.z.string(), password: zod_1.z.string(), birthday: zod_1.z.string() }))
        .mutation(async (opts) => {
        const { email, userName, password, birthday } = opts.input;
        const db = (0, db_1.getDB)().collection("users");
        const doesUserExist = await db.findOne({ email });
        // verify this is a new user
        if (doesUserExist) {
            throw new server_1.TRPCError({ code: "BAD_REQUEST", message: "Email already registered to another account." });
        }
        const doesUserNameExist = await db.findOne({ userName });
        if (doesUserNameExist) {
            throw new server_1.TRPCError({ code: "BAD_REQUEST", message: "Username taken." });
        }
        const user = await db.insertOne({ email, userName, password, birthday });
        return user;
    }),
    getUserByUserName: trpc_1.publicProcedure
        .input(zod_1.z.object({ userName: zod_1.z.string() }))
        .query(async (opts) => {
        const { userName } = opts.input;
        const db = (0, db_1.getDB)().collection("users");
        const user = await db.findOne({ userName });
        return user;
    }),
    getUserById: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.string() }))
        .query(async (opts) => {
        const { id } = opts.input;
        const db = (0, db_1.getDB)().collection("users");
        const user = await db.findOne({ id });
        return user;
    }),
    hello: trpc_1.publicProcedure
        .query(() => {
        console.log('hello');
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
