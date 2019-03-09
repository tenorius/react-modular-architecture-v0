import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import adalAuthenticator from '../../common/services/adalAuthenticator';
import Container from '../../common/components/container';


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 566px;
`;

export default class Login extends Component {
  componentDidMount() {
    if (adalAuthenticator.isAuthenticated()) {
      this.props.history.push('/appointments');
    } else {
      adalAuthenticator.login();
    }
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Wrapper>
            <span>single sign on...</span>
          </Wrapper>
        </Container>
      </Fragment>
    );
  }
}
