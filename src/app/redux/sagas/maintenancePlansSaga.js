import { takeLatest, call, put } from 'redux-saga/effects';
import {SGRD_RETREIVE_MAINTENANCE_PLANS, setMaintenancePlans, retrieveMaintenancePlansFailed}   from '../modules/maintenancePlans';
import {getMaintenancePlansApi} from '../api/maintenancePlansApi';


function *getMaintenancePlans({departmentId}) {
  try{
    const maintenancePlansResponse = yield call(getMaintenancePlansApi,departmentId);
    yield put(setMaintenancePlans(maintenancePlansResponse));
  }catch(error) {
    yield put(retrieveMaintenancePlansFailed(error));
  }
}


export function *watchRetrieveMaintenancePlans(context) {
  yield takeLatest(SGRD_RETREIVE_MAINTENANCE_PLANS, getMaintenancePlans);
}
