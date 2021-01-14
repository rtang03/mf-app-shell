import { gql } from 'graphql-request';

// prettier-ignore
export default gql`
query GetWallet {
  getWallet {
    type
    mspId
    certificate
  }
}
`;
