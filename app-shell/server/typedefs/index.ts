import { mergeTypeDefs } from '@graphql-tools/merge';
import authType from './authServer';
import gatewayType from './gateway';
import queryHandlerType from './queryHandler';

export default mergeTypeDefs([authType, gatewayType, queryHandlerType]);
