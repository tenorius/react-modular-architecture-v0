export default class AdalConfigProvider {
  /**
   * Get the Azure Active Directory (ADAL) configuration
   */
  static getAdalConfig() {
    return {
      authorizationUrl: process.env.REACT_APP_ADAL_AUTHORIZATION_URL,
      clientId: process.env.REACT_APP_ADAL_CLIENT_ID,
      response_type: process.env.REACT_APP_ADAL_RESPONSE_TYPE,
      redirect_uri: process.env.REACT_APP_ADAL_REDIRECT_URI,
      scope: process.env.REACT_APP_ADAL_SCOPE,
      cacheLocation: process.env.REACT_APP_ADAL_CACHELOCATION,
      keyToken: process.env.REACT_APP_ADAL_KEYTOKEN,
    };
  }
}
