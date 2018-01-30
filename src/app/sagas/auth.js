import { END } from 'redux-saga';
import { put, take, call } from 'redux-saga/effects';
import { reduxSagaFirebase as rsf } from '../lib/firebase';
import * as actions from '../actions/auth';
import { CLIENT_ONLY } from '../actions/actionTypes';

export default function* syncUser() {
  try {
    const action = yield take.maybe(CLIENT_ONLY);
    const channel = yield call(rsf.auth.channel);

    while (action !== END) {
      const { user } = yield take(channel);

      if (user) {
        yield put(actions.authLoginSuccess({ user }));
      } else {
        yield put(actions.authLogoutSuccess());
      }
    }
  } catch (error) {
    console.log('syncUser ERROR', error);
  }
}
