"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("./Auth");
const Threads_1 = require("./Threads");
const trpc_1 = require("../utils/trpc");
/**
 * This is where we merge all the routers together
 */
const mainRouter = (0, trpc_1.router)({
    auth: Auth_1.Auth,
    thread: Threads_1.Thread
});
exports.default = mainRouter;
