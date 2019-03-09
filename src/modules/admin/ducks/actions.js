import { normalize } from 'normalizr';
import * as types from './types';
import * as schema from './schemas';

// Permissions /////
const fetchGetParamsSuccess = params => ({
  type: types.FETCH_GET_PARAMS_SUCCESS,
  params,
});

const fetchGetPermissionsSuccess = permissions => ({
  type: types.FETCH_GET_PERMISSIONS_SUCCESS,
  normalizedData: normalize({ permissions }, schema.arrayOfPermissions),
});

const fetchSavePermissionsSuccess = () => ({
  type: types.FETCH_SAVE_PERMISSIONS_SUCCESS,
});

// SAH /////
const fetchGetSahParamsSuccess = params => ({
  type: types.FETCH_GET_SAH_PARAMS_SUCCESS,
  params,
});

const fetchGetSahByYearSuccess = params => ({
  type: types.FETCH_GET_SAH_BY_YEAR_SUCCESS,
  params,
});

const fetchSaveSahByYearSuccess = params => ({
  type: types.FETCH_SAVE_SAH_BY_YEAR_SUCCESS,
  params,
});

export {
  fetchGetPermissionsSuccess,
  fetchGetParamsSuccess,
  fetchSavePermissionsSuccess,
  fetchGetSahParamsSuccess,
  fetchGetSahByYearSuccess,
  fetchSaveSahByYearSuccess,
};
