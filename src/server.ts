import express from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { createOpenServer } from './graphql/open-api/server';
import './database';
import { initializeDB } from './database';
import { createPrivateServer } from './graphql/private-api';
import { Config } from './configuration';
import { Logs } from './library/logger';

export async function main() {

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.use(compression());

  const httpServer = createServer(app);

  const connection = await initializeDB();
  const openServer = await createOpenServer({ connection });
  await openServer.start();
  const privateServer = await createPrivateServer({ connection });
  await privateServer.start();
  // Mount Apollo middleware here.
  openServer.applyMiddleware({ app, path: '/api/open' });
  privateServer.applyMiddleware({ app, path: '/api/private' });

  await new Promise<void>(resolve => httpServer.listen({ port: Config.EnvConfig.SERVER_PORT }, resolve));
  Logs.console(`🚀 Server ready at http://localhost:${Config.EnvConfig.SERVER_PORT}${openServer.graphqlPath} 
  this is an open route which doesn't need Authorization, all public route goes here`);
  Logs.console(`🚀 Server ready at http://localhost:${Config.EnvConfig.SERVER_PORT}${privateServer.graphqlPath} 
  this route will only get connected if you have a accessToken with a valid user in database, 
  configure your apollo playground with Authorization header`);
}
