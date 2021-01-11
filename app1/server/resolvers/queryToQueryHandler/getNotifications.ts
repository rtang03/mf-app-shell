import { gql } from 'graphql-request';

// prettier-ignore
export default gql`
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
