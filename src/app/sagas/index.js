import { all, fork, call } from 'redux-saga/effects';

import { watchAuth, watchgetHello } from './auth';

export default function* rootSaga() {
  yield all([call(watchAuth), fork(watchgetHello)]);
}
