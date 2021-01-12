import type {
  Commit,
  EntityInfo,
  Notification,
  PaginatedCommit,
  PaginatedEntity,
} from '../../graphql/generated-next-backend';
import type { ApolloContext } from '../../types';
import { forwardRequest } from './forwardRequest';
import CreateCommitMutation from './gqlQueryHandler/createCommit';
import FullTextSearchCommitQuery from './gqlQueryHandler/fullTextSearchCommit';
import FullTextSearchEntityQuery from './gqlQueryHandler/fullTextSearchEntity';
import GetEntityInfoQuery from './gqlQueryHandler/getEntityInfo';
import GetNotificationQuery from './gqlQueryHandler/getNotification';
import GetNotificationsQuery from './gqlQueryHandler/getNotifications';
import PaginatedCommitQuery from './gqlQueryHandler/paginatedCommit';
import PaginatedEntityQuery from './gqlQueryHandler/paginatedEntity';

type TQuery<TResult> = (root: unknown, variables: any, context: ApolloContext) => Promise<TResult>;
type Resolvers = {
  Query: {
    getEntityInfo: TQuery<EntityInfo[]>;
    fullTextSearchCommit: TQuery<PaginatedCommit>;
    fullTextSearchEntity: TQuery<PaginatedEntity>;
    paginatedCommit: TQuery<PaginatedCommit>;
    paginatedEntity: TQuery<PaginatedEntity>;
    getNotification: TQuery<Notification>;
    getNotifications: TQuery<Notification[]>;
  };
  Mutation: {
    // ping is not required to implement in next-backend
    // reloadEntities is not require to implement in next-backend
    createCommit: TQuery<Commit>;
  };
};

// Note: all call to Query Handler is GQL
const resolvers: Resolvers = {
  Query: {
    getEntityInfo: async (_, __, ctx) =>
      forwardRequest<EntityInfo[]>({
        target: 'queryHandler',
        key: 'getEntityInfo',
        query: GetEntityInfoQuery,
        ctx,
      }),
    fullTextSearchCommit: async (_, variables, ctx) =>
      forwardRequest<PaginatedCommit>({
        target: 'queryHandler',
        key: 'fullTextSearchCommit',
        query: FullTextSearchCommitQuery,
        variables,
        ctx,
      }),
    fullTextSearchEntity: async (_, variables, ctx) =>
      forwardRequest<PaginatedEntity>({
        target: 'queryHandler',
        key: 'fullTextSearchEntity',
        query: FullTextSearchEntityQuery,
        variables,
        ctx,
      }),
    paginatedCommit: async (_, variables, ctx) =>
      forwardRequest<PaginatedCommit>({
        target: 'queryHandler',
        key: 'paginatedCommit',
        query: PaginatedCommitQuery,
        variables,
        ctx,
      }),
    paginatedEntity: async (_, variables, ctx) =>
      forwardRequest<PaginatedEntity>({
        target: 'queryHandler',
        key: 'paginatedEntity',
        query: PaginatedEntityQuery,
        variables,
        ctx,
      }),
    getNotification: async (_, variables, ctx) =>
      forwardRequest<Notification>({
        target: 'queryHandler',
        key: 'getNotification',
        query: GetNotificationQuery,
        variables,
        ctx,
      }),
    getNotifications: async (_, __, ctx) =>
      forwardRequest<Notification[]>({
        target: 'queryHandler',
        key: 'getNotification',
        query: GetNotificationsQuery,
        ctx,
      }),
  },
  Mutation: {
    createCommit: async (_, variables, ctx) =>
      forwardRequest<Commit>({
        target: 'queryHandler',
        key: 'createCommit',
        query: CreateCommitMutation,
        variables,
        ctx,
      }),
  },
};

export default resolvers;
