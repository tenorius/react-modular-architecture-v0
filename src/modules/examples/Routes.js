import React, { Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const API = lazy(() => import('./views/API'));
const StyledComponents = lazy(() => import('./views/StyledComponents'));

const routes = ({ match }) => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path={`${match.path}/api`} render={() => <API />} />
      <Route exact path={`${match.path}/styled-components`} render={() => <StyledComponents />} />
      <Redirect to={`${match.path}/api`} />
    </Switch>
  </Suspense>
);

export default withRouter(routes);
