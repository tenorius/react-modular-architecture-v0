import { connect } from 'react-redux';
// import { withNamespaces } from 'react-i18next';
import Landing from './views/landing';

function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(
  Landing,
);
