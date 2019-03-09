import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import Appointments from './views/appointments';
import { duckOperations as commonOperations } from '../common/ducks/index';
import { duckOperations as appointmentsOperations } from './ducks/index';

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
    fiscalYears: state.fiscalYears,
  };
}
const actions = { ...commonOperations, ...appointmentsOperations };

export default connect(mapStateToProps, actions)(withNamespaces(['appointments'])(Appointments));
