import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations as countOperations } from '../ducks/count';

class Home extends React.Component {
  handleClick = (operation) => {
    const actionName = operation === '+' ? 'countAdd' : 'countSub';
    this.props.actions[actionName]();
  }

  render() {
    const { count } = this.props;
    return (
      <div>
        <h1>Hello World!</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
