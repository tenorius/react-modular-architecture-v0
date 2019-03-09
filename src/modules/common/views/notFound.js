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


export default class NotFound extends Component {
  render() {
    return (
      <Styled.Wrapper>
        <h2>404 Não Encontrada</h2>
      </Styled.Wrapper>
    );
  }
}
