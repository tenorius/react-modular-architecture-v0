import Api from '../../common/services/Api';

class UsersService {
  api = new Api();

  basePath = '/users';

  async getAll() {
    return this.api.get(this.basePath);
  }

  async getById(id) {
    const url = `${this}/${id}`;
    return this.api.get(url);
  }
}

export default new UsersService();
