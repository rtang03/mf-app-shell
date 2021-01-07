require('dotenv').config();
import http from 'http';
import process from 'process';
import util from 'util';
import errorHandler from 'errorhandler';
import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = parseInt(process.env.PORT || '3101', 10);
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(errorHandler());

    server.get('*', (req, res) => handle(req, res));

    http.createServer(server).listen(port, () => {
      console.log(`🚀 gw1 listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(util.format('❌  fail to start nextjs server, %j', error));
    process.exit(1);
  });
