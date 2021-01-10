import { gql } from '@apollo/client/core';

// mocked API for queryHandler microservice, can see packages/gateway-lib/src/query-handler/typeDef.ts

export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    me: User!
    getEntityInfo: [EntityInfo!]!
  }

  type Mutation {
    ping(message: String): Boolean
  }

  type EntityInfo {
    entityName: String!
    total: Int!
    events: [String!]!
    tagged: [String!]!
    creators: [String!]!
    orgs: [String!]!
    totalCommit: Int!
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
