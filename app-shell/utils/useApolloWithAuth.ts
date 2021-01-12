import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, Operation } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { SchemaLink } from '@apollo/link-schema';
import { useMemo } from 'react';
import { schema } from '../server/schema';
import { tokenStore } from './tokenStore';

let apolloClient: ApolloClient<any>;

// add authorization headers for each ApolloLink
const authLink = () =>
  setContext((_, { headers }) => ({
    headers: { ...headers, authorization: `Bearer ${tokenStore.getToken()}` },
  }));

const backendForFrontendLink = new HttpLink({
  uri: '/control/api/graphql',
  credentials: 'same-origin',
});

const gatewayLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_GW_ORG_EXTERNAL_HOST ||
    process.env.GW_ORG_EXTERNAL_HOST ||
    'http://localhost:4001/graphql',
});

const condition = (dest: string) => ({ getContext }: Operation) => getContext().backend === dest;

// https://www.loudnoises.us/next-js-two-apollo-clients-two-graphql-data-sources-the-easy-way/
const createIsomorphLink = () =>
  typeof window === 'undefined'
    ? ApolloLink.split(condition('gateway'), gatewayLink, new SchemaLink({ schema }))
    : ApolloLink.split(condition('gateway'), gatewayLink, backendForFrontendLink);

const createClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    credentials: 'include',
    link: authLink().concat(createIsomorphLink()),
    cache: new InMemoryCache(),
  });

export const initializeApollo: (initialState: any) => ApolloClient<unknown> = (
  initialState = null
) => {
  const _apolloClient = apolloClient ?? createClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  initialState && _apolloClient.cache.restore(initialState);

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  !apolloClient && (apolloClient = _apolloClient);

  return _apolloClient;
};

export const useApolloWithAuth: (initialState: any) => ApolloClient<unknown> = (initialState) =>
  useMemo(() => initializeApollo(initialState), [initialState]);
