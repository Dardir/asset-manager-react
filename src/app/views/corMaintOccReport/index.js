// @flow weak

import { connect }            from 'react-redux';
import CorMaintOccGraph           from './CorMaintOccGraph';

const mapStateToProps = (state) => {
  const props = {
    equipmentTree: state.equipmentTree,
    sites: state.sites,
    correctiveMaintenances: state.correctiveMaintenances,
    colors: state.colors,
    months: state.months
  };
  return props;
};

export default connect(
  mapStateToProps,
)(CorMaintOccGraph);
