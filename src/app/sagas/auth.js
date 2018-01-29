import { put, take, call } from 'redux-saga/effects';
import { reduxSagaFirebase as rsf } from '../lib/firebase';
import * as actions from '../actions/auth';

export function* syncUser() {
  try {
    const channel = yield call(rsf.auth.channel);

    for (;;) {
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
