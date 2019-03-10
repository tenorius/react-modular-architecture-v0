import React, { Fragment } from 'react';
import { withNamespaces } from 'react-i18next';
import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from './routes';

const App = () => (
  <Fragment>
    <CssBaseline />
    <Routes />
  </Fragment>
);

export default withNamespaces(['common'])(App);
