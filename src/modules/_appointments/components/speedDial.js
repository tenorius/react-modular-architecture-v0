/* eslint-disable no-multi-spaces */
import React from 'react';
import styled from 'styled-components';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import GridIcon from '@material-ui/icons/GridOn';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import FeedbackIcon from '@material-ui/icons/Feedback';
import SupervisorIcon from '@material-ui/icons/SupervisorAccount';

import permissions from '../../common/constants/permissions';

const StyledSpeedDial = styled(SpeedDial)`
  position: fixed;
  right: 30px;
  bottom: 30px;
  >button{
    background-color: #4d79ff!important;
  }
  .report-button {
    color: #fff;
    background-color: #8BC34A;
  }
  .answer-button {
    color: #fff;
    background-color: #FFEB3B;
  }
  .feedback-button {
    color: #fff;
    background-color: #FF9800;
  }
`;


const AppointmentsSpeedDial = (props) => {
  const { permission } = props;
  const actions = [
    { icon: <SupervisorIcon />, name: 'Admin', requiredPermission: 'ADMIN', className: 'report-button', onClick: props.goToAdminPage },
    { icon: <GridIcon />,       name: 'Planilhas', requiredPermission: 'ADMIN', className: 'report-button',  onClick: props.handleOpenReport },
    { icon: <QuestionAnswer />, name: 'Answers',   requiredPermission: 'ADMIN', className: 'answer-button',       onClick: props.handleOpenAdminFeedback },
    { icon: <FeedbackIcon />,   name: 'Feedback',  requiredPermission: '', className: 'feedback-button',  onClick: props.handleOpenUserFeedback },
  ];

  return (
    <StyledSpeedDial
      ariaLabel="SpeedDial example"
      icon={<SpeedDialIcon />}
      onClick={props.handleClick}
      onClose={props.handleClose}
      direction="up"
      open={props.open}
    >
      {actions.map(({ icon, name, requiredPermission, onClick, className }) => {
        const validation = !requiredPermission || permission === permissions[requiredPermission];
        return validation && (
          <SpeedDialAction
            className={className}
            key={name}
            icon={icon}
            tooltipTitle={name}
            onClick={onClick}
          />
        );
      })}
    </StyledSpeedDial>);
};

export default AppointmentsSpeedDial;
