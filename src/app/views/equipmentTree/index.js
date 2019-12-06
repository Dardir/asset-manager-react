import { connect }            from 'react-redux';
import EquipmentTree          from './EquipmentTree';
import { bindActionCreators } from 'redux';
import { selectTreeNode , setTreeData, changeNodeInfo, RetrieveEquipmentTree }   from '../../redux/modules/equipmentTree';
import {filterInstancesOfType, saveEquipmentInstance,retrieveEquipmentInstances} from '../../redux/modules/equipmentInstances';

const mapStateToProps = (state) => {
  const props = {
    equipmentTree: state.equipmentTree
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        setTreeData: setTreeData,
        selectTreeNode: selectTreeNode,
        changeNodeInfo: changeNodeInfo,
        filterInstancesOfType: filterInstancesOfType,
        saveEquipmentInstance:saveEquipmentInstance,
        RetrieveEquipmentTree: RetrieveEquipmentTree,
        retrieveEquipmentInstances:retrieveEquipmentInstances
      },
      dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentTree);
