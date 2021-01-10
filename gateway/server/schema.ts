import { makeExecutableSchema } from 'graphql-tools';
import type { EntityInfo } from '../graphql/generated/queryHandler';
import type { Commit, Paginated, QueryHandlerEntity } from '../types';
import { typeDefs } from './typeDefs';

const paginatedCommit: Paginated<Commit> = {
  total: 1,
  cursor: 0,
  hasMore: false,
  items: [
    {
      id: 'ent123',
      mspId: 'org1',
      entityName: 'po',
      version: 1,
      commitId: 'com123',
      entityId: 'ent123',
      eventsString: '[{"type":"example"}]',
    },
  ],
};

const paginatedEntity: Paginated<QueryHandlerEntity> = {
  total: 1,
  cursor: 0,
  hasMore: false,
  items: [
    {
      id: '123',
      entityName: 'po',
      value: '{"data":"dummy"}',
      commits: ['commitid-123'],
      events: 'submited',
      desc: 'my-desc',
      tag: 'no_tag',
      created: 1610284147850,
      creator: 'me',
      lastModified: 1610284147850,
      timeline: '1610284147850',
    },
  ],
};

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
    fullTextSearchCommit: () => Promise.resolve<Paginated<Commit>>(paginatedCommit),
    fullTextSearchEntity: () => Promise.resolve<Paginated<QueryHandlerEntity>>(paginatedEntity),
    paginatedCommit: () => Promise.resolve<Paginated<Commit>>(paginatedCommit),
    paginatedEntity: () => Promise.resolve<Paginated<QueryHandlerEntity>>(paginatedEntity),
  },
  Mutation: {
    // Healthcheck purpose: "ping" send message to Redis.PubSub. If no error, return true.
    // This api is currently not used. It is used to check if Redis.PubSub is alive.
    // If not, the Apollo Subscription will fail as well.
    ping: async (message: string): Promise<boolean> => true,
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
