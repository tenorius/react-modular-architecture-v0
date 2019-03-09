import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import Admin from './views/admin';
import { duckOperations as commonOperations } from '../common/ducks/index';
import { duckOperations as adminOperations } from './ducks/index';

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}
const actions = { ...commonOperations, ...adminOperations };

export default connect(mapStateToProps, actions)(withNamespaces(['admin'])(Admin));
