import axios from 'axios';

/**
 * Create a new Axios instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const instanceCreator = (baseUrl = null) => {
  const options = {
    baseURL: baseUrl || process.env.REACT_APP_BASE_URL,
  };

  // Add auth header for authenticated users
  // if (store.getters['users/isAuthenticated']) {
  //   options.headers = {
  //     Authorization: `Bearer ${store.getters['users/accessToken']}`,
  //   };
  // }

  // Create the interceptors callbacks
  const requestInterceptorSuccess = (request) => {
    console.log('requestInterceptorSuccess');
    console.log(request);
  };

  const requestInterceptorError = (error) => {
    console.log('requestInterceptorError');
    console.log(error);
  };

  const responseInterceptorSuccess = (response) => {
    console.log('responseInterceptorSuccess');
    console.log(response);
  };

  const responseInterceptorError = (error) => {
    console.log('responseInterceptorError');
    console.log(error);
  };

  // Create instance and set up interceptors
  const instance = axios.create(options);
  // instance.interceptors.request.use(
  //   requestInterceptorSuccess,
  //   requestInterceptorError,
  // );
  // instance.interceptors.response.use(
  //   responseInterceptorSuccess,
  //   responseInterceptorError,
  // );

  return instance;
};

export default instanceCreator;
