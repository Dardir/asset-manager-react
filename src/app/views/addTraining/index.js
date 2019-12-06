import { connect }            from 'react-redux';
import AddTraining          from './AddTraining';
import { bindActionCreators } from 'redux';
import { saveTraining }   from '../../redux/modules/trainings';

const mapStateToProps = (state) => {
  const props = {
    trainingTypes: state.trainingTypes
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        saveTraining: saveTraining
      },
      dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTraining);
