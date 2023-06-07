import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { Session } from 'express-session';
import cookie from 'cookie';

type ExpressRequest = Omit<trpcExpress.CreateExpressContextOptions, 'req'> & {
    req: Request & { session: Session }
}

export const createContext = ({ req, res }: ExpressRequest) => {
    let userId: string | null = null;
    // check if verified user from cookie
    const authCookie = cookie.parse(req.headers.cookie || " ").auth;
    if (authCookie !== undefined) {
        try {
            const jwt_val = jwt.verify(authCookie, "KOMOS");
            if (jwt_val) { 
                userId = JSON.parse(JSON.stringify(jwt_val)).userId;
            }
        } catch (err) {
            throw new TRPCError({ code: 'UNAUTHORIZED', message: 'verify' }); 
        }
    }

    return { req, res, userId };
};

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
export const middleware = t.middleware;
export const router = t.router;

const isAuthed = t.middleware((opts) => {
    const { ctx } = opts;
    if (!ctx.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized. Please Log in.'});
    }
    return opts.next({
        ctx: {
            userId: ctx.userId,
        },
    });
});


export const protectedProcedure = t.procedure.use(isAuthed);
export const publicProcedure = t.procedure;
