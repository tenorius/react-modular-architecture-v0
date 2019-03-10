import React, { Fragment } from 'react';
import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './routes';

const App = () => (
  <Fragment>
    <CssBaseline />
    <Routes />
  </Fragment>
);

// todo: review location conflict with redux
export default compose(
  withRouter,
  withNamespaces(['common']),
)(App);
