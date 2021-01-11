import { gql } from 'graphql-request';

// prettier-ignore
export default gql`
  query GetNotification (
    $entityName: String!
    $id: String!
    $commitId: String!
  ) {
    getNotification (
      entityName: $entityName
      id: $id
      commitId: $commitId
    ) {
      id
      commitId
      entityName
      creator
      read
    }
  }
`;
