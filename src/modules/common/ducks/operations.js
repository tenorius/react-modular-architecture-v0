import * as actions from './actions';
import commonService from '../services/commonService';
import logger from '../services/logger';
import adalAuthenticator from '../services/adalAuthenticator';

const helpers = {
  shouldLogin: state => !state.app.isLoggedIn,
  userFromAPItoState: (userAPI, permission) => ({
    ...userAPI,
    permission,
    level: parseInt(userAPI.level, 10),
  }),
};

const appLoadingStart = actions.appLoadingStart;
const appLoadingEnd = actions.appLoadingEnd;


const loginFetch = () => (dispatch) => {
  dispatch(appLoadingStart());
  const token = adalAuthenticator.accessToken();
  if (!token) throw new Error('Token not Found, Cant login');
  return commonService('login', { body: { token } })
    .on('done', (response) => {
      const { user, today, currentFiscalYear, permission } = response.body.data;
      const userState = helpers.userFromAPItoState(user, permission);
      dispatch(actions.loginResponse({ user: userState, today, currentFiscalYear}));
      dispatch(appLoadingEnd());
    })
    .on('fail', (err) => {
      logger.info(err, 'loginFetch Failure');
      dispatch(appLoadingEnd());
    })
    .on('error', (err) => {
      logger.error(err, 'loginFetch Error');
      dispatch(appLoadingEnd());
    });
};

const loginIfNeeded = () => (dispatch, getState) => {
  if (helpers.shouldLogin(getState())) {
    return dispatch(loginFetch());
  }
};


export {
  appLoadingStart,
  appLoadingEnd,
  loginIfNeeded,
};
