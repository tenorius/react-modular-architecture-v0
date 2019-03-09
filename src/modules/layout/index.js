import { connect } from 'react-redux';
import Layout from './views/layout';
import { duckOperations as commonOperations } from '../common/ducks/index';

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}
const actions = { ...commonOperations };

export default connect(mapStateToProps, actions)(Layout);
