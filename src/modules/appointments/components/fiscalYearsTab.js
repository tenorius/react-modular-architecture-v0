import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { media } from '../../common/utils/style-utils';

const Wrapper = styled(Paper)`
  transition: all 0.2s ease-in-out;
  margin-bottom: 30px;
  position: fixed;
  top: 55px;
  width: 100%;
  z-index: 3;
  ${media.sm}{
    top: 90px;
  }
`;

const FiscalYearsTab = ({ selectedFiscalYear, changeHandler, fiscalYearsRange, width }) => (
  <Wrapper square>
    <Tabs
      value={`${selectedFiscalYear}`}
      indicatorColor="secondary"
      textColor="primary"
      onChange={changeHandler}
      fullWidth={width < 600}
      centered={width >= 600}
    >
      {fiscalYearsRange.map(year => (
        <Tab key={year} label={`FY${year}`} value={`${year}`} />
      ))}
    </Tabs>
  </Wrapper>
);
export default FiscalYearsTab;
