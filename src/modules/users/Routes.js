import React, { Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const List = lazy(() => import('./views/List'));
const ScExample = lazy(() => import('./views/ScExample'));

const routes = ({ match }) => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path={`${match.path}/list`} render={() => <List />} />
      <Route exact path={`${match.path}/sc-example`} render={() => <ScExample />} />
      <Redirect to={`${match.path}/list`} />
    </Switch>
  </Suspense>
);

export default withRouter(routes);
