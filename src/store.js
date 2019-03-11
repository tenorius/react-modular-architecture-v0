import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import freeze from 'redux-freeze';
import promise from 'redux-promise-middleware';
import reducerRegistry from './modules/common/services/reducerRegistry';

// for redux devTools debugging extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const initialState = {
  teste: true,
};

const configureMiddleware = () => {
  const middlewares = [];

  // for promises, since we are using axios for networking
  middlewares.push(promise());

  // for async operations, network calls
  middlewares.push(thunk);

  // smart console logging of actions
  middlewares.push(logger);

  // smart console logging of actions
  middlewares.push(reduxImmutableStateInvariant());

  // add freeze dev middleware
  // this prevents state from being mutated anywhere in the app during dev
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(freeze);
  }

  // apply middlewares
  return applyMiddleware(...middlewares);
};

// Preserve initial state for not-yet-loaded reducers
const preserveStateNonLoadedReducers = (_reducers) => {
  const reducers = { ..._reducers };
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach((item) => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  return combineReducers(reducers);
};

const rootReducer = preserveStateNonLoadedReducers(reducerRegistry.getReducers());

const middleware = configureMiddleware();

const store = createStore(rootReducer, initialState, composeEnhancers(middleware));

// Replace the store's reducer whenever a new reducer is registered.
reducerRegistry.setChangeListener((reducers) => {
  store.replaceReducer(preserveStateNonLoadedReducers(reducers));
});


export default store;
