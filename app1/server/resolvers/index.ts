import { mergeResolvers } from '@graphql-tools/merge';
import authServer from './authServer';
import queryHandler from './queryHandler';

// this resolvers is a reverse proxy implementation to forward the correct backend

export default mergeResolvers([authServer, queryHandler]);
