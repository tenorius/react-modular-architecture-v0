import { inject } from '../../../assets/js/adal';
import adalConfigProvider from './adalConfigProvider';

class AdalAuthenticator {
  constructor() {
    this.adalConfig = adalConfigProvider.getAdalConfig();
    this.context = inject(this.adalConfig);
  }

  login() {
    this.context.login();
  }

  logout() {
    this.context.logOut();
  }

  handleCallback() {
    this.context.handleAdaptedWindowCallback();
    return this.accessToken();
  }

  getActiveDirectoryApplicationId() {
    return this.adalConfig.clientId;
  }

  userInfo() {
    return this.context.getAdaptedCachedUser();
  }

  accessToken() {
    return this.context.getCachedToken(this.adalConfig.clientId);
  }

  isAuthenticated() {
    return this.accessToken();
  }
}

export default new AdalAuthenticator();
