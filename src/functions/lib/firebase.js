import admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const config = JSON.parse(process.env.FIREBASE_CONFIG);
export { functions };
export const firebase = admin.initializeApp();
