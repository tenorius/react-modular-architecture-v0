import { ApiTree } from '@apicase/services';
import Root from './rootApi';

const commonService = new ApiTree(Root, [
  { name: 'login', url: 'login', method: 'POST', headers: { 'Content-Type': 'application/json' } },
  { url: 'user',
    // meta: 'requiresAuth',
    children: [
      { name: 'getAllUsers', url: '', method: 'GET' },
      { name: 'createUser', url: '', method: 'POST' },
      { name: 'getUser', url: ':id', method: 'GET' },
      { name: 'updateOneUser', url: ':id', method: 'PUT' },
      { name: 'removeOneUser', url: ':id', method: 'REMOVE' },
    ],
  },
]);

export default commonService;
