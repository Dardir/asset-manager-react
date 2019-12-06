import { connect }            from 'react-redux';
import MaintenancePlans          from './MaintenancePlans';
import { bindActionCreators } from 'redux';


import {saveMaintenancePlan, filterPlanOfInstance, clearfilteredPlans, updateMaintenancePlan, retrieveMaintenancePlans} from '../../redux/modules/maintenancePlans';
import {retrieveEquipmentInstances}  from '../../redux/modules/equipmentInstances';

const mapStateToProps = (state) => {
  const props = {
    maintenancePlans: state.maintenancePlans
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        saveMaintenancePlan:saveMaintenancePlan,
        filterPlanOfInstance:filterPlanOfInstance,
        clearfilteredPlans:clearfilteredPlans,
        updateMaintenancePlan:updateMaintenancePlan,
        retrieveMaintenancePlans:retrieveMaintenancePlans,
        retrieveEquipmentInstances:retrieveEquipmentInstances
      },
      dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaintenancePlans);
