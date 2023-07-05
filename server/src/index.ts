import express from 'express';
import http from 'http';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import dotenv from 'dotenv';
import { createContext } from './utils/trpc';
import cookieParser  from 'cookie-parser';
import { connect } from './utils/db';
import mainRouter from './routes';

import Websocket from './utils/Websocket';

// configure environment file
dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['set-cookie', 'upgrade'],
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

const server = http.createServer(app);
Websocket(server);

server.listen(port, async () => {
  await connect();
  console.log(`***** Server listening on port ${port} *****`);
});
