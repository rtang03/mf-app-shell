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
  ping?: Maybe<Scalars['String']>;
  me: User;
};

export type User = {
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  is_deleted: Scalars['Boolean'];
  is_admin: Scalars['Boolean'];
  password: Scalars['String'];
};

export type Mutation = {
  refreshToken: RefreshToken;
  register: RegisteredUser;
  login: LoggedInUser;
  logout: Scalars['Boolean'];
  forget?: Maybe<Scalars['Boolean']>;
  reset?: Maybe<Scalars['Boolean']>;
  updateProfile: UpdatedProfile;
};

export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationForgetArgs = {
  email: Scalars['String'];
};

export type MutationResetArgs = {
  password: Scalars['String'];
  password2: Scalars['String'];
};

export type MutationUpdateProfileArgs = {
  id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
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

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  login: Pick<LoggedInUser, 'id' | 'access_token' | 'username' | 'token_type' | 'jwtExpiryInSec'>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { me: Pick<User, 'id' | 'username' | 'email' | 'is_deleted' | 'is_admin'> };

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
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

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
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
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
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
