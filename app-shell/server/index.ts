require('dotenv').config();
import http from 'http';
import process from 'process';
import util from 'util';
import terminus from '@godaddy/terminus';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import errorHandler from 'errorhandler';
import express from 'express';
import httpStatus from 'http-status';
import next from 'next';
import { ApolloContext } from '../types';
import { schema } from './schema';

const authUri = process.env.AUTH_URI as string;
const queryHanderUri = process.env.QUERYHANDLER_URI as string;
const gatewayUri = process.env.GATEWAY_URI as string;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT || '3000', 10);
const csrfProtection = csrf({ cookie: true });
const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    const authorization = req.headers?.authorization;
    const refreshToken = req.cookies?.rt;
    const _accessToken = authorization?.split(' ')[1];
    const accessToken = _accessToken === 'null' ? undefined : _accessToken;

    return { res, accessToken, refreshToken, authUri, queryHanderUri, gatewayUri } as ApolloContext;
  },
});

app
  .prepare()
  .then(() => {
    if (!authUri) {
      console.error('environment variable $AUTH_URI is empty');
      process.exit(1);
    }

    if (!gatewayUri) {
      console.error('environment variable $GATEWAY_URI is empty');
      process.exit(1);
    }

    if (!queryHanderUri) {
      console.error('environment variable $QUERYHANDLER_URI is empty');
      process.exit(1);
    }

    console.debug(`Env - AUTH_HOST: ${authUri}`);
    console.debug(`Env - QUERYHANDLER_HOST: ${queryHanderUri}`);
    console.debug(`Env - GATEWAY_HOST: ${gatewayUri}`);

    const server = express();
    server.use(cookieParser());
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(errorHandler());

    apolloServer.applyMiddleware({ app: server, path: '/control/api/graphql' });

    server.get('/islive', (_, res) => res.status(204).end());
    server.get('*', csrfProtection, (req, res) => handle(req, res));

    // Required for k8s : given your readiness probes run every 5 second
    // may be worth using a bigger number so you won't run into any race conditions
    const beforeShutdown = () =>
      new Promise((resolve) => {
        console.log('cleanup finished, gateway is shutting down');
        setTimeout(resolve, 5000);
      });

    const onHealthCheck = async () => {
      const url = `${authUri}/oauth/authenticate/ping`;
      const result = await fetch(url)
        .then((res) => (res.status === httpStatus.OK ? { auth: 'ok' } : { auth: `${res.status}` }))
        .catch((err) => ({ auth: util.format('url: %s, unknown err: %j', url, err) }));

      console.debug(util.format('onHealthCheck %s: %j', url, result));

      return result.auth === 'ok'
        ? Promise.resolve(result)
        : Promise.reject(new Error(util.format('checks: %j', result)));
    };

    const onSignal = () =>
      new Promise((resolve) => {
        console.log('〽️  ui-control server is going to shut down');
        resolve(true);
      });

    terminus
      .createTerminus(http.createServer(server), {
        timeout: 3000,
        logger: console.log,
        signals: ['SIGINT', 'SIGTERM'],
        healthChecks: { '/healthcheck': onHealthCheck },
        onSignal,
        beforeShutdown,
      })
      .listen(port, () => {
        console.log(`🚀 Server listening at http://localhost:${port}`);
      });
  })
  .catch((error) => {
    console.error(util.format('❌  fail to start nextjs server, %j', error));
    process.exit(1);
  });
