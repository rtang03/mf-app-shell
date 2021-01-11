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

/** Qurey schema for Backend-For-Frontend */
export type Query = {
  ping?: Maybe<Scalars['String']>;
  /** return authenticated user from auth-server */
  me: User;
  /** Summary of entities in query handler */
  getEntityInfo: Array<EntityInfo>;
  /** Full text search of commit */
  fullTextSearchCommit: PaginatedCommit;
  /** Full text search of entity */
  fullTextSearchEntity: PaginatedEntity;
  /** Parametric query to return paginated entities */
  paginatedEntity: PaginatedEntity;
  /** Parametric query to return paginated commits */
  paginatedCommit: PaginatedCommit;
  /** Return lists of unread notifications */
  getNotifications: Array<Notification>;
  /** Return notification details */
  getNotification: Notification;
};


/** Qurey schema for Backend-For-Frontend */
export type QueryFullTextSearchCommitArgs = {
  query: Scalars['String'];
  cursor?: Maybe<Scalars['Int']>;
  pagesize?: Maybe<Scalars['Int']>;
};


/** Qurey schema for Backend-For-Frontend */
export type QueryFullTextSearchEntityArgs = {
  query: Scalars['String'];
  cursor?: Maybe<Scalars['Int']>;
  pagesize?: Maybe<Scalars['Int']>;
};


/** Qurey schema for Backend-For-Frontend */
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


/** Qurey schema for Backend-For-Frontend */
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


/** Qurey schema for Backend-For-Frontend */
export type QueryGetNotificationArgs = {
  entityName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  commitId?: Maybe<Scalars['String']>;
};

/** Mutation schema for Backend-For-Frontend */
export type Mutation = {
  refreshToken: RefreshToken;
  register: RegisteredUser;
  login: LoggedInUser;
  logout: Scalars['Boolean'];
  forget?: Maybe<Scalars['Boolean']>;
  reset?: Maybe<Scalars['Boolean']>;
  updateProfile: UpdatedProfile;
};


/** Mutation schema for Backend-For-Frontend */
export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


/** Mutation schema for Backend-For-Frontend */
export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


/** Mutation schema for Backend-For-Frontend */
export type MutationForgetArgs = {
  email: Scalars['String'];
};


/** Mutation schema for Backend-For-Frontend */
export type MutationResetArgs = {
  password: Scalars['String'];
  password2: Scalars['String'];
};


/** Mutation schema for Backend-For-Frontend */
export type MutationUpdateProfileArgs = {
  id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};

/** User from auth-server */
export type User = {
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  is_deleted: Scalars['Boolean'];
  is_admin: Scalars['Boolean'];
  password: Scalars['String'];
};

export type UpdatedProfile = {
  ok: Scalars['Boolean'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type RefreshToken = {
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
};

export type RegisteredUser = {
  username: Scalars['String'];
  id: Scalars['String'];
};

export type LoggedInUser = {
  username: Scalars['String'];
  id: Scalars['String'];
  access_token: Scalars['String'];
  jwtExpiryInSec: Scalars['String'];
  token_type: Scalars['String'];
};

/** Notification details */
export type Notification = {
  creator: Scalars['String'];
  entityName: Scalars['String'];
  id: Scalars['String'];
  commitId: Scalars['String'];
  read: Scalars['Boolean'];
};

/** Entity metadata */
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

/** Generic entity in query handler */
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

/** Generict commit in query handler */
export type Commit = {
  id?: Maybe<Scalars['String']>;
  mspId?: Maybe<Scalars['String']>;
  entityName?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
  commitId?: Maybe<Scalars['String']>;
  entityId?: Maybe<Scalars['String']>;
  eventsString?: Maybe<Scalars['String']>;
};

export type ForgetMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgetMutation = Pick<Mutation, 'forget'>;

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

export type GetNotificationQueryVariables = Exact<{
  entityName: Scalars['String'];
  id: Scalars['String'];
  commitId: Scalars['String'];
}>;


export type GetNotificationQuery = { getNotification: Pick<Notification, 'id' | 'commitId' | 'entityName' | 'creator' | 'read'> };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = { getNotifications: Array<Pick<Notification, 'id' | 'commitId' | 'entityName' | 'creator' | 'read'>> };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login: Pick<LoggedInUser, 'id' | 'access_token' | 'username' | 'token_type' | 'jwtExpiryInSec'> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = Pick<Mutation, 'logout'>;

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: Pick<User, 'id' | 'username' | 'email' | 'is_deleted' | 'is_admin'> };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { register: Pick<RegisteredUser, 'id' | 'username'> };

export type ResetMutationVariables = Exact<{
  password: Scalars['String'];
  password2: Scalars['String'];
}>;


export type ResetMutation = Pick<Mutation, 'reset'>;

export type UpdateProfileMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
}>;


