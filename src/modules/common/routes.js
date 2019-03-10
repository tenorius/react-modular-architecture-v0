import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
// import PrivateRoute from './components/privateRoute';

const Home = lazy(() => import('./views/home'));
// const UsersList = lazy(() => import('../users/views/list'));

const routes = () => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      {/* <Route exact path="/users" render={() => <UsersList />} /> */}
    </Switch>
  </Suspense>
);

export default routes;
