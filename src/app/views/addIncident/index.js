import { connect }            from 'react-redux';
import AddIncident          from './AddIncident';
import { bindActionCreators } from 'redux';
import { saveIncident }   from '../../redux/modules/incidents';

const mapStateToProps = (state) => {
  const props = {
    incidentTypes: state.incidentTypes,
    carTypes: state.carTypes
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        saveIncident: saveIncident
      },
      dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddIncident);
