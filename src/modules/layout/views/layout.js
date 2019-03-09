import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { withStyles } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import AppBar from '../components/appbar';
import Routes from '../routes';
import Container from '../../common/components/container';
import Drawer from '../components/drawer';
import 'react-toastify/dist/ReactToastify.css';

// todo: trocar por styled comp
const styles = {
  drawer: {
    width: 250,
  },
  container: {
    height: '100%',
    position: 'relative',
  },
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 566px;
`;

class Layout extends Component {
  state = {
    ready: false,
    drawer: false,
  };

  componentDidMount() {
    this.props.loginIfNeeded().on('done', () => {
      this.setState({ ready: true });
    });
  }

  onLogoClick = () => {
    this.props.history.push('/appointments');
  };

  render() {
    const { id, name, level, metrocity } = this.props.user;
    const { classes } = this.props;
    return (
      <Fragment>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable
          pauseOnHover
        />
        {this.state.ready && id && (
          <Fragment>
            <AppBar
              onToggle={() => this.setState(prevState => ({ drawer: !prevState.drawer }))}
              onLogoClick={this.onLogoClick}
            />
            <SwipeableDrawer
              open={this.state.drawer}
              onClose={() => this.setState({ drawer: false })}
              onOpen={() => this.setState({ drawer: true })}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={() => this.setState({ drawer: false })}
                onKeyDown={() => this.setState({ drawer: false })}
                className={classes.container}
              >
                <div className={classes.drawer}>
                  <Drawer
                    name={name}
                    level={level}
                    metrocity={metrocity}
                  />
                </div>
              </div>
            </SwipeableDrawer>
            <Container>
              <Routes />
            </Container>
          </Fragment>
        )}
        {this.state.ready && !id && (
          <Fragment>
            <h1>Login Failed</h1>
            <Button variant="contained" color="primary" type="button" onClick={() => this.props.loginIfNeeded()}>
              <span>Retry Login</span>
            </Button>
          </Fragment>
        )}
        {!this.state.ready && (
          <Fragment>
            <Container>
              <Wrapper>
                <CircularProgress color="secondary" />
              </Wrapper>
            </Container>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(Layout));
