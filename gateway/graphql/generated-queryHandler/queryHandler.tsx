import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Subscription = {
  pong?: Maybe<Scalars['String']>;
  entityAdded?: Maybe<EntityArrived>;
  systemEvent?: Maybe<SysNotification>;
};


export type SubscriptionEntityAddedArgs = {
  entityName?: Maybe<Scalars['String']>;
};

export type SysNotification = {
  event?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Float']>;
};

export type EntityArrived = {
  events?: Maybe<Array<Maybe<Scalars['String']>>>;
  key?: Maybe<Scalars['String']>;
};

export type Query = {
  me?: Maybe<Scalars['String']>;
  getEntityInfo: Array<EntityInfo>;
  fullTextSearchCommit: PaginatedCommit;
  fullTextSearchEntity: PaginatedEntity;
  paginatedEntity: PaginatedEntity;
  paginatedCommit: PaginatedCommit;
  getNotifications: Array<Notification>;
  getNotification: Notification;
};


export type QueryFullTextSearchCommitArgs = {
  query: Scalars['String'];
  cursor?: Maybe<Scalars['Int']>;
  pagesize?: Maybe<Scalars['Int']>;
};


export type QueryFullTextSearchEntityArgs = {
  query: Scalars['String'];
  cursor?: Maybe<Scalars['Int']>;
  pagesize?: Maybe<Scalars['Int']>;
};


export type QueryPaginatedEntityArgs = {
  creator?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['Int']>;
  pagesize?: Maybe<Scalars['Int']>;
  entityName: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  scope?: Maybe<SearchScope>;
  startTime?: Maybe<Scalars['Int']>;
  endTime?: Maybe<Scalars['Int']>;
  sortByField?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
};


export type QueryPaginatedCommitArgs = {
  creator?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['Int']>;
  pagesize?: Maybe<Scalars['Int']>;
  entityName: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  events?: Maybe<Array<Scalars['String']>>;
  startTime?: Maybe<Scalars['Int']>;
  endTime?: Maybe<Scalars['Int']>;
  sortByField?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
};


export type QueryGetNotificationArgs = {
  entityName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  commitId?: Maybe<Scalars['String']>;
};

export type Notification = {
  creator: Scalars['String'];
  entityName: Scalars['String'];
  id: Scalars['String'];
  commitId: Scalars['String'];
  read: Scalars['Boolean'];
};

export type EntityInfo = {
  entityName: Scalars['String'];
  total: Scalars['Int'];
  events: Array<Scalars['String']>;
  tagged: Array<Scalars['String']>;
  creators: Array<Scalars['String']>;
  orgs: Array<Scalars['String']>;
  totalCommit: Scalars['Int'];
};

export enum SearchScope {
  Created = 'CREATED',
  LastModified = 'LAST_MODIFIED'
}

export type PaginatedEntity = {
  total?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
  items: Array<QueryHandlerEntity>;
};

export type PaginatedCommit = {
  total?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
  items: Array<Commit>;
};

export type QueryHandlerEntity = {
  id: Scalars['String'];
  entityName: Scalars['String'];
  value: Scalars['String'];
  commits: Array<Scalars['String']>;
  events: Scalars['String'];
  desc?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
  created: Scalars['Float'];
  creator: Scalars['String'];
  lastModified: Scalars['Float'];
  timeline: Scalars['String'];
};

export type Mutation = {
  ping?: Maybe<Scalars['Boolean']>;
  reloadEntities?: Maybe<Scalars['Boolean']>;
  createCommit: Commit;
};


export type MutationPingArgs = {
  message?: Maybe<Scalars['String']>;
};


