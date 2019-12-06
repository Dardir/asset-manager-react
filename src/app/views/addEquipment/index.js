import { connect }            from 'react-redux';
import AddEquipment          from './AddEquipment';
import { bindActionCreators } from 'redux';
import { saveEquipment }   from '../../redux/modules/equipments';

const mapStateToProps = (state) => {
  const props = {
    equipmentTypes: state.equipmentTypes
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        saveEquipment: saveEquipment
      },
      dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEquipment);
