/**
 * This file contains all the action creator functions.
 */

import * as types from './types';

// eslint-disable-next-line import/prefer-default-export
export const addEntities = entities => ({
  type: types.ADD_ENTITIES,
  entities,
});

export const countAdd = () => ({
  type: types.COUNT_ADD,
});

export const countSub = () => ({
  type: types.COUNT_SUB,
});
