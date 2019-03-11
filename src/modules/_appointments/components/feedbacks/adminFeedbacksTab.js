import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Wrapper = styled(Paper)`
  transition: all 0.2s ease-in-out;
  width: 100%;
  position: absolute;
  top: 60px;
  z-index: 3;
`;

const AdminFeedbacksTab = ({ selectedView, changeHandler, labels, t }) => (
  <Wrapper square>
    <Tabs
      value={selectedView}
      indicatorColor="secondary"
      textColor="primary"
      onChange={changeHandler}
      fullWidth
    >
      {labels.map(label => (
        <Tab key={label} label={t(`feedbacks.${label}`)} value={label} />
      ))}
    </Tabs>
  </Wrapper>
);
export default AdminFeedbacksTab;
