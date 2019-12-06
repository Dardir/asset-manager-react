import { connect }            from 'react-redux';
import EquipmentTypeInfo          from './EquipmentTypeInfo';

const mapStateToProps = (state) => {
  const props = {
    equipmentInstances: state.equipmentInstances
  };
  return props;
};


export default connect(mapStateToProps)(EquipmentTypeInfo);
