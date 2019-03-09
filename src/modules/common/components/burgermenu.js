import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.a`
  float: left;
  i{
    font-size: 57px;
    color: white;
  }
`;

const BurgerMenu = props => (
  <Wrapper onClick={null}>
    <i className="material-icons">
      menu
    </i>
  </Wrapper>
);

export default BurgerMenu;
