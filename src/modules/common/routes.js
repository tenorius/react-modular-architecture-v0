import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/privateroute';
import AccessDenied from './views/accessDenied';
// import ErrorBoundary from './components/errorboundary';
// import Loading from './components/loading';


const Layout = lazy(() => import('../layout/index'));
const Login = lazy(() => import('../login/index'));

/**
 * Defines components to routes mapping.
 *
 * Everytime a new view is created, entry is required here to map the component to a specific route.
 *
 * [IMPORTANT]
 * All route entries are required to be done before the notFound component.
 *
 * @returns {XML}
 */

class appRouter extends Component {
  render() {
    return (
      <Suspense fallback={null}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/access-denied" component={AccessDenied} />
          <PrivateRoute path="/" component={Layout} />
        </Switch>
      </Suspense>
    );
  }
}
export default appRouter;
