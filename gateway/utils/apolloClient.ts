import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, Operation } from '@apollo/client';
import { SchemaLink } from '@apollo/link-schema';
import fetch from 'isomorphic-unfetch';
import { useMemo } from 'react';
import { schema } from '../server/schema';

let apolloClient: ApolloClient<any>;

// fetching link for bbf (aka. BackendForFrontend}
const bbfLink = new HttpLink({
  uri: '/control/api/graphql',
  credentials: 'same-origin',
  fetch,
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
    : ApolloLink.split(condition('gateway'), gatewayLink, bbfLink);

const createClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    credentials: 'include',
    link: createIsomorphLink(),
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

export const useApollo: (initialState: any) => ApolloClient<unknown> = (initialState) =>
  useMemo(() => initializeApollo(initialState), [initialState]);
