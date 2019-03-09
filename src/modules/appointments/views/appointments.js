import React, { Component } from 'react';
import styled from 'styled-components';

import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

import Loading from '../../common/components/loading';
import Page from '../../common/components/page';
import { media } from '../../common/utils/style-utils';

import FiscalYearsTab from '../components/fiscalYearsTab';
import AppointmentCard from '../components/appointmentCard';
import AppointmentsSpeedDial from '../components/speedDial';
import UserFeedbackModal from '../components/feedbacks/userFeedbackModal';
import AdminFeedbackModal from '../components/feedbacks/adminFeedbackModal';
import ReportModal from '../components/report/reportModal';

const Wrapper = styled.div`
  height: 100%;
  padding-top: 103px;
  .cards-container {
    max-width: 1280px;
    margin: auto;
    margin-top: 16px;
    ${media.sm}{
      margin-top: 96px;
    }
    @media (max-width: 1279px) {
      max-width: 960px;
    }
    @media (max-width: 959px) {
      max-width: 500px;
    }
  }
  .card-wrapper {
    margin-bottom: 15px;
    :nth-child(odd) {
      padding-left: 8px;
    }
    :nth-child(even) {
      padding-right: 8px;
    }
    :hover {
      z-index: 2;
    }
  }
`;

class Appointments extends Component {
  state = {
    ready: false,
    adminFeedbackModalOpen: false,
    userFeedbackModalOpen: false,
    reportModalOpen: false,
    selectedFiscalYear: null,
    fiscalYearsRange: null,
    width: 0,
    speedDial: {
      direction: 'up',
      open: false,
      hidden: false,
    },
  };

  componentDidMount() {
    this.setState({});
    this.props.fetchAppointmentsByYear(this.props.app.currentFiscalYear).on('done', () => {
      const cFY = this.props.app.currentFiscalYear;
      this.setState({ ready: true, selectedFiscalYear: this.props.app.currentFiscalYear, fiscalYearsRange: [cFY - 1, cFY, cFY + 1] });
    });
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  handleFiscalYearSelection = (event, fiscalYear) => {
    if (this.state.selectedFiscalYear === fiscalYear) return;
    if (!this.props.fiscalYears[fiscalYear]) {
      this.props.fetchAppointmentsByYear(fiscalYear).on('done', () => {
        this.setState({ selectedFiscalYear: fiscalYear });
      });
    } else {
      this.setState({ selectedFiscalYear: fiscalYear });
    }
  };

  handleClick = () => {
    this.setState(state => ({
      ...state,
      speedDial: {
        ...state.speedDial,
        open: !state.speedDial.open,
      },
    }));
  };

  handleClose = () => {
    this.setState(state => ({
      ...state,
      speedDial: {
        ...state.speedDial,
        open: false,
      },
    }));
  };

  handleOpen = () => {
    this.setState(state => ({
      ...state,
      speedDial: {
        open: true,
        ...state.speedDial,
      },
    }));
  };

  handleOpenUserFeedbackModal = () => {
    this.setState({ userFeedbackModalOpen: true });
  };

  handleCloseUserFeedbackModal = () => {
    this.setState({ userFeedbackModalOpen: false });
  };

  handleOpenAdminFeedbackModal = () => {
    this.setState({ adminFeedbackModalOpen: true });
  };

  handleCloseAdminFeedbackModal = () => {
    this.setState({ adminFeedbackModalOpen: false });
  };

  handleOpenReportModal = () => {
    this.setState({ reportModalOpen: true });
  };

  handleCloseReportModal = () => {
    this.setState({ reportModalOpen: false });
  };

  goToAdminPage = () => {
    this.props.history.push('/admin/permissions');
  };

  render() {
    const { app, fiscalYears, user } = this.props;
    return (
      <Wrapper>
        { app.appLoading && <Loading /> }
        {this.state.ready && (
          <Page>
            <FiscalYearsTab
              selectedFiscalYear={this.state.selectedFiscalYear}
              fiscalYearsRange={this.state.fiscalYearsRange}
              changeHandler={this.handleFiscalYearSelection}
              width={this.state.width}
            />
            <Grid container className="cards-container">
              {fiscalYears[this.state.selectedFiscalYear].appointments.map((appointmentId, i) => (
                <Grid
                  item
                  xs={6}
                  md={3}
                  lg={2}
                  className="card-wrapper"
                  key={appointmentId}
                >
                  <AppointmentCard
                    appointmentId={appointmentId}
                    onEdit={this.handleAppointmentEditMode}
                    onSave={this.handleAppointmentSaveOnEnter}
                    type={i % 2 ? 'right' : 'left'}
                  />
                </Grid>
              ))}
            </Grid>
          </Page>
        )}
        <AppointmentsSpeedDial
          {...this.state.speedDial}
          goToAdminPage={this.goToAdminPage}
          permission={user.permission}
          handleClick={this.handleClick}
          handleClose={this.handleClose}
          handleOpen={this.handleOpen}
          handleOpenAdminFeedback={this.handleOpenAdminFeedbackModal}
          handleOpenUserFeedback={this.handleOpenUserFeedbackModal}
          handleOpenReport={this.handleOpenReportModal}
        />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.userFeedbackModalOpen}
        >
          <UserFeedbackModal
            onClose={this.handleCloseUserFeedbackModal}
          />
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.adminFeedbackModalOpen}
        >
          <AdminFeedbackModal
            onClose={this.handleCloseAdminFeedbackModal}
          />
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.reportModalOpen}
        >
          <ReportModal
            onClose={this.handleCloseReportModal}
          />
        </Modal>
      </Wrapper>
    );
  }
}

export default withRouter(Appointments);
