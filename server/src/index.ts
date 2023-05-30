import express from 'express';
import http from 'http';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import dotenv from 'dotenv';
import { connect, getDB } from './utils/db';
import { publicProcedure } from './utils/trpc';
import { z } from 'zod';
import { router, createContext } from './utils/trpc';
import { TRPCError } from '@trpc/server';
import cookieParser  from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { Password, User } from '../../common/User';
import crypto from 'crypto';

dotenv.config();

const port = process.env.PORT || 8080;

export const secretKey = 'KOMOS';
export const key = '0123456789abcdef'; // 16-byte key in hexadecimal format


const app = express();
const server = http.createServer(app);

app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));


function encryptPassword({ password } : { password: any }) {
  const algorithm = 'aes-128-cbc';
  const iv = crypto.randomBytes(16); // Generate a random Initialization Vector (IV)
  
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const encryptedData = {
    iv: iv.toString('hex'),
    password: encrypted
  };

  return encryptedData;
}

function decryptPassword(encryptedData: Password) {
  const algorithm = 'aes-128-cbc';
  const iv = Buffer.from(encryptedData.iv, 'hex');
  
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData.password, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}


const appRouter = router({
  signup: publicProcedure
    .input(z.object({ 
      email: z.string(), 
      userName: z.string(), 
      password:z.string(), 
      birthday: z.string() 
    }))
    .mutation(async ({ input:  { email, userName, password, birthday }, ctx }) => {
      // access 
      const db = getDB().collection("users");
      // Verify this is a new user
      const doesEmailExist = await db.countDocuments({ email });
      if (doesEmailExist) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already registered to another account.",
          cause: "email"
        });
      }
      // Verify username is not taken
      const doesUserNameExist = await db.countDocuments({ userName });
      if (doesUserNameExist) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username taken.",
          cause: "username"
        });
      }
      // assign the user a unique id
      const userId = uuidv4();
      // create a JWT for the user
      const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '4h' });
      // Set the JWT as a cookie using
      ctx.res.cookie('auth', token, { maxAge: 4 * 60 * 60 * 1000, httpOnly: true});
      // insert the user into the database
      const encryptedPassword = encryptPassword({ password });
      const user = await db.insertOne({ userId, email, userName, password: encryptedPassword, birthday });
      return user;
    }),

  login: publicProcedure
    .input(z.object({ email: z.string().nullish(), password: z.string().nullish() }))
    .query(async ({ input: { email, password }, ctx }) => {
      const db = getDB().collection<User>("users");
      if (email && password) {
        // find a user with the email
        const user = await db.findOne({ email });
        const typedUser: User = {userId: user.userId, email: user.email, userName: user.userName, password: user.password, birthday: user.birthday}
        // check if this user exists
        if (!user) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email not registered.",
            cause: "email",
          });
        } else {
          const decryptedPassword = decryptPassword(user.password);
          // make sure both credentials match
          if (decryptedPassword.toString() != password || user.email !== email) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Incorrect email or password.",
              cause: "password",
            });
          }
          // generate their new token from their userID
          const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '4h' });
          // Set the JWT as a cookie
          ctx.res.cookie('auth', token, { maxAge: 4 * 60 * 60 * 1000, httpOnly: true});
          // return the user
          return typedUser;
        }
      } else {
        return null;
      }
    }),

  logout: publicProcedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      ctx.res.clearCookie('auth');
      return null;
    }),

  getUser: publicProcedure
    .input(z.object({ userId: z.string().nullish() }))
    .query(async ({ ctx }) => {
      const db = getDB().collection<User>("users");
      const token = ctx.req.cookies.auth;
      if (token) {
        const decoded = jwt.verify(token, secretKey) as { userId: string };
        const user = await db.findOne({ userId: decoded.userId });
        const typedUser: User = {userId: user.userId, email: user.email, userName: user.userName, password: user.password, birthday: user.birthday}
        return typedUser;
      } else {
        return null;
      }
    })

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
