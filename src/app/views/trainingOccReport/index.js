// @flow weak

import { connect }            from 'react-redux';
import TrainingOccGraph           from './TrainingOccGraph';

const mapStateToProps = (state) => {
  const props = {
    regions: state.regionTypes,
    companies: state.companies,
    sites: state.sites,
    trainings: state.trainings,
    colors: state.colors,
    months: state.months
  };
  return props;
};

export default connect(
  mapStateToProps,
)(TrainingOccGraph);
