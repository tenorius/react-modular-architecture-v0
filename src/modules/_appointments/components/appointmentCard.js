import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withI18n } from 'react-i18next';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SmsIcon from '@material-ui/icons/Sms';
import Modal from '@material-ui/core/Modal';

import { duckOperations as appointmentsOperations } from '../ducks';
import AppointmentCardContent from './appointmentCardContent';
import AppointmentCardOptions from './appointmentCardOptions';
import myToast from '../../common/utils/toast';
import CommentModal from './commentModal';
import dataStatus from '../constants/dataStatus';
import timelineStatus from '../constants/timelineStatus';

const getStatusColor = (status) => {
  switch (status) {
    case dataStatus.EMPTY:
    case dataStatus.EDIT:
      return '#00ddbb';
    case dataStatus.SAVED:
      return '#ffa200';
    default:
      return '#9c9c9c';
  }
};

const getStatusFortnight = (status) => {
  switch (status) {
    case timelineStatus.FUTURE:
      return '#fff';
    case timelineStatus.PAST:
      return '#E9EAEC';
    case timelineStatus.CURRENT:
      return '#dbf9de';
    default:
      return '#fff';
  }
};

const Wrapper = styled.div`
  background-color: ${props => (getStatusFortnight(props.timeline))}!important;
  padding: 15px;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  user-select: none;
  /* Paper elevation 2 */
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px -1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  :hover {
    /* Paper elevation 8 */
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
  &.left {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  &.right {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .card-header {
    height: 24px;
    span {
      font-size: 18px;
      color: #9c9c9c;
      font-weight: 700;
      text-transform: capitalize;
    }
    button {
      padding: 0px;
      transform: translateX(5px);
      color: #9c9c9c;
      @media (max-width: 600px){
        width: 12px;
      }
    }
    svg {
      pointer-events: none;
    }
  }
  .card-status {
    span {
      color: ${props => getStatusColor(props.status)};
      font-size: 14px;
    }
    svg {
      font-size: 16px !important;
      color: ${props => getStatusColor(props.status)} !important;
      margin-right: 4px !important;
      margin-left: 4px !important;
    }
  }
  .card-content {
    min-height: 77px;
    user-select: text;
    span {
      font-size: 13px;
      color: #9c9c9c;
      &.not-available{
        font-size: 17px;
        text-align: center;
        color: #999;
        opacity: 0.7;
      }
    }
    .label {
      display: block;
    }
    .value {
      font-size: 36px;
      @media (max-width: 600px){
        font-size: 30px;
      }
    }
    svg {
      font-size: 55px;
      color: #888;
      cursor: pointer;
    }
  }
  .card-footer {
    position: relative;
    height: 16px;
    small {
      font-size: 12px;
      color: #9c9c9c;
      span:first-of-type:after {
        content: ": ";
      }
    }
    .comment-button{
      position: absolute;
      right: -12px;
    }
    svg {
      font-size: 16px;
      color: #9c9c9c;
    }
  }
`;

class AppointmentCard extends Component {
  state = {
    commentModalOpen: false,
    form: {
      chg: {
        label: 'Chg',
        name: 'chg',
        value: this.props.appointment.chg,
        validations: {
          sah: true,
        },
        error: false,
      },
      bd: {
        label: 'BD',
        name: 'bd',
        value: this.props.appointment.bd,
        validations: {
          sah: true,
        },
        error: false,
      },
      idle: {
        label: 'Vac./Illn.',
        name: 'idle',
        value: this.props.appointment.idle,
        validations: {
          sah: true,
        },
        error: false,
      },
      comment: {
        label: 'Comment',
        name: 'comment',
        value: this.props.appointment.comment,
        validations: {},
        error: false,
      },
    },
    sahExceeded: false,
  };

  componentDidUpdate(prevProps) {
    const { t } = this.props;
    if (this.areLocalAndStoreHoursUnsync()) {
      // Cenário: Salvar no blur
      if (this.isInNeedOfPersistence(prevProps)) {
        if (this.state.sahExceeded) {
          myToast.error(t('appointments:toast-messages.sah_exceeded'));
          this.resetHours();
          return;
        }
        this.props.actions.fetchUpdateBlurredAppointment({
          ...this.props.appointment,
          chg: this.state.form.chg.value,
          bd: this.state.form.bd.value,
          idle: this.state.form.idle.value,
        });
      }
      // Cenário: Sync após paste
      else if (this.props.appointment.status === dataStatus.SAVED) {
        this.resetHours();
      }
    }
  }

