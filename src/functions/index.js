import * as functions from 'firebase-functions';
import cors from 'cors';
import express from 'express';
import next from 'next';

const nextApp = next({ dev: false, conf: { distDir: 'next' } });
const handle = nextApp.getRequestHandler();

export let app = functions.https.onRequest(async (req, res) => {
  await nextApp.prepare();
  handle(req, res);
});
