/**
 * This file contains all the action creator functions.
 */

import * as types from './types';

// eslint-disable-next-line import/prefer-default-export
export const getAllUsers = users => ({
  type: types.GET_ALL_USERS,
  users,
});
