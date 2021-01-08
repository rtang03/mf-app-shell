import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './typeDefs';

export const resolvers = {
  Query: {
    ping: async (): Promise<string> => 'pong',
    me: () =>
      Promise.resolve({
        id: '123456',
        username: 'user1',
        email: 'user1@example.com',
        is_deleted: false,
        is_admin: false,
      }),
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
