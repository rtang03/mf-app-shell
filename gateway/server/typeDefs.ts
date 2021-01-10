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
    fullTextSearchCommit(query: String!, cursor: Int, pagesize: Int): PaginatedCommit!
    fullTextSearchEntity(query: String!, cursor: Int, pagesize: Int): PaginatedEntity!
    paginatedEntity(
      creator: String
      cursor: Int
      pagesize: Int
      entityName: String!
      id: String
      scope: SearchScope
      startTime: Int
      endTime: Int
      sortByField: String
      sort: String
    ): PaginatedEntity!
    paginatedCommit(
      creator: String
      cursor: Int
      pagesize: Int
      entityName: String!
      id: String
      events: [String!]
      startTime: Int
      endTime: Int
      sortByField: String
      sort: String
    ): PaginatedCommit!
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

  enum SearchScope {
    CREATED
    LAST_MODIFIED
  }

  type PaginatedEntity {
    total: Int
    cursor: Int
    hasMore: Boolean!
    items: [QueryHandlerEntity!]!
  }

  type PaginatedCommit {
    total: Int
    cursor: Int
    hasMore: Boolean!
    items: [Commit!]!
  }

  type Commit {
    id: String
    mspId: String
    entityName: String
    version: Int
    commitId: String
    entityId: String
    eventsString: String
  }

  type QueryHandlerEntity {
    id: String!
    entityName: String!
    value: String!
    commits: [String!]!
    events: String!
    desc: String
    tag: String
    created: Float!
    creator: String!
    lastModified: Float!
    timeline: String!
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
