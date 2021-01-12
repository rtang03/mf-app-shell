import { gql } from 'graphql-request';

// prettier-ignore
export default gql`
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
