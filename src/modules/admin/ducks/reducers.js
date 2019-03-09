import { combineReducers } from 'redux';
import * as types from './types';
import reducerRegistry from '../../common/services/reducerRegistry';

// Permissions /////
const permissionsByIds = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_GET_PERMISSIONS_SUCCESS:
      return action.normalizedData.entities.permissions || {};
    default: return state;
  }
};

const permissionsList = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_GET_PERMISSIONS_SUCCESS:
      return action.normalizedData.result.permissions;
    default: return state;
  }
};

const permissionParams = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_GET_PARAMS_SUCCESS:
      return action.params;
    default: return state;
  }
};

const permissionsReducer = combineReducers({
  byIds: permissionsByIds,
  list: permissionsList,
  params: permissionParams,
});

reducerRegistry.save('permissions', permissionsReducer);

// SAH /////
const sahParams = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_GET_SAH_PARAMS_SUCCESS:
      return action.params;
    default: return state;
  }
};
reducerRegistry.save('adminSahParams', sahParams);
const adminSah = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_GET_SAH_BY_YEAR_SUCCESS:
      return action.params;
    default: return state;
  }
};
reducerRegistry.save('adminSah', adminSah);


export default {
  permissionsReducer,
};
