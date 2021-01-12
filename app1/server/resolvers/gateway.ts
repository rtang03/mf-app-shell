import { WalletEntry } from '../../graphql/generated-gateway';
import { ApolloContext } from '../../types';
import { forwardRequest } from './forwardRequest';
import CreateWalletQuery from './gqlGateway/createWallet';
import GetWalletQuery from './gqlGateway/getWallet';

type TQuery<TResult> = (root: unknown, variables: any, context: ApolloContext) => Promise<TResult>;
type Resolvers = {
  Query: { getWallet: TQuery<WalletEntry> };
  Mutation: { createWallet: TQuery<boolean> };
};

// Note: all call to gateway-org is GQL
const resolvers: Resolvers = {
  Query: {
    getWallet: async (_, __, ctx) =>
      forwardRequest<WalletEntry>({
        target: 'gateway',
        key: 'getWallet',
        query: GetWalletQuery,
        ctx,
      }),
  },
  Mutation: {
    createWallet: async (_, __, ctx) =>
      forwardRequest<boolean>({
        target: 'gateway',
        key: 'createWallet',
        query: CreateWalletQuery,
        ctx,
      }),
  },
};

export default resolvers;
