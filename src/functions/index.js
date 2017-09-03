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
server.use(
  session({
    store: new FirebaseSession({
      database: firebase.database(),
    }),
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    signed: true,
  })
);

server.post('/api/login', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (!req.session) return res.sendStatus(400);

  try {
    const token = req.body.token;
    const decodedToken = await firebase.auth().verifyIdToken(token);

    console.log('LOGIN SESSION', req.session);

    req.session.decodedToken = decodedToken;
    res.json({ status: true, decodedToken });
  } catch (err) {
    res.json({ err });
    console.log('ERROR', err);
  }
});

server.post('/api/logout', (req, res) => {
  req.session.decodedToken = null;
  res.json({ status: true });
});

server.get('*', (req, res) => handle(req, res));

export let app = functions.https.onRequest(async (req, res) => {
  await nextApp.prepare();
  console.log('APP', req.session);
  server(req, res);
});

export let app = functions.https.onRequest(async (req, res) => {
  await nextApp.prepare();
  handle(req, res);
});
