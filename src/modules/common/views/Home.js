import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withI18n } from 'react-i18next';

import { duckOperations as countOperations } from '../ducks/count';

class Home extends React.Component {
  handleClick = (operation) => {
    const actionName = operation === '+' ? 'countAdd' : 'countSub';
    this.props.actions[actionName]();
  }

  render() {
    const { count, t } = this.props;
    return (
      <div>
        <h1>{t('init')}</h1>
        <span>{`Counter: ${count}`}</span>
        <button type="button" onClick={() => this.handleClick('+')}>+</button>
        <button type="button" onClick={() => this.handleClick('-')}>-</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.count,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(countOperations, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withI18n(),
)(Home);
