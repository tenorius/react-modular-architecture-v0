import * as types from './types';
import reducerRegistry from '../../../common/services/reducerRegistry';

// /// Counter Reducer /// //
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_ALL_USERS: return action.users;
    default: return state;
  }
};
reducerRegistry.save('users', usersReducer);

export default {
  usersReducer,
};
