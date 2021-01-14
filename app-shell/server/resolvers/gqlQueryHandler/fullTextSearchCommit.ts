import { gql } from 'graphql-request';

// prettier-ignore
export default gql`
  query FullTextSearchCommit (
    $query: String!
    $cursor: Int
    $pagesize: Int
   ) {
    fullTextSearchCommit (
      query: $query
      cursor: $cursor
      pagesize: $pagesize
    ) {
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
