/* eslint-disable import/first */
import firebase from 'firebase';
import '@firebase/firestore';
import credential from '../../credentials/client';

try {
  firebase.initializeApp(credential);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export default firebase;
