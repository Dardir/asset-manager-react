import { takeLatest, call, put } from 'redux-saga/effects';
import {SGRD_RETRIEVE_PREVENTIVE_MAINTENANCE_OF_TYPE,SGRD_RETRIEVE_ALL_PREVENTIVE_MAINTENANCE, setPreventiveMaintenances, retrievePreventiveMaintenancesFailed}   from '../modules/preventiveMaintenances';
import {getPreventiveMaintenancesOfTypeApi,getAllPreventiveMaintenancesApi} from '../api/preventiveMaintenancesApi';


function *getPreventiveMaintenancesOfType({maintenanceType}) {
  try{
    const maintenances = yield call(getPreventiveMaintenancesOfTypeApi,maintenanceType);
    yield put(setPreventiveMaintenances(maintenances));
  }catch(error) {
    yield put(retrievePreventiveMaintenancesFailed(error));
  }
}

function *getPreventiveMaintenances() {
  try{
    const maintenances = yield call(getAllPreventiveMaintenancesApi);
    yield put(setPreventiveMaintenances(maintenances));
  }catch(error) {
    yield put(retrievePreventiveMaintenancesFailed(error));
  }
}


export function *watchRetrievePreventiveMaintenancesOfType(context) {
  yield takeLatest(SGRD_RETRIEVE_PREVENTIVE_MAINTENANCE_OF_TYPE, getPreventiveMaintenancesOfType);
}

export function *watchRetrievePreventiveMaintenances(context) {
  yield takeLatest(SGRD_RETRIEVE_ALL_PREVENTIVE_MAINTENANCE, getPreventiveMaintenances);
}
