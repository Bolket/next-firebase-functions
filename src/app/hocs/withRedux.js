import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import withRedux from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import withReduxSaga from './withReduxSaga';
import * as reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStore() {
  const store = createStore(
    combineReducers(reducers),
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();

  return store;
}

export default (BaseComponent, mapStateToProps) =>
  withRedux(configureStore, mapStateToProps)(withReduxSaga(BaseComponent));
