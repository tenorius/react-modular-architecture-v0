import * as types from './types';
import reducerRegistry from '../../services/reducerRegistry';

// /// Counter Reducer /// //
const countReducer = (state = 0, action) => {
  switch (action.type) {
    case types.COUNT_ADD: return state + 1;
    case types.COUNT_SUB: return state - 1;
    default: return state;
  }
};
reducerRegistry.save('count', countReducer);

export default {
  countReducer,
};
