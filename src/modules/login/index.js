import { connect } from 'react-redux';
import Login from './views/login';
import { duckOperations as commonOperations } from '../common/ducks/index';

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}
const actions = { ...commonOperations };

export default connect(mapStateToProps, actions)(Login);
