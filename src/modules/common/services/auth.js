class Auth {
  constructor() {
    this.isAuthenticated = false;
  }

  currentAuthenticatedUser() {
    return new Promise((resolve, reject) => {
      setTimeout(this.isAuthenticated ? resolve() : reject(), 100); // fake async
    });
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      this.isAuthenticated = true;
      setTimeout(resolve(), 100); // fake async
    });
  }

  signout() {
    return new Promise((resolve, reject) => {
      this.isAuthenticated = false;
      setTimeout(resolve(), 100); // fake async
    });
  }
}
const auth = new Auth();
export default auth;
