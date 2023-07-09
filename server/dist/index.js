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
const trpc_1 = require("./utils/trpc");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./utils/db");
const routes_1 = __importDefault(require("./routes"));
const Websocket_1 = __importDefault(require("./utils/Websocket"));
// configure environment file
dotenv_1.default.config();
const port = process.env.PORT;
console.log(process.env.REACT_APP_API_URL);
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.REACT_APP_API_URL,
    credentials: true,
    exposedHeaders: ['set-cookie', 'upgrade'],
}));
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: routes_1.default,
    createContext: trpc_1.createContext,
}));
const server = http_1.default.createServer(app);
(0, Websocket_1.default)(server);
server.listen(port, async () => {
    await (0, db_1.connect)();
    console.log(`***** Server listening on port ${port} *****`);
});
