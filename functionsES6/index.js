import * as functions from 'firebase-functions';
import cors from 'cors';
import express from 'express';
import next from 'next';

const nextApp = next({ dev: false });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors({ origin: true }));

    server.get('/a', (req, res) => {
      return nextApp.render(req, res, '/b', req.query);
    });

    server.get('/b', (req, res) => {
      return nextApp.render(req, res, '/a', req.query);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

export let app = functions.https.onRequest(nextApp);
