import express from 'express';
import http from 'http';
import cors from 'cors';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import dotenv from 'dotenv';
import { connect, getDB } from './utils/db';
import { publicProcedure } from './utils/trpc';
import { z } from 'zod';
import { router, createContext } from './utils/trpc';
import { TRPCError } from '@trpc/server';

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

const appRouter = router({
    signup: publicProcedure
    .input(z.object({ email: z.string(), userName: z.string(), password: z.string(), birthday: z.string() }))
    .mutation(async (opts) => {
        const { email, userName, password, birthday } = opts.input;
        const db = getDB().collection("users");
        const doesUserExist = await db.findOne({ email });
        // verify this is a new user
        if (doesUserExist) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Email already registered to another account.", cause: "email"});
        }
        // verify username is not taken
        const doesUserNameExist = await db.findOne({ userName });
        if (doesUserNameExist) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Username taken.", cause: "username"});
        }
        const user = await db.insertOne({ email, userName, password, birthday });
        return user;
  }),
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }).nullish())
    .query(async (opts) => {
      const { email, password } = opts.input;
      const db = getDB().collection("users");
      // find a user with the email 
      const user = await db.findOne({ email }); 
      // check this user exists
      if (!user) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Email not registered.", cause: "email"});
      }
      // make sure both credentials match
      if (user.password !== password || user.email !== email ) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Incorrect email or password.", cause: "password"});
      }
      return user;
    }),
});

export type AppRouter = typeof appRouter;

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

server.listen(port, async () => {
  await connect();
  console.log(`Server listening on port ${port}`);
});
