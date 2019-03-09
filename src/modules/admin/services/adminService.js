import { ApiTree } from '@apicase/services';
import rootApi from '../../common/services/rootApi';


const adminService = new ApiTree(rootApi, [
  {
    url: 'permission',
    meta: { requiresAuth: true },
    children: [
      { name: 'getParams', url: 'getParams', method: 'GET' },
      { name: 'getPermissions', url: 'getPermissions', method: 'POST' },
      { name: 'savePermissions', url: 'savePermissions', method: 'POST' },
    ],
  },
  {
    url: 'sah',
    meta: { requiresAuth: true },
    children: [
      { name: 'getSahParams', url: 'getParams', method: 'GET' },
      { name: 'getSahByYear', url: 'getYear', method: 'POST' },
      { name: 'saveSahByYear', url: 'saveYear', method: 'POST' },
    ],
  },
]);

export default adminService;
