import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../utils/trpc';
import { TRPCError } from '@trpc/server';
import { countUserByEmail, countUserByUserName, createUser, updatePfp } from '../utils/db';
import { Password, PasswordSchema } from '../types/Password';
import { User } from '../types/User';
import { UserModel } from '../types/models/schemas';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


const secretKey = process.env.SECRET_KEY || "KOMOS"; // for JWT
const key = process.env.CIPHER_KEY || '0123456789abcdef'; // 16-byte key in hexadecimal format

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
  if ( encryptedData.password && encryptedData.iv ){
    const iv = Buffer.from(encryptedData?.iv, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    if (decipher) {
      let decrypted = decipher.update(encryptedData?.password, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    }
    else return "";
  };
  return "";
}

const cookieSettings = process.env.REACT_APP_URL === 'http://localhost' 
  ? 
    { 
      maxAge: 4 * 60 * 60 * 1000, 
      httpOnly: true
    }
  : 
    { 
      maxAge: 4 * 60 * 60 * 1000, 
      domain: process.env.REACT_APP_DOMAIN,
      httpOnly: true
    };

export const Auth = router({
    signup: publicProcedure
      .input(z.object({ 
        email: z.string(), 
        userName: z.string(), 
        password:z.string(), 
        birthday: z.string(),
        pfp: z.string().nullable(),
        status: z.boolean().nullable(),
      }))
      .mutation(async ({ input:  { email, userName, password, birthday, pfp, status}, ctx }) => {
        // Verify this is a new user
        const doesEmailExist = await countUserByEmail({ email });
        if (doesEmailExist !== 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email already registered to another account.",
            cause: "email"
          });
        }
        // Verify username is not taken
        const doesUserNameExist = await countUserByUserName({ userName });
        if (doesUserNameExist !== 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Username taken.",
            cause: "username"
          });
        }

        const userId = uuidv4();
        const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '4h' });
        ctx.res.cookie('auth', token, cookieSettings);
        const encryptedPassword = encryptPassword({ password });
        const user = await createUser({ 
          user: { 
            userId, 
            email, 
            userName, 
            password: encryptedPassword, 
            birthday, 
            threads: [], 
            friends: [], 
            pfp: pfp,
            status: status,
            threadViews: []
          }
        });
        return user;
      }),
  
    login: publicProcedure
      .input(z.object({ 
        email: z.string().nullish(),
        password: PasswordSchema.nullish()
      }))
      .query(async ({ input: { email, password }, ctx }) => {
        if (email && password) {
          // find a user with the email
          const user = await UserModel.findOne({ email }) as User;
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
            if (decryptedPassword.toString() != password.password || user.email !== email) {
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Incorrect email or password.",
                cause: "password",
              });
            }
            // generate their new token from their userID
            const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '4h' });
            // Set the JWT as a cookie
            
            ctx.res.cookie('auth', token, cookieSettings);
            // return the user
            return user;
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
    
      checkUser: protectedProcedure
      .input(z.object({}))
      .query(async ({ ctx }) => {
        return ctx.userId;
      }),
  
    getAccount: protectedProcedure
      .input(z.object({ userId: z.string().nullish() }))
      .query(async ({ ctx }) => {
        const user = await UserModel.findOne({ userId: ctx.userId });
          if (!user) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "ERROR: Could not load User, Please try again.",
            });
          } else {
            return user;
          }
      }),
      
    updateProfile: protectedProcedure
      .input(z.object({
        userId: z.string(),
        pfp: z.string(),
      }))
      .mutation(async ({ input: {userId, pfp} }) => {
        const user = await updatePfp({userId, pfp: pfp});
        if (!user) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "ERROR: Could not update user, Please try again.",
          });
        } else {
          return user;
        }
      })
  });
