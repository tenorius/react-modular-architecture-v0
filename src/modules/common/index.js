import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import './i18n/i18n';
import './index.css';
import { duckOperations as commonOperations } from './ducks';
import App from './views/app';

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}
const actions = { ...commonOperations };

// todo: review location conflict with redux
export default withRouter(connect(mapStateToProps, actions)(withNamespaces(['common'])(App)));
