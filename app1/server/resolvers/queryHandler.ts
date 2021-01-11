import { ApolloError } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import { EntityInfo } from '../../graphql/generated/queryHandler';
import { ApolloContext } from '../../types';
import GetEntityInfoQuery from './queryToQueryHandler/getEntityInfo';

type Resolvers = {
  Query: {
    getEntityInfo: (root: unknown, variables: any, context: ApolloContext) => Promise<EntityInfo[]>;
  };
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
  },
};

export default resolvers;
