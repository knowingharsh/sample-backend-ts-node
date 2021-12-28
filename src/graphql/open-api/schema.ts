import 'graphql-import-node';
import * as UserSchema from './schema/user.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolver';
import { GraphQLSchema } from 'graphql';
const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [UserSchema],
  resolvers,
});
export default schema;