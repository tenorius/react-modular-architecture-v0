import React, { Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const Home = lazy(() => import('./views/Home'));
const Users = lazy(() => import('../users'));

const routes = () => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/users" render={() => <Users />} />
      <Redirect to="/" />
    </Switch>
  </Suspense>
);

export default withRouter(routes);