export type UpdateProfileMutation = { updateProfile: Pick<UpdatedProfile, 'ok' | 'email' | 'username'> };


export const ForgetDocument = gql`
    mutation Forget($email: String!) {
  forget(email: $email)
}
    `;
export type ForgetMutationFn = ApolloReactCommon.MutationFunction<ForgetMutation, ForgetMutationVariables>;

/**
 * __useForgetMutation__
 *
 * To run a mutation, you first call `useForgetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgetMutation, { data, loading, error }] = useForgetMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgetMutation, ForgetMutationVariables>) {
        return ApolloReactHooks.useMutation<ForgetMutation, ForgetMutationVariables>(ForgetDocument, baseOptions);
      }
export type ForgetMutationHookResult = ReturnType<typeof useForgetMutation>;
export type ForgetMutationResult = ApolloReactCommon.MutationResult<ForgetMutation>;
export type ForgetMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgetMutation, ForgetMutationVariables>;
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
export const GetNotificationDocument = gql`
    query GetNotification($entityName: String!, $id: String!, $commitId: String!) {
  getNotification(entityName: $entityName, id: $id, commitId: $commitId) {
    id
    commitId
    entityName
    creator
    read
  }
}
    `;

/**
 * __useGetNotificationQuery__
 *
 * To run a query within a React component, call `useGetNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationQuery({
 *   variables: {
 *      entityName: // value for 'entityName'
 *      id: // value for 'id'
 *      commitId: // value for 'commitId'
 *   },
 * });
 */
export function useGetNotificationQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetNotificationQuery, GetNotificationQueryVariables>) {
        return ApolloReactHooks.useQuery<GetNotificationQuery, GetNotificationQueryVariables>(GetNotificationDocument, baseOptions);
      }
export function useGetNotificationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetNotificationQuery, GetNotificationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetNotificationQuery, GetNotificationQueryVariables>(GetNotificationDocument, baseOptions);
        }
export type GetNotificationQueryHookResult = ReturnType<typeof useGetNotificationQuery>;
export type GetNotificationLazyQueryHookResult = ReturnType<typeof useGetNotificationLazyQuery>;
export type GetNotificationQueryResult = ApolloReactCommon.QueryResult<GetNotificationQuery, GetNotificationQueryVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications {
  getNotifications {
    id
    commitId
    entityName
    creator
    read
  }
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, baseOptions);
      }
export function useGetNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, baseOptions);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsQueryResult = ApolloReactCommon.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    id
    access_token
    username
    token_type
    jwtExpiryInSec
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query ME {
  me {
    id
    username
    email
    is_deleted
    is_admin
  }
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
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    id
    username
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetDocument = gql`
    mutation Reset($password: String!, $password2: String!) {
  reset(password: $password, password2: $password2)
}
    `;
export type ResetMutationFn = ApolloReactCommon.MutationFunction<ResetMutation, ResetMutationVariables>;

/**
 * __useResetMutation__
 *
 * To run a mutation, you first call `useResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetMutation, { data, loading, error }] = useResetMutation({
 *   variables: {
 *      password: // value for 'password'
 *      password2: // value for 'password2'
 *   },
 * });
 */
export function useResetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetMutation, ResetMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetMutation, ResetMutationVariables>(ResetDocument, baseOptions);
      }
export type ResetMutationHookResult = ReturnType<typeof useResetMutation>;
export type ResetMutationResult = ApolloReactCommon.MutationResult<ResetMutation>;
export type ResetMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetMutation, ResetMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($username: String!, $email: String!, $id: String!) {
  updateProfile(username: $username, email: $email, id: $id) {
    ok
    email
    username
  }
}
    `;
export type UpdateProfileMutationFn = ApolloReactCommon.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, baseOptions);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = ApolloReactCommon.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;