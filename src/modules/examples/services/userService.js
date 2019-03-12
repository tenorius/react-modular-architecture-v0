import RootApi from '../../common/services/rootApi';

const userApi = RootApi();

userApi.defaults.baseURL += '/users';

export default userApi;
