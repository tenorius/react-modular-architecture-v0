import React, { Fragment } from 'react';
import { withNamespaces } from 'react-i18next';

import Routes from './Routes';

const App = () => (
  <Fragment>
    <h1>Users</h1>
    <Routes />
  </Fragment>
);

export default withNamespaces(['users'])(App);
