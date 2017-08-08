import * as functions from 'firebase-functions';
import cors from 'cors';
import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, conf: { distDir: 'next' } });
const handle = nextApp.getRequestHandler();

const slasher = handler => (req, res) => {
  if (!req.path) {
    req.url = `/${req.url}`;
  }

  return handler(req, res);
};

export let app = functions.https.onRequest((req, res) => {
  return nextApp.prepare().then(() => handle(req, res)).catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
});