export type MutationReloadEntitiesArgs = {
  entityNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationCreateCommitArgs = {
  entityName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  payloadString?: Maybe<Scalars['String']>;
};

export type Commit = {
  id?: Maybe<Scalars['String']>;
  mspId?: Maybe<Scalars['String']>;
  entityName?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
  commitId?: Maybe<Scalars['String']>;
  entityId?: Maybe<Scalars['String']>;
  eventsString?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type FullTextSearchCommitQueryVariables = Exact<{
  query: Scalars['String'];
  cursor?: Maybe<Scalars['Int']>;
  pagesize?: Maybe<Scalars['Int']>;
}>;


export type FullTextSearchCommitQuery = { fullTextSearchCommit: (
    Pick<PaginatedCommit, 'total' | 'hasMore' | 'cursor'>
    & { items: Array<Pick<Commit, 'id' | 'entityName' | 'version' | 'commitId' | 'entityId' | 'eventsString'>> }
  ) };

export type FullTextSearchEntityQueryVariables = Exact<{
  query: Scalars['String'];
  cursor?: Maybe<Scalars['Int']>;
  pagesize?: Maybe<Scalars['Int']>;
}>;


export type FullTextSearchEntityQuery = { fullTextSearchEntity: (
    Pick<PaginatedEntity, 'total' | 'hasMore' | 'cursor'>
    & { items: Array<Pick<QueryHandlerEntity, 'id' | 'entityName' | 'value' | 'commits' | 'events' | 'tag' | 'desc' | 'created' | 'creator' | 'lastModified' | 'timeline'>> }
  ) };

export type GetEntityInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEntityInfoQuery = { getEntityInfo: Array<Pick<EntityInfo, 'entityName' | 'events' | 'creators' | 'orgs' | 'total' | 'totalCommit' | 'tagged'>> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = Pick<Query, 'me'>;


export const FullTextSearchCommitDocument = gql`
    query FullTextSearchCommit($query: String!, $cursor: Int, $pagesize: Int) {
  fullTextSearchCommit(query: $query, cursor: $cursor, pagesize: $pagesize) {
    total
    hasMore
    cursor
    items {
      id
      entityName
      version
      commitId
      entityId
      eventsString
    }
  }
}
    `;

/**
 * __useFullTextSearchCommitQuery__
 *
 * To run a query within a React component, call `useFullTextSearchCommitQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullTextSearchCommitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFullTextSearchCommitQuery({
 *   variables: {
 *      query: // value for 'query'
 *      cursor: // value for 'cursor'
 *      pagesize: // value for 'pagesize'
 *   },
 * });
 */
export function useFullTextSearchCommitQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FullTextSearchCommitQuery, FullTextSearchCommitQueryVariables>) {
        return ApolloReactHooks.useQuery<FullTextSearchCommitQuery, FullTextSearchCommitQueryVariables>(FullTextSearchCommitDocument, baseOptions);
      }
export function useFullTextSearchCommitLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FullTextSearchCommitQuery, FullTextSearchCommitQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FullTextSearchCommitQuery, FullTextSearchCommitQueryVariables>(FullTextSearchCommitDocument, baseOptions);
        }
export type FullTextSearchCommitQueryHookResult = ReturnType<typeof useFullTextSearchCommitQuery>;
export type FullTextSearchCommitLazyQueryHookResult = ReturnType<typeof useFullTextSearchCommitLazyQuery>;
export type FullTextSearchCommitQueryResult = ApolloReactCommon.QueryResult<FullTextSearchCommitQuery, FullTextSearchCommitQueryVariables>;
export const FullTextSearchEntityDocument = gql`
    query FullTextSearchEntity($query: String!, $cursor: Int, $pagesize: Int) {
  fullTextSearchEntity(query: $query, cursor: $cursor, pagesize: $pagesize) {
    total
    hasMore
    cursor
    items {
      id
      entityName
      value
      commits
      events
      tag
      desc
      created
      creator
      lastModified
      timeline
    }
  }
}
    `;

/**
 * __useFullTextSearchEntityQuery__
 *
 * To run a query within a React component, call `useFullTextSearchEntityQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullTextSearchEntityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFullTextSearchEntityQuery({
 *   variables: {
 *      query: // value for 'query'
 *      cursor: // value for 'cursor'
 *      pagesize: // value for 'pagesize'
 *   },
 * });
 */
export function useFullTextSearchEntityQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FullTextSearchEntityQuery, FullTextSearchEntityQueryVariables>) {
        return ApolloReactHooks.useQuery<FullTextSearchEntityQuery, FullTextSearchEntityQueryVariables>(FullTextSearchEntityDocument, baseOptions);
      }
export function useFullTextSearchEntityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FullTextSearchEntityQuery, FullTextSearchEntityQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FullTextSearchEntityQuery, FullTextSearchEntityQueryVariables>(FullTextSearchEntityDocument, baseOptions);
        }
export type FullTextSearchEntityQueryHookResult = ReturnType<typeof useFullTextSearchEntityQuery>;
export type FullTextSearchEntityLazyQueryHookResult = ReturnType<typeof useFullTextSearchEntityLazyQuery>;
export type FullTextSearchEntityQueryResult = ApolloReactCommon.QueryResult<FullTextSearchEntityQuery, FullTextSearchEntityQueryVariables>;
export const GetEntityInfoDocument = gql`
    query GetEntityInfo {
  getEntityInfo {
    entityName
    events
    creators
    orgs
    total
    totalCommit
    tagged
  }
}
    `;

/**
 * __useGetEntityInfoQuery__
 *
 * To run a query within a React component, call `useGetEntityInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEntityInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEntityInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEntityInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEntityInfoQuery, GetEntityInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<GetEntityInfoQuery, GetEntityInfoQueryVariables>(GetEntityInfoDocument, baseOptions);
      }
export function useGetEntityInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEntityInfoQuery, GetEntityInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetEntityInfoQuery, GetEntityInfoQueryVariables>(GetEntityInfoDocument, baseOptions);
        }
export type GetEntityInfoQueryHookResult = ReturnType<typeof useGetEntityInfoQuery>;
export type GetEntityInfoLazyQueryHookResult = ReturnType<typeof useGetEntityInfoLazyQuery>;
export type GetEntityInfoQueryResult = ApolloReactCommon.QueryResult<GetEntityInfoQuery, GetEntityInfoQueryVariables>;
export const MeDocument = gql`
    query ME {
  me
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;