import React, { Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const Home = lazy(() => import('./views/Home'));
const Examples = lazy(() => import('../examples'));

const routes = () => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/examples" render={() => <Examples />} />
      <Redirect to="/" />
    </Switch>
  </Suspense>
);

export default withRouter(routes);
