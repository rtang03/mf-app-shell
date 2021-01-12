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
};

export type Query = {
  currentUser: User;
  getEntityInfo: Array<EntityInfo>;
  fullTextSearchCommit: PaginatedCommit;
  fullTextSearchEntity: PaginatedEntity;
  paginatedEntity: PaginatedEntity;
  paginatedCommit: PaginatedCommit;
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

export type Mutation = {
  ping?: Maybe<Scalars['Boolean']>;
};


export type MutationPingArgs = {
  message?: Maybe<Scalars['String']>;
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

export type Commit = {
  id?: Maybe<Scalars['String']>;
  mspId?: Maybe<Scalars['String']>;
  entityName?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
  commitId?: Maybe<Scalars['String']>;
  entityId?: Maybe<Scalars['String']>;
  eventsString?: Maybe<Scalars['String']>;
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

export type User = {
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  is_deleted: Scalars['Boolean'];
  is_admin: Scalars['Boolean'];
  password: Scalars['String'];
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { currentUser: Pick<User, 'id' | 'username' | 'email' | 'is_deleted' | 'is_admin'> };


export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    username
    email
    is_deleted
    is_admin
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;