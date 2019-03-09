import React from 'react';
import styled from 'styled-components';
import Loading from "./loading";

const Wrapper = styled.div`
  height: 100%;
`;

const Content = ({ children, style }) => (
  <Wrapper style={style}>
    {children}
  </Wrapper>
);

export default Content;
