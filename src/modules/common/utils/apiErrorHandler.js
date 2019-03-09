import customHistory from '../services/history';

class ApiErrorHandler {
  handle(status, msg) {
    switch (status) {
      case 403: return customHistory.push('/access-denied', { msg });
      default:
    }
  }
}

const instance = new ApiErrorHandler();
export default instance;
