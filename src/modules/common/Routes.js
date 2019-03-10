import React, { Suspense, lazy } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

const Home = lazy(() => import('./views/Home'));
const Users = lazy(() => import('../users'));

const routes = () => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/users" render={() => <Users />} />
    </Switch>
  </Suspense>
);

export default withRouter(routes);
