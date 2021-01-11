import { mergeTypeDefs } from '@graphql-tools/merge';
import authType from './authServer';
import queryHandlerType from './queryHandler';

export default mergeTypeDefs([authType, queryHandlerType]);
