/* ACTION TYPE CONSTANTS
You can use any convention you wish here,
but the name should remain UPPER_SNAKE_CASE for consistency.
*/
const createActionName = name => `common/duck/${name}`;

const APP_LOADING_START = createActionName('APP_LOADING_START');
const APP_LOADING_END = createActionName('APP_LOADING_END');
const GET_USER = createActionName('GET_USER');
const LOGIN = createActionName('LOGIN');
const LOGIN_REQUEST = createActionName('LOGIN_REQUEST');
const LOGIN_RESPONSE = createActionName('LOGIN_RESPONSE');
const SET_DATA = createActionName('SET_DATA');

export {
  APP_LOADING_START,
  APP_LOADING_END,
  GET_USER,
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  SET_DATA,
};
