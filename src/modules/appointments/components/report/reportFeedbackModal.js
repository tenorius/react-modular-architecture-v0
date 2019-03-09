import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { withI18n } from 'react-i18next';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import Button from '@material-ui/core/Button';

import CloseIcon from '@material-ui/icons/Close';

import { duckOperations as appointmentsOperations } from '../../ducks/index';

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
  text-align: center;
  .select-input {
    width: 100%;
  }
`;

Styled.Footer = styled(Grid)`
  padding: 16px;
`;

class ReportFeedbackModal extends Component {
  state = {
    foo: 'bar',
  }

  componentDidMount() {
    this.props.actions.fetchAdminFeedbacks();
  }

  render() {
    const { onClose, t } = this.props;
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
            fiscalYearOptions={fiscalYearOptions}
            monthOptions={monthOptions}
            fortnightOptions={fortnightOptions}
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
                  <CircularProgress size={80} />
                )
                : (
                  <ReportTable
                    tableData={this.getTableData()}
                    tableFilter={tableFilter}
                    filterChange={e => this.handleChange(e, 'tableFilter')}
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
  feedbacks: state.userFeedbacks,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appointmentsOperations, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withI18n(),
)(ReportFeedbackModal);
