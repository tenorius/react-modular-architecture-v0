/**
 * To represent chained operations you need a redux middleware to enhance the
 * dispatch function. Some popular examples are: redux-thunk, redux-saga or
 * redux-observable.
 *
 * In our case, we use redux-thunk. We want to separate the thunks from the action
 * creators, even with the cost of writing extra code. So we define an operation as
 * a wrapper over actions.
 *
 * If the operation only dispatches a single action (doesn’t actually use
 * redux-thunk) we forward the action creator function. If the operation uses a
 * thunk, it can dispatch many actions and chain them with promises.
 */

import * as actions from './actions';

import userService from '../../services/userService';
// import logger from '../../../common/services/logger';

// eslint-disable-next-line import/prefer-default-export
export const getAllUsers = () => async (dispatch) => {
  const { data: users } = await userService.get();

  dispatch(actions.getAllUsers(users));
};
