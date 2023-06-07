import { Auth } from "./Auth";
import { router } from "../utils/trpc";

/**
 * This is where we merge all the routers together
 */

const mainRouter = router({
    auth: Auth,
});

export type Router = typeof mainRouter;
export default mainRouter;