import ReduxSagaFirebase from 'redux-saga-firebase';
import { firebase, firestore } from './firebaseInit';

export { firebase };
export const reduxSagaFirebase = new ReduxSagaFirebase(firebase, firestore);
