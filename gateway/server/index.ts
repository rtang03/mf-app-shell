require('dotenv').config();
import http from 'http';
import process from 'process';
import util from 'util';
import { ApolloServer } from 'apollo-server-express';
import errorHandler from 'errorhandler';
import express from 'express';
import next from 'next';
import { schema } from './schema';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = parseInt(process.env.PORT || '3101', 10);
const handle = app.getRequestHandler();
const apolloServer = new ApolloServer({ schema });

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(errorHandler());

    apolloServer.applyMiddleware({ app: server, path: '/control/api/graphql' });

    server.get('*', (req, res) => handle(req, res));

    http.createServer(server).listen(port, () => {
      console.log(`🚀 gateway listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(util.format('❌  fail to start nextjs server, %j', error));
    process.exit(1);
  });
