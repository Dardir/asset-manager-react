import { connect }            from 'react-redux';
import CorrectiveMaintenances          from './CorrectiveMaintenances';

const mapStateToProps = (state) => {
  const props = {
    correctiveMaintenances: state.correctiveMaintenances
  };
  return props;
};


export default connect(
  mapStateToProps,
)(CorrectiveMaintenances);
