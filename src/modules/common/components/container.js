import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
`;

const Container = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default Container;