  componentWillUnmount = () => {
    const { t } = this.props;
    if (this.areLocalAndStoreHoursUnsync()) {
      if (this.state.sahExceeded) {
        // this.props.actions.showError(t('toast-messages.sah_exceeded'));
        myToast.error(t('toast-messages.sah_exceeded'));
        this.resetHours();
        return;
      }
      this.props.actions.fetchUpdateBlurredAppointment({
        ...this.props.appointment,
        chg: this.state.form.chg.value,
        bd: this.state.form.bd.value,
        idle: this.state.form.idle.value,
      });
    }
  };

  isInNeedOfPersistence = prevProps => prevProps.appointment.status === dataStatus.EDIT
    && this.props.appointment.status !== prevProps.appointment.status;

  areLocalAndStoreHoursUnsync = () => (this.props.appointment.chg !== this.state.form.chg.value)
    || (this.props.appointment.bd !== this.state.form.bd.value)
    || (this.props.appointment.idle !== this.state.form.idle.value);

  resetHours = () => {
    this.setState(state => ({
      ...state,
      form: {
        ...state.form,
        chg: {
          ...state.form.chg,
          value: this.props.appointment.chg,
        },
        bd: {
          ...state.form.bd,
          value: this.props.appointment.bd,
        },
        idle: {
          ...state.form.idle,
          value: this.props.appointment.idle,
        },
      },
      sahExceeded: false,
    }));
  };

  isSahExceeded = (value, name) => {
    let total = 0;
    if (name !== 'chg') total += parseInt(this.state.form.chg.value, 10);
    if (name !== 'bd') total += parseInt(this.state.form.bd.value, 10);
    if (name !== 'idle') total += parseInt(this.state.form.idle.value, 10);
    total += value;
    return total > this.props.appointment.sah;
  };

  handleHoursInputChange = (event) => {
    const { name, value } = event.target;
    let parsedValue = value !== '' ? parseInt(value, 10) : '';
    if (Number.isInteger(parsedValue) && parsedValue < 0) parsedValue = 0;

    this.setState(state => ({
      ...state,
      form: {
        ...state.form,
        [name]: {
          ...state.form[name],
          value: parsedValue,
        },
      },
      sahExceeded: this.isSahExceeded(parsedValue, name),
    }));
  };

  handleCommentChange = (event) => {
    const { name, value } = event.target;
    this.setState(state => ({
      ...state,
      form: {
        ...state.form,
        [name]: {
          ...state.form[name],
          value,
        },
      },
    }));
  };

  handleAppointmentEditMode = (id) => {
    if (this.props.appointment.timeline !== timelineStatus.PAST) {
      this.props.actions.handleAppointmentEditMode(id);
    }
  };

  handleAppointmentSaveOnEnter = (event) => {
    const { t } = this.props;
    if (event.key === 'Enter') {
      if (this.state.sahExceeded) {
        myToast.error(t('toast-messages.sah_exceeded'));
        return;
      }
      if (!this.state.form.chg.value && !this.state.form.bd.value && !this.state.form.idle.value) {
        myToast.error(t('toast-messages.empty_appointment'));
        this.props.actions.handleAppointmentClearEditMode();
        return;
      }
      this.props.actions.fetchUpdateAppointment({
        ...this.props.appointment,
        chg: this.state.form.chg.value,
        bd: this.state.form.bd.value,
        idle: this.state.form.idle.value,
      }).on('done', () => {
        myToast.success(t('toast-messages.appointment_updated'));
      })
        .on('error', () => {
          myToast.error(t('toast-messages.appointment_update_error'));
        })
        .on('fail', () => {
          myToast.error(t('toast-messages.appointment_update_error'));
        });
      event.preventDefault();
    }
  };

  handleCommentSave = () => {
    const { t } = this.props;
    if (this.state.sahExceeded) {
      myToast.error(t('toast-messages.sah_exceeded'));
      return;
    }

    if (this.state.form.comment.value === this.props.appointment.comment) {
      myToast.info(t('toast-messages.comment_not_changed'));
      return;
    }

    this.props.actions.fetchUpdateAppointment({
      ...this.props.appointment,
      chg: this.state.form.chg.value,
      bd: this.state.form.bd.value,
      idle: this.state.form.idle.value,
      comment: this.state.form.comment.value,
    }).on('done', () => {
      myToast.success(t('toast-messages.comment_saved'));
      this.handleCloseCommentModal();
    })
      .on('error', () => {
        myToast.error(t('toast-messages.generic_error'));
        this.handleCloseCommentModal();
      })
      .on('fail', () => {
        myToast.error(t('toast-messages.generic_error'));
        this.handleCloseCommentModal();
      });
  };

