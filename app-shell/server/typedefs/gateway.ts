export default `
  type Query {
    """
    return wallet info
    """
    getWallet: WalletEntry
  }

  type Mutation {
    """
    create new server side wallet for new registered user
    """
    createWallet: Boolean!
  }
  type WalletEntry {
    certificate: String!
    type: String!
    mspId: String!
  }
`;
