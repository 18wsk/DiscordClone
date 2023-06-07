import express from 'express';
import http from 'http';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import dotenv from 'dotenv';
import { createContext } from './utils/trpc';
import cookieParser  from 'cookie-parser';
import { connect } from './utils/db';
import { runWSS } from './utils/Websocket';
import { EventEmitter } from 'events';
import mainRouter from './routes';


// create a global event emitter (could be replaced by redis, etc)
const ee = new EventEmitter();

// configure environment file
dotenv.config();

const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['upgrade'], // Allow WebSocket upgrade header
}));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));


app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: mainRouter,
    createContext,
  }),
);

server.listen(port, async () => {
  await connect();
  console.log(`***** Server listening on port ${port} *****`);
});

runWSS( server );

