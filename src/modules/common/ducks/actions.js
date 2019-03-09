import * as types from './types';

const appLoadingStart = () => ({
  type: types.APP_LOADING_START,
});

const appLoadingEnd = () => ({
  type: types.APP_LOADING_END,
});

const loginResponse = data => ({
  type: types.LOGIN_RESPONSE,
  user: data.user,
  currentFiscalYear: data.currentFiscalYear,
  today: data.today,
});

const setData = data => ({
  type: types.SET_DATA,
  data,
});

export {
  appLoadingStart,
  appLoadingEnd,
  loginResponse,
  setData,
};
