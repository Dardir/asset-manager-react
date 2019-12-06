// @flow weak

import { connect }            from 'react-redux';
import PrevMaintOccGraph           from './PrevMaintOccGraph';

const mapStateToProps = (state) => {
  const props = {
    equipmentTree: state.equipmentTree,
    sites: state.sites,
    preventiveMaintenances: state.preventiveMaintenances,
    colors: state.colors,
    months: state.months
  };
  return props;
};

export default connect(
  mapStateToProps,
)(PrevMaintOccGraph);
