import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import schema from './schema';
import { OpenServerContext } from './../../types/interface/global.interface';
import { Connection } from 'typeorm';

export const createOpenServer = async ({ connection }: { connection: Connection }) => {
  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    context: ({ req }) => {
      const appContext: OpenServerContext = {
        connection: connection
      };
      return appContext;
    },
    debug: false, // gets stacktrace in response errors #Remove in production
  });
  return server;
}
