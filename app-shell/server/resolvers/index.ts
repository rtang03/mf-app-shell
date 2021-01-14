import { mergeResolvers } from '@graphql-tools/merge';
import authServer from './authServer';
import gateway from './gateway';
import queryHandler from './queryHandler';

// this resolvers is a reverse proxy implementation to forward the correct backend

export default mergeResolvers([authServer, gateway, queryHandler]);
