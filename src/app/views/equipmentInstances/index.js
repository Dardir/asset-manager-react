import { connect }            from 'react-redux';
import EquipmentInstances          from './EquipmentInstances';
import { bindActionCreators } from 'redux';

import { savePreventiveMaintenance }   from '../../redux/modules/preventiveMaintenances';
import { saveCorrectiveMaintenance }   from '../../redux/modules/correctiveMaintenances';
import {clearFilteredInstances, updateEquipmentInstance, retrieveEquipmentInstances} from '../../redux/modules/equipmentInstances';
import {clearFilteredPreventiveMaintenances, updatePreventiveMaintenanceInstance, filterPreventiveMaintenance} from '../../redux/modules/preventiveMaintenances';
import {clearFilteredCorrectiveMaintenances, updateCorrectiveMaintenanceInstance, filterCorrectiveMaintenance} from '../../redux/modules/correctiveMaintenances';

const mapStateToProps = (state) => {
  const props = {
    equipmentInstances: state.equipmentInstances
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        savePreventiveMaintenance: savePreventiveMaintenance,
        saveCorrectiveMaintenance: saveCorrectiveMaintenance,
        clearFilteredInstances: clearFilteredInstances,
        updateEquipmentInstance:updateEquipmentInstance,
        clearFilteredPreventiveMaintenances:clearFilteredPreventiveMaintenances,
        updatePreventiveMaintenanceInstance:updatePreventiveMaintenanceInstance,
        filterPreventiveMaintenance:filterPreventiveMaintenance,
        clearFilteredCorrectiveMaintenances:clearFilteredCorrectiveMaintenances,
        updateCorrectiveMaintenanceInstance:updateCorrectiveMaintenanceInstance,
        filterCorrectiveMaintenance:filterCorrectiveMaintenance,
        retrieveEquipmentInstances:retrieveEquipmentInstances
      },
      dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentInstances);
