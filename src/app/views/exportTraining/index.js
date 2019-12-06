import { connect }            from 'react-redux';
import ExportTraining          from './ExportTraining';

const mapStateToProps = (state) => {
  const props = {
    trainings: state.trainings
  };
  return props;
};


export default connect(
  mapStateToProps,
)(ExportTraining);
