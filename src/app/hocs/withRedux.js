import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';
import * as reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStore() {
  const store = createStore(
    combineReducers(reducers),
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(sagaMiddleware)
      : composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();

  return store;
}

export default (BaseComponent, mapStateToProps) =>
  withRedux(configureStore, mapStateToProps)(withReduxSaga(BaseComponent));
