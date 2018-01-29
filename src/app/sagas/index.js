import { all, fork } from 'redux-saga/effects';

import { syncUser } from './auth';

export default function* rootSaga() {
  yield all([fork(syncUser)]);
}
