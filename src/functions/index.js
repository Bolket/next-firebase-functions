/* eslint-disable import/no-unresolved,import/extensions,prefer-destructuring */

import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import next from 'next';
import session from 'express-session';
import FirebaseStore from 'connect-session-firebase';
import express from 'express';
import bodyParser from 'body-parser';

const FirebaseSession = FirebaseStore(session);
const firebase = admin.initializeApp(functions.config().firebase);
const nextApp = next({ dev: false, conf: { distDir: 'next' } });
const handle = nextApp.getRequestHandler();

const server = express();
server.use(bodyParser.json());
server.set('trust proxy', 1);
server.use(session({
  store: new FirebaseSession({
    database: firebase.database(),
  }),
  name: '__session', // With GCF only this name is permitted
  secret: 'mysecret',
  secure: true,
  resave: false,
  rolling: true,
  httpOnly: true,
  cookie: { maxAge: 604800000 }, // week
  saveUninitialized: false,
}));

server.post('/api/login', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (!req.session) return res.sendStatus(400);

  try {
    const token = req.body.token;
    const decodedToken = await firebase.auth().verifyIdToken(token);

    // If user is verified then allow session
    if (decodedToken.email_verified) {
      req.session.decodedToken = decodedToken;
    }

    return res.json({ status: true });
  } catch (err) {
    return res.json({ err });
  }
});

server.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ status: true });
});

server.get('*', (req, res) => handle(req, res));

export const app = functions.https.onRequest(async (req, res) => {
  await nextApp.prepare();
  server(req, res);
});
