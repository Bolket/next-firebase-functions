import { END } from 'redux-saga';
import { put, take, call, takeLatest } from 'redux-saga/effects';
import { reduxSagaFirebase as rsf } from '../lib/firebase';
import * as authActions from '../actions/auth';
import * as helloActions from '../actions/hello';
import { CLIENT_ONLY, GET_HELLO_REQUEST } from '../actions/actionTypes';

function* getHello() {
  try {
    const snapshot = yield call(rsf.firestore.getDocument, 'content/hello');
    const data = snapshot.data();
    console.log('DATA', data);

    yield put(helloActions.getHelloSuccess(data));
  } catch (error) {
    console.log('ERROR', error);
    yield put(helloActions.getHelloFailure(error));
  }
}

export function* watchgetHello() {
  yield takeLatest(GET_HELLO_REQUEST, getHello);
}

export function* watchAuth() {
  try {
    const action = yield take.maybe(CLIENT_ONLY);
    const channel = yield call(rsf.auth.channel);

    while (action !== END) {
      const { user } = yield take(channel);

      if (user) {
        yield put(authActions.authLoginSuccess({ user }));
      } else {
        yield put(authActions.authLogoutSuccess());
      }
    }
  } catch (error) {
    console.log('syncUser ERROR', error);
  }
}
