import { normalize, schema } from 'normalizr';

import * as types from './types';
import reducerRegistry from '../../../common/services/reducerRegistry';

window.normalize = normalize;
window.schema = schema;

// /// Users Reducer /// //
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_USERS: return action.users;
    default: return state;
  }
};
reducerRegistry.save('users', usersReducer);

export default {
  usersReducer,
};
