import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withI18n } from 'react-i18next';

import Typography from '@material-ui/core/Typography';

import { operations as usersOperations } from '../ducks/users';

class List extends React.Component {
  handleClick = () => {
    this.props.actions.getAllUsers()
      .then(() => {
        console.log('List.js');
      });
  }

  render() {
    return (
      <div>
        <Typography variant="h3">Users List</Typography>
        <button onClick={this.handleClick}>Get all users</button>
      </div>
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
)(List);
