import { ApolloError } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import { EntityInfo } from '../../graphql/generated/queryHandler';
import { ApolloContext, Commit, Paginated, QueryHandlerEntity } from '../../types';
import FullTextSearchCommit from './queryToQueryHandler/fullTextSearchCommit';
import FullTextSearchEntity from './queryToQueryHandler/fullTextSearchEntity';
import GetEntityInfoQuery from './queryToQueryHandler/getEntityInfo';

type Resolvers = {
  Query: {
    getEntityInfo: (root: unknown, variables: any, context: ApolloContext) => Promise<EntityInfo[]>;
    fullTextSearchCommit: (
      root: unknown,
      variables: any,
      context: ApolloContext
    ) => Promise<Paginated<Commit> | null>;
    fullTextSearchEntity: (
      root: unknown,
      variables: any,
      context: ApolloContext
    ) => Promise<Paginated<QueryHandlerEntity> | null>;
  };
};

const forwardRequest: (option: {
  key: string;
  query: string;
  variables?: any;
  ctx: ApolloContext;
}) => Promise<any> = async ({ key, query, variables, ctx }) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    authorization: `bearer ${ctx.accessToken}`,
  };
  const client = new GraphQLClient(ctx.queryHanderUri, { headers });
  try {
    const result = await client.request(query, variables);
    return result?.[key];
  } catch (e) {
    console.error('fail to graphql.request: ', query);
    return new ApolloError({ errorMessage: e.message });
  }
};

// Note: all call to Query Handler is GQL
const resolvers: Resolvers = {
  Query: {
    getEntityInfo: async (_, __, ctx) => {
      const headers = {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${ctx.accessToken}`,
      };
      const query = GetEntityInfoQuery;
      const client = new GraphQLClient(ctx.queryHanderUri, { headers });
      try {
        const result = await client.request(query);
        return result?.getEntityInfo;
      } catch (e) {
        console.error('fail to graphql.request: ', query);
        return new ApolloError({ errorMessage: e.message });
      }
    },
    fullTextSearchCommit: async (_, variables, ctx) => {
      const headers = {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${ctx.accessToken}`,
      };
      const query = FullTextSearchCommit;
      const client = new GraphQLClient(ctx.queryHanderUri, { headers });
      try {
        const result = await client.request(query, variables);
        return result?.fullTextSearchCommit;
      } catch (e) {
        console.error('fail to graphql.request: ', query);
        return new ApolloError({ errorMessage: e.message });
      }
    },
    fullTextSearchEntity: async (_, variables, ctx) => {
      const headers = {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${ctx.accessToken}`,
      };
      return null;
    },
  },
};

export default resolvers;
