import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withI18n } from 'react-i18next';
// import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

import UsersList from '../components/UsersList';

import { operations as usersOperations } from '../ducks/users';

// Component
class API extends React.Component {
  state = {
    loadingUsers: false,
  }

  handleClick = () => {
    this.setState({ loadingUsers: true });
    setTimeout(() => {
      this.props.actions.getAllUsers()
        .then(() => {
          this.setState({ loadingUsers: false });
        });
    }, 3000);
  }

  getUsers = () => {
    const { loadingUsers: loading } = this.state;
    const { users } = this.props;
    return !loading
      ? users
      : Array(9).fill(0).map((v, k) => k + 100);
  }

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6">{t('apiPage.title')}</Typography>
        <hr />
        <UsersList
          users={this.getUsers()}
          loading={this.state.loadingUsers}
          handleClick={this.handleClick}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(usersOperations, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withI18n(),
)(API);
