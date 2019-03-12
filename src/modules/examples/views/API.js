import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withI18n } from 'react-i18next';
// import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { operations as usersOperations } from '../ducks/users';

// Component
class API extends React.Component {
  handleClick = () => {
    this.props.actions.getAllUsers()
      .then(() => {
        console.log('API.js');
      });
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h3">Users API</Typography>
        <Button
          className="button-red"
          variant="contained"
          color="primary"
          onClick={this.handleClick}
        >
          Get all users
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(usersOperations, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withI18n(),
)(API);
