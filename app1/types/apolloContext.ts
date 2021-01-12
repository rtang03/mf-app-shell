import { Response } from 'express';

export type ApolloContext = {
  authUri: string;
  queryHanderUri: string;
  gatewayUri: string;
  res: Response;
  refreshToken?: string;
  accessToken?: string;
};
