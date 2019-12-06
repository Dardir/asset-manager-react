import { takeLatest, call, put } from 'redux-saga/effects';
import {SGRD_RETRIEVE_EQUIPMENT_TREE, setTreeData, RetrieveEquipmentTreeFailed}   from '../modules/equipmentTree';
import {getEquipmentTreeApi} from '../api/eqipmentTreeApi';


function *getEquipmentTree() {
  try{
    const equipmentTreeResponse = yield call(getEquipmentTreeApi);
    yield put(setTreeData(equipmentTreeResponse));
  }catch(error) {
    yield put(RetrieveEquipmentTreeFailed(error));
  }
}


export function *watchRetrieveEquipmentTree(context) {
  yield takeLatest(SGRD_RETRIEVE_EQUIPMENT_TREE, getEquipmentTree);
}
