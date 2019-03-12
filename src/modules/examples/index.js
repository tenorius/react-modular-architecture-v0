import React, { Fragment } from 'react';
import { withNamespaces } from 'react-i18next';

import Routes from './Routes';

const App = () => (
  <Fragment>
    <Routes />
  </Fragment>
);

export default withNamespaces(['users'])(App);
