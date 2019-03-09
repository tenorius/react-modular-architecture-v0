import React, { Component } from 'react';
import styled from 'styled-components';

const Styled = {};
Styled.Wrapper = styled.div`
  height: 100%;
  text-align: center;
  
  h2{
    color: #32CD32;
    margin-top: 100px;
  }
  
  span{
    color: #606060;
  }
`;


export default class AccessDenied extends Component {
  render() {
    const redirect = () => { window.location = 'https://portal.accenture.com'; };
    setTimeout(redirect, 5000);
    return (
      <Styled.Wrapper>
        <h2>Desculpe mas você não tem permissão para a acessar essa página</h2>
        <span>Aguarde o redirecionamento...</span>
      </Styled.Wrapper>
    );
  }
}
