import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators, compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { withI18n } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import CloseIcon from '@material-ui/icons/Close';

import { duckOperations as appointmentsOperations } from '../../ducks/index';
import { getFortnightId } from '../../../common/utils/helper';
import CSV from '../../../common/utils/CSV';
import { media } from '../../../common/utils/style-utils';

import ReportForm from './reportForm';
import ReportTable from './reportTable';

const Styled = {};

Styled.Wrapper = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  ${media.sm}{
    height: auto;
    width: 70%;
  }
`;

Styled.Header = styled(Grid)`
  position: relative;
  padding: 20px;
  background: #66BB6A;
  border-top: 4px solid darkgreen;
  .title {
    color: white;
    font-size: 16px;
  }
  .dismiss {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0;
    min-width: 36px;
    min-height: 36px;
  }
`;

Styled.Content = styled.div`
  padding: 16px;
  .select-input {
    width: 100%;
  }
`;

Styled.Footer = styled(Grid)`
  padding: 16px;
`;

class ReportModal extends Component {
  state = {
    appointmentsLoading: true,
    viewReport: false,
    inputs: {
      fiscalYear: '',
      month: '',
      fortnight: '',
      country: '',
      metrocity: '',
      tableFilter: '',
    },
  };

  componentDidMount() {
    this.props.actions
      .fetchReportParams()
      .on('done', () => {
        this.setState((state) => {
          const splitedDate = this.props.app.currentFortnightLastDay.split('-');
          const country = Object.keys(this.props.reportParams.regions)[0] || '';
          return {
            appointmentsLoading: false,
            inputs: {
              ...state.inputs,
              fiscalYear: splitedDate[0],
              month: splitedDate[1],
              fortnight: splitedDate[2] === '15' ? '1' : '2',
              country,
            },
          };
        });
      });
  }

  handleChange = (e, ref, hideReport = true) => {
    const { value } = e.target;
    this.setState(state => ({
      viewReport: !hideReport,
      inputs: {
        ...state.inputs,
        [ref]: value,
      },
    }));
  }

  handleClick = (ref) => {
    if (ref === 'view') {
      this.fetchAppointments();
      this.setState({ viewReport: true });
    } else if (ref === 'download') {
      this.fetchAppointments()
        .on('done', () => {
          const { fiscalYear, month, fortnight, country, metrocity } = this.state.inputs;
          const fortnightId = getFortnightId(fiscalYear, month, fortnight, country, metrocity);
          const csvData = this.getTableData();
          const csv = new CSV(csvData, {
            fileName: `report_${fortnightId}.csv`,
            columns: [
              { label: 'PID', key: 'pid' },
              { label: 'EID', key: 'eid' },
              { label: 'Carrer', key: 'careertrackDescr' },
              { label: 'Level', key: 'level' },
              { label: 'UF', key: 'metrocity' },
              { label: 'Metrocity', key: 'metrocityDescr' },
              { label: 'Cost Center', key: 'costcenterDescr' },
              { label: 'Carrer Track', key: 'careertrackDescr' },
              { label: 'Business Org', key: 'businessOrg' },
              { label: 'Competency GRP', key: 'competencyGrp' },
              { label: 'CHG', key: 'chg' },
              { label: 'BD', key: 'bd' },
              { label: 'Idle', key: 'idle' },
              { label: 'SAH', key: 'sah' },
              // { label: '% Chang', key: 'chang' },
              { label: 'Status', key: 'status' },
              { label: 'Last updated', key: 'timestamp' },
            ],
          });
          csv.download();
        });
    }
  }

  fetchAppointments = () => {
    const { fiscalYear, month, fortnight, country, metrocity } = this.state.inputs;

    this.setState({ appointmentsLoading: true });
    return this.props.actions
      .fetchAppointmentsReport(fiscalYear, month, fortnight, country, metrocity)
      .on('done', () => {
        this.setState({ appointmentsLoading: false });
      });
  }

  getTableData = () => {
    const { fortnights, adminAppointments: appointments } = this.props;
    const { fiscalYear, month, fortnight, country, metrocity, tableFilter } = this.state.inputs;
    const fortnightId = getFortnightId(fiscalYear, month, fortnight, country, metrocity);
    const appointmentsAlreadyLoaded = Boolean(fortnights[fortnightId]);
    // Get the raw data to be displayed
    const tableData = appointmentsAlreadyLoaded
      ? fortnights[fortnightId].appointments.map(id => appointments[id])
      : [];
    // Return the filtered data
    return tableData.filter((data) => {
      const keys = Object.keys(data);
      return keys.reduce((match, key) => {
        const exists = data[key] !== null;
        // eslint-disable-next-line no-mixed-operators
        return match || exists && data[key].toString().includes(tableFilter);
      }, false);
    });
  }

  render() {
    const { onClose, t, reportParams } = this.props;
    const {
      appointmentsLoading,
      viewReport,
      inputs: {
        fiscalYear,
        month,
        fortnight,
        country,
        metrocity,
        tableFilter,
      },
    } = this.state;
    // if (appointmentsLoading) return null;
    return (
      <Styled.Wrapper>
        <Styled.Header container justify="center" alignItems="center">
          <span className="title">{t('report.title')}</span>
          <Button className="dismiss" onClick={onClose}>
            <CloseIcon />
          </Button>
        </Styled.Header>
        <Styled.Content>
          <ReportForm
            disableForm={appointmentsLoading}
            fiscalYear={fiscalYear}
            month={month}
            fortnight={fortnight}
            country={country}
            metrocity={metrocity}
            fiscalYearOptions={reportParams.fiscalYears}
            monthOptions={reportParams.months}
            fortnightOptions={reportParams.fortnights}
            regionOptions={reportParams.regions}
            handleChange={e => this.handleChange(e, e.target.name)}
            onClick={this.handleClick}
          />
        </Styled.Content>
        <Divider />
        {viewReport
          ? (
            <Styled.Content>
              {appointmentsLoading
                ? (
                  <div style={{ display: 'flex' }}>
                    <CircularProgress size={80} style={{ margin: 'auto' }} />
                  </div>
                )
                : (
                  <ReportTable
                    tableData={this.getTableData()}
                    tableFilter={tableFilter}
                    filterChange={e => this.handleChange(e, 'tableFilter', false)}
                  />
                )}
            </Styled.Content>
          )
          : null}
      </Styled.Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  adminAppointments: state.adminAppointments,
  fortnights: state.fortnights,
  reportParams: state.reportParams,
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appointmentsOperations, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withI18n(),
)(ReportModal);
