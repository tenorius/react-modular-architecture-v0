import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  overflow-y: scroll;
  height: 100%;
`;
const Page = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default Page;
