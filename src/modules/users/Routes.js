import React, { Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const List = lazy(() => import('./views/List'));
const Foo = lazy(() => import('./views/Foo'));

const routes = ({ match }) => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path={`${match.path}/list`} render={() => <List />} />
      <Route exact path={`${match.path}/foo`} render={() => <Foo />} />
      <Redirect to={`${match.path}/list`} />
    </Switch>
  </Suspense>
);

export default withRouter(routes);
