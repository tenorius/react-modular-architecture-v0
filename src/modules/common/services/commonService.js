import Api from './Api';

export default class CommonService {
  api = new Api();

  basePath = '/posts';

  async getAll() {
    return this.api.get(this.basePath);
  }
}
