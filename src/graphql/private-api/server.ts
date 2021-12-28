import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import schema from './schema';
import { PrivateServerContext } from './../../types/interface/global.interface';
import { Connection } from 'typeorm';
import { Controller } from '../../controller';

export const createPrivateServer = async ({ connection }: { connection: Connection }) => {
  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    context: async ({ req }) => {
      // Get the user token from the headers.
      const authorizationToken = req.headers.authorization || '';
      // Try to retrieve a user with the token
      const user: any = await Controller.UserController.getUserFromToken(connection,authorizationToken);
      if (!user) throw new AuthenticationError('PrivateContext : app.private.context -> header must be there you must be logged in');
      const appContext: PrivateServerContext = {
        userId: req.headers.authorization,
        connection: connection
      };
      return appContext;
    },
    debug: false, // gets stacktrace in response errors #Remove in production

  });
  return server;
}
