import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: rgba(0,0,0,0.8);
`;

const Loading = () => (
  <Wrapper>
    <CircularProgress color="secondary" />
  </Wrapper>
);

export default Loading;
