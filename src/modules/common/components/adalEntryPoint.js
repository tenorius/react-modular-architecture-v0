import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Container from './container';
import adalAuthenticator from '../services/adalAuthenticator';


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 566px;
  height: auto;
`;

class AdalEntryPoint extends Component {
  state = {
    isChecking: true,
  };

  componentDidMount() {
    if (!adalAuthenticator.isAuthenticated()) {
      if (this.props.location.hash) {
        adalAuthenticator.handleCallback();
      } else {
        this.props.history.push('/login');
      }
    }
    this.setState({ isChecking: false });
  }

  render() {
    const { t } = this.props;
    return (
      !this.state.isChecking
        ? this.props.children
        : (
          <Fragment>
            <Container>
              <Wrapper>
                <span>checking ADAL...</span>
              </Wrapper>
            </Container>
          </Fragment>
        )
    );
  }
}

export default withRouter(AdalEntryPoint);
