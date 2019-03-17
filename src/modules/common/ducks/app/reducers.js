import { combineReducers } from 'redux';

import * as types from './types';
import reducerRegistry from '../../services/reducerRegistry';

// /// App.Entities Reducer /// //
const appEntitiesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_ENTITIES:
      const newEntitiesNames = Object.keys(action.entities);
      const newState = { ...state };
      newEntitiesNames.forEach((name) => {
        newState[name] = {
          ...state[name],
          ...action.entities[name],
        };
      });
      return newState;
    default: return state;
  }
};

// Combine reducers in app then add to the registry
const appReducer = combineReducers({
  entities: appEntitiesReducer,
});
reducerRegistry.save('app', appReducer);

export default {
  appReducer,
};
