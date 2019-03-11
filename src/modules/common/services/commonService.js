import RootApi from './rootApi';

const common = RootApi();

common.defaults.baseURL += '/posts';

export default common;
