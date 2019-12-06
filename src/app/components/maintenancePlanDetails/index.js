import { connect }            from 'react-redux';
import MaintenancePlanDetails          from './MaintenancePlanDetails';
import { bindActionCreators } from 'redux';
import {filterInstancesOfType} from '../../redux/modules/equipmentInstances';
import {filterPreventiveMaintenance} from '../../redux/modules/preventiveMaintenances';
import {filterCorrectiveMaintenance} from '../../redux/modules/correctiveMaintenances';
import {RetrieveSiteTree} from '../../redux/modules/siteTree';

const mapStateToProps = (state) => {
  const props = {
     equipmentTree: state.equipmentTree,
     preventiveMaintenances: state.preventiveMaintenances,
    // correctiveMaintenances: state.correctiveMaintenances,
    // equipmentInstances: state.equipmentInstances,
     siteTree: state.siteTree
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        // filterInstancesOfType: filterInstancesOfType,
        filterPreventiveMaintenance: filterPreventiveMaintenance,
        // filterCorrectiveMaintenance: filterCorrectiveMaintenance,
        RetrieveSiteTree: RetrieveSiteTree
      },
      dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MaintenancePlanDetails);
