import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { withI18n } from 'react-i18next';
import Page from '../../common/components/page';
import AdminTab from '../components/adminTab';
import Permission from './permission';
import Button from '@material-ui/core/Button';
import SAH from './sah';
import { duckOperations as adminOperations } from '../ducks';

const Styled = {};
Styled.Wrapper = styled.div`
  height: 100%;
`;

Styled.Content = styled.div`
  margin-top: 139px;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

Styled.Paper = styled(Paper)`
  padding: 16px;
  max-width: 500px;
  min-width: 320px;
  width: 80%;
  margin: auto;
`;

class Admin extends Component {
  state = {
    ready: false,
    selectedView: 'permissions',
    views: ['permissions', 'sah'],
  };

  componentDidMount() {

  }

  handlePermissionSelection = (e, selectedView) => {
    this.props.history.push(`/admin/${selectedView}`);
    this.setState({ selectedView });
  };

  goToAppointments = () => {
    this.props.history.push(`/appointments`);
  };

  render() {
    const { t } = this.props;
    return (
      <Styled.Wrapper>
        <Page>
          <AdminTab
            selectedView={this.state.selectedView}
            tabs={this.state.views}
            changeHandler={this.handlePermissionSelection}
            width={this.state.width}
            t={this.props.t}
          />
          <Styled.Content>
            <Styled.Paper>
              <Switch>
                <Route path="/admin/permissions" component={Permission} />
                <Route path="/admin/sah" component={SAH} />
                <Redirect to={{ pathname: '/admin/permissions' }} />
              </Switch>
            </Styled.Paper>
            <Button
              variant="contained"
              color="primary"
              onClick={this.goToAppointments}
              style={{marginTop: '20px', alignSelf: 'center'}}
            >
              {t('go_to_appointments')}
            </Button>
          </Styled.Content>
        </Page>
      </Styled.Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(adminOperations, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withI18n(),
)(withRouter(Admin));
