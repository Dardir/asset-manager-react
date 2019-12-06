// flow weak

import {
  createStore,
  applyMiddleware,
  compose
}                               from 'redux';
import thunkMiddleware          from 'redux-thunk';
import reducers                  from '../modules/reducers';
import { localStorageManager }  from '../middleware';
import createSagaMiddleware, { END } from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

// createStore : enhancer
const enhancer = compose(
  applyMiddleware(localStorageManager, thunkMiddleware, sagaMiddleware)
);

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, enhancer);
  store.runSaga = sagaMiddleware.run;
  return store;
}
