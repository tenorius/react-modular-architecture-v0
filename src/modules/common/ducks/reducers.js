import * as types from './types';
import reducerRegistry from '../services/reducerRegistry';

/* ---------APP REDUCER----------- */


const appReducer = (state = {}, action) => {
  switch (action.type) {
    case types.APP_LOADING_START: return { ...state, appLoading: true };
    case types.APP_LOADING_END: return { ...state, appLoading: false };
    case types.LOGIN_RESPONSE: return { ...state, currentFiscalYear: action.currentFiscalYear, today: action.today };
    case types.SET_DATA: return { ...state, ...action.data };
    default: return state;
  }
};
reducerRegistry.save('app', appReducer);

/* ---------USER REDUCER----------- */


const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST: return { ...state, isFetching: true };
    case types.LOGIN_RESPONSE: return { ...action.user, isFetching: false };
    default: return state;
  }
};
reducerRegistry.save('user', userReducer);

/* ---------LOADING REDUCER----------- */

const loadingReducer = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]: requestState === 'REQUEST',
  };
};


// const reducer = combineReducers({
//   app: appReducer,
//   user: userReducer,
// });

export default {
  appReducer,
  userReducer,
  loadingReducer,
};
