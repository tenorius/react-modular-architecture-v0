import React from 'react';
import {
  withRouter,
  Route,
  Redirect,
} from 'react-router-dom';
import adalAuthenticator from '../services/adalAuthenticator';
import logger from '../services/logger';

class PrivateRoute extends React.Component {
  state = {
    loaded: false,
    isAuthenticated: false,
  };

  componentDidMount() {
    this.authenticate();
    this.unlisten = this.props.history.listen(() => {
      if (adalAuthenticator.isAuthenticated()) {
        logger.info('user authenticated');
      } else if (this.state.isAuthenticated) this.setState({ isAuthenticated: false });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  authenticate() {
    if (adalAuthenticator.isAuthenticated()) {
      this.setState({ loaded: true, isAuthenticated: true });
      return;
    }
    if (this.props.location.hash && adalAuthenticator.handleCallback()) {
      this.setState({ loaded: true, isAuthenticated: true });
      return;
    }
    this.setState({ loaded: true, isAuthenticated: false });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded, isAuthenticated } = this.state;
    if (!loaded) return null;
    return (
      <Route
        {...rest}
        render={props => (isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        ))}
      />
    );
  }
}

export default withRouter(PrivateRoute);
