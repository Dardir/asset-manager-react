// @flow weak

import { connect }            from 'react-redux';
import EquipmentQttyGraph           from './EquipmentQttyGraph';

const mapStateToProps = (state) => {
  const props = {
    regions: state.regionTypes,
    companies: state.companies,
    sites: state.sites
  };
  return props;
};

export default connect(
  mapStateToProps,
)(EquipmentQttyGraph);
