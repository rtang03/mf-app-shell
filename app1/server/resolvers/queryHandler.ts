import util from 'util';
import { ApolloError } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import type {
  Commit,
  EntityInfo,
  Notification,
  PaginatedCommit,
  PaginatedEntity,
} from '../../graphql/generated-next-backend';
import type { ApolloContext } from '../../types';
import CreateCommitMutation from './queryToQueryHandler/createCommit';
import FullTextSearchCommitQuery from './queryToQueryHandler/fullTextSearchCommit';
import FullTextSearchEntityQuery from './queryToQueryHandler/fullTextSearchEntity';
import GetEntityInfoQuery from './queryToQueryHandler/getEntityInfo';
import GetNotificationQuery from './queryToQueryHandler/getNotification';
import GetNotificationsQuery from './queryToQueryHandler/getNotifications';
import PaginatedCommitQuery from './queryToQueryHandler/paginatedCommit';
import PaginatedEntityQuery from './queryToQueryHandler/paginatedEntity';

type Resolvers = {
  Query: {
    getEntityInfo: (root: unknown, variables: any, context: ApolloContext) => Promise<EntityInfo[]>;
    fullTextSearchCommit: (
      root: unknown,
      variables: any,
      context: ApolloContext
    ) => Promise<PaginatedCommit>;
    fullTextSearchEntity: (
      root: unknown,
      variables: any,
      context: ApolloContext
    ) => Promise<PaginatedEntity>;
    paginatedCommit: (
      root: unknown,
      variables: any,
      context: ApolloContext
    ) => Promise<PaginatedCommit>;
    paginatedEntity: (
      root: unknown,
      variables: any,
      context: ApolloContext
    ) => Promise<PaginatedEntity>;
    getNotification: (
      root: unknown,
      variables: any,
      context: ApolloContext
    ) => Promise<Notification>;
    getNotifications: (
      root: unknown,
      variables: any,
      context: ApolloContext
    ) => Promise<Notification[]>;
  };
  Mutation: {
    // ping is not required to implement in BBF
    // reloadEntities is not require to implement in BBF
    createCommit: (root: unknown, variables: any, context: ApolloContext) => Promise<Commit>;
  };
};

// The BackendForFrontend will forward gql request to queryHandler api
const forwardRequest: <TResult>(option: {
  key: string;
  query: string;
  variables?: any;
  ctx: ApolloContext;
}) => Promise<TResult> = async ({
  key,
  query,
  variables,
  ctx: { accessToken, queryHanderUri },
}) => {
  const client = new GraphQLClient(queryHanderUri, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      authorization: `bearer ${accessToken}`,
    },
  });

  try {
    const result = await client.request(query, variables);
    return result?.[key];
  } catch (e) {
    console.error(util.format('fail to graphql.request - %s: %j', key, e));
    return new ApolloError({ errorMessage: e.message });
  }
};

// Note: all call to Query Handler is GQL
const resolvers: Resolvers = {
  Query: {
    getEntityInfo: async (_, __, ctx) =>
      forwardRequest<EntityInfo[]>({ key: 'getEntityInfo', query: GetEntityInfoQuery, ctx }),
    fullTextSearchCommit: async (_, variables, ctx) =>
      forwardRequest<PaginatedCommit>({
        key: 'fullTextSearchCommit',
        query: FullTextSearchCommitQuery,
        variables,
        ctx,
      }),
    fullTextSearchEntity: async (_, variables, ctx) =>
      forwardRequest<PaginatedEntity>({
        key: 'fullTextSearchEntity',
        query: FullTextSearchEntityQuery,
        variables,
        ctx,
      }),
    paginatedCommit: async (_, variables, ctx) =>
      forwardRequest<PaginatedCommit>({
        key: 'paginatedCommit',
        query: PaginatedCommitQuery,
        variables,
        ctx,
      }),
    paginatedEntity: async (_, variables, ctx) =>
      forwardRequest<PaginatedEntity>({
        key: 'paginatedEntity',
        query: PaginatedEntityQuery,
        variables,
        ctx,
      }),
    getNotification: async (_, variables, ctx) =>
      forwardRequest<Notification>({
        key: 'getNotification',
        query: GetNotificationQuery,
        variables,
        ctx,
      }),
    getNotifications: async (_, __, ctx) =>
      forwardRequest<Notification[]>({
        key: 'getNotification',
        query: GetNotificationsQuery,
        ctx,
      }),
  },
  Mutation: {
    createCommit: async (_, variables, ctx) =>
      forwardRequest<Commit>({ key: 'createCommit', query: CreateCommitMutation, variables, ctx }),
  },
};

export default resolvers;
