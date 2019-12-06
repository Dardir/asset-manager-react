import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import PreventiveMaintenances     from './PreventiveMaintenances';
import {retrievePreventiveMaintenances} from '../../redux/modules/preventiveMaintenances'

const mapStateToProps = (state) => {
  const props = {
    preventiveMaintenances: state.preventiveMaintenances
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        retrievePreventiveMaintenances:retrievePreventiveMaintenances
      },
      dispatch)
  };
};



export default connect(
  mapStateToProps,mapDispatchToProps
)(PreventiveMaintenances);
