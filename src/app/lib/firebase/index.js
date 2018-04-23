import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from './firebaseInit';

export { firebase };

export const reduxSagaFirebase = new ReduxSagaFirebase(firebase, firebase.firestore());
