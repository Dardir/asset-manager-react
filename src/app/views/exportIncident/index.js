import { connect }            from 'react-redux';
import ExportIncident          from './ExportIncident';

const mapStateToProps = (state) => {
  const props = {
    incidents: state.incidents
  };
  return props;
};


export default connect(
  mapStateToProps,
)(ExportIncident);