  handleCommentClear= () => {
    this.setState(state => ({
      ...state,
      form: {
        ...state.form,
        comment: {
          ...state.form.comment,
          value: '',
        },
      },
    }));
    this.handleCloseCommentModal();
  };

  handleSaveMenu = () => {
    const { t } = this.props;
    if (this.state.sahExceeded) {
      myToast.error(t('toast-messages.sah_exceeded'));
      return;
    }
    if (!this.state.form.chg.value && !this.state.form.bd.value && !this.state.form.idle.value) {
      myToast.error(t('toast-messages.empty_appointment'));
      return;
    }
    this.props.actions.fetchUpdateAppointment({
      ...this.props.appointment,
      chg: this.state.form.chg.value,
      bd: this.state.form.bd.value,
      idle: this.state.form.idle.value,
    }).on('done', () => {
      myToast.success(t('toast-messages.appointment_updated'));
    })
      .on('error', () => {
        myToast.error(t('toast-messages.appointment_update_error'));
      })
      .on('fail', () => {
        myToast.error(t('toast-messages.appointment_update_error'));
      });
  };

  handleCopyMenu = () => {
    const { t } = this.props;
    this.props.actions
      .copyAppointmentData(this.props.appointment.id);
    myToast.info(t('toast-messages.appointment_copied'));
  };

  handlePasteMenu = () => {
    const { t } = this.props;
    this.props.actions
      .pasteAppointmentData(this.props.appointment.id)
      .on('done', myToast.success(t('toast-messages.appointment_updated')));
  };

  handleOpenCommentModal = () => {
    this.setState({ commentModalOpen: true });
  };

  handleCloseCommentModal = () => {
    this.setState({ commentModalOpen: false });
  };

  render() {
    const { appointment, type, t } = this.props;
    if (!appointment.timeline) {
      return null;
    }
    return (
      <Wrapper className={type} status={appointment.status} disable={false} timeline={appointment.timeline} onBlur={this.handleBlur} tabindex="-1">
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className="card-header"
        >
          <span>{t('DD/MMM/YYYY', { date: new Date(appointment.lastDay) })}</span>
          <AppointmentCardOptions
            appointment={appointment}
            onSaveClick={this.handleSaveMenu}
            onCopyClick={this.handleCopyMenu}
            onPasteClick={this.handlePasteMenu}
          />
        </Grid>
        <Grid
          container
          alignItems="center"
          className="card-status"
        >
          <span>{t(`appointment-status.${appointment.status}`)}</span>
          <InsertDriveFileIcon />
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          className="card-content"
        >
          { appointment.timeline !== timelineStatus.PAST || this.props.appointment.chg || this.props.appointment.bd || this.props.appointment.idle
            ? (
              <AppointmentCardContent
                appointment={appointment}
                onSave={this.handleAppointmentSaveOnEnter}
                onEdit={this.handleAppointmentEditMode}
                onChange={this.handleHoursInputChange}
                onBlur={this.handleOnBlur}
                form={this.state.form}
                sahExceeded={this.state.sahExceeded}
              />
            )
            : (<span className="not-available">{t('appointment-not-avaible')}</span>)
          }
        </Grid>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className="card-footer"
        >
          <small>
            <span>{t('sah')}</span>
            <span>{t('hour_short', { hour: appointment.sah })}</span>
          </small>
          {(appointment.status === dataStatus.EMPTY || appointment.timeline === timelineStatus.PAST)
            ? null
            : (
              <IconButton onClick={this.handleOpenCommentModal} className="comment-button">
                <SmsIcon />
              </IconButton>
            )}
        </Grid>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.commentModalOpen}
          onClose={this.handleCloseCommentModal}
        >
          <CommentModal
            onChange={this.handleCommentChange}
            lastDay={appointment.lastDay}
            inputControl={this.state.form.comment}
            onSave={this.handleCommentSave}
            onClear={this.handleCommentClear}
            onClose={this.handleCloseCommentModal}
          />
        </Modal>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  appointment: state.appointments[ownProps.appointmentId],
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appointmentsOperations, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withI18n()(AppointmentCard),
);
