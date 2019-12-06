import { takeLatest, call, put, select } from 'redux-saga/effects';
import {SGRD_RETRIEVE_EQUIPMENT_INSTANCES, setEquipmentInstances, retrieveEquipmentInstancesFailed}   from '../modules/equipmentInstances';
import {getEquipmentInstancesApi} from '../api/equipmentInstancesApi';


function *getEquipmentInstances() {
  try{
    const instances = yield call(getEquipmentInstancesApi);
    let exixtingEquipmentInstances = yield select(state => state.equipmentInstances.allinstances);
    //this condition should be removed when contacting BE in real
    if(exixtingEquipmentInstances.lenght === 0 || exixtingEquipmentInstances.lenght === undefined){
      yield put(setEquipmentInstances(instances));
    }
  }catch(error) {
    yield put(retrieveEquipmentInstancesFailed(error));
  }
}


export function *watchRetrieveEquipmentInstances(context) {
  yield takeLatest(SGRD_RETRIEVE_EQUIPMENT_INSTANCES, getEquipmentInstances);
}
