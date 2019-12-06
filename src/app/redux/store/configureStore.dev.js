// flow weak 

import {
  createStore,
  applyMiddleware
}                               from 'redux';
import { createLogger }         from 'redux-logger';
import thunkMiddleware          from 'redux-thunk';
import reducer                  from '../modules/reducers';
import { localStorageManager }  from '../middleware';
import { composeWithDevTools }  from 'redux-devtools-extension';
import createSagaMiddleware, { END } from 'redux-saga';

const loggerMiddleware = createLogger({
  level     : 'info',
  collapsed : true
});

const sagaMiddleware = createSagaMiddleware();

// createStore : enhancer
const enhancer = composeWithDevTools(
  applyMiddleware(
    localStorageManager,
    thunkMiddleware,
    loggerMiddleware,
    sagaMiddleware
  )
);

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept('../modules/reducers', () =>
      store.replaceReducer(require('../modules/reducers').default)
    );
  }
  store.runSaga = sagaMiddleware.run;
  return store;
}
