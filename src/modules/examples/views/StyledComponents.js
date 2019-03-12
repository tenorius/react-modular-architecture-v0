import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

const Styled = {};

Styled.Child = styled.div`
  color: red;
`;

Styled.Parent = styled.div`
  border: 1px solid red;
  padding: 10px;
  ${Styled.Child} {
    color: blue;
  }
`;

Styled.Typography = styled(Typography)`
  color: blue;
`;

window.foo = Styled;

const StyledComponents = () => (
  <div>
    <Styled.Typography variant="h3">Styled Components Example</Styled.Typography>

    <Styled.Child>Child</Styled.Child>
    <Styled.Parent>
      <Styled.Child>Wrapped Child</Styled.Child>
    </Styled.Parent>
  </div>
);

export default StyledComponents;
