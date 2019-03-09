import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory({
  basename: '/#',
});
export default customHistory;
