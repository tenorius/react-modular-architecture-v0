import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ErrorBoundary from '../common/components/errorboundary';
// import Loading from '../common/components/loading';

const Appointments = lazy(() => import('../appointments/index'));
const Admin = lazy(() => import('../admin/index'));

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
const Routes = () => (
  <ErrorBoundary>
    <Suspense fallback={null}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route exact path="/appointments" component={Appointments} />
        <Route exact path="/" render={() => (<Redirect to={{ pathname: '/appointments' }} />)} />
        <Redirect to={{ pathname: '/not-found' }} />
      </Switch>
    </Suspense>
  </ErrorBoundary>
);

export default Routes;
