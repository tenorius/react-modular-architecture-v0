import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SaveIcon from '@material-ui/icons/Save';

import dataStatus from '../constants/dataStatus';
import timelineStatus from '../constants/timelineStatus';

const MyMenu = styled(Menu)`
  li {
    color: #888;
    padding: 10px;
  }
`;

const helper = {
  menuClick: (popupState, cb, ...params) => {
    popupState.close();
    cb(...params);
  },
  getMenuOptions: (props) => {
    const options = [];
    if (props.appointment.status === dataStatus.EDIT) {
      options.push('save');
    } else if (props.appointment.status === dataStatus.SAVED) {
      options.push('copy');
    }
    if (props.appointment.timeline !== timelineStatus.PAST
      && props.copiedAppointment !== null) {
      options.push('paste');
    }
    return options;
  },
};

const AppointmentCardOptions = (props) => {
  const {
    appointment,
    onSaveClick,
    onCopyClick,
    onPasteClick,
  } = props;
  const options = helper.getMenuOptions(props);
  return options.length > 0 ? (
    <PopupState variant="popover">
      {popupState => (
        <Fragment>
          {/* Controller button */}
          <IconButton {...bindTrigger(popupState)}>
            <MoreVertIcon />
          </IconButton>
          {/* Menu Component */}
          <MyMenu {...bindMenu(popupState)}>
            {/* Option: Save */}
            {options.includes('save')
              ? (
                <MenuItem
                  onClick={() => helper.menuClick(
                    popupState,
                    onSaveClick,
                    appointment.id,
                  )}
                >
                  <SaveIcon />
                  <span>Salvar</span>
                </MenuItem>
              ) : null}
            {/* Option: Copy */}
            {options.includes('copy')
              ? (
                <MenuItem
                  onClick={() => helper.menuClick(
                    popupState,
                    onCopyClick,
                    appointment.id,
                  )}
                >
                  <FileCopyIcon />
                  <span>Copiar</span>
                </MenuItem>
              ) : null}
            {/* Option: Paste */}
            {options.includes('paste')
              ? (
                <MenuItem
                  onClick={() => helper.menuClick(
                    popupState,
                    onPasteClick,
                    appointment.id,
                  )}
                >
                  <SaveIcon />
                  <span>Colar</span>
                </MenuItem>
              ) : null}
          </MyMenu>
        </Fragment>
      )}
    </PopupState>
  ) : null;
};

const mapStateToProps = state => ({
  copiedAppointment: state.copiedAppointment,
});

export default connect(mapStateToProps)(AppointmentCardOptions);
