import util from 'util';
import { ApolloError } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import { ApolloContext } from '../../types';

// The BackendForFrontend will forward gql request to queryHandler api
export const forwardRequest: <TResult>(option: {
  target: 'gateway' | 'queryHandler';
  key: string;
  query: string;
  variables?: any;
  ctx: ApolloContext;
}) => Promise<TResult> = async ({
  target,
  key,
  query,
  variables,
  ctx: { accessToken, queryHanderUri, gatewayUri },
}) => {
  const uri = { ['gateway' as string]: gatewayUri, queryHandler: queryHanderUri }[target];
  const client = new GraphQLClient(uri, {
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
