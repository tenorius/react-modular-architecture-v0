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
  const requestInterceptorSuccess = request => Promise.resolve(request);

  const requestInterceptorError = error => Promise.reject(error);

  const responseInterceptorSuccess = response => Promise.resolve(response);

  const responseInterceptorError = error => Promise.reject(error);

  // Create instance and set up interceptors
  const instance = axios.create(options);
  instance.interceptors.request.use(
    requestInterceptorSuccess,
    requestInterceptorError,
  );
  instance.interceptors.response.use(
    responseInterceptorSuccess,
    responseInterceptorError,
  );

  return instance;
};

export default instanceCreator;
