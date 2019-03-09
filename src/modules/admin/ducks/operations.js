import { appLoadingEnd, appLoadingStart } from '../../common/ducks/operations';
import * as actions from './actions';
import adminService from '../services/adminService';
// import i18n from '../../common/i18n/i18n';

// const t = i18n.getFixedT(null, 'appointments');

// Permissions /////
const fetchGetParams = () => (dispatch) => {
  dispatch(appLoadingStart());
  return adminService('getParams', { })
    .on('done', (response) => {
      const { profiles, regions } = response.body.data;
      dispatch(actions.fetchGetParamsSuccess({ profiles, regions }));
      dispatch(appLoadingEnd());
    })
    .on('fail', () => {
      dispatch(appLoadingEnd());
    })
    .on('error', () => {
      dispatch(appLoadingEnd());
    });
};

const fetchGetPermissions = ({ country, metrocity, pid, profile, whitelist }) => (dispatch) => {
  dispatch(appLoadingStart());
  return adminService('getPermissions', { body: { country, metrocity, pid, profile, whitelist } })
    .on('done', (response) => {
      const permissions = response.body.data;
      dispatch(actions.fetchGetPermissionsSuccess(permissions));
      dispatch(appLoadingEnd());
    })
    .on('fail', () => {
      dispatch(appLoadingEnd());
    })
    .on('error', () => {
      dispatch(appLoadingEnd());
    });
};

const fetchSavePermissions = permission => (dispatch) => {
  dispatch(appLoadingStart());
  return adminService('savePermissions', { body: permission })
    .on('done', () => {
      dispatch(actions.fetchSavePermissionsSuccess());
      dispatch(appLoadingEnd());
    })
    .on('fail', () => {
      dispatch(appLoadingEnd());
    })
    .on('error', () => {
      dispatch(appLoadingEnd());
    });
};

// SAH /////
const fetchGetSahParams = () => (dispatch) => {
  dispatch(appLoadingStart());
  return adminService('getSahParams', { })
    .on('done', (response) => {
      const { years, regions } = response.body.data;
      dispatch(actions.fetchGetSahParamsSuccess({ years, regions }));
      dispatch(appLoadingEnd());
    })
    .on('fail', () => {
      dispatch(appLoadingEnd());
    })
    .on('error', () => {
      dispatch(appLoadingEnd());
    });
};

const fetchGetSahByYear = (country, metrocity, year) => (dispatch) => {
  dispatch(appLoadingStart());
  return adminService('getSahByYear', { body: { country, metrocity, year } })
    .on('done', (response) => {
      const { sahs } = response.body.data;
      dispatch(actions.fetchGetSahByYearSuccess({ country, metrocity, year, sahs }));
      dispatch(appLoadingEnd());
    })
    .on('fail', () => {
      dispatch(appLoadingEnd());
    })
    .on('error', () => {
      dispatch(appLoadingEnd());
    });
};

const fetchSaveSahByYear = (country, metrocity, sahs) => (dispatch) => {
  dispatch(appLoadingStart());
  return adminService('saveSahByYear', { body: { country, metrocity, sahs } })
    .on('done', (response) => {
      const { years, regions } = response.body.data;
      dispatch(actions.fetchSaveSahByYearSuccess({ years, regions }));
      dispatch(appLoadingEnd());
    })
    .on('fail', () => {
      dispatch(appLoadingEnd());
    })
    .on('error', () => {
      dispatch(appLoadingEnd());
    });
};

export {
  fetchGetParams,
  fetchGetPermissions,
  fetchSavePermissions,
  fetchGetSahParams,
  fetchGetSahByYear,
  fetchSaveSahByYear,
};
