import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const router = ({ routes, match }) => {
  const defaultRoute = routes.find(r => r.default);
  return (
    <Suspense fallback={null}>
      <Switch>
        {routes.map(route => (
          <Route
            key={route.url}
            exact={route.exact}
            path={`${match.path}${route.url}`}
            render={() => route.component}
          />
        ))}
        {defaultRoute
          ? <Redirect to={`${match.path}${defaultRoute.url}`} />
          : null
        }
      </Switch>
    </Suspense>
  );
};

export default withRouter(router);
