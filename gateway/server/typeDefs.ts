import { gql } from '@apollo/client/core';

export const typeDefs = gql`
  type Query {
    ping: String
    me: User!
  }

  type User {
    id: String!
    username: String!
    email: String!
    is_deleted: Boolean!
    is_admin: Boolean!
    password: String!
  }
`;
