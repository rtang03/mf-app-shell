import { makeExecutableSchema } from 'graphql-tools';
import type { EntityInfo } from '../graphql/generated/queryHandler';
import { typeDefs } from './typeDefs';

export const resolvers = {
  Query: {
    // Dev purpose: return authenticated user object. The authentication is made via app-shell.
    // Below is the mocked api.
    me: () =>
      Promise.resolve({
        id: '123456',
        username: 'user1',
        email: 'user1@example.com',
        is_deleted: false,
        is_admin: false,
      }),
    getEntityInfo: () =>
      Promise.resolve<EntityInfo[]>([
        {
          entityName: 'counter',
          total: 1,
          events: ['add'],
          tagged: ['none'],
          creators: ['user1'],
          orgs: ['org1'],
          totalCommit: 1,
        },
      ]),
  },
  Mutation: {
    // Healthcheck purpose: "ping" send message to Redis.PubSub. If no error, return true.
    // This api is currently not used. It is used to check if Redis.PubSub is alive.
    // If not, the Apollo Subscription will fail as well.
    ping: async (message: string): Promise<boolean> => true,
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
