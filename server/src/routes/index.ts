import { Auth } from "./Auth";
import { Thread } from "./Threads";
import { router } from "../utils/trpc";

/**
 * This is where we merge all the routers together
 */

const mainRouter = router({
    auth: Auth,
    thread: Thread
});

export type Router = typeof mainRouter;
export default mainRouter;