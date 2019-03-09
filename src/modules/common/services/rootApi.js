import { ApiService } from '@apicase/services';
import fetch from '../../../assets/js/adapter-fetch/index';
import apiErrorHandler from '../utils/apiErrorHandler';


const ApiRoot = new ApiService({
  adapter: fetch,
  url: 'censored',
  mode: 'cors',
});

const rootWithAuth = ApiRoot.extend({
  hooks: {
    /* Pass token there */
    before({ payload, meta, next }) {
      console.log('@BEFORE');
      console.log('@payload', payload);
      console.log('@meta', meta);
      if (!meta.requiresAuth) return next(payload);
      const token = localStorage.getItem('api.token');
      console.log(token);
      console.log('------');
      payload.headers = payload.headers ? payload.headers : {};
      payload.headers.authorization = `bearer ${token}`;
      next(payload);
    },
    /* Handle error and try to refresh token */
    async fail({ meta, result, payload, next, retry }) {
      apiErrorHandler.handle(result.status, result.body.message);
      next(result);
    },
    done({ result, next }) {
       console.log('DONE');
       console.log(JSON.stringify(result));
       if (!result.headers.authorization) return next(result);
       console.log('---///---');
      const apiToken = result.headers.authorization.split(' ')[1];
      localStorage.setItem('api.token', apiToken);
      next(result);
    },
  },
});

export default rootWithAuth;
